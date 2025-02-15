/* eslint-disable @next/next/no-img-element */
"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { useUser, SignOutButton } from "@clerk/nextjs";

interface LogOutComponentProps {
  isCollapsed: boolean;
}

const LogOutComponent = ({ isCollapsed }: LogOutComponentProps) => {
  const { user } = useUser();
  return (
    <>
      <div className="px-4 pt-2 border-t">
        <div
          className={cn(
            "flex items-center gap-3",
            isCollapsed ? "justify-center" : "px-4 py-0"
          )}
        >
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--laai-blue))] flex items-center justify-center text-white shrink-0">
              {user?.firstName?.charAt(0) || "S"}
            </div>
          )}

          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.emailAddresses[0].emailAddress}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <SignOutButton>
          <Button
            variant="destructive"
            className="w-full flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {isCollapsed ? null : "Sign Out"}
          </Button>
        </SignOutButton>
      </div>
    </>
  );
};

export default LogOutComponent;
