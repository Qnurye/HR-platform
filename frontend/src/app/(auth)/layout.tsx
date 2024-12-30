import React from "react";
import {Navbar} from "@/components/Navbar";
import {Footer} from "@/components/Footer";
import {AppSidebar} from "@/components/AppSidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";


export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar/>
      <SidebarInset>
        <div className="size-full min-h-screen flex flex-col">
          <Navbar/>
          <div className="flex flex-1">
            <main className="flex-1 p-4 ">
              {children}
            </main>
          </div>
          <Footer/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
