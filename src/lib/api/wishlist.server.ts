import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export interface WishlistItem {
  userId: number;
  productSlug: string;
}

const DB_PATH = path.join(process.cwd(), "src", "lib", "api", "wishlist-db.json");

// Seed wishlist with a default item so it's populated on start
const DEFAULT_WISHLIST: WishlistItem[] = [
  {
    userId: 2,
    productSlug: "shrutibhyam-french-clay-handmade-soap",
  }
];

export async function readWishlist(): Promise<WishlistItem[]> {
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    try {
      const fileData = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(fileData) as WishlistItem[];
    } catch (error: any) {
      if (error.code === "ENOENT") {
        await fs.writeFile(DB_PATH, JSON.stringify(DEFAULT_WISHLIST, null, 2), "utf-8");
        return DEFAULT_WISHLIST;
      }
      throw error;
    }
  } catch (error) {
    console.error("Error reading wishlist database:", error);
    return [];
  }
}

export async function writeWishlist(wishlist: WishlistItem[]): Promise<boolean> {
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(wishlist, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to wishlist database:", error);
    return false;
  }
}

export async function serverGetWishlist(userId: number): Promise<string[]> {
  const allItems = await readWishlist();
  return allItems
    .filter((item) => item.userId === userId)
    .map((item) => item.productSlug);
}

export async function serverAddToWishlist(userId: number, productSlug: string): Promise<boolean> {
  const allItems = await readWishlist();
  const exists = allItems.some(
    (item) => item.userId === userId && item.productSlug === productSlug
  );
  if (!exists) {
    allItems.push({ userId, productSlug });
    await writeWishlist(allItems);
  }
  return true;
}

export async function serverRemoveFromWishlist(userId: number, productSlug: string): Promise<boolean> {
  const allItems = await readWishlist();
  const filtered = allItems.filter(
    (item) => !(item.userId === userId && item.productSlug === productSlug)
  );
  await writeWishlist(filtered);
  return true;
}
