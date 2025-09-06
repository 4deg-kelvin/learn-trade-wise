import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BitcoinCandlestickWidget from './crypto/BitcoinCandlestickWidget';
import EthereumCandlestickWidget from './crypto/EthereumCandlestickWidget';
import BNBCandlestickWidget from './crypto/BNBCandlestickWidget';
import SolanaCandlestickWidget from './crypto/SolanaCandlestickWidget';
import CardanoCandlestickWidget from './crypto/CardanoCandlestickWidget';
import PolkadotCandlestickWidget from './crypto/PolkadotCandlestickWidget';
import ChainlinkCandlestickWidget from './crypto/ChainlinkCandlestickWidget';
import AvalancheCandlestickWidget from './crypto/AvalancheCandlestickWidget';

const CryptoCandlestickDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Crypto Candlestick Charts</h1>
        <p className="text-muted-foreground mt-2">
          Real-time candlestick charts with multiple timeframes for major cryptocurrencies
        </p>
      </div>

      <Tabs defaultValue="major" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="major">Major Coins</TabsTrigger>
          <TabsTrigger value="altcoins">Altcoins</TabsTrigger>
        </TabsList>

        <TabsContent value="major" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BitcoinCandlestickWidget />
            <EthereumCandlestickWidget />
            <BNBCandlestickWidget />
            <SolanaCandlestickWidget />
          </div>
        </TabsContent>

        <TabsContent value="altcoins" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CardanoCandlestickWidget />
            <PolkadotCandlestickWidget />
            <ChainlinkCandlestickWidget />
            <AvalancheCandlestickWidget />
          </div>
        </TabsContent>
      </Tabs>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Chart Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Timeframes Available:</h4>
              <ul className="space-y-1">
                <li>• 1 minute, 5 minutes, 10 minutes</li>
                <li>• 15 minutes, 30 minutes, 1 hour</li>
                <li>• 1 day, 1 week, 1 month, 1 year</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Features:</h4>
              <ul className="space-y-1">
                <li>• Real-time OHLC data from CoinGecko</li>
                <li>• Interactive candlestick charts</li>
                <li>• Auto-refresh every 5 minutes</li>
                <li>• Responsive design</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoCandlestickDashboard;

