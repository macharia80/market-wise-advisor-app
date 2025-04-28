
import { getEnrichedPortfolio } from "@/lib/portfolio";
import { StockPriceChange } from "./stock-price-change";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function PortfolioHoldings() {
  const holdings = getEnrichedPortfolio();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Shares</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Avg Cost</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Today</TableHead>
                <TableHead className="text-right">Total Return</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((holding) => (
                <TableRow key={holding.symbol}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <a href={`/stock/${holding.symbol}`} className="font-medium hover:underline">
                        {holding.symbol}
                      </a>
                      <span className="text-xs text-muted-foreground">{holding.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{holding.shares}</TableCell>
                  <TableCell className="text-right">${holding.currentPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${holding.averageCost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${holding.value.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <StockPriceChange 
                      change={holding.dayChange} 
                      changePercent={holding.dayChangePercent} 
                      showIcon={false} 
                      className="justify-end" 
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <StockPriceChange 
                      change={holding.gain} 
                      changePercent={holding.gainPercent} 
                      showIcon={false} 
                      className="justify-end" 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
