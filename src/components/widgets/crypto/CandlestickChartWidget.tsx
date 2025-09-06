import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CandlestickChartWidgetProps {
  coinId: string;
  coinName: string;
  coinSymbol: string;
}

interface OHLCData {
  [timestamp: number]: [number, number, number, number, number]; // [timestamp, open, high, low, close]
}

const timeframes = [
  { value: '1', label: '1 minute', days: 1, interval: '1m' },
  { value: '5', label: '5 minutes', days: 1, interval: '5m' },
  { value: '10', label: '10 minutes', days: 1, interval: '10m' },
  { value: '15', label: '15 minutes', days: 1, interval: '15m' },
  { value: '30', label: '30 minutes', days: 1, interval: '30m' },
  { value: '60', label: '1 hour', days: 1, interval: '1h' },
  { value: '1', label: '1 day', days: 1, interval: '1d' },
  { value: '7', label: '1 week', days: 7, interval: '1w' },
  { value: '30', label: '1 month', days: 30, interval: '1m' },
  { value: '365', label: '1 year', days: 365, interval: '1y' },
];

const fetchOHLCData = async (coinId: string, days: number) => {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`;
    
    const response = await fetch(url, {
      headers: {
        "accept": "application/json"
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the data for candlestick chart
    return data.map(([timestamp, open, high, low, close]: [number, number, number, number, number]) => ({
      time: timestamp / 1000, // Convert to seconds for lightweight-charts
      open,
      high,
      low,
      close
    }));
  } catch (error) {
    console.error('Error fetching OHLC data:', error);
    throw error;
  }
};

const CandlestickChartWidget: React.FC<CandlestickChartWidgetProps> = ({ 
  coinId, 
  coinName, 
  coinSymbol 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1');
  const [chartError, setChartError] = useState<string | null>(null);
  const [rawApiData, setRawApiData] = useState<any>(null);

  const selectedTimeframeData = timeframes.find(tf => tf.value === selectedTimeframe) || timeframes[0];

  const { data: chartData, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['candlestick-chart', coinId, selectedTimeframeData.days],
    queryFn: async () => {
      const data = await fetchOHLCData(coinId, selectedTimeframeData.days);
      setRawApiData(data); // Store raw data for debugging
      return data;
    },
    staleTime: 60_000, // 1 minute
    refetchInterval: 300_000, // Refetch every 5 minutes
    retry: 2,
  });

  // Simple canvas-based candlestick chart renderer
  const renderCandlestickChart = (canvas: HTMLCanvasElement, data: any[]) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    if (!data || data.length === 0) return;

    // Calculate price range
    const prices = data.flatMap(d => [d.open, d.high, d.low, d.close]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    // Chart dimensions
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const candleWidth = Math.max(2, chartWidth / data.length * 0.8);
    const spacing = chartWidth / data.length;
    
    // Draw grid
    ctx.strokeStyle = 'hsl(var(--border))';
    ctx.lineWidth = 0.5;
    
    // Vertical grid lines
    for (let i = 0; i <= 5; i++) {
      const x = padding + (chartWidth / 5) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Draw candlesticks
    data.forEach((candle, index) => {
      const x = padding + index * spacing + spacing / 2 - candleWidth / 2;
      const openY = padding + ((maxPrice - candle.open) / priceRange) * chartHeight;
      const closeY = padding + ((maxPrice - candle.close) / priceRange) * chartHeight;
      const highY = padding + ((maxPrice - candle.high) / priceRange) * chartHeight;
      const lowY = padding + ((maxPrice - candle.low) / priceRange) * chartHeight;
      
      const isGreen = candle.close >= candle.open;
      const color = isGreen ? 'hsl(var(--chart-1))' : 'hsl(var(--chart-2))';
      
      // Draw wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, highY);
      ctx.lineTo(x + candleWidth / 2, lowY);
      ctx.stroke();
      
      // Draw body
      ctx.fillStyle = color;
      const bodyHeight = Math.max(1, Math.abs(closeY - openY));
      const bodyY = Math.min(openY, closeY);
      ctx.fillRect(x, bodyY, candleWidth, bodyHeight);
    });
    
    // Draw price labels
    ctx.fillStyle = 'hsl(var(--foreground))';
    ctx.font = '12px system-ui';
    ctx.textAlign = 'right';
    
    for (let i = 0; i <= 5; i++) {
      const price = maxPrice - (priceRange / 5) * i;
      const y = padding + (chartHeight / 5) * i;
      ctx.fillText(`$${price.toFixed(2)}`, padding - 5, y + 4);
    }
    
    // Draw time labels
    ctx.textAlign = 'center';
    for (let i = 0; i <= 4; i++) {
      const index = Math.floor((data.length - 1) * (i / 4));
      if (data[index]) {
        const time = new Date(data[index].time * 1000);
        const timeStr = time.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        const x = padding + (chartWidth / 4) * i;
        ctx.fillText(timeStr, x, height - 10);
      }
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !chartData) return;
    
    try {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      canvas.style.width = canvas.offsetWidth + 'px';
      canvas.style.height = canvas.offsetHeight + 'px';
      
      renderCandlestickChart(canvas, chartData);
      setChartError(null);
    } catch (error) {
      console.error('Error rendering chart:', error);
      setChartError('Failed to render chart');
    }
  }, [chartData, selectedTimeframe]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && chartData) {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        canvas.style.width = canvas.offsetWidth + 'px';
        canvas.style.height = canvas.offsetHeight + 'px';
        renderCandlestickChart(canvas, chartData);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chartData]);

  const handleRefresh = () => {
    refetch();
  };

  const handleTimeframeChange = (value: string) => {
    setSelectedTimeframe(value);
  };

  if (isError) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {coinName} ({coinSymbol}) - Candlestick Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-destructive mb-2">Failed to load chart data</p>
            <p className="text-sm text-muted-foreground mb-4">
              {error instanceof Error ? error.message : 'Unknown error occurred'}
            </p>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">
          {coinName} ({coinSymbol}) - Candlestick Chart
        </CardTitle>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={handleTimeframeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map((timeframe) => (
                <SelectItem key={timeframe.value} value={timeframe.value}>
                  {timeframe.label}
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
        ) : chartError ? (
          <div className="space-y-6">
            <div className="text-center py-4">
              <p className="text-destructive mb-2">Chart Error</p>
              <p className="text-sm text-muted-foreground mb-4">{chartError}</p>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                Try Again
              </Button>
            </div>
            
            {/* Display Raw API Data */}
            <div className="border rounded-lg p-4 bg-muted/50">
              <h4 className="font-medium mb-3">Raw API Data (Debug)</h4>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Data Length:</strong> {rawApiData?.length || 'No data'}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Data Type:</strong> {Array.isArray(rawApiData) ? 'Array' : typeof rawApiData}
                </p>
                {rawApiData && Array.isArray(rawApiData) && rawApiData.length > 0 && (
                  <>
                    <p className="text-sm text-muted-foreground">
                      <strong>First Data Point:</strong>
                    </p>
                    <pre className="text-xs bg-background p-2 rounded border overflow-x-auto">
                      {JSON.stringify(rawApiData[0], null, 2)}
                    </pre>
                    <p className="text-sm text-muted-foreground">
                      <strong>Last Data Point:</strong>
                    </p>
                    <pre className="text-xs bg-background p-2 rounded border overflow-x-auto">
                      {JSON.stringify(rawApiData[rawApiData.length - 1], null, 2)}
                    </pre>
                    <p className="text-sm text-muted-foreground">
                      <strong>Sample Data (First 5 points):</strong>
                    </p>
                    <pre className="text-xs bg-background p-2 rounded border overflow-x-auto max-h-40 overflow-y-auto">
                      {JSON.stringify(rawApiData.slice(0, 5), null, 2)}
                    </pre>
                  </>
                )}
              </div>
            </div>
          </div>
                 ) : (
           <div className="h-96">
             <canvas 
               ref={canvasRef} 
               className="w-full h-full border rounded"
               style={{ backgroundColor: 'transparent' }}
             />
           </div>
         )}
        <div className="mt-4 pt-3 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Powered by CoinGecko • Updates every 5 minutes • Timeframe: {selectedTimeframeData.label}
          </p>
          
          {/* Always show raw data for debugging */}
          {rawApiData && (
            <div className="mt-4 pt-3 border-t">
              <details className="text-xs">
                <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                  🔍 Show Raw API Data (Debug)
                </summary>
                <div className="mt-2 space-y-2">
                  <p><strong>Data Length:</strong> {rawApiData.length}</p>
                  <p><strong>Data Type:</strong> {Array.isArray(rawApiData) ? 'Array' : typeof rawApiData}</p>
                  {Array.isArray(rawApiData) && rawApiData.length > 0 && (
                    <div>
                      <p><strong>First Point:</strong> {JSON.stringify(rawApiData[0])}</p>
                      <p><strong>Last Point:</strong> {JSON.stringify(rawApiData[rawApiData.length - 1])}</p>
                    </div>
                  )}
                </div>
              </details>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CandlestickChartWidget;
