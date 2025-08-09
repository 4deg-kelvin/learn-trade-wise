import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [risk, setRisk] = useState(3);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const profile: Record<string, any> = Object.fromEntries(form.entries());
    profile.risk = risk;
    // Persist locally for demo
    localStorage.setItem("tw_profile", JSON.stringify(profile));
    toast({ title: "Profile saved", description: "Preferences stored locally for this demo." });
    navigate("/dashboard");
  };

  return (
    <main className="container mx-auto py-10">
      <SEO title="Login – TradeWise Academy" description="Tell us about you to personalize your learning and trading practice." canonical="/login" />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="text-muted-foreground">Answer a few questions to tailor your experience.</p>
      </header>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <section className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age range</Label>
            <Select name="age" defaultValue="13-17">
              <SelectTrigger id="age"><SelectValue placeholder="Select age range" /></SelectTrigger>
              <SelectContent>
                {['<13', '13-17', '18-24', '25-34', '35+'].map(a => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Experience</Label>
            <Select name="experience" defaultValue="beginner">
              <SelectTrigger id="experience"><SelectValue placeholder="Select experience" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="strategy">Strategy</Label>
            <Select name="strategy" defaultValue="swing">
              <SelectTrigger id="strategy"><SelectValue placeholder="Select strategy" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="swing">Swing</SelectItem>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="scalp">Scalp</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="space-y-4">
          <div className="space-y-2">
            <Label>Risk tolerance (low to high)</Label>
            <Slider value={[risk]} min={1} max={5} step={1} onValueChange={(v) => setRisk(v[0])} />
            <input type="hidden" name="risk" value={risk} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input id="timezone" name="timezone" placeholder="e.g. America/New_York" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capital">Capital (optional)</Label>
            <Input id="capital" name="capital" type="number" placeholder="e.g. 500" />
            <p className="text-xs text-muted-foreground">Optional: stored locally only in this demo.</p>
          </div>
        </section>

        <div className="md:col-span-2">
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </main>
  );
};

export default Login;
