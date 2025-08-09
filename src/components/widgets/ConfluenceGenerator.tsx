import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const markets = ["Bitcoin", "Ethereum", "Stocks", "Forex", "NASDAQ 100", "S&P 500", "Dow Jones", "Russell 2000"] as const;
const timeframes = ["1h", "4h", "1d"] as const;

type Market = typeof markets[number];
type TF = typeof timeframes[number];

function generateConfluences(market: Market, tf: TF) {
  // Simple illustrative output
  const base = [
    { title: "Trend", detail: "Price above 50EMA – bullish bias" },
    { title: "Support/Resistance", detail: "Near prior breakout level turning into support" },
    { title: "Momentum", detail: "RSI ~55 – mild bullish momentum" },
  ];
  if (market === "Bitcoin" && tf === "1d") {
    base.push({ title: "On-chain", detail: "Exchange reserves trending lower" });
  }
  return base;
}

const ConfluenceGenerator = () => {
  const [market, setMarket] = useState<Market>("Bitcoin");
  const [tf, setTf] = useState<TF>("4h");
  const [items, setItems] = useState<{title:string; detail:string;}[]>([]);

  const handleGenerate = () => {
    setItems(generateConfluences(market, tf));
  };

  const summary = useMemo(() =>
    items.length ? `${items.length} confluences detected` : "", [items]
  );

  return (
    <section aria-labelledby="confluence" className="rounded-lg border p-4 card-elevated">
      <h2 id="confluence" className="text-xl font-semibold mb-3">Confluence Generator</h2>
      <div className="flex flex-wrap gap-3 mb-3">
        <Select value={market} onValueChange={(v) => setMarket(v as Market)}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Market" /></SelectTrigger>
          <SelectContent>
            {markets.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={tf} onValueChange={(v) => setTf(v as TF)}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Timeframe" /></SelectTrigger>
          <SelectContent>
            {timeframes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button onClick={handleGenerate}>Generate</Button>
      </div>
      {summary && <p className="text-sm text-muted-foreground mb-2">{summary}</p>}
      <ul className="grid gap-3">
        {items.map((it, i) => (
          <li key={i} className="rounded-md border p-3">
            <p className="font-medium">{it.title}</p>
            <p className="text-sm text-muted-foreground">{it.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ConfluenceGenerator;
