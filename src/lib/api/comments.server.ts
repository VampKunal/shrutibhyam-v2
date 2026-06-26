import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export interface CommentItem {
  id: string;
  productSlug: string;
  userId: number;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
}

const DB_PATH = path.join(process.cwd(), "src", "lib", "api", "comments-db.json");

// Default initial seed data for comments to ensure the UI starts beautifully populated.
const DEFAULT_COMMENTS: CommentItem[] = [
  // Haldi Soap
  {
    id: "seed_1",
    productSlug: "shrutibhyam-haldi-handmade-soap",
    userId: 101,
    userName: "Elena R.",
    userEmail: "elena.r@example.com",
    rating: 5,
    comment: "The earthy sandalwood and turmeric scent is incredibly grounding. It doesn't strip my skin like commercial soaps do.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  },
  {
    id: "seed_2",
    productSlug: "shrutibhyam-haldi-handmade-soap",
    userId: 102,
    userName: "Marcus T.",
    userEmail: "marcus.t@example.com",
    rating: 5,
    comment: "Has been a lifesaver for my sensitive skin. Lathers beautifully and leaves my skin deeply nourished.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(), // 12 days ago
  },
  // Neem Soap
  {
    id: "seed_3",
    productSlug: "shrutibhyam-neem-handmade-soap",
    userId: 103,
    userName: "Sarah L.",
    userEmail: "sarah.l@example.com",
    rating: 4,
    comment: "Beautiful packaging and even better product. You can feel the cold-pressed neem quality working on blemishes.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  },
  {
    id: "seed_4",
    productSlug: "shrutibhyam-neem-handmade-soap",
    userId: 104,
    userName: "Aditya P.",
    userEmail: "aditya.p@example.com",
    rating: 5,
    comment: "The tea tree and neem combo is amazing for oily skin. Reduced my breakouts within a week!",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(), // 8 days ago
  },
  // Lavender Soap
  {
    id: "seed_5",
    productSlug: "shrutibhyam-lavender-handmade-soap",
    userId: 105,
    userName: "Jessica M.",
    userEmail: "jessica.m@example.com",
    rating: 5,
    comment: "Stunning calming lavender aroma! Perfect for an evening bath ritual to wind down after a long day.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  // French Clay Soap
  {
    id: "seed_6",
    productSlug: "shrutibhyam-french-clay-handmade-soap",
    userId: 106,
    userName: "Rohit K.",
    userEmail: "rohit.k@example.com",
    rating: 4.5,
    comment: "Excellent detoxifying scrub. The rosewater fragrance is delicate, and it exfoliates very gently.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
  }
];

/**
 * Reads comments from the JSON database.
 * Seeds with default reviews if the file doesn't exist yet.
 */
export async function readComments(): Promise<CommentItem[]> {
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    
    try {
      const fileData = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(fileData) as CommentItem[];
    } catch (error: any) {
      // File doesn't exist or is invalid, seed defaults
      if (error.code === "ENOENT") {
        await fs.writeFile(DB_PATH, JSON.stringify(DEFAULT_COMMENTS, null, 2), "utf-8");
        return DEFAULT_COMMENTS;
      }
      throw error;
    }
  } catch (error) {
    console.error("Error reading comments database:", error);
    return [];
  }
}

/**
 * Writes comments back to the JSON database.
 */
export async function writeComments(comments: CommentItem[]): Promise<boolean> {
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(comments, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to comments database:", error);
    return false;
  }
}

/**
 * Get comments for a specific product.
 */
export async function serverGetComments(productSlug: string): Promise<CommentItem[]> {
  const allComments = await readComments();
  return allComments.filter((c) => c.productSlug === productSlug);
}

/**
 * Get all comments posted by a specific user.
 */
export async function serverGetCommentsByUser(userId: number): Promise<CommentItem[]> {
  const allComments = await readComments();
  return allComments.filter((c) => c.userId === userId);
}

/**
 * Add a new comment.
 */
export async function serverAddComment(
  productSlug: string,
  user: { id: number; email: string; displayName: string },
  rating: number,
  commentText: string
): Promise<CommentItem> {
  const allComments = await readComments();
  
  const newComment: CommentItem = {
    id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    productSlug,
    userId: user.id,
    userName: user.displayName || user.email.split("@")[0],
    userEmail: user.email,
    rating,
    comment: commentText,
    date: new Date().toISOString(),
  };

  allComments.push(newComment);
  await writeComments(allComments);
  return newComment;
}

/**
 * Update an existing comment (author validation required).
 */
export async function serverUpdateComment(
  commentId: string,
  userId: number,
  rating: number,
  commentText: string
): Promise<CommentItem | null> {
  const allComments = await readComments();
  const index = allComments.findIndex((c) => c.id === commentId);
  
  if (index === -1) {
    throw new Error("Review not found");
  }

  const comment = allComments[index];
  
  if (comment.userId !== userId) {
    throw new Error("You are not authorized to update this review");
  }

  comment.rating = rating;
  comment.comment = commentText;
  comment.date = new Date().toISOString(); // Update date to show edited time

  allComments[index] = comment;
  await writeComments(allComments);
  return comment;
}

/**
 * Delete a comment (author validation required).
 */
export async function serverDeleteComment(commentId: string, userId: number): Promise<boolean> {
  const allComments = await readComments();
  const comment = allComments.find((c) => c.id === commentId);

  if (!comment) {
    throw new Error("Review not found");
  }

  // Ensure user is the author
  if (comment.userId !== userId) {
    throw new Error("You are not authorized to delete this review");
  }

  const filtered = allComments.filter((c) => c.id !== commentId);
  await writeComments(filtered);
  return true;
}
