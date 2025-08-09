import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const demoNews = [
  {
    id: 1,
    source: "CoinDesk",
    headline: "Bitcoin consolidates as traders await CPI report",
    aiNote:
      "Consolidation near a prior resistance can be constructive. If CPI surprises lower, risk assets often bid.",
  },
  {
    id: 2,
    source: "The Block",
    headline: "ETH staking participation hits new high",
    aiNote:
      "Rising staking can reduce circulating supply, potentially supportive for price during risk-on conditions.",
  },
];

const LiveNewsWidget = () => {
  const items = useMemo(() => demoNews, []);

  return (
    <section aria-labelledby="live-news" className="rounded-lg border p-4 card-elevated">
      <div className="flex items-center justify-between mb-3">
        <h2 id="live-news" className="text-xl font-semibold">Live Feed</h2>
        <Badge>AI explanations</Badge>
      </div>
      <ul className="space-y-3">
        {items.map((n) => (
          <li key={n.id} className="rounded-md border p-3">
            <p className="text-sm text-muted-foreground">{n.source}</p>
            <p className="font-medium mt-1">{n.headline}</p>
            <p className="text-sm mt-2">💡 {n.aiNote}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary">Connect AI feed (via Supabase)</Button>
        <Button variant="outline">Connect Discord announcements</Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Note: Real-time AI/news requires connecting Supabase + provider keys.
      </p>
    </section>
  );
};

export default LiveNewsWidget;
