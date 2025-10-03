import { BusinessLayout } from "@/components/layout/BusinessLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function NavigationDemo() {
  return (
    <BusinessLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Enhanced Navigation Demo</h1>
            <p className="text-xl text-muted-foreground">
              Showcasing the new multi-level navigation system with responsive design
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Desktop Navigation
                  <Badge variant="secondary">Multi-level</Badge>
                </CardTitle>
                <CardDescription>
                  Hover over navigation items to see dropdown menus with organized sub-sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Multi-level dropdown menus</li>
                  <li>• Active route detection</li>
                  <li>• Smooth animations</li>
                  <li>• Keyboard navigation support</li>
                  <li>• Backdrop blur effect on scroll</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Mobile Navigation
                  <Badge variant="secondary">Slide-out</Badge>
                </CardTitle>
                <CardDescription>
                  Tap the menu button to see the mobile slide-out navigation panel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Slide-out panel from left</li>
                  <li>• Collapsible sub-menus</li>
                  <li>• Touch-friendly interactions</li>
                  <li>• Auto-close on route change</li>
                  <li>• Accessible navigation</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Navigation Structure</CardTitle>
              <CardDescription>
                The business website navigation includes the following sections:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h4 className="font-semibold mb-2">About Us</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Company History</li>
                    <li>Our Team</li>
                    <li>Mission & Values</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Services</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Manufacturing</li>
                    <li>Interior Design</li>
                    <li>Procurement</li>
                    <li>Project Management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Products</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Case Goods</li>
                    <li>Seating</li>
                    <li>Lighting</li>
                    <li>Artwork & Mirrors</li>
                    <li>+ 4 more categories</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Portfolio</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>All Projects</li>
                    <li>Commercial</li>
                    <li>Residential</li>
                    <li>Hospitality</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Resources</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Blog & Insights</li>
                    <li>Downloadable Guides</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Single Pages</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Process</li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features Implemented</CardTitle>
              <CardDescription>
                Key features of the enhanced navigation system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Navigation State Management</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Custom useNavigation hook</li>
                    <li>• Mobile/desktop detection</li>
                    <li>• Active route tracking</li>
                    <li>• Menu state management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Responsive Design</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Breakpoint-based navigation</li>
                    <li>• Touch-friendly mobile interface</li>
                    <li>• Adaptive menu layouts</li>
                    <li>• Consistent styling system</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Try navigating through the menu items above to see the enhanced navigation in action.
              The navigation automatically detects the current route and highlights active items.
            </p>
          </div>
        </div>
      </div>
    </BusinessLayout>
  );
}