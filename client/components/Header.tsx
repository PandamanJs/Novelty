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
    <header className="fixed top-0 w-full z-50 border-b border-gray-200 bg-white/95 backdrop-blur-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo - Apple minimal */}
        <Link to="/" className="flex items-center gap-2 group hover:opacity-70 transition-opacity">
          <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
            <PenTool className="w-5 h-5 text-blue-600" strokeWidth={2} />
          </div>
          <span className="font-semibold text-base text-black hidden sm:inline">
            Novelty
          </span>
        </Link>

        {/* Desktop Navigation - Apple minimal */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                isActive(link.href)
                  ? "text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA - Apple minimal */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="btn-apple px-5 py-2 rounded-full font-medium text-sm"
          >
            <Link to="/write">Start Writing</Link>
          </Button>
        </div>

        {/* Mobile Menu Button - Apple minimal */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-black" />
          ) : (
            <Menu className="w-5 h-5 text-black" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg font-medium text-sm transition-colors duration-300 ${
                isActive(link.href)
                  ? "text-black bg-gray-50"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            className="w-full mt-4 btn-apple rounded-full text-sm font-medium"
          >
            <Link to="/write">Start Writing</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
