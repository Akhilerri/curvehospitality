import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Sun, Moon, MapPin } from "lucide-react";
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
    { label: "Home", href: "/" },
    { label: "Company", href: "#about" },
    { label: "Our Process", href: "#process" },
    { label: "Projects", href: "#projects" },
    { label: "Events", href: "#events" },
  ];

  return (
    <>
      <div className="bg-primary text-primary-foreground py-2 px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Houston, TX - Premier FF&E Solutions</span>
          </div>
          <a
            href="tel:+15551234567"
            className="hover:underline hidden sm:inline"
          >
            (555) 123-4567
          </a>
        </div>
      </div>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
            : "bg-background border-b border-border"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/">
              <a
                className="text-2xl font-serif font-light text-foreground hover-elevate px-2 py-1 rounded-md"
                data-testid="link-home"
              >
                Curve
              </a>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                variant="outline"
                asChild
                className="hidden md:inline-flex"
                data-testid="button-request-quote"
              >
                <a href="#quote">Request a Quote</a>
              </Button>

              <Button
                asChild
                className="hidden md:inline-flex"
                data-testid="button-get-in-touch"
              >
                <a href="#quote">Get in Touch</a>
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
                <Button asChild className="w-full" data-testid="button-mobile-get-quote">
                  <a href="#quote" onClick={() => setIsMobileMenuOpen(false)}>
                    Get in Touch
                  </a>
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
