import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

// CoinStats News API - Public, no API key required
// Using CoinStats as primary source since it doesn't require API keys

type NewsItem = {
  id: string;
  title: string;
  source: string;
  link: string;
  imgURL?: string;
  description?: string;
  publishedAt?: string; // ISO
};

const fetchCoinStatsNews = async (): Promise<NewsItem[]> => {
  const res = await fetch(
    "https://api.coinstats.app/public/v1/news?skip=0&limit=10"
  );
  if (!res.ok) throw new Error("Failed to fetch news");
  const data = await res.json();
  return (data?.news ?? []).map((item: any) => ({
    id: item.id,
    title: item.title,
    source: item.source,
    link: item.link,
    imgURL: item.imgURL,
    description: item.description,
    publishedAt: item.publishedAt || new Date(item.feedDate || item.date).toISOString(),
  })) as NewsItem[];
};

const timeFromNow = (ts?: number | string) => {
  if (!ts) return "";
  const date = typeof ts === "number" ? new Date(ts) : new Date(ts);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

const LiveNewsWidget = () => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["coinstats-news"],
    queryFn: fetchCoinStatsNews,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const items = data ?? [];

  return (
    <section aria-labelledby="live-news" className="rounded-lg border p-4 card-elevated">
      <div className="flex items-center justify-between mb-3">
        <h2 id="live-news" className="text-xl font-semibold">
          Live News
        </h2>
        <div className="flex items-center gap-2">
          <Badge>AI explanations</Badge>
          <Button size="sm" variant="outline" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <ul className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <li key={i} className="rounded-md border p-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-3/4 mt-2" />
              <Skeleton className="h-3 w-5/6 mt-2" />
            </li>
          ))}
        </ul>
      ) : isError ? (
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">Unable to load news right now.</p>
          <Button className="mt-2" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((n) => {
            const when = n.publishedAt;
            return (
              <li key={n.id} className="rounded-md border p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">{n.source}</p>
                  <span className="text-xs text-muted-foreground">{timeFromNow(when)}</span>
                </div>
                <a
                  href={n.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium mt-1 inline-block hover:underline"
                >
                  {n.title}
                </a>
                {n.description ? (
                  <p className="text-sm mt-2 line-clamp-3">{n.description}</p>
                ) : null}
                {n.imgURL ? (
                  <img
                    src={n.imgURL}
                    alt={`News image for ${n.title}`}
                    loading="lazy"
                    className="mt-3 w-full rounded-md object-cover aspect-video"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary">Connect AI feed (via Supabase)</Button>
        <Button variant="outline">Connect Discord announcements</Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Source: CoinStats public API. For premium news sources like Polygon.io, connect to Supabase for secure API key storage.
      </p>
    </section>
  );
};

export default LiveNewsWidget;
