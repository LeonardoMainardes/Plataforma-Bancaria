import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { PageContainer } from "@/components/layout/page-container";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <AppSidebar>
      <PageContainer>{children}</PageContainer>
    </AppSidebar>
  );
}
