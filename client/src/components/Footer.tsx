import { Link } from "wouter";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect } from "react";

// Custom Link component that scrolls to top
function ScrollToTopLink({ href, children, className, ...props }: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
  [key: string]: any;
}) {
  const handleClick = () => {
    // Scroll to top smoothly when link is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Social media links - easily configurable for future updates
  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/curvehospitality", // Replace with actual URL
      color: "hover:text-pink-500"
    },
    {
      name: "Facebook", 
      icon: Facebook,
      url: "https://facebook.com/curvehospitality", // Replace with actual URL
      color: "hover:text-blue-600"
    },
    {
      name: "X (Twitter)",
      icon: FaXTwitter,
      url: "https://x.com/curvehospitality", // Replace with actual URL
      color: "hover:text-gray-900 dark:hover:text-white"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@curvehospitality", // Replace with actual URL
      color: "hover:text-red-600"
    }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-serif font-light text-foreground mb-4">
              Karan Kothari USA LLC
            </h3>
            <p className="text-muted-foreground mb-4">
              Distinguished hospitality procurement enterprise renowned for
              exceptional standards in FF&E manufacturing and interior design.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <ScrollToTopLink
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-company"
                >
                  Company
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink
                  href="/process"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-process"
                >
                  Our Process
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink
                  href="/portfolio"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-projects"
                >
                  Projects
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink
                  href="/resources"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-events"
                >
                  Events
                </ScrollToTopLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Custom Manufacturing</li>
              <li className="text-muted-foreground">Interior Design</li>
              <li className="text-muted-foreground">FF&E Procurement</li>
              <li className="text-muted-foreground">3D Rendering</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>info@curvehospitality.com</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Houston, TX</span>
              </li>
            </ul>
            
            {/* Social Media Icons */}
            <div>
              <h5 className="font-medium text-foreground mb-3 text-sm">Follow Us</h5>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground ${social.color} transition-all duration-200 hover:scale-110`}
                      title={social.name}
                      data-testid={`social-${social.name.toLowerCase()}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Karan Kothari USA LLC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-privacy"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-terms"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
