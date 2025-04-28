
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/main-layout";
import { searchStocks } from "@/lib/market-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StockPriceChange } from "@/components/stock-price-change";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTrendingStocks } from "@/lib/market-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addToWatchlist, isInWatchlist, removeFromWatchlist } from "@/lib/portfolio";
import { Star, StarOff } from "lucide-react";

const Explore = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(searchStocks(""));
  
  const { gainers, losers } = getTrendingStocks();
  const allStocks = [...gainers, ...losers];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setResults(searchStocks(query));
  };
  
  const handleWatchlistToggle = (symbol: string) => {
    if (isInWatchlist(symbol)) {
      removeFromWatchlist(symbol);
    } else {
      addToWatchlist(symbol);
    }
    // Force re-render
    setResults([...results]);
  };
  
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Explore Stocks</h1>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for stocks by symbol or name..."
              className="flex-1"
            />
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                    <TableHead className="text-right">Market Cap</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((stock) => (
                    <TableRow key={stock.symbol} className="cursor-pointer" onClick={() => navigate(`/stock/${stock.symbol}`)}>
                      <TableCell className="font-medium">
                        {stock.symbol}
                      </TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <StockPriceChange
                          change={stock.change}
                          changePercent={stock.changePercent}
                          showIcon={false}
                          className="justify-end"
                        />
                      </TableCell>
                      <TableCell className="text-right">${(stock.marketCap / 1000000000).toFixed(2)}B</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWatchlistToggle(stock.symbol);
                          }}
                        >
                          {isInWatchlist(stock.symbol) ? (
                            <StarOff className="h-4 w-4" />
                          ) : (
                            <Star className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Explore;
