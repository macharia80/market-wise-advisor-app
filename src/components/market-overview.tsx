
import { getMarketIndices } from "@/lib/market-data";
import { StockPriceChange } from "./stock-price-change";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function MarketOverview() {
  const indices = getMarketIndices();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {indices.map((index) => (
            <div key={index.symbol} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{index.name}</h3>
                <StockPriceChange 
                  change={index.change} 
                  changePercent={index.changePercent} 
                  showIcon={true} 
                />
              </div>
              <p className="text-xl font-bold">{index.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
