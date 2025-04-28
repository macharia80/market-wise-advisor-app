
import { getWatchlist, removeFromWatchlist } from "@/lib/portfolio";
import { StockPriceChange } from "./stock-price-change";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export function Watchlist() {
  const watchlist = getWatchlist();
  
  const handleRemove = (symbol: string) => {
    removeFromWatchlist(symbol);
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Watchlist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {watchlist.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Your watchlist is empty. Add stocks to track them here.
            </p>
          ) : (
            watchlist.map((item) => (
              <div key={item.symbol} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <a href={`/stock/${item.symbol}`} className="font-medium hover:underline">
                    {item.symbol}
                  </a>
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end">
                    <span className="font-medium">${item.price?.toFixed(2)}</span>
                    {item.change !== undefined && item.changePercent !== undefined && (
                      <StockPriceChange 
                        change={item.change} 
                        changePercent={item.changePercent} 
                        className="text-xs" 
                      />
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemove(item.symbol)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
