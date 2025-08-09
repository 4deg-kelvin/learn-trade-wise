import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";

const BuyLowSellHigh = () => {
  const basePrice = 100;
  const [buy, setBuy] = useState(95);
  const [sell, setSell] = useState(110);

  const outcome = useMemo(() => {
    const diff = sell - buy;
    const pct = (diff / buy) * 100;
    return { diff, pct };
  }, [buy, sell]);

  return (
    <section aria-labelledby="blsh" className="rounded-lg border p-4 card-elevated">
      <h2 id="blsh" className="text-xl font-semibold mb-1">Buy Low, Sell High</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Adjust buy and sell levels to see profit/loss. Base reference: {basePrice}.
      </p>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium">Buy price: {buy.toFixed(2)}</p>
          <Slider value={[buy]} min={80} max={120} step={1} onValueChange={(v) => setBuy(v[0])} />
        </div>
        <div>
          <p className="text-sm font-medium">Sell price: {sell.toFixed(2)}</p>
          <Slider value={[sell]} min={80} max={120} step={1} onValueChange={(v) => setSell(v[0])} />
        </div>
        <div className="rounded-md border p-3">
          <p className="font-medium">Outcome</p>
          <p className="text-sm">P/L: {outcome.diff.toFixed(2)} ({outcome.pct.toFixed(2)}%)</p>
          <p className="text-xs text-muted-foreground mt-1">
            Hint: Buying closer to support and selling into resistance can improve odds.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BuyLowSellHigh;
