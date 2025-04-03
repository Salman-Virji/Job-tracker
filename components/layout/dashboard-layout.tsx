import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "../ui/mode-toggle";
import { SiteHeader } from "../site-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
       
        <AppSidebar  />
        

        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
      
    </div>
  );
}
