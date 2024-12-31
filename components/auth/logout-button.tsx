"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await toast.promise(
        signOut(), // signOut is provided by next-auth
        {
          loading: "Logging out...",
          success: "Successfully logged out!",
          error: "Failed to log out. Please try again.",
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <Button onClick={handleLogout}>
        <LogOut className="mr-2" /> Sign Out
      </Button>
    </div>
  );
}
