import { useMemo, useState } from "react";
import SEO from "@/components/seo/SEO";
import { Input } from "@/components/ui/input";

const MathPage = () => {
  const [equity, setEquity] = useState(1000);
  const [riskPct, setRiskPct] = useState(1);
  const [stop, setStop] = useState(2);

  const pos = useMemo(() => {
    const risk = (riskPct / 100) * equity;
    if (stop <= 0) return 0;
    return risk / stop;
  }, [equity, riskPct, stop]);

  return (
    <main className="container mx-auto py-10">
      <SEO title="Math – TradeWise Academy" description="Learn the math behind risk, position sizing, and allocation." canonical="/math" />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Trading Math</h1>
        <p className="text-muted-foreground">Position sizing and portfolio allocation basics.</p>
      </header>

      <section className="rounded-lg border p-4 card-elevated max-w-xl">
        <h2 className="text-xl font-semibold mb-2">Position Size Calculator</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="text-sm">
            Account ($)
            <Input type="number" value={equity} onChange={(e) => setEquity(Number(e.target.value))} />
          </label>
          <label className="text-sm">
            Risk (%)
            <Input type="number" value={riskPct} onChange={(e) => setRiskPct(Number(e.target.value))} />
          </label>
          <label className="text-sm">
            Stop distance ($)
            <Input type="number" value={stop} onChange={(e) => setStop(Number(e.target.value))} />
          </label>
        </div>
        <div className="mt-3 rounded-md border p-3">
          <p className="font-medium">Position size: {Number.isFinite(pos) ? pos.toFixed(2) : '—'} units</p>
          <p className="text-xs text-muted-foreground">Formula: (equity * risk%) / stop distance</p>
        </div>
      </section>
    </main>
  );
};

export default MathPage;
