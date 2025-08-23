import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const fetchEthereumChart = async () => {
  const url = "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1";
  
  const response = await fetch(url, {
    headers: {
      "accept": "application/json"
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch Ethereum chart data');
  }
  
  const data = await response.json();
  
  // Transform the data for the chart
  return data.prices.map(([timestamp, price]: [number, number]) => ({
    time: new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    price: price,
    timestamp: timestamp
  }));
};

const EthereumChartWidget = () => {
  const { data: chartData, isLoading, isError, refetch } = useQuery({
    queryKey: ['ethereum-chart'],
    queryFn: fetchEthereumChart,
    staleTime: 60_000, // 1 minute
    refetchInterval: 300_000, // Refetch every 5 minutes
  });

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">Ethereum (ETH) - 24H Chart</CardTitle>
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
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Failed to load Ethereum chart</p>
            <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
              Try Again
            </Button>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="mt-4 pt-3 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Powered by CoinGecko • Updates every 5 minutes
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EthereumChartWidget;