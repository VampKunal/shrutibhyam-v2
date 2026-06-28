import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";
import process from "node:process";
import { WOOCOMMERCE_DEFAULT_URL } from "@/constant";

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

const COOKIE_NAME = "wp_jwt_token";

export async function serverAuthenticateWithGoogle(idToken: string): Promise<AuthResponse | null> {
  try {
    const siteUrl = process.env.WOOCOMMERCE_URL || WOOCOMMERCE_DEFAULT_URL;
    
    const response = await fetch(`${siteUrl.replace(/\/$/, "")}/wp-json/auth/v1/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_token: idToken }),
    });

    if (!response.ok) {
      let errorMsg = "Failed to authenticate with WordPress";
      try {
        const errorData = await response.json();
        if (errorData.message) errorMsg = errorData.message;
      } catch {
        // Fallback
      }
      throw new Error(errorMsg);
    }

    const authData = (await response.json()) as any;

    if (authData.token) {
      setCookie(COOKIE_NAME, authData.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      
      const rawUser = authData.user || {};
      const normalizedUser: UserProfile = {
        id: rawUser.id ? Number(rawUser.id) : 0,
        email: rawUser.email || rawUser.user_email || rawUser.user_mail || "",
        displayName: rawUser.displayName || rawUser.name || rawUser.display_name || rawUser.slug || "",
      };

      return {
        success: !!authData.success || true,
        token: authData.token,
        user: normalizedUser,
      };
    }
    
    return null;
  } catch (error) {
    console.error("serverAuthenticateWithGoogle error:", error);
    throw error;
  }
}

export async function serverLogoutUser() {
  try {
    deleteCookie(COOKIE_NAME, {
      path: "/",
    });
    return { success: true };
  } catch (error) {
    console.error("serverLogoutUser error:", error);
    return { success: false };
  }
}

export async function serverGetCurrentUser(): Promise<UserProfile | null> {
  try {
    const token = getCookie(COOKIE_NAME);
    if (!token) {
      return null;
    }

    const siteUrl = process.env.WOOCOMMERCE_URL || WOOCOMMERCE_DEFAULT_URL;

    const response = await fetch(`${siteUrl.replace(/\/$/, "")}/wp-json/wp/v2/users/me?context=edit`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      deleteCookie(COOKIE_NAME, { path: "/" });
      return null;
    }

    const wpUser = await response.json();
    return {
      id: Number(wpUser.id),
      email: wpUser.email || wpUser.user_email || wpUser.user_mail || "",
      displayName: wpUser.name || wpUser.display_name || wpUser.slug || "",
    };
  } catch (error) {
    console.error("serverGetCurrentUser error:", error);
    return null;
  }
}
