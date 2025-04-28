
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { StockSearch } from "./stock-search";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronRight, LayoutDashboard, LineChart, Menu, Search, Settings, Star } from "lucide-react";

export function MainLayout({ children }: { children?: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 transform bg-card text-card-foreground border-r transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center px-4 border-b">
          <h2 className="text-lg font-bold">Cryonix</h2>
        </div>
        
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            <li>
              <a 
                href="/"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a 
                href="/portfolio"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <LineChart className="h-5 w-5" />
                <span>Portfolio</span>
              </a>
            </li>
            <li>
              <a 
                href="/watchlist"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Star className="h-5 w-5" />
                <span>Watchlist</span>
              </a>
            </li>
            <li>
              <a 
                href="/explore"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Search className="h-5 w-5" />
                <span>Explore</span>
              </a>
            </li>
            <li>
              <a 
                href="/settings"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Content area */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        sidebarOpen ? "ml-64" : "ml-0"
      )}>
        {/* Top navigation */}
        <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur">
          <div className="flex h-full items-center justify-between px-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="mr-2"
              >
                {sidebarOpen ? <ChevronRight className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <StockSearch />
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
