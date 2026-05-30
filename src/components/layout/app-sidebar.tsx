"use client";

import { DollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { textBankName } from "@/data";
import { navigationItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type AppSidebarProps = {
  children: ReactNode;
};

export function AppSidebar({ children }: AppSidebarProps) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="group">
        <SidebarHeader className="border-b py-2">
          <SidebarMenu className="flex h-16 items-center justify-center transition-all">
            <SidebarMenuItem className="flex items-center gap-2">
              <DollarSign
                className="size-5 shrink-0 bg-yellow-500 w-7 h-7 p-1 rounded-lg"
                color="white"
              />

              <span className="text-lg font-bold group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:justify-center">
                {textBankName}
              </span>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href} className="w-full">
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.label}
                        className={cn(
                          "rounded-lg",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted",
                        )}
                      >
                        <item.icon className="size-7 shrink-0" />

                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="flex flex-col">
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger />
        </header>

        <main className="flex-1 p-6 bg-zinc-50">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
