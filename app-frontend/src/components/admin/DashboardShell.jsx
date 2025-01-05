import AdSidebar from "./AdSidebar";
// import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/Sidebar";
// import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";

function DashboardShell({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdSidebar />
        <SidebarInset>
          <div className="flex flex-col flex-1 w-full">
            <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
              <SidebarTrigger>
                {/* <Button variant="ghost" size="icon" className="md:hidden"> */}
                {/* <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Sidebar</span> */}
                {/* </Button> */}
              </SidebarTrigger>
              <div className="flex items-center space-x-4">
                {/* Add any header content here */}
              </div>
            </header>
            <main className="flex-1 p-6 lg:p-8 w-full">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default DashboardShell;
