import { useLocation } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import ConfluenceGenerator from "@/components/widgets/ConfluenceGenerator";
import LiveNewsWidget from "@/components/widgets/LiveNewsWidget";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = Array.from({ length: 24 }).map((_, i) => ({ t: `${i}h`, p: 100 + Math.sin(i/3) * 8 + i * 0.2 }));

const Dashboard = () => {
  const location = useLocation() as any;
  const selected = location?.state?.market as string | undefined;
  const profile = (() => {
    try { return JSON.parse(localStorage.getItem('tw_profile') || '{}'); } catch { return {}; }
  })();

  return (
    <main className="container mx-auto py-8">
      <SEO title="Dashboard – TradeWise Academy" description="Generate confluences and follow live insights for your chosen market." canonical="/dashboard" />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard{selected ? ` – ${selected}` : ''}</h1>
        <p className="text-muted-foreground">Welcome{profile?.age ? `, ${profile.age}` : ''}! Explore signals and context.</p>
      </header>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg border p-4 card-elevated">
          <h2 className="text-xl font-semibold mb-3">Price snapshot</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="t" hide />
                <YAxis hide domain={[80, 140]} />
                <Tooltip formatter={(v: number) => v.toFixed(2)} />
                <Line type="monotone" dataKey="p" stroke="hsl(var(--brand-1))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
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
