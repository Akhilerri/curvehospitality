import { ReactNode } from "react";
import { EnhancedNavigation } from "@/components/EnhancedNavigation";
import { Footer } from "@/components/Footer";

interface BusinessLayoutProps {
  children: ReactNode;
}

export function BusinessLayout({ children }: BusinessLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <EnhancedNavigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}