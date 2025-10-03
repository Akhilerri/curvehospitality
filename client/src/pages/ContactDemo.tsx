import React from 'react';
import { ContactSection } from '../components/sections/ContactSection';
import { ContactInformation } from '../components/sections/ContactInformation';
import { ContactForm } from '../components/sections/ContactForm';
import { useContactInformation } from '../hooks/useContact';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';

export const ContactDemo: React.FC = () => {
  const { contactInfo, loading, error } = useContactInformation();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Contact System Demo</h1>
          <p className="text-lg text-muted-foreground">
            Demonstration of the contact information display and form components
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">Contact Information Display</Badge>
            <Badge variant="secondary">Contact Form with Validation</Badge>
            <Badge variant="secondary">Email Notifications</Badge>
          </div>
        </div>

        {/* Demo Tabs */}
        <Tabs defaultValue="full-section" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="full-section">Complete Section</TabsTrigger>
            <TabsTrigger value="contact-info">Contact Info Only</TabsTrigger>
            <TabsTrigger value="contact-form">Form Only</TabsTrigger>
            <TabsTrigger value="page-layout">Full Page Layout</TabsTrigger>
          </TabsList>

          {/* Complete Contact Section */}
          <TabsContent value="full-section" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complete Contact Section</CardTitle>
                <p className="text-muted-foreground">
                  This shows the full contact section with both information display and form
                </p>
              </CardHeader>
              <CardContent>
                <ContactSection />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Information Only */}
          <TabsContent value="contact-info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information Display</CardTitle>
                <p className="text-muted-foreground">
                  Shows company contact details, multiple locations, business hours, and social media
                </p>
              </CardHeader>
              <CardContent>
                {loading && <div>Loading contact information...</div>}
                {error && <div className="text-red-500">Error: {error}</div>}
                {contactInfo && <ContactInformation contactInfo={contactInfo} />}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Form Only */}
          <TabsContent value="contact-form" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <p className="text-muted-foreground">
                  Interactive form with validation, project details, and submission handling
                </p>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl">
                  <ContactForm onSuccess={() => console.log('Form submitted successfully!')} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Full Page Layout */}
          <TabsContent value="page-layout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Full Page Layout</CardTitle>
                <p className="text-muted-foreground">
                  Complete contact page with hero section and additional information
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-gradient-to-b from-muted/50 to-background py-12">
                  <div className="container mx-auto px-4">
                    <div className="text-center space-y-4">
                      <h2 className="text-3xl font-bold">Get in Touch</h2>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                        Ready to transform your space? We'd love to hear about your project.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="container mx-auto px-4 py-8">
                  <ContactSection />
                </div>

                <div className="bg-muted/30 py-8">
                  <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div className="space-y-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="font-semibold">Quick Response</h3>
                        <p className="text-sm text-muted-foreground">24-hour response time</p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="font-semibold">Free Consultation</h3>
                        <p className="text-sm text-muted-foreground">Complimentary initial consultation</p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h3 className="font-semibold">Expert Team</h3>
                        <p className="text-sm text-muted-foreground">Experienced professionals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Features Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Contact Information Display</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Multiple contact methods (phone, email, address)</li>
                  <li>• Business hours display with day-by-day breakdown</li>
                  <li>• Multiple location support with individual details</li>
                  <li>• Social media links with platform icons</li>
                  <li>• Location type indicators (HQ, showroom, warehouse)</li>
                  <li>• Response time and language information</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Contact Form Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Real-time form validation with Zod schema</li>
                  <li>• Project type and budget range selection</li>
                  <li>• Timeline and contact preference options</li>
                  <li>• Character count for message field</li>
                  <li>• Visual validation feedback (green/red borders)</li>
                  <li>• Success/error states with proper messaging</li>
                  <li>• Email notifications (server-side mock)</li>
                  <li>• Auto-reply functionality</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};