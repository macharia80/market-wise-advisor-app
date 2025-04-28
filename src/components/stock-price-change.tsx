
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StockPriceChangeProps {
  change: number;
  changePercent: number;
  showIcon?: boolean;
  className?: string;
}

export function StockPriceChange({
  change,
  changePercent,
  showIcon = true,
  className
}: StockPriceChangeProps) {
  const isPositive = change >= 0;
  const formattedChange = Math.abs(change).toFixed(2);
  const formattedPercent = Math.abs(changePercent).toFixed(2);
  
  return (
    <div 
      className={cn(
        "flex items-center gap-1",
        isPositive ? "text-gain" : "text-loss",
        className
      )}
    >
      {showIcon && (isPositive ? 
        <ArrowUp className="h-3 w-3" /> : 
        <ArrowDown className="h-3 w-3" />
      )}
      <span>${formattedChange}</span>
      <span>({formattedPercent}%)</span>
    </div>
  );
}
