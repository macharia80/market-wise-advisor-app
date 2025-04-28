
import { MainLayout } from "@/components/main-layout";
import { MarketOverview } from "@/components/market-overview";
import { PortfolioSummary } from "@/components/portfolio-summary";
import { StockChart } from "@/components/stock-chart";
import { TrendingStocks } from "@/components/trending-stocks";
import { Watchlist } from "@/components/watchlist";
import { CryptoCompaniesList } from "@/components/crypto-companies-list";

const Index = () => {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6">
            <MarketOverview />
            <StockChart 
              symbol="BTC" 
              name="Bitcoin" 
              price={62475.12} 
              change={1536.42} 
              changePercent={2.45} 
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <PortfolioSummary />
          <TrendingStocks />
        </div>
      </div>
      
      <div className="mt-6">
        <CryptoCompaniesList />
      </div>
      
      <div className="mt-6">
        <Watchlist />
      </div>
    </MainLayout>
  );
};

export default Index;
