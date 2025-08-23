import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const CRYPTO_IDS = [
  'bitcoin',
  'ethereum', 
  'binancecoin',
  'cardano',
  'solana',
  'polkadot',
  'avalanche-2',
  'chainlink'
];

const CRYPTO_NAMES: Record<string, string> = {
  'bitcoin': 'Bitcoin',
  'ethereum': 'Ethereum',
  'binancecoin': 'BNB',
  'cardano': 'Cardano', 
  'solana': 'Solana',
  'polkadot': 'Polkadot',
  'avalanche-2': 'Avalanche',
  'chainlink': 'Chainlink'
};

const CRYPTO_SYMBOLS: Record<string, string> = {
  'bitcoin': 'BTC',
  'ethereum': 'ETH',
  'binancecoin': 'BNB',
  'cardano': 'ADA',
  'solana': 'SOL',
  'polkadot': 'DOT',
  'avalanche-2': 'AVAX',
  'chainlink': 'LINK'
};

interface CryptoPriceData {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

const fetchCryptoPrices = async (): Promise<CryptoPriceData> => {
  const url = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${CRYPTO_IDS.join(',')}&include_24hr_change=true`;
  
  const response = await fetch(url, {
    headers: {
      "accept": "application/json"
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch crypto prices');
  }
  
  return response.json();
};

const CryptoPricesWidget = () => {
  const { data: cryptoData, isLoading, isError, refetch } = useQuery({
    queryKey: ['crypto-prices'],
    queryFn: fetchCryptoPrices,
    staleTime: 30_000, // 30 seconds
    refetchInterval: 60_000, // Refetch every minute
  });

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">Crypto Prices</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Failed to load crypto prices</p>
            <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
              Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {CRYPTO_IDS.map((cryptoId) => {
              const data = cryptoData?.[cryptoId];
              if (!data) return null;
              
              const price = data.usd;
              const change24h = data.usd_24h_change || 0;
              const isPositive = change24h >= 0;
              
              return (
                <div key={cryptoId} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">
                        {CRYPTO_SYMBOLS[cryptoId]?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{CRYPTO_NAMES[cryptoId]}</p>
                      <p className="text-xs text-muted-foreground">{CRYPTO_SYMBOLS[cryptoId]}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${price.toLocaleString('en-US', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: price < 1 ? 6 : 2 
                      })}
                    </p>
                    <div className={`flex items-center text-xs ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(change24h).toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-4 pt-3 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Powered by CoinGecko • Updates every minute
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoPricesWidget;