import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ScrollProvider } from "@/context/ScrollContext";
import { CartDrawer } from "@/components/site/CartDrawer";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import { getWooProducts } from "@/lib/api/woocommerce.functions";

import appCss from "../styles.css?inline";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

import { Loader2 } from "lucide-react";

function PendingComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shrutibhyam Wellness — Rooted in Ayurvedic Purity" },
      { name: "description", content: "Handcrafted Ayurvedic skincare, mindful yoga, and holistic wellness events. Slow-beauty rituals rooted in tradition." },
      { property: "og:title", content: "Shrutibhyam Wellness" },
      { property: "og:description", content: "Rooted in tradition, crafted for today. Ayurvedic wellness, yoga, and events." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/title.webp" },
      { rel: "preconnect", href: "https://lh3.googleusercontent.com", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  pendingComponent: PendingComponent,
});


function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: appCss }} />
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  const location = useLocation();

  useEffect(() => {

    // Background prefetching of products when visiting the site
    queryClient.prefetchQuery({
      queryKey: ["products"],
      queryFn: () => getWooProducts(),
      staleTime: 1000 * 60 * 10, // 10 minutes stale time for aggressive caching
    }).catch(console.error);

    // Defer Facebook pixel loading
    const loadFBPixel = () => {
      if ((window as any).fbq) return;
      !function(f,b,e,v,n,t,s) {
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        if(s.parentNode) s.parentNode.insertBefore(t,s)
      }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      
      (window as any).fbq('init', '4384383748495446');
      (window as any).fbq('track', 'PageView');
    };

    // Load after a slight delay to ensure it doesn't block critical render
    const timeout = setTimeout(loadFBPixel, 2500);
    return () => clearTimeout(timeout);
  }, [queryClient]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <AuthProvider>
            <CartProvider>
              <ScrollProvider>
                {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
                <Outlet />
                <CartDrawer />
              </ScrollProvider>
            </CartProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}
