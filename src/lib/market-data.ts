
// Mock stock market data service
import { toast } from "@/components/ui/use-toast";

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  sector: string;
}

export interface StockHistoricalData {
  date: string;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

// Mock stock data
const mockStocks: Stock[] = [
  { 
    symbol: "AAPL", 
    name: "Apple Inc.", 
    price: 189.84, 
    change: 2.35, 
    changePercent: 1.25, 
    volume: 45982100, 
    marketCap: 2951000000000, 
    pe: 31.23, 
    sector: "Technology" 
  },
  { 
    symbol: "MSFT", 
    name: "Microsoft Corporation", 
    price: 402.56, 
    change: 3.89, 
    changePercent: 0.98, 
    volume: 22145600, 
    marketCap: 2990000000000, 
    pe: 34.67, 
    sector: "Technology" 
  },
  { 
    symbol: "GOOGL", 
    name: "Alphabet Inc.", 
    price: 157.73, 
    change: -1.24, 
    changePercent: -0.78, 
    volume: 28941200, 
    marketCap: 1980000000000, 
    pe: 28.92, 
    sector: "Technology" 
  },
  { 
    symbol: "AMZN", 
    name: "Amazon.com Inc.", 
    price: 178.92, 
    change: 1.56, 
    changePercent: 0.88, 
    volume: 31245900, 
    marketCap: 1850000000000, 
    pe: 61.45, 
    sector: "Consumer Cyclical" 
  },
  { 
    symbol: "META", 
    name: "Meta Platforms Inc.", 
    price: 474.05, 
    change: -3.78, 
    changePercent: -0.79, 
    volume: 18257300, 
    marketCap: 1210000000000, 
    pe: 32.12, 
    sector: "Technology" 
  },
  { 
    symbol: "TSLA", 
    name: "Tesla Inc.", 
    price: 175.34, 
    change: -6.21, 
    changePercent: -3.42, 
    volume: 125673400, 
    marketCap: 557000000000, 
    pe: 50.18, 
    sector: "Consumer Cyclical" 
  },
  { 
    symbol: "NVDA", 
    name: "NVIDIA Corporation", 
    price: 875.28, 
    change: 15.86, 
    changePercent: 1.85, 
    volume: 41582600, 
    marketCap: 2160000000000, 
    pe: 72.46, 
    sector: "Technology" 
  },
  { 
    symbol: "JPM", 
    name: "JPMorgan Chase & Co.", 
    price: 198.47, 
    change: 0.87, 
    changePercent: 0.44, 
    volume: 8245700, 
    marketCap: 570000000000, 
    pe: 12.01, 
    sector: "Financial Services" 
  },
  { 
    symbol: "V", 
    name: "Visa Inc.", 
    price: 275.64, 
    change: 1.34, 
    changePercent: 0.49, 
    volume: 5126400, 
    marketCap: 532000000000, 
    pe: 30.55, 
    sector: "Financial Services" 
  },
  { 
    symbol: "WMT", 
    name: "Walmart Inc.", 
    price: 60.12, 
    change: -0.23, 
    changePercent: -0.38, 
    volume: 15782300, 
    marketCap: 485000000000, 
    pe: 28.51, 
    sector: "Consumer Defensive" 
  }
];

// Mock market indices data
const mockIndices: MarketIndex[] = [
  { symbol: "SPY", name: "S&P 500", price: 5075.12, change: 15.63, changePercent: 0.31 },
  { symbol: "QQQ", name: "NASDAQ", price: 17228.45, change: 78.92, changePercent: 0.46 },
  { symbol: "DIA", name: "Dow Jones", price: 38675.78, change: -45.21, changePercent: -0.12 }
];

// Generate random historical data for a given stock
const generateHistoricalData = (symbol: string, days: number = 90): StockHistoricalData[] => {
  const data: StockHistoricalData[] = [];
  const basePrice = mockStocks.find(stock => stock.symbol === symbol)?.price || 100;
  let currentPrice = basePrice * 0.85; // Start 15% lower than current price
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Generate random price movements
    const change = (Math.random() - 0.48) * (basePrice * 0.03); // More likely to go up slightly
    currentPrice = Math.max(currentPrice + change, currentPrice * 0.95);
    
    const open = currentPrice;
    const close = currentPrice + (Math.random() - 0.5) * (basePrice * 0.01);
    const high = Math.max(open, close) + (Math.random() * basePrice * 0.005);
    const low = Math.min(open, close) - (Math.random() * basePrice * 0.005);
    const volume = Math.floor(Math.random() * 10000000) + 5000000;
    
    data.push({
      date: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume
    });
  }
  
  return data;
};

// Search stocks by symbol or name
export const searchStocks = (query: string): Stock[] => {
  if (!query) return mockStocks;
  
  const lowerQuery = query.toLowerCase();
  return mockStocks.filter(
    stock => 
      stock.symbol.toLowerCase().includes(lowerQuery) || 
      stock.name.toLowerCase().includes(lowerQuery)
  );
};

// Get a stock by its symbol
export const getStockBySymbol = (symbol: string): Stock | undefined => {
  return mockStocks.find(stock => stock.symbol === symbol);
};

// Get historical data for a stock
export const getStockHistoricalData = (
  symbol: string, 
  timeframe: '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL' = '3M'
): StockHistoricalData[] => {
  const days = 
    timeframe === '1D' ? 1 : 
    timeframe === '1W' ? 7 : 
    timeframe === '1M' ? 30 : 
    timeframe === '3M' ? 90 : 
    timeframe === '1Y' ? 365 : 
    730; // ALL
  
  return generateHistoricalData(symbol, days);
};

// Get market indices
export const getMarketIndices = (): MarketIndex[] => {
  return mockIndices;
};

// Get trending stocks (top gainers and losers)
export const getTrendingStocks = (): { gainers: Stock[], losers: Stock[] } => {
  const sorted = [...mockStocks].sort((a, b) => b.changePercent - a.changePercent);
  return {
    gainers: sorted.slice(0, 5),
    losers: sorted.slice(-5).reverse()
  };
};

// Simulate buying a stock
export const buyStock = (symbol: string, quantity: number): boolean => {
  // Simulate a successful purchase
  toast({
    title: "Order Placed",
    description: `Successfully purchased ${quantity} shares of ${symbol}`,
  });
  return true;
};

// Simulate selling a stock
export const sellStock = (symbol: string, quantity: number): boolean => {
  // Simulate a successful sale
  toast({
    title: "Order Placed",
    description: `Successfully sold ${quantity} shares of ${symbol}`,
  });
  return true;
};

// Get sector distribution for portfolio visualization
export const getSectorDistribution = (): { name: string, value: number }[] => {
  const sectors: Record<string, number> = {};
  
  mockStocks.forEach(stock => {
    if (sectors[stock.sector]) {
      sectors[stock.sector]++;
    } else {
      sectors[stock.sector] = 1;
    }
  });
  
  return Object.entries(sectors).map(([name, value]) => ({ name, value }));
};
