import React from 'react';
import { useLocation } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import CryptoCandlestickDashboard from "@/components/widgets/CryptoCandlestickDashboard";

const CandlestickCharts = () => {
  const location = useLocation() as any;
  const profile = (() => {
    try { return JSON.parse(localStorage.getItem('tw_profile') || '{}'); } catch { return {}; }
  })();

  return (
    <main className="container mx-auto py-8">
      <SEO 
        title="Crypto Candlestick Charts – TradeWise Academy" 
        description="Real-time candlestick charts with multiple timeframes for major cryptocurrencies including Bitcoin, Ethereum, and more." 
        canonical="/candlestick-charts" 
      />
      
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Crypto Candlestick Charts</h1>
        <p className="text-muted-foreground">
          Welcome{profile?.age ? `, ${profile.age}` : ''}! Analyze cryptocurrency price movements with professional candlestick charts.
        </p>
      </header>

      <CryptoCandlestickDashboard />
    </main>
  );
};

export default CandlestickCharts;

