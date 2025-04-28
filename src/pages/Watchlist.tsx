
import { MainLayout } from "@/components/main-layout";
import { StockChart } from "@/components/stock-chart";
import { Watchlist as WatchlistComponent } from "@/components/watchlist";
import { getStockBySymbol } from "@/lib/market-data";
import { getWatchlist } from "@/lib/portfolio";

const WatchlistPage = () => {
  const watchlist = getWatchlist();
  const firstStock = watchlist.length > 0 ? getStockBySymbol(watchlist[0].symbol) : undefined;
  
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Watchlist</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          {firstStock ? (
            <StockChart 
              symbol={firstStock.symbol}
              name={firstStock.name}
              price={firstStock.price}
              change={firstStock.change}
              changePercent={firstStock.changePercent}
            />
          ) : (
            <div className="flex items-center justify-center h-[400px] bg-card text-card-foreground rounded-md border">
              <div className="text-center">
                <p className="text-xl font-semibold mb-2">No stocks in watchlist</p>
                <p className="text-muted-foreground">Add stocks to your watchlist to see them here</p>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <WatchlistComponent />
        </div>
      </div>
    </MainLayout>
  );
};

export default WatchlistPage;
