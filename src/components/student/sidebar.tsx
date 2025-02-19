"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  User,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { useUser } from "@clerk/nextjs";
import LogOutComponent from "../common/LogOutComponent";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/student" },
  { icon: BookOpen, label: "Courses", href: "/student/courses" },
  { icon: MessageSquare, label: "Chat", href: "/student/chat" },
  { icon: Calendar, label: "Schedule", href: "/student/schedule" },
  { icon: GraduationCap, label: "Progress", href: "/student/progress" },
  { icon: User, label: "Profile", href: "/student/profile" },
  { icon: Settings, label: "Settings", href: "/student/settings" },
];

export function Sidebar() {
  const { user } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const router = useRouter();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-card border-r flex flex-col transition-all duration-300 md:translate-x-0 md:relative",
          isCollapsed ? "-translate-x-full md:translate-x-0 md:w-16" : "w-64"
        )}
      >
        <div className="p-6 border-b flex items-center justify-between">
          {!isCollapsed && (
            <h2
              onClick={() => router.push("/")}
              className="text-2xl font-bold text-[hsl(var(--laai-blue))] cursor-pointer hover:opacity-80 transition-opacity"
            >
              Hello, {user?.firstName}
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex ml-auto"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </Button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                    isCollapsed ? "justify-center p-2" : "px-4 py-2"
                  )}
                  title={isCollapsed ? item.label : undefined}
                  onClick={() => {
                    if (!isCollapsed) setIsCollapsed(true);
                  }}
                >
                  <item.icon
                    className={cn(
                      "shrink-0",
                      isCollapsed ? "w-5 h-5" : "w-4 h-4"
                    )}
                  />
                  {!isCollapsed && (
                    <span className="text-sm">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <LogOutComponent isCollapsed={isCollapsed} />
      </div>
    </>
  );
}
