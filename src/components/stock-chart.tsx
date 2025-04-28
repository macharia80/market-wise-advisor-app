
import { useState } from "react";
import { getStockHistoricalData } from "@/lib/market-data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { StockPriceChange } from "./stock-price-change";

interface StockChartProps {
  symbol: string;
  name?: string;
  price?: number;
  change?: number;
  changePercent?: number;
}

type TimeframeOption = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";

export function StockChart({ 
  symbol,
  name = "",
  price = 0,
  change = 0,
  changePercent = 0
}: StockChartProps) {
  const [timeframe, setTimeframe] = useState<TimeframeOption>("3M");
  
  const chartData = getStockHistoricalData(symbol, timeframe);
  const isPositive = change >= 0;
  const chartColor = isPositive ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)";
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (timeframe === "1D") {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeframe === "1W") {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else if (timeframe === "1M") {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed(0);
  };
  
  const timeframeOptions: TimeframeOption[] = ["1D", "1W", "1M", "3M", "1Y", "ALL"];
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2">
              <span>{symbol}</span>
              {name && <span className="text-sm font-normal text-muted-foreground">({name})</span>}
            </CardTitle>
            {price > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">${price.toFixed(2)}</span>
                <StockPriceChange change={change} changePercent={changePercent} />
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate} 
                stroke="#888888" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                domain={["dataMin - 1", "dataMax + 1"]} 
                orientation="right" 
                tickFormatter={formatYAxis} 
                stroke="#888888" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.1)" />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="close" 
                stroke={chartColor} 
                fillOpacity={1}
                fill="url(#colorPrice)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {timeframeOptions.map((option) => (
            <Button
              key={option}
              variant="outline"
              size="sm"
              className={cn(
                "h-8 w-12",
                timeframe === option && "bg-muted"
              )}
              onClick={() => setTimeframe(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
