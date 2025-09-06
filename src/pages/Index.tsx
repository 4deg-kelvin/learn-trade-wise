import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import hero from "@/assets/hero-trading.jpg";
import { Button } from "@/components/ui/button";
import LiveNewsWidget from "@/components/widgets/LiveNewsWidget";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.remove('dark');
  }, []);

  return (
    <main>
      <SEO
        title="TradeWise Academy – Learn Trading the Smart Way"
        description="Choose markets, learn fundamentals, follow live insights, and practice with interactive tutorials."
        canonical="/"
      />
      <section className="relative overflow-hidden">
        <div className="hero-gradient">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 min-h-[60vh] items-center py-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Learn trading with interactive lessons and real-world context
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Pick your market (crypto, stocks, forex), grasp fundamentals, and
                build confidence with hands-on widgets.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => navigate('/login')}>Get started</Button>
                <Button variant="secondary" onClick={() => navigate('/tutorials')}>Explore tutorials</Button>
              </div>
            </div>
            <div className="relative">
              <img src={hero} alt="Educational trading dashboard illustration" className="rounded-xl border shadow-xl" loading="eager" />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full glow animate-[float_6s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-12" aria-labelledby="markets">
        <h2 id="markets" className="text-2xl font-semibold mb-4">Select your market</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Bitcoin", "Ethereum", "Stocks", "Forex", "NASDAQ 100", "S&P 500", "Dow Jones", "Russell 2000"].map((m) => (
            <button
              key={m}
              onClick={() => navigate('/dashboard', { state: { market: m } })}
              className="rounded-lg border p-4 text-left hover:translate-y-[-2px] transition-transform card-elevated"
            >
              <p className="font-medium">{m}</p>
              <p className="text-sm text-muted-foreground">Jump into confluences and tips for {m}.</p>
            </button>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-12" aria-labelledby="indices-diff">
        <h2 id="indices-diff" className="text-2xl font-semibold mb-4">How major indices differ</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <article className="rounded-lg border p-4 card-elevated">
            <h3 className="font-medium">NASDAQ 100</h3>
            <p className="text-sm text-muted-foreground">Tech-heavy, growth-tilted, market-cap weighted; excludes most financials, often more volatile in risk-on/off moves.</p>
          </article>
          <article className="rounded-lg border p-4 card-elevated">
            <h3 className="font-medium">S&P 500</h3>
            <p className="text-sm text-muted-foreground">Broad U.S. large-cap benchmark (500 companies), market-cap weighted; commonly used as the “market” proxy.</p>
          </article>
          <article className="rounded-lg border p-4 card-elevated">
            <h3 className="font-medium">Dow Jones Industrial Average</h3>
            <p className="text-sm text-muted-foreground">30 blue-chip companies, price-weighted—higher-priced stocks have outsized impact; older, more concentrated mix.</p>
          </article>
          <article className="rounded-lg border p-4 card-elevated">
            <h3 className="font-medium">Russell 2000</h3>
            <p className="text-sm text-muted-foreground">Small-cap focus; higher volatility, useful gauge of market breadth and risk appetite beyond mega-caps.</p>
          </article>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Different weighting methods and constituents make indices behave differently across cycles.</p>
      </section>

      <section className="container mx-auto py-12" aria-labelledby="fundamentals">
        <h2 id="fundamentals" className="text-2xl font-semibold mb-4">Trading fundamentals</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Risk management", d: "Never risk more than a small % per trade and always use a stop." },
            { t: "Trend & structure", d: "Trade with the trend; identify support/resistance and market structure." },
            { t: "Plan & discipline", d: "Define entries/exits before the trade; track and review performance." },
          ].map((i) => (
            <article key={i.t} className="rounded-lg border p-4 card-elevated">
              <h3 className="font-medium">{i.t}</h3>
              <p className="text-sm text-muted-foreground">{i.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-12" aria-labelledby="candlestick-charts">
        <h2 id="candlestick-charts" className="text-2xl font-semibold mb-4">Professional Charting Tools</h2>
        <div className="rounded-lg border p-6 card-elevated text-center">
          <h3 className="text-xl font-medium mb-3">Crypto Candlestick Charts</h3>
          <p className="text-muted-foreground mb-4">
            Analyze cryptocurrency price movements with professional candlestick charts featuring multiple timeframes from 1 minute to 1 year.
          </p>
          <Button onClick={() => navigate('/candlestick-charts')} className="bg-primary text-primary-foreground hover:bg-primary/90">
            View Candlestick Charts
          </Button>
        </div>
      </section>

      <section className="container mx-auto py-12">
        <LiveNewsWidget />
      </section>

      <section className="container mx-auto py-12" aria-labelledby="community">
        <h2 id="community" className="text-2xl font-semibold mb-2">Community</h2>
        <p className="text-muted-foreground">Join our Discord for tips and announcements.</p>
        <div className="mt-3">
          <a href="#" className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border hover:bg-accent/50 transition-colors">Join Discord</a>
        </div>
      </section>
    </main>
  );
};

export default Index;
