import type { ReactNode } from "react";
import DesktopSidebar from "./DesktopSidebar";
import DesktopTopBar from "./DesktopTopBar";
import MobileTopBar from "./MobileTopBar";
import MobileBottomNav from "./MobileBottomNav";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="bg-background text-on-background antialiased min-h-screen">
      {/* Desktop navigation — hidden below lg */}
      <div className="hidden lg:block">
        <DesktopSidebar />
        <DesktopTopBar />
      </div>

      {/* Mobile navigation — hidden at lg+ */}
      <div className="lg:hidden">
        <MobileTopBar />
      </div>

      {/* Main content area with responsive padding */}
      <main className="pt-20 pb-24 px-4 max-w-2xl mx-auto lg:ml-64 lg:pt-24 lg:pb-12 lg:px-8 lg:max-w-[1600px]">
        {children}
      </main>

      {/* Mobile bottom nav — hidden at lg+ */}
      <div className="lg:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
}
