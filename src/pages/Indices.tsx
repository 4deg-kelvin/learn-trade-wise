import SEO from "@/components/seo/SEO";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const WeightingDemo = () => {
  const [method, setMethod] = useState<"price" | "marketcap">("price");
  const [prices, setPrices] = useState<number[]>([100, 50, 25]);
  const [mcaps, setMcaps] = useState<number[]>([1000, 500, 200]); // in billions

  const totals = useMemo(() => {
    const priceSum = prices.reduce((a, b) => a + b, 0);
    const mcapSum = mcaps.reduce((a, b) => a + b, 0);

    let indexValue = 0;
    let weights: number[] = [];

    if (method === "price") {
      indexValue = priceSum / prices.length;
      weights = prices.map((p) => p / priceSum);
    } else {
      const w = mcaps.map((m) => m / mcapSum);
      indexValue = prices.reduce((acc, p, i) => acc + p * w[i], 0);
      weights = w;
    }

    return { indexValue, weights };
  }, [method, prices, mcaps]);

  const handlePriceChange = (i: number, v: number) => {
    setPrices((arr) => arr.map((x, idx) => (idx === i ? v : x)));
  };
  const handleMcapChange = (i: number, v: number) => {
    setMcaps((arr) => arr.map((x, idx) => (idx === i ? v : x)));
  };

  const reset = () => {
    setPrices([100, 50, 25]);
    setMcaps([1000, 500, 200]);
    setMethod("price");
  };

  return (
    <section className="rounded-lg border p-4 card-elevated" aria-labelledby="weighting">
      <h2 id="weighting" className="text-xl font-semibold">Weighting methods (demo)</h2>
      <p className="text-sm text-muted-foreground mb-3">
        Compare price-weighted (like Dow) vs market-cap weighted (like S&P 500, NASDAQ 100).
      </p>

      <RadioGroup
        value={method}
        onValueChange={(v) => setMethod(v as any)}
        className="flex gap-6 mb-3"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="price" id="price" />
          <Label htmlFor="price">Price-weighted</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="marketcap" id="mcap" />
          <Label htmlFor="mcap">Market-cap weighted</Label>
        </div>
      </RadioGroup>

      <div className="grid md:grid-cols-3 gap-4">
        {[0,1,2].map((i) => (
          <div key={i} className="rounded-md border p-3">
            <p className="font-medium">Stock {String.fromCharCode(65+i)}</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <label>
                <span className="text-muted-foreground">Price</span>
                <Input type="number" value={prices[i]} onChange={(e) => handlePriceChange(i, Number(e.target.value))} />
              </label>
              <label>
                <span className="text-muted-foreground">Mkt cap (B$)</span>
                <Input type="number" value={mcaps[i]} onChange={(e) => handleMcapChange(i, Number(e.target.value))} />
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Weight: {(totals.weights[i] * 100).toFixed(1)}%</p>
          </div>
        ))}
      </div>

      <Separator className="my-4" />
      <div className="flex items-center justify-between">
        <p className="font-medium">Index value (demo): {totals.indexValue.toFixed(2)}</p>
        <Button variant="outline" onClick={reset}>Reset</Button>
      </div>
    </section>
  );
};

const Indices = () => {
  return (
    <main className="container mx-auto py-10">
      <SEO title="Indices 101 – TradeWise Academy" description="Understand major indices, how they’re built, and why they behave differently." canonical="/indices" />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Indices 101</h1>
        <p className="text-muted-foreground">What they track, how they’re weighted, and how to use them.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6 mb-8">
        <article className="rounded-lg border p-4 card-elevated">
          <h2 className="font-semibold mb-2">Major U.S. indices</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li><span className="font-medium">NASDAQ 100:</span> Tech/growth-heavy large caps; market-cap weighted.</li>
            <li><span className="font-medium">S&P 500:</span> Broad U.S. large-cap benchmark; market-cap weighted.</li>
            <li><span className="font-medium">Dow Jones:</span> 30 blue chips; price-weighted (higher-priced stocks move it more).</li>
            <li><span className="font-medium">Russell 2000:</span> Small-cap focus; captures breadth and higher volatility.</li>
          </ul>
        </article>
        <article className="rounded-lg border p-4 card-elevated">
          <h2 className="font-semibold mb-2">Why they move differently</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Different <span className="font-medium">sector mixes</span> (tech vs industrials, etc.).</li>
            <li>Different <span className="font-medium">weighting schemes</span> (price vs market cap).</li>
            <li>Different <span className="font-medium">constituent sizes</span> (mega-cap vs small-cap).</li>
          </ul>
        </article>
      </section>

      <WeightingDemo />

      <section className="grid md:grid-cols-2 gap-6 mt-8">
        <article className="rounded-lg border p-4 card-elevated">
          <h2 className="font-semibold mb-2">Accessing indices</h2>
          <p className="text-sm">Common ETFs: <span className="font-medium">QQQ</span> (NASDAQ 100), <span className="font-medium">SPY</span> (S&P 500), <span className="font-medium">DIA</span> (Dow), <span className="font-medium">IWM</span> (Russell 2000). Futures: NQ, ES, YM, RTY (advanced).</p>
        </article>
        <article className="rounded-lg border p-4 card-elevated">
          <h2 className="font-semibold mb-2">Notes & risks</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>ETFs have fees and potential tracking error.</li>
            <li>Concentration in mega-caps can skew performance.</li>
            <li>Small-caps often move more in both directions.</li>
          </ul>
        </article>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="/tutorials" className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border hover:bg-accent/50 transition-colors">Practice with tutorials</a>
        <a href="/dashboard" className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border hover:bg-accent/50 transition-colors">Open dashboard</a>
      </div>
    </main>
  );
};

export default Indices;
