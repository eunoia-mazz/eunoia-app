import React from "react";
import UserSidebar from "@/components/user/UserSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardShell({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-blue-50">
        <UserSidebar />
        <SidebarInset>
          <div className="flex flex-col flex-1">
            <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
              <SidebarTrigger>
                {/* <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Sidebar</span>
                </Button> */}
              </SidebarTrigger>
              <div className="flex items-center space-x-4">
                {/* Add notification bell, user menu, etc. here */}
              </div>
            </header>
            <main className="flex-1 p-6 lg:p-8">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
