
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/main-layout";
import { StockChart } from "@/components/stock-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink, Plus } from "lucide-react";
import { cryptoCompanies } from "@/lib/crypto-companies";
import { StockPriceChange } from "@/components/stock-price-change";
import { useToast } from "@/hooks/use-toast";

const CryptoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const crypto = cryptoCompanies.find(crypto => crypto.id === id);
  
  if (!crypto) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold mb-2">Cryptocurrency not found</h2>
          <p className="text-muted-foreground">The cryptocurrency you're looking for doesn't exist or has been removed.</p>
        </div>
      </MainLayout>
    );
  }
  
  const handleAddToWatchlist = () => {
    toast({
      title: "Added to watchlist",
      description: `${crypto.name} (${crypto.symbol}) has been added to your watchlist.`,
    });
  };
  
  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000000) {
      return `$${(marketCap / 1000000000000).toFixed(2)} trillion`;
    } else if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(2)} billion`;
    } else {
      return `$${(marketCap / 1000000).toFixed(2)} million`;
    }
  };
  
  const formatVolume = (volume: number) => {
    if (volume >= 1000000000) {
      return `$${(volume / 1000000000).toFixed(2)} billion`;
    } else {
      return `$${(volume / 1000000).toFixed(2)} million`;
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <img 
                src={crypto.logoUrl} 
                alt={`${crypto.name} logo`}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{crypto.name} <span className="text-muted-foreground">({crypto.symbol})</span></h1>
            </div>
          </div>
          <Button onClick={handleAddToWatchlist}>
            <Plus className="mr-1" /> Add to Watchlist
          </Button>
        </div>
        
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-3xl font-bold">${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <StockPriceChange change={crypto.change24h} showPercent size="lg" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StockChart 
            symbol={crypto.symbol} 
            name={crypto.name} 
            price={crypto.price} 
            change={crypto.price * (crypto.change24h / 100)} 
            changePercent={crypto.change24h} 
          />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>About {crypto.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{crypto.description}</p>
              
              {crypto.websiteUrl && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => window.open(crypto.websiteUrl, '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Website
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span>{formatMarketCap(crypto.marketCap)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h Volume</span>
                  <span>{formatVolume(crypto.volume24h)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h Change</span>
                  <StockPriceChange change={crypto.change24h} showPercent />
                </div>
                {crypto.change7d && (
                  <>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">7d Change</span>
                      <StockPriceChange change={crypto.change7d} showPercent />
                    </div>
                  </>
                )}
                {crypto.founded && (
                  <>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Founded</span>
                      <span>{crypto.founded}</span>
                    </div>
                  </>
                )}
                {crypto.headquarters && (
                  <>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Headquarters</span>
                      <span>{crypto.headquarters}</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CryptoDetail;
