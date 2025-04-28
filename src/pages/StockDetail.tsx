
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/main-layout";
import { StockChart } from "@/components/stock-chart";
import { getStockBySymbol } from "@/lib/market-data";
import { addToWatchlist, isInWatchlist, removeFromWatchlist } from "@/lib/portfolio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Star, StarOff, TrendingUp, DollarSign } from "lucide-react";
import { buyStock, sellStock } from "@/lib/market-data";
import { StockPriceChange } from "@/components/stock-price-change";

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [quantity, setQuantity] = useState(1);
  const [inWatchlist, setInWatchlist] = useState(() => isInWatchlist(symbol || ""));
  
  const stock = symbol ? getStockBySymbol(symbol) : undefined;
  
  if (!stock) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold">Stock Not Found</h1>
          <p className="text-muted-foreground">The stock symbol you're looking for doesn't exist.</p>
          <Button className="mt-4" asChild>
            <a href="/">Return to Dashboard</a>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(stock.symbol);
      setInWatchlist(false);
    } else {
      addToWatchlist(stock.symbol);
      setInWatchlist(true);
    }
  };
  
  const handleBuy = () => {
    buyStock(stock.symbol, quantity);
  };
  
  const handleSell = () => {
    sellStock(stock.symbol, quantity);
  };
  
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{stock.symbol} - {stock.name}</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleWatchlistToggle}
        >
          {inWatchlist ? (
            <StarOff className="h-4 w-4" />
          ) : (
            <Star className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StockChart 
            symbol={stock.symbol}
            price={stock.price}
            change={stock.change}
            changePercent={stock.changePercent}
          />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Trade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-20"
                />
                <span className="text-muted-foreground">shares at</span>
                <span className="font-medium">${stock.price.toFixed(2)}</span>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  className="flex-1 bg-gain hover:bg-gain/90" 
                  onClick={handleBuy}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Buy
                </Button>
                <Button 
                  className="flex-1 bg-loss hover:bg-loss/90" 
                  onClick={handleSell}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Sell
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Key Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Previous Close</dt>
                  <dd className="font-medium">
                    ${(stock.price - stock.change).toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Day Range</dt>
                  <dd className="font-medium">
                    ${(stock.price * 0.99).toFixed(2)} - ${(stock.price * 1.01).toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Volume</dt>
                  <dd className="font-medium">{stock.volume.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Market Cap</dt>
                  <dd className="font-medium">${(stock.marketCap / 1000000000).toFixed(2)}B</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">P/E Ratio</dt>
                  <dd className="font-medium">{stock.pe.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Sector</dt>
                  <dd className="font-medium">{stock.sector}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Today's Change</dt>
                  <dd>
                    <StockPriceChange
                      change={stock.change}
                      changePercent={stock.changePercent}
                    />
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default StockDetail;
