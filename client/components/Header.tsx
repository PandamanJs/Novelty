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
    <header className="glass-effect-sm fixed top-0 w-full z-50 border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2.5 rounded-lg glass-effect group-hover:glass-effect-lg transition-all duration-300">
            <PenTool className="w-5 h-5 text-primary" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-base text-foreground hidden sm:inline">
            Wordcraft
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isActive(link.href)
                  ? "text-primary glass-effect"
                  : "text-muted-foreground hover:text-foreground hover:glass-effect-sm"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="bg-primary hover:bg-blue-600 text-primary-foreground rounded-lg font-semibold border-0 transition-all duration-300 px-5"
          >
            <Link to="/write">Start</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:glass-effect rounded-lg transition-all duration-300"
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
        <div className="md:hidden glass-effect-lg border-t border-border/50 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive(link.href)
                  ? "glass-effect text-primary"
                  : "text-foreground hover:glass-effect-sm"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            className="w-full mt-2 rounded-lg bg-primary hover:bg-blue-600 text-primary-foreground border-0"
          >
            <Link to="/write">Start Writing</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
