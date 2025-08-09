import SEO from "@/components/seo/SEO";

const Policy = () => {
  return (
    <main className="container mx-auto py-10">
      <SEO title="Crypto Policy – TradeWise Academy" description="Track policy themes and resources in crypto for civic and competition projects." canonical="/policy" />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Crypto Policy</h1>
        <p className="text-muted-foreground">A curated overview for students and educators.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <article className="rounded-lg border p-4 card-elevated">
          <h2 className="font-semibold mb-2">Key Themes</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Securities vs. commodities classification</li>
            <li>Stablecoin frameworks</li>
            <li>AML/KYC and consumer protection</li>
            <li>DeFi and self-custody considerations</li>
          </ul>
        </article>
        <article className="rounded-lg border p-4 card-elevated">
          <h2 className="font-semibold mb-2">Useful Resources</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li><a href="https://www.sec.gov" className="underline">SEC</a>, <a href="https://www.cftc.gov" className="underline">CFTC</a></li>
            <li><a href="https://www.treasury.gov" className="underline">U.S. Treasury</a>, <a href="https://www.fincen.gov" className="underline">FinCEN</a></li>
            <li>Nonpartisan think tanks and academic papers</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-2">Always verify primary sources and latest updates.</p>
        </article>
      </section>
    </main>
  );
};

export default Policy;
