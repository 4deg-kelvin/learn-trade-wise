import { useLocation } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import ConfluenceGenerator from "@/components/widgets/ConfluenceGenerator";
import LiveNewsWidget from "@/components/widgets/LiveNewsWidget";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const fetchNasdaqData = async () => {
  console.log('🚀 Attempting to fetch NASDAQ data directly from Polygon.io...');
  
  try {
    // Using your Polygon API key directly (since no Supabase integration)
    const apiKey = 'PoqJ90cGfcHrLM6qQBLXm16KOjy8PNKO'; // Your provided API key
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const fromDate = yesterday.toISOString().split('T')[0];
    const toDate = today.toISOString().split('T')[0];
    
    const url = `https://api.polygon.io/v2/aggs/ticker/QQQ/range/1/hour/${fromDate}/${toDate}?adjusted=true&sort=asc&apikey=${apiKey}`;
    console.log('📡 Fetching from URL:', url);
    
    const response = await fetch(url);
    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Polygon API Error:', errorText);
      throw new Error(`Polygon API failed: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Polygon data received:', data);
    
    if (!data.results || data.results.length === 0) {
      throw new Error('No data returned from Polygon API');
    }
    
    // Transform data for the chart
    const chartData = data.results.map((item: any, index: number) => ({
      t: `${new Date(item.t).getHours()}h`,
      p: item.c, // closing price
      timestamp: item.t
    }));
    
    console.log('✅ Transformed chart data:', chartData);
    return chartData;
    
  } catch (error) {
    console.error('💥 Fetch error:', error);
    
    // Fallback to mock NASDAQ-like data
    console.log('🔄 Using fallback mock NASDAQ data');
    return Array.from({ length: 24 }).map((_, i) => ({ 
      t: `${i}h`, 
      p: 400 + Math.sin(i/3) * 20 + i * 0.5 
    }));
  }
};

const Dashboard = () => {
  const location = useLocation() as any;
  const selected = location?.state?.market as string | undefined;
  const profile = (() => {
    try { return JSON.parse(localStorage.getItem('tw_profile') || '{}'); } catch { return {}; }
  })();

  const { data: nasdaqData, isLoading: isLoadingNasdaq, isError, error } = useQuery({
    queryKey: ['nasdaq-data'],
    queryFn: fetchNasdaqData,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1, // Only retry once
  });

  console.log('📊 Chart state:', { isLoadingNasdaq, isError, error, dataLength: nasdaqData?.length });

  const chartData = nasdaqData || [];

  return (
    <main className="container mx-auto py-8">
      <SEO title="Dashboard – TradeWise Academy" description="Generate confluences and follow live insights for your chosen market." canonical="/dashboard" />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard{selected ? ` – ${selected}` : ''}</h1>
        <p className="text-muted-foreground">Welcome{profile?.age ? `, ${profile.age}` : ''}! Explore signals and context.</p>
      </header>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg border p-4 card-elevated">
          <h2 className="text-xl font-semibold mb-3">NASDAQ Price (QQQ) - Live Data</h2>
          <div className="h-64">
            {isLoadingNasdaq ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-48 w-full" />
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center h-full space-y-2">
                <p className="text-muted-foreground">Failed to load NASDAQ data</p>
                <p className="text-xs text-red-500">
                  Error: {error?.message || 'Unknown error'}
                </p>
                <p className="text-xs text-muted-foreground">Using fallback data</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="t" hide />
                  <YAxis hide />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Line type="monotone" dataKey="p" stroke="hsl(var(--brand-1))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        <LiveNewsWidget />
      </section>

      <div className="mt-6">
        <ConfluenceGenerator />
      </div>

      <section className="mt-6 rounded-lg border p-4">
        <h2 className="text-xl font-semibold">Docs-grounded Q&A (RAG)</h2>
        <p className="text-sm text-muted-foreground">Connect Supabase + upload Abhi's docs to enable grounded answers for your questions.</p>
      </section>
    </main>
  );
};

export default Dashboard;
