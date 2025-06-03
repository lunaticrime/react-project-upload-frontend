import { Calendar, Home, Inbox, Search, Settings, User } from "lucide-react";
import { FaUser, FaChevronUp } from "react-icons/fa";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/feed",
    icon: Home,
    roles: ["admin", "prof", "etudiant"],
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    roles: ["admin", "prof", "etudiant"],
  },
  {
    title: "Admin Dashboard",
    url: "/admin",
    icon: Settings,
    roles: ["admin"],
  },
  {
    title: "Professor Dashboard",
    url: "/prof",
    icon: Settings,
    roles: ["prof"],
  },
];

export function AppSidebar() {
  const { state } = useSidebar("collapsed");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSignOut = () => {
    // Clear authentication state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/login");
  };

  // Filter menu items based on user role
  const filteredItems = items.filter((item) => item.roles.includes(user?.role));

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <FaUser /> {user?.name || "Username"}
                  <FaChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[14rem]">
                <DropdownMenuItem>
                  <a href="/profile" className="w-full">
                    <span>Account</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
