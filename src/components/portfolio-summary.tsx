
import { getPortfolioSummary } from "@/lib/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { StockPriceChange } from "./stock-price-change";

export function PortfolioSummary() {
  const {
    totalValue,
    todayChange,
    todayChangePercent,
    totalGain,
    totalGainPercent
  } = getPortfolioSummary();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
            <p className="text-3xl font-bold">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Today:</span>
              <StockPriceChange 
                change={todayChange} 
                changePercent={todayChangePercent} 
                showIcon={true} 
                className="text-sm" 
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-muted-foreground">Total Return</h3>
            <StockPriceChange 
              change={totalGain} 
              changePercent={totalGainPercent} 
              showIcon={true} 
              className="text-xl font-bold" 
            />
            <p className="text-sm text-muted-foreground">All Time</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
