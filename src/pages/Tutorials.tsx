import SEO from "@/components/seo/SEO";
import BuyLowSellHigh from "@/components/widgets/BuyLowSellHigh";

const Tutorials = () => {
  return (
    <main className="container mx-auto py-10">
      <SEO title="Tutorials – TradeWise Academy" description="Interactive widgets to learn trading concepts hands-on." canonical="/tutorials" />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Tutorials</h1>
        <p className="text-muted-foreground">Practice core ideas with interactive lessons.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-6">
        <BuyLowSellHigh />
        <section className="rounded-lg border p-4 card-elevated">
          <h2 className="text-xl font-semibold mb-1">Risk/Reward Basics</h2>
          <p className="text-sm text-muted-foreground mb-2">Aim for R≥2 where possible: risk 1 to make 2.</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Define your stop-loss first</li>
            <li>Set a take-profit that aligns with structure</li>
            <li>Avoid chasing; wait for your setup</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Tutorials;
