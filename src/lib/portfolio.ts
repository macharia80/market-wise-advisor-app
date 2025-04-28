
import { toast } from "@/components/ui/use-toast";
import { Stock, getStockBySymbol } from "./market-data";

export interface PortfolioHolding {
  symbol: string;
  shares: number;
  averageCost: number;
}

export interface WatchlistItem {
  symbol: string;
  dateAdded: string;
}

// Mock portfolio data
const mockPortfolio: PortfolioHolding[] = [
  { symbol: "AAPL", shares: 10, averageCost: 175.23 },
  { symbol: "MSFT", shares: 5, averageCost: 385.67 },
  { symbol: "NVDA", shares: 8, averageCost: 780.45 },
  { symbol: "GOOGL", shares: 12, averageCost: 145.89 },
];

// Mock watchlist data
const mockWatchlist: WatchlistItem[] = [
  { symbol: "TSLA", dateAdded: "2024-03-15" },
  { symbol: "META", dateAdded: "2024-03-20" },
  { symbol: "AMZN", dateAdded: "2024-03-18" },
  { symbol: "V", dateAdded: "2024-03-25" },
];

// Get portfolio holdings
export const getPortfolioHoldings = (): PortfolioHolding[] => {
  return mockPortfolio;
};

// Get portfolio value and performance
export const getPortfolioSummary = (): { 
  totalValue: number; 
  totalCost: number;
  todayChange: number;
  todayChangePercent: number;
  totalGain: number;
  totalGainPercent: number;
} => {
  let totalValue = 0;
  let totalCost = 0;
  let todayChange = 0;
  
  mockPortfolio.forEach(holding => {
    const stock = getStockBySymbol(holding.symbol);
    if (stock) {
      const currentValue = stock.price * holding.shares;
      const costBasis = holding.averageCost * holding.shares;
      
      totalValue += currentValue;
      totalCost += costBasis;
      todayChange += stock.change * holding.shares;
    }
  });
  
  const totalGain = totalValue - totalCost;
  const totalGainPercent = (totalGain / totalCost) * 100;
  const todayChangePercent = (todayChange / (totalValue - todayChange)) * 100;
  
  return {
    totalValue,
    totalCost,
    todayChange,
    todayChangePercent,
    totalGain,
    totalGainPercent
  };
};

// Get enriched portfolio holdings with current price data
export const getEnrichedPortfolio = (): (PortfolioHolding & {
  currentPrice: number;
  value: number;
  gain: number;
  gainPercent: number;
  dayChange: number;
  dayChangePercent: number;
  name: string;
})[] => {
  return mockPortfolio
    .map(holding => {
      const stock = getStockBySymbol(holding.symbol);
      if (!stock) return null;
      
      const currentPrice = stock.price;
      const value = currentPrice * holding.shares;
      const cost = holding.averageCost * holding.shares;
      const gain = value - cost;
      const gainPercent = (gain / cost) * 100;
      
      return {
        ...holding,
        currentPrice,
        value,
        gain,
        gainPercent,
        dayChange: stock.change * holding.shares,
        dayChangePercent: stock.changePercent,
        name: stock.name
      };
    })
    .filter(Boolean) as any[];
};

// Get watchlist
export const getWatchlist = (): (WatchlistItem & Partial<Stock>)[] => {
  return mockWatchlist.map(item => {
    const stock = getStockBySymbol(item.symbol);
    return { ...item, ...stock };
  });
};

// Add to watchlist
export const addToWatchlist = (symbol: string): boolean => {
  const exists = mockWatchlist.some(item => item.symbol === symbol);
  
  if (exists) {
    toast({
      title: "Already in Watchlist",
      description: `${symbol} is already in your watchlist`,
    });
    return false;
  }
  
  mockWatchlist.push({
    symbol,
    dateAdded: new Date().toISOString().split('T')[0]
  });
  
  toast({
    title: "Added to Watchlist",
    description: `${symbol} has been added to your watchlist`,
  });
  
  return true;
};

// Remove from watchlist
export const removeFromWatchlist = (symbol: string): boolean => {
  const index = mockWatchlist.findIndex(item => item.symbol === symbol);
  
  if (index === -1) {
    return false;
  }
  
  mockWatchlist.splice(index, 1);
  
  toast({
    title: "Removed from Watchlist",
    description: `${symbol} has been removed from your watchlist`,
  });
  
  return true;
};

// Check if stock is in watchlist
export const isInWatchlist = (symbol: string): boolean => {
  return mockWatchlist.some(item => item.symbol === symbol);
};
