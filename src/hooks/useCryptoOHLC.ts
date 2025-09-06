import { useQuery } from "@tanstack/react-query";
import { Time } from "lightweight-charts";

export type TimeFrame = '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w' | '1M' | '1y';

const TIMEFRAME_TO_DAYS: Record<TimeFrame, number> = {
  '1m': 0.0007, // ~1 minute (but API minimum is 1 day)
  '5m': 0.003, // ~5 minutes
  '15m': 0.01, // ~15 minutes  
  '30m': 0.02, // ~30 minutes
  '1h': 0.04, // ~1 hour
  '4h': 0.17, // ~4 hours
  '1d': 1, // 1 day
  '1w': 7, // 1 week
  '1M': 30, // 1 month
  '1y': 365, // 1 year
};

const fetchCryptoOHLC = async (coinId: string, timeframe: TimeFrame) => {
  const days = TIMEFRAME_TO_DAYS[timeframe];
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`;
  
  const response = await fetch(url, {
    headers: {
      "accept": "application/json"
    }
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch ${coinId} OHLC data: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  const data = await response.json();
  
  if (!Array.isArray(data)) {
    throw new Error(`Invalid data format received for ${coinId}: expected array but got ${typeof data}`);
  }
  
  // Transform OHLC data for lightweight-charts
  return data.map(([timestamp, open, high, low, close]: [number, number, number, number, number]) => ({
    time: Math.floor(timestamp / 1000) as Time, // Convert to seconds and cast as Time
    open,
    high,
    low,
    close,
  }));
};

export const useCryptoOHLC = (coinId: string, timeframe: TimeFrame) => {
  return useQuery({
    queryKey: ['crypto-ohlc', coinId, timeframe],
    queryFn: () => fetchCryptoOHLC(coinId, timeframe),
    staleTime: 60_000, // 1 minute
    refetchInterval: 300_000, // Refetch every 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};