import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { EnhancedNavigation } from "@/components/EnhancedNavigation";
import { Footer } from "@/components/Footer";
import { seoManager } from "@/lib/seo";
import { companyData } from "@/data/company";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Process from "@/pages/Process";
import Resources from "@/pages/Resources";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import NavigationDemo from "@/pages/NavigationDemo";
import NotFound from "@/pages/not-found";

// Initialize SEO manager with company data
seoManager.setCompanyData(companyData);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/services/:serviceId" component={Services} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/process" component={Process} />
      <Route path="/resources" component={Resources} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact" component={Contact} />
      <Route path="/navigation-demo" component={NavigationDemo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <EnhancedNavigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
