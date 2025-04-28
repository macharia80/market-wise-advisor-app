
import { useState, useEffect } from "react";
import { searchStocks } from "@/lib/market-data";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { StockPriceChange } from "./stock-price-change";

export function StockSearch() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(searchStocks(""));
  
  useEffect(() => {
    const handleSearchHotkey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    
    document.addEventListener("keydown", handleSearchHotkey);
    return () => document.removeEventListener("keydown", handleSearchHotkey);
  }, []);
  
  useEffect(() => {
    if (query) {
      setResults(searchStocks(query));
    } else {
      setResults(searchStocks(""));
    }
  }, [query]);
  
  return (
    <>
      <Button 
        variant="outline" 
        className="w-full justify-between text-muted-foreground md:max-w-[250px]"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <span>Search stocks...</span>
        </div>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search for stocks..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Stocks">
            {results.map((stock) => (
              <CommandItem
                key={stock.symbol}
                onSelect={() => {
                  navigate(`/stock/${stock.symbol}`);
                  setOpen(false);
                }}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium">{stock.symbol}</span>
                    <span className="text-xs text-muted-foreground">{stock.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">${stock.price.toFixed(2)}</span>
                    <StockPriceChange 
                      change={stock.change} 
                      changePercent={stock.changePercent} 
                      className="text-xs" 
                      showIcon={false} 
                    />
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
