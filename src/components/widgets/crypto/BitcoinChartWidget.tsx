import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useCryptoOHLC, TimeFrame } from "@/hooks/useCryptoOHLC";
import CandlestickChart from "./CandlestickChart";

const TIMEFRAMES: { value: TimeFrame; label: string }[] = [
  { value: '15m', label: '15m' },
  { value: '30m', label: '30m' },
  { value: '1h', label: '1h' },
  { value: '4h', label: '4h' },
  { value: '1d', label: '1d' },
  { value: '1w', label: '1w' },
  { value: '1M', label: '1M' },
  { value: '1y', label: '1y' },
];

const BitcoinChartWidget = () => {
  const [timeframe, setTimeframe] = useState<TimeFrame>('1d');
  const { data: chartData, isLoading, isError, error, refetch } = useCryptoOHLC('bitcoin', timeframe);

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">Bitcoin (BTC) - Candlestick Chart</CardTitle>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={(value: TimeFrame) => setTimeframe(value)}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIMEFRAMES.map((tf) => (
                <SelectItem key={tf.value} value={tf.value}>
                  {tf.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-96 w-full" />
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Failed to load Bitcoin chart</p>
            {error && (
              <p className="text-xs text-muted-foreground mt-2 font-mono">
                Error: {error.message}
              </p>
            )}
            <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
              Try Again
            </Button>
          </div>
        ) : chartData && chartData.length > 0 ? (
          <CandlestickChart data={chartData} height={400} />
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No chart data available</p>
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

export default BitcoinChartWidget;