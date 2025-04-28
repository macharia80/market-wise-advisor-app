
import { getTrendingStocks } from "@/lib/market-data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { StockPriceChange } from "./stock-price-change";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function TrendingStocks() {
  const { gainers, losers } = getTrendingStocks();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Trending Stocks</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="gainers" className="flex-1">Top Gainers</TabsTrigger>
            <TabsTrigger value="losers" className="flex-1">Top Losers</TabsTrigger>
          </TabsList>
          <TabsContent value="gainers" className="mt-0">
            <div className="space-y-3">
              {gainers.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <a href={`/stock/${stock.symbol}`} className="font-medium hover:underline text-foreground">
                      {stock.symbol}
                    </a>
                    <span className="text-xs text-muted-foreground">{stock.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">${stock.price.toFixed(2)}</span>
                    <StockPriceChange 
                      change={stock.change} 
                      changePercent={stock.changePercent} 
                      className="text-xs" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="losers" className="mt-0">
            <div className="space-y-3">
              {losers.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <a href={`/stock/${stock.symbol}`} className="font-medium hover:underline text-foreground">
                      {stock.symbol}
                    </a>
                    <span className="text-xs text-muted-foreground">{stock.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">${stock.price.toFixed(2)}</span>
                    <StockPriceChange 
                      change={stock.change} 
                      changePercent={stock.changePercent} 
                      className="text-xs" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
