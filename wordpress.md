# WordPress & WooCommerce Integration

This document outlines the current decoupled (headless) architecture between the **Shrutibhyam** frontend (built with TanStack Start, React, and Vite) and the **WordPress / WooCommerce** backend (hosted at `https://checkout.shrutibhyam.com`).

It details the existing services, backend configurations required, and potential future integrations.

---

## Architectural Overview

Shrutibhyam utilizes a headless CMS pattern where the user experience is fully custom and high-performance, built on React/Vite, while product management, order processing, and authentication are offloaded to WordPress via REST APIs.

```mermaid
graph TD
    Client[React/TanStack Frontend Client]
    Server[TanStack Start Server Functions]
    WP[WordPress / WooCommerce Server]
    
    Client -- "1. Load Products & Details" --> Server
    Server -- "Fetch wc/v3/products" --> WP
    
    Client -- "2. Google Login" --> Server
    Server -- "POST auth/v1/google" --> WP
    WP -- "Return User & JWT" --> Server
    Server -- "Set httpOnly Cookie wp_jwt_token" --> Client
    
    Client -- "3. Fetch Profile/Orders/Wishlist/Reviews" --> Server
    Server -- "Fetch with JWT or API Keys" --> WP
    
    Client -- "4. Redirect to Checkout" --> WP
    Note over WP: Standard or custom checkout URL parsing
```

---

## Current Services Using WordPress

### 1. Authentication & Sessions
The authentication flow bridges Google Sign-In with WordPress users using JWT tokens to establish secure sessions on the headless site.

*   **Google Single Sign-On (SSO):** When a user signs in, their Google credential ID token is exchanged for a WordPress-issued JWT token.
    *   Endpoint: `POST https://checkout.shrutibhyam.com/wp-json/auth/v1/google`
    *   Authentication handler is defined in [auth.server.ts](file:///d:/shrutibhyam/src/lib/api/auth.server.ts#L19).
*   **Session Management:** The issued JWT token is stored on the client as a secure, HTTP-only cookie named `wp_jwt_token` via [serverAuthenticateWithGoogle](file:///d:/shrutibhyam/src/lib/api/auth.server.ts#L19).
*   **User Profiles:** The frontend retrieves the logged-in user profile on application boot.
    *   Endpoint: `GET https://checkout.shrutibhyam.com/wp-json/wp/v2/users/me?context=edit` (authorized with the Bearer JWT token).
    *   Implementation in [serverGetCurrentUser](file:///d:/shrutibhyam/src/lib/api/auth.server.ts#L86).
*   **Client Context:** Client-side reactive states are governed by the [AuthProvider](file:///d:/shrutibhyam/src/context/AuthContext.tsx#L23) which exposes the `user` state and methods like `login`, `logout`, and `refreshUser`.

### 2. Product Catalog (WooCommerce API)
E-commerce data is pulled directly from the WooCommerce REST API and normalized for the React UI.

*   **Product Queries:**
    *   List all products (up to 100): `GET /wp-json/wc/v3/products?per_page=100` via [getWooProducts](file:///d:/shrutibhyam/src/lib/api/woocommerce.functions.ts#L16).
    *   Get product by slug: `GET /wp-json/wc/v3/products?slug={slug}` via [getWooProductBySlug](file:///d:/shrutibhyam/src/lib/api/woocommerce.functions.ts#L33).
*   **Data Normalization:** Raw WooCommerce payloads are mapped to a structured, type-safe [LocalProduct](file:///d:/shrutibhyam/src/lib/woocommerce.ts#L12) model using [mapWooCommerceProduct](file:///d:/shrutibhyam/src/lib/woocommerce.ts#L47). This processes tags, fallback images, prices, descriptions, and sale flags.
*   **Description Parsing:** The custom [parseProductDescription](file:///d:/shrutibhyam/src/lib/woocommerce.ts#L161) helper extracts headings (`Ingredients`, `Benefits`, `How to Use`) from the HTML description to automatically render responsive tabs/accordions on the [shop.$slug.tsx](file:///d:/shrutibhyam/src/routes/shop.$slug.tsx) details page.

### 3. Customer Profile & Orders
Customer details and purchase history are queried using WooCommerce endpoints.

*   **Profile Management:**
    *   Get customer data (shipping/billing addresses, phone): `GET /wp-json/wc/v3/customers/{userId}` via [getCustomerProfile](file:///d:/shrutibhyam/src/lib/api/woocommerce.functions.ts#L51).
    *   Update profile: `PUT /wp-json/wc/v3/customers/{userId}` (for e-commerce addresses) coupled with `POST /wp-json/wp/v2/users/me` (for WordPress account display name) via [updateCustomerProfile](file:///d:/shrutibhyam/src/lib/api/woocommerce.functions.ts#L76).
*   **Orders & Tracking:**
    *   Fetch customer history: `GET /wp-json/wc/v3/orders?customer={userId}` via [getCustomerOrders](file:///d:/shrutibhyam/src/lib/api/woocommerce.functions.ts#L134).
    *   Order data is formatted to include delivery steps, status colors, and tracking details extracted from order metadata (e.g. `_tracking_provider` and `_tracking_number`).

### 4. Headless Checkout Redirection
The checkout process utilizes a secure redirection model to offload payment details and PCI compliance to the WordPress server.

*   **Cart Checkout Flow:** In [CartDrawer.tsx](file:///d:/shrutibhyam/src/components/site/CartDrawer.tsx#L14), users click checkout, which compiles their cart items and redirects them to the WordPress checkout page.
*   **Checkout URLs:**
    *   Single Product: `${WOOCOMMERCE_BASE_URL}/checkout/?add-to-cart={wooId}&quantity={quantity}` via [getSingleProductCheckoutUrl](file:///d:/shrutibhyam/src/lib/woocommerce.ts#L123).
    *   Multi-Product: `${WOOCOMMERCE_BASE_URL}/checkout/?add-to-cart={wooId1}:{qty1},{wooId2}:{qty2}&clear-cart=1` via [getMultiProductCheckoutUrl](file:///d:/shrutibhyam/src/lib/woocommerce.ts#L133). Note: This multi-product syntax requires a custom helper snippet in the WordPress theme's `functions.php` file.

### 5. Wishlist Management
Allows authenticated users to persist saved products using the custom Wishlist REST API endpoint.

*   **REST API Integration:**
    *   Retrieval: `GET /wp-json/wishlist/v1/get?userId={userId}`
    *   Add Product: `POST /wp-json/wishlist/v1/add` (payload: `{ userId, productSlug }`)
    *   Remove Product: `POST /wp-json/wishlist/v1/remove` (payload: `{ userId, productSlug }`)
    *   Implemented in [wishlist.server.ts](file:///d:/shrutibhyam/src/lib/api/wishlist.server.ts).
*   **Frontend Hooks:** State is maintained globally via the [useWishlist](file:///d:/shrutibhyam/src/hooks/useWishlist.ts) custom hook, prompting users to log in if they try to save items while logged out.

### 6. Product Reviews & Comments
Reviews are stored directly on WooCommerce as product reviews, allowing unified management in the WP Admin Dashboard.

*   **REST Endpoints:** Uses the standard `/wp-json/wc/v3/products/reviews` namespace.
    *   List reviews: `GET products/reviews?product={wooId}` via [serverGetComments](file:///d:/shrutibhyam/src/lib/api/comments.server.ts#L79).
    *   Add review: `POST products/reviews` (payload includes rating, review text, email, customer_id) via [serverAddComment](file:///d:/shrutibhyam/src/lib/api/comments.server.ts#L117).
    *   Edit review: `PUT products/reviews/{commentId}` via [serverUpdateComment](file:///d:/shrutibhyam/src/lib/api/comments.server.ts#L151).
    *   Delete review: `DELETE products/reviews/{commentId}?force=true` via [serverDeleteComment](file:///d:/shrutibhyam/src/lib/api/comments.server.ts#L179).
*   **Validation:** Review modifications and deletions are validated on the server by ensuring the authenticated `userId` matches the review's `customer_id`.

---

## Required WordPress Side Configuration

To ensure these features work seamlessly, the WordPress installation requires the following configuration:

### 1. WordPress Plugins
*   **WooCommerce:** Core plugin for store, products, and checkout operations.
*   **JWT Authentication for WP-API:** Required to support bearer authentication tokens for `/wp-json/wp/v2/users/me` requests.
*   **Firebase JWT Library:** The JWT authentication plugin should load the `\Firebase\JWT\JWT` or `\JWT` library, allowing PHP to sign payloads securely.

### 2. Complete Theme functions.php Integration Code

Your active WordPress theme's `functions.php` contains the logic handling direct checkout, cart management, Google Authentication, and Wishlist metadata storage. The complete integration code is detailed below:

```php
/**
 * Add products to WooCommerce cart from query parameters and clear cart if requested
 * Hooks into wp_loaded to parse:
 * - Multi-product formats: ?add-to-cart=40:1,42:2&clear-cart=1
 * - Single product colon formats: ?add-to-cart=40:1&clear-cart=1
 */```php
/**
 * Add products to WooCommerce cart from query parameters and clear cart if requested
 * Hooks into wp_loaded to parse:
 * - Multi-product formats: ?add-to-cart=40:1,42:2&clear-cart=1
 * - Single product colon formats: ?add-to-cart=40:1&clear-cart=1
 */
add_action('wp_loaded', 'shrutibhyam_custom_add_to_cart_handler');
function shrutibhyam_custom_add_to_cart_handler() {
    if (function_exists('WC') && WC()->cart) {
        // Clear cart if requested
        if (isset($_GET['clear-cart'])) {
            WC()->cart->empty_cart();
            if (WC()->session) {
                WC()->session->set('cart', array());
            }
        }

        // Handle multiple products comma format (e.g. ?add-to-cart=40:1,42:2)
        if (isset($_GET['add-to-cart']) && strpos($_GET['add-to-cart'], ',') !== false) {
            $items = explode(',', $_GET['add-to-cart']);
            foreach ($items as $item) {
                $parts = explode(':', $item);
                $product_id = intval($parts[0]);
                $quantity = isset($parts[1]) ? intval($parts[1]) : 1;
                
                if ($product_id > 0) {
                    $product = wc_get_product($product_id);
                    if ($product && $product->is_purchasable() && $product->is_in_stock()) {
                        WC()->cart->add_to_cart($product_id, $quantity);
                    }
                }
            }
            // Safe redirect relative to current domain to WooCommerce checkout page
            wp_safe_redirect(wc_get_checkout_url());
            exit;
        }
        
        // Handle single product colon format (e.g. ?add-to-cart=40:1) to support cart clearing
        if (isset($_GET['add-to-cart']) && strpos($_GET['add-to-cart'], ':') !== false) {
            $parts = explode(':', $_GET['add-to-cart']);
            $product_id = intval($parts[0]);
            $quantity = isset($parts[1]) ? intval($parts[1]) : 1;
            
            if ($product_id > 0) {
                $product = wc_get_product($product_id);
                if ($product && $product->is_purchasable() && $product->is_in_stock()) {
                    WC()->cart->add_to_cart($product_id, $quantity);
                }
            }
            // Safe redirect relative to current domain to WooCommerce checkout page
            wp_safe_redirect(wc_get_checkout_url());
            exit;
        }
    }
}

// =========================================================================
// GOOGLE AUTHENTICATION API ENDPOINTS
// =========================================================================

/**
 * Register custom Google Auth REST API route
 */
add_action('rest_api_init', function () {
    register_rest_route('auth/v1', '/google', array(
        'methods' => 'POST',
        'callback' => 'handle_google_login_auth',
        'permission_callback' => '__return_true', // Publicly accessible
    ));
});

/**
 * Handle verification, registration, and login
 */
function handle_google_login_auth(WP_REST_Request $request) {
    $id_token = $request->get_param('id_token');

    if (empty($id_token)) {
        return new WP_Error('missing_token', 'Google ID Token is required', array('status' => 400));
    }

    // 1. Verify token with Google's API
    $verification_url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' . urlencode($id_token);
    $response = wp_remote_get($verification_url, array('timeout' => 15));

    if (is_wp_error($response)) {
        return new WP_Error('google_api_error', 'Failed to connect to Google validation servers', array('status' => 500));
    }

    $body = json_decode(wp_remote_retrieve_body($response), true);

    if (isset($body['error']) || empty($body['email'])) {
        return new WP_Error('invalid_token', 'Invalid Google ID Token', array('status' => 401));
    }

    // Optional Validation: Confirm client ID/Audience matches target (if SHRUTIBHYAM_GOOGLE_CLIENT_ID is defined in wp-config.php)
    if (defined('SHRUTIBHYAM_GOOGLE_CLIENT_ID')) {
        $aud = isset($body['aud']) ? $body['aud'] : (isset($body['azp']) ? $body['azp'] : '');
        if ($aud !== SHRUTIBHYAM_GOOGLE_CLIENT_ID) {
            return new WP_Error('invalid_audience', 'Google Token audience mismatch', array('status' => 401));
        }
    }

    // Extract user profile information from token body
    $email = $body['email'];
    $first_name = isset($body['given_name']) ? $body['given_name'] : '';
    $last_name = isset($body['family_name']) ? $body['family_name'] : '';
    $name = isset($body['name']) ? $body['name'] : '';
    $google_id = $body['sub'];

    // 2. Find or create the user in WordPress
    $user = get_user_by('email', $email);

    if (!$user) {
        // Generate a random secure password for the new account
        $random_password = wp_generate_password(18, true, true);
        
        // Generate unique username based on email with incremental counter
        $base_username = sanitize_user(current(explode('@', $email)), true);
        $username = $base_username;
        $counter = 1;
        while (username_exists($username)) {
            $username = $base_username . $counter;
            $counter++;
        }

        $user_id = wp_create_user($username, $random_password, $email);

        if (is_wp_error($user_id)) {
            return new WP_Error('user_creation_failed', $user_id->get_error_message(), array('status' => 500));
        }

        $user = get_user_by('id', $user_id);
        
        // Update user profile info
        wp_update_user(array(
            'ID' => $user_id,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'display_name' => $name,
        ));
        
        // Save Google Subject ID as meta
        update_user_meta($user_id, 'google_oauth_sub', $google_id);
    }

    // 3. Generate a JWT token programmatically using the JWT library loaded by the active JWT plugin
    $jwt_class = null;
    if (class_exists('\Firebase\JWT\JWT')) {
        $jwt_class = '\Firebase\JWT\JWT';
    } elseif (class_exists('\JWT')) {
        $jwt_class = '\JWT';
    }

    if ($jwt_class) {
        $secret_key = defined('JWT_AUTH_SECRET_KEY') ? JWT_AUTH_SECRET_KEY : '';
        if (empty($secret_key)) {
            return new WP_Error('jwt_secret_missing', 'JWT_AUTH_SECRET_KEY is not defined in wp-config.php', array('status' => 500));
        }

        $issuedAt = time();
        $expire = $issuedAt + (DAY_IN_SECONDS * 7); // Valid for 7 days

        $token_payload = array(
            'iss' => get_bloginfo('url'),
            'iat' => $issuedAt,
            'nbf' => $issuedAt,
            'exp' => $expire,
            'data' => array(
                'user' => array(
                    'id' => $user->ID,
                ),
            ),
        );

        // Sign the token programmatically
        $jwt_token = $jwt_class::encode($token_payload, $secret_key, 'HS256');

        return rest_ensure_response(array(
            'success' => true,
            'token' => $jwt_token,
            'user' => array(
                'id' => $user->ID,
                'email' => $user->user_email,
                'displayName' => $user->display_name,
            )
        ));
    }

    return new WP_Error('plugin_missing', 'JWT authentication plugin library is not active on WordPress.', array('status' => 500));
}

// =========================================================================
// WISHLIST REST API ENDPOINTS & SECURITY CHECK
// =========================================================================

/**
 * Validates request authorization:
 * - Returns true if the user is authenticated via JWT (cookie/header).
 * - Returns true if the server is authenticated via WooCommerce REST API Keys (Consumer Key/Secret).
 * - Otherwise, rejects the request.
 */
function shrutibhyam_api_permission_check(WP_REST_Request $request) {
    // 1. Allow if logged in via Standard WP / JWT Cookie
    if (get_current_user_id() > 0) {
        // Enforce user checking: a user can only read/edit their own wishlist
        $requested_user_id = intval($request->get_param('userId'));
        if ($requested_user_id > 0 && get_current_user_id() === $requested_user_id) {
            return true;
        }
    }

    // 2. Allow if authenticated via WooCommerce Consumer Key/Secret (Server-to-Server)
    if (class_exists('WC_REST_Authentication')) {
        $auth = new WC_REST_Authentication();
        $authenticated_user = $auth->authenticate(false);
        if ($authenticated_user instanceof WP_User || (is_numeric($authenticated_user) && $authenticated_user > 0)) {
            return true;
        }
    }

    // 3. Fallback for administrator roles
    if (current_user_can('manage_options')) {
        return true;
    }

    return new WP_Error(
        'rest_forbidden',
        'You do not have permission to view or manage this wishlist.',
        array('status' => 401)
    );
}

add_action('rest_api_init', function () {
    register_rest_route('wishlist/v1', '/get', array(
        'methods' => 'GET',
        'callback' => 'handle_get_wishlist',
        'permission_callback' => 'shrutibhyam_api_permission_check',
    ));
    register_rest_route('wishlist/v1', '/add', array(
        'methods' => 'POST',
        'callback' => 'handle_add_wishlist',
        'permission_callback' => 'shrutibhyam_api_permission_check',
    ));
    register_rest_route('wishlist/v1', '/remove', array(
        'methods' => 'POST',
        'callback' => 'handle_remove_wishlist',
        'permission_callback' => 'shrutibhyam_api_permission_check',
    ));
});

function handle_get_wishlist(WP_REST_Request $request) {
    $user_id = intval($request->get_param('userId'));
    if ($user_id <= 0) {
        return new WP_Error('invalid_user', 'User ID is required', array('status' => 400));
    }
    $wishlist = get_user_meta($user_id, 'shrutibhyam_wishlist', true);
    if (!is_array($wishlist)) {
        $wishlist = array();
    }
    return rest_ensure_response(array_values($wishlist));
}

function handle_add_wishlist(WP_REST_Request $request) {
    $user_id = intval($request->get_param('userId'));
    $product_slug = sanitize_text_field($request->get_param('productSlug'));
    
    if ($user_id <= 0 || empty($product_slug)) {
        return new WP_Error('invalid_params', 'User ID and Product Slug are required', array('status' => 400));
    }
    
    $wishlist = get_user_meta($user_id, 'shrutibhyam_wishlist', true);
    if (!is_array($wishlist)) {
        $wishlist = array();
    }
    
    if (!in_array($product_slug, $wishlist)) {
        $wishlist[] = $product_slug;
        update_user_meta($user_id, 'shrutibhyam_wishlist', $wishlist);
    }
    
    return rest_ensure_response(array('success' => true, 'wishlist' => array_values($wishlist)));
}

function handle_remove_wishlist(WP_REST_Request $request) {
    $user_id = intval($request->get_param('userId'));
    $product_slug = sanitize_text_field($request->get_param('productSlug'));
    
    if ($user_id <= 0 || empty($product_slug)) {
        return new WP_Error('invalid_params', 'User ID and Product Slug are required', array('status' => 400));
    }
    
    $wishlist = get_user_meta($user_id, 'shrutibhyam_wishlist', true);
    if (!is_array($wishlist)) {
        $wishlist = array();
    }
    
    $wishlist = array_diff($wishlist, array($product_slug));
    update_user_meta($user_id, 'shrutibhyam_wishlist', array_values($wishlist));
    
    return rest_ensure_response(array('success' => true, 'wishlist' => array_values($wishlist)));
}
```

---

## Future Possible WordPress Integrations

### 1. Ayurvedic Wellness Blog & Articles
*   **Opportunity:** Pull editorial posts, healthy Ayurvedic recipes, and yoga news from WordPress Posts and display them natively.
*   **Implementation:** 
    *   Register a new path `/blog` and dynamic route `/blog/$postSlug` on the frontend.
    *   Query WordPress Posts: `GET /wp-json/wp/v2/posts?_embed` (embeds featured media, authors, and categories).
    *   Map Gutenberg block contents or standard HTML posts into React components.

### 2. Coupons & Promotion Engine
*   **Opportunity:** Support discount/promo code inputs directly in the custom React Cart Drawer before checkout.
*   **Implementation:**
    *   Fetch discount coupons via `GET /wp-json/wc/v3/coupons` to validate their eligibility client-side.
    *   Include a `coupon_code` query param in the checkout redirect URL so WooCommerce auto-applies it (e.g., `&coupon_code=WELCOME10`).

### 3. Yoga & Retreat Bookings
*   **Opportunity:** Move yoga registration and holistic retreat sign-ups from email/Instagram forms to a unified checkout.
*   **Implementation:**
    *   Install a bookings plugin (e.g., WooCommerce Bookings) on WordPress.
    *   Use the WooCommerce Bookings REST API to fetch available slots, times, and prices.
    *   Enable users to book specific times on `/yoga` and check out using the cart.

### 4. Fully Inline (Client-Side) Checkout
*   **Opportunity:** Complete the checkout on the headless site without redirecting users to `checkout.shrutibhyam.com`.
*   **Implementation:**
    *   Use the **WooCommerce Store API** (`/wp-json/wc/store/v1/checkout`) to submit order details, billing/shipping addresses, and cart items.
    *   Integrate payment SDKs (e.g., Stripe, Razorpay) directly into the frontend.
    *   Process payments and confirm order status asynchronously on the frontend, submitting order notes to WooCommerce after successful confirmation.

### 5. Unified Site-wide Search
*   **Opportunity:** Update the search modal to search simultaneously across products, FAQ items, and Ayurvedic blog posts.
*   **Implementation:**
    *   Combine standard WooCommerce search queries with a WordPress global search query: `GET /wp-json/wp/v2/search?search={query}&subtype=post,product`.

---

## Static to WordPress API Migration Guide

To transform the remaining static layouts into fully dynamic content manageable via the WordPress admin panel, follow this roadmap:

### 1. Bestsellers Carousel (Home Page)
*   **Status**: **Migration Completed** (Implemented dynamically in [index.tsx](file:///d:/shrutibhyam/src/routes/index.tsx#L46-L58)).
*   **Details**: The frontend previously queried the WooCommerce REST API but rendered static placeholders. It has been updated to slice the first 8 active products from WooCommerce, extract pricing/sale meta, and render them dynamically in the Carousel.

### 2. Frequently Asked Questions (FAQ Page)
*   **Status**: Static (Uses static array `FAQ` in [faq.tsx](file:///d:/shrutibhyam/src/routes/faq.tsx#L4)).
*   **Migration Plan**:
    *   **WordPress Setup**: Create a Custom Post Type (CPT) called `faq` on WordPress using plugins like *Custom Post Type UI* (or register via `register_post_type` in `functions.php`). Alternatively, use standard WordPress Posts grouped under a custom category called "FAQ".
    *   **Frontend Refactoring**: Update the loader in [faq.tsx](file:///d:/shrutibhyam/src/routes/faq.tsx) to fetch from `/wp-json/wp/v2/faq` (or custom taxonomy/category) and populate the list dynamically instead of importing `FAQ` from `constant.ts`.

### 3. Yoga Practices & Weekly Class Schedule (Yoga Page)
*   **Status**: Static (Uses static lists `PRACTICES` and `SCHEDULE` in [yoga.tsx](file:///d:/shrutibhyam/src/routes/yoga.tsx#L3)).
*   **Migration Plan**:
    *   **WordPress Setup**: Register custom post types `yoga_practice` and `yoga_class` with fields (e.g., Duration, Teacher, Class Time, Status).
    *   **Frontend Refactoring**: Update the route loader in [yoga.tsx](file:///d:/shrutibhyam/src/routes/yoga.tsx) to perform query fetches to `/wp-json/wp/v2/yoga_practice` and `/wp-json/wp/v2/yoga_class`. Map the response properties (Teacher, Duration, Status) dynamically to render practice cards and the hourly schedule.

### 4. Past Gatherings & Retrospective (Events Page)
*   **Status**: Static (Uses static arrays `EVENTS` and `EVENT_TESTIMONIALS` in [events.tsx](file:///d:/shrutibhyam/src/routes/events.tsx#L4)).
*   **Migration Plan**:
    *   **WordPress Setup**: Publish past gatherings as normal posts inside a specific WordPress category (e.g., "Past Gatherings").
    *   **Frontend Refactoring**: Fetch from `/wp-json/wp/v2/posts?categories={events_cat_id}&per_page=50` inside [events.tsx](file:///d:/shrutibhyam/src/routes/events.tsx) to dynamically render dates, titles, descriptions, and locations.

### 5. Trust Badges & Core Attributes
*   **Status**: Static (Hardcoded in [constant.ts](file:///d:/shrutibhyam/src/constant.ts#L73) and [index.tsx](file:///d:/shrutibhyam/src/routes/index.tsx#L148) for marquee terms like "Vegan", "Handcrafted", "Cruelty free").
*   **Migration Plan**:
    *   **WordPress Setup**: Use WordPress theme option customizer fields or custom REST API Option endpoints.
    *   **Frontend Refactoring**: Query the WordPress Options API to retrieve and display the marquee terms and trust slogans dynamically.
