import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

type PageContainerProps = {
  children: ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <Card className="w-full h-[calc(100vh-2rem)] rounded-3xl p-5 border bg-zinc-50/80 backdrop-blur-xl shadow-2xl overflow-hidden">
      {children}
    </Card>
  );
}
