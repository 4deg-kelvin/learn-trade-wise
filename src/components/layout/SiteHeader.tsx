import { Link, NavLink } from "react-router-dom";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <nav className="container mx-auto flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring rounded-md">
          <div className="h-8 w-8 rounded-md hero-gradient" />
          <span className="font-semibold text-lg">TradeWise Academy</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({isActive}) =>
            `text-sm ${isActive ? 'text-primary' : 'text-muted-foreground'} hover:text-foreground`}>Home</NavLink>
          <NavLink to="/tutorials" className={({isActive}) =>
            `text-sm ${isActive ? 'text-primary' : 'text-muted-foreground'} hover:text-foreground`}>Tutorials</NavLink>
          <NavLink to="/indices" className={({isActive}) =>
            `text-sm ${isActive ? 'text-primary' : 'text-muted-foreground'} hover:text-foreground`}>Indices 101</NavLink>
          <NavLink to="/candlestick-charts" className={({isActive}) =>
            `text-sm ${isActive ? 'text-primary' : 'text-muted-foreground'} hover:text-foreground`}>Candlestick Charts</NavLink>
          <NavLink to="/policy" className={({isActive}) =>
            `text-sm ${isActive ? 'text-primary' : 'text-muted-foreground'} hover:text-foreground`}>Crypto Policy</NavLink>
          <NavLink to="/math" className={({isActive}) =>
            `text-sm ${isActive ? 'text-primary' : 'text-muted-foreground'} hover:text-foreground`}>Math</NavLink>
          <NavLink to="/dashboard" className={({isActive}) =>
            `text-sm ${isActive ? 'text-primary' : 'text-muted-foreground'} hover:text-foreground`}>Dashboard</NavLink>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border hover:bg-accent/50 transition-colors">
            Log in
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
