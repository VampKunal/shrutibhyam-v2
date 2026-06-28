import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Server Function: Retrieve list of wishlisted product slugs for a user.
 */
export const getWishlist = createServerFn({ method: "GET" })
  .validator(z.number())
  .handler(async ({ data: userId }) => {
    const { serverGetWishlist } = await import("./wishlist.server");
    return serverGetWishlist(userId);
  });

/**
 * Server Function: Add a product slug to user's wishlist.
 */
export const addToWishlist = createServerFn({ method: "POST" })
  .validator(z.object({
    userId: z.number(),
    productSlug: z.string(),
  }))
  .handler(async ({ data: { userId, productSlug } }) => {
    const { serverAddToWishlist } = await import("./wishlist.server");
    return serverAddToWishlist(userId, productSlug);
  });

/**
 * Server Function: Remove a product slug from user's wishlist.
 */
export const removeFromWishlist = createServerFn({ method: "POST" })
  .validator(z.object({
    userId: z.number(),
    productSlug: z.string(),
  }))
  .handler(async ({ data: { userId, productSlug } }) => {
    const { serverRemoveFromWishlist } = await import("./wishlist.server");
    return serverRemoveFromWishlist(userId, productSlug);
  });
