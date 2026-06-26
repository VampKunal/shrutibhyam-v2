import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

interface UserProfile {
  id: number;
  email: string;
  displayName: string;
}

interface AuthResponse {
  success: boolean;
  token: string;
  user: UserProfile;
}

/**
 * Server Function: Authenticate using Google credential ID token.
 */
export const authenticateWithGoogle = createServerFn({ method: "POST" })
  .validator(z.object({
    idToken: z.string()
  }))
  .handler(async ({ data: { idToken } }): Promise<AuthResponse | null> => {
    const { serverAuthenticateWithGoogle } = await import("./auth.server");
    return serverAuthenticateWithGoogle(idToken);
  });

/**
 * Server Function: Log out.
 */
export const logoutUser = createServerFn({ method: "POST" })
  .handler(async () => {
    const { serverLogoutUser } = await import("./auth.server");
    return serverLogoutUser();
  });

/**
 * Server Function: Get the current logged-in user profile by verifying the JWT cookie with WordPress.
 */
export const getCurrentUser = createServerFn({ method: "GET" })
  .handler(async (): Promise<UserProfile | null> => {
    const { serverGetCurrentUser } = await import("./auth.server");
    return serverGetCurrentUser();
  });
