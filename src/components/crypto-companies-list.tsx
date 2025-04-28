
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { StockPriceChange } from "@/components/stock-price-change";
import { cryptoCompanies, CryptoCompany } from "@/lib/crypto-companies";
import { Search } from "lucide-react";

export const CryptoCompaniesList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("marketCap");
  
  const filteredCompanies = cryptoCompanies
    .filter(company => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        return b.price - a.price;
      } else if (sortBy === "change24h") {
        return b.change24h - a.change24h;
      } else {
        // Default: sort by market cap
        return b.marketCap - a.marketCap;
      }
    });
    
  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000000) {
      return `$${(marketCap / 1000000000000).toFixed(2)}T`;
    } else if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(2)}B`;
    } else if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(2)}M`;
    } else {
      return `$${(marketCap / 1000).toFixed(2)}K`;
    }
  };
  
  const handleCryptoClick = (id: string) => {
    navigate(`/crypto/${id}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cryptocurrency Companies</CardTitle>
        <div className="flex flex-col gap-2 mt-2 sm:flex-row">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="marketCap">Market Cap</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="change24h">24h Change</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
            <span className="col-span-6">Cryptocurrency</span>
            <span className="col-span-2 text-right">Price</span>
            <span className="col-span-2 text-right">24h Change</span>
            <span className="col-span-2 text-right">Market Cap</span>
          </div>
          
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <div 
                key={company.id}
                className="grid grid-cols-12 items-center py-3 border-b border-border hover:bg-muted/30 rounded-md px-1 cursor-pointer"
                onClick={() => handleCryptoClick(company.id)}
              >
                <div className="col-span-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    <img 
                      src={company.logoUrl} 
                      alt={`${company.name} logo`}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-medium">{company.name}</div>
                    <div className="text-xs text-muted-foreground">{company.symbol}</div>
                  </div>
                </div>
                <div className="col-span-2 text-right font-medium">
                  ${company.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="col-span-2 text-right">
                  <StockPriceChange change={company.change24h} />
                </div>
                <div className="col-span-2 text-right text-muted-foreground">
                  {formatMarketCap(company.marketCap)}
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-muted-foreground">
              No cryptocurrencies found matching your search.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
