import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Server Function: Get comments for a product slug.
 */
export const getComments = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: productSlug }) => {
    const { serverGetComments } = await import("./comments.server");
    return serverGetComments(productSlug);
  });

/**
 * Server Function: Get comments written by a specific user.
 */
export const getCommentsByUser = createServerFn({ method: "GET" })
  .validator(z.number())
  .handler(async ({ data: userId }) => {
    const { serverGetCommentsByUser } = await import("./comments.server");
    return serverGetCommentsByUser(userId);
  });

/**
 * Server Function: Add a new comment.
 * Validates the input payload.
 */
export const addComment = createServerFn({ method: "POST" })
  .validator(z.object({
    productSlug: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(1, "Comment cannot be empty"),
    user: z.object({
      id: z.number(),
      email: z.string(),
      displayName: z.string()
    })
  }))
  .handler(async ({ data: { productSlug, rating, comment, user } }) => {
    const { serverAddComment } = await import("./comments.server");
    return serverAddComment(productSlug, user, rating, comment);
  });

/**
 * Server Function: Update a comment.
 */
export const updateComment = createServerFn({ method: "POST" })
  .validator(z.object({
    commentId: z.string(),
    userId: z.number(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(1)
  }))
  .handler(async ({ data: { commentId, userId, rating, comment } }) => {
    const { serverUpdateComment } = await import("./comments.server");
    return serverUpdateComment(commentId, userId, rating, comment);
  });

/**
 * Server Function: Delete a comment.
 */
export const deleteComment = createServerFn({ method: "POST" })
  .validator(z.object({
    commentId: z.string(),
    userId: z.number()
  }))
  .handler(async ({ data: { commentId, userId } }) => {
    const { serverDeleteComment } = await import("./comments.server");
    return serverDeleteComment(commentId, userId);
  });
