"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { logout } from "@/lib/actions/user.action";
import { toast } from "sonner";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { success } = await logout();

      if (success) {
        toast("Success", { description: "Log out successfully" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button className="text-lg p-6" variant="secondary" onClick={handleLogout}>
      {isLoading ? "Loading..." : "Sign out"}
    </Button>
  );
};

export default Logout;
