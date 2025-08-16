import { useLocation } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import ConfluenceGenerator from "@/components/widgets/ConfluenceGenerator";
import LiveNewsWidget from "@/components/widgets/LiveNewsWidget";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const fetchNasdaqData = async () => {
  const response = await fetch('/api/nasdaq-data');
  if (!response.ok) {
    throw new Error('Failed to fetch NASDAQ data');
  }
  const result = await response.json();
  return result.data || [];
};

const Dashboard = () => {
  const location = useLocation() as any;
  const selected = location?.state?.market as string | undefined;
  const profile = (() => {
    try { return JSON.parse(localStorage.getItem('tw_profile') || '{}'); } catch { return {}; }
  })();

  const { data: nasdaqData, isLoading: isLoadingNasdaq, isError } = useQuery({
    queryKey: ['nasdaq-data'],
    queryFn: fetchNasdaqData,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

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
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Failed to load NASDAQ data</p>
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
