import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#process" },
    { label: "Projects", href: "#projects" },
    { label: "Company", href: "#about" },
    { label: "Events", href: "#events" },
  ];

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-lg border-b border-border ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a
              className="text-2xl font-bold text-primary hover-elevate px-2 py-1 rounded-md"
              data-testid="link-home"
            >
              Curve
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground hover-elevate rounded-md transition-colors"
                data-testid={`link-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              asChild
              className="hidden md:inline-flex"
              data-testid="button-sign-in"
            >
              <a href="#quote">Sign in</a>
            </Button>

            <Button
              asChild
              className="hidden md:inline-flex"
              data-testid="button-get-started"
            >
              <a href="#quote">Get Started</a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-foreground py-2 hover-elevate px-4 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`mobile-link-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="w-full" data-testid="button-mobile-get-started">
                <a href="#quote" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
