import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, PenTool } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/write", label: "Write" },
    { href: "/projects", label: "Projects" },
  ];

  return (
    <header className="border-b border-border bg-background/50 backdrop-blur-2xl sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300">
            <PenTool className="w-5 h-5 text-primary-foreground" strokeWidth={3} />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:inline">
            Wordcraft
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-all duration-300 relative ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            variant="default"
            size="sm"
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 text-primary-foreground rounded-full font-semibold border-0 transition-all duration-300"
          >
            <Link to="/write">Start</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-muted/30 transition-colors rounded-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border px-4 py-4 space-y-2 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-muted text-primary"
                  : "text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="w-full mt-2 rounded-full bg-gradient-to-r from-primary to-secondary border-0">
            <Link to="/write">Start Writing</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
