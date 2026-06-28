import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User, Loader2, Sparkles, LayoutDashboard, ShoppingBag, Heart, MessageSquare } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function LoginDialog() {
  const { user, login, logout, isLoading, error, isLoginOpen, setLoginOpen } = useAuth();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const success = await login(credentialResponse.credential);
      if (success) {
        setLoginOpen(false);
      }
    }
  };

  const handleGoogleError = () => {
    console.error("Google Authentication Failed");
  };

  // If user is logged in, show a user dropdown menu instead of the login button
  if (user) {
    const initials = user.displayName
      ? user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
      : user.email.slice(0, 2).toUpperCase();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-hidden cursor-pointer">
          <Avatar className="h-9 w-9 border border-sage-green/20 hover:border-sage-green transition-colors">
            <AvatarFallback className="bg-soft-beige text-primary font-bold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-surface border border-soft-beige shadow-lg rounded-lg">
          <DropdownMenuLabel className="font-semibold text-primary">
            <p className="text-sm truncate font-display">{user.displayName}</p>
            <p className="text-xs text-on-surface-variant font-normal truncate mt-0.5">{user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-soft-beige" />
          <DropdownMenuItem asChild>
            <Link 
              to="/dashboard" 
              search={{ tab: "profile" }}
              className="w-full text-primary hover:text-sage-green focus:bg-soft-beige cursor-pointer flex items-center gap-2 py-2 text-sm"
            >
              <LayoutDashboard size={16} />
              <span>My Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link 
              to="/dashboard" 
              search={{ tab: "orders" }}
              className="w-full text-primary hover:text-sage-green focus:bg-soft-beige cursor-pointer flex items-center gap-2 py-2 text-sm"
            >
              <ShoppingBag size={16} />
              <span>Order History</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link 
              to="/dashboard" 
              search={{ tab: "wishlist" }}
              className="w-full text-primary hover:text-sage-green focus:bg-soft-beige cursor-pointer flex items-center gap-2 py-2 text-sm"
            >
              <Heart size={16} />
              <span>My Wishlist</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link 
              to="/dashboard" 
              search={{ tab: "comments" }}
              className="w-full text-primary hover:text-sage-green focus:bg-soft-beige cursor-pointer flex items-center gap-2 py-2 text-sm"
            >
              <MessageSquare size={16} />
              <span>My Comments</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-soft-beige" />
          <DropdownMenuItem 
            onClick={() => logout()}
            className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer flex items-center gap-2 py-2 text-sm"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Dialog open={isLoginOpen} onOpenChange={setLoginOpen}>
      <DialogTrigger asChild>
        <button
          aria-label="Account Login"
          className="hover:text-sage-green p-1.5 transition-colors cursor-pointer text-primary"
          onClick={() => setLoginOpen(true)}
        >
          <User size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-cream-bg border border-soft-beige shadow-2xl rounded-2xl p-6 overflow-hidden">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-soft-beige flex items-center justify-center text-sage-green mb-3">
            <Sparkles size={24} className="animate-pulse" />
          </div>
          <DialogTitle className="font-display text-2xl font-bold text-primary">
            Welcome to Shrutibhyam
          </DialogTitle>
          <DialogDescription className="text-sm text-on-surface-variant max-w-[280px] mt-2 leading-relaxed">
            Experience handcrafted Ayurvedic purity. Sign in to manage your wellness journey.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center my-6 min-h-[50px] w-full">
          {isLoading ? (
            <div className="flex items-center gap-2 text-sage-green py-2">
              <Loader2 className="animate-spin" size={20} />
              <span className="text-sm font-semibold tracking-wide">Connecting...</span>
            </div>
          ) : (
            <div className="w-full flex justify-center scale-105 transform">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="outline"
                shape="pill"
                size="large"
              />
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 text-center w-full max-w-[300px]">
              {error}
            </div>
          )}
        </div>

        <div className="text-center border-t border-soft-beige/60 pt-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed">
            By signing in, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
