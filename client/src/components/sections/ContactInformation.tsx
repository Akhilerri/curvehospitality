import React from 'react';
import { ContactInformation as ContactInfoType, BusinessLocation } from '../../../../shared/types/contact';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  Facebook, 
  Instagram, 
  Linkedin, 
  ExternalLink,
  Building2,
  Warehouse,
  Store
} from 'lucide-react';

interface ContactInformationProps {
  contactInfo: ContactInfoType;
  className?: string;
}

const LocationTypeIcon = ({ type }: { type: BusinessLocation['type'] }) => {
  switch (type) {
    case 'headquarters':
      return <Building2 className="h-4 w-4" />;
    case 'showroom':
      return <Store className="h-4 w-4" />;
    case 'warehouse':
      return <Warehouse className="h-4 w-4" />;
    case 'office':
      return <Building2 className="h-4 w-4" />;
    default:
      return <MapPin className="h-4 w-4" />;
  }
};

const SocialMediaIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'facebook':
      return <Facebook className="h-4 w-4" />;
    case 'instagram':
      return <Instagram className="h-4 w-4" />;
    case 'linkedin':
      return <Linkedin className="h-4 w-4" />;
    default:
      return <Globe className="h-4 w-4" />;
  }
};

const formatBusinessHours = (hours: Record<string, string> | BusinessLocation['hours']) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days.map(day => ({
    day,
    hours: hours?.[day as keyof typeof hours] || hours?.[day.toLowerCase() as keyof typeof hours] || 'Closed'
  }));
};

const LocationCard: React.FC<{ location: BusinessLocation }> = ({ location }) => {
  const formattedHours = location.hours ? formatBusinessHours(location.hours) : [];
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <LocationTypeIcon type={location.type} />
          {location.name}
        </CardTitle>
        <Badge variant="secondary" className="w-fit">
          {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address */}
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
          <div className="text-sm">
            <div>{location.address.street}</div>
            <div>{location.address.city}, {location.address.state} {location.address.zipCode}</div>
            <div>{location.address.country}</div>
          </div>
        </div>

        {/* Contact Info */}
        {location.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a href={`tel:${location.phone}`} className="text-sm hover:underline">
              {location.phone}
            </a>
          </div>
        )}

        {location.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${location.email}`} className="text-sm hover:underline">
              {location.email}
            </a>
          </div>
        )}

        {/* Business Hours */}
        {formattedHours.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Hours</span>
            </div>
            <div className="space-y-1 ml-6">
              {formattedHours.map(({ day, hours }) => (
                <div key={day} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{day.slice(0, 3)}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        {location.services && location.services.length > 0 && (
          <div>
            <div className="text-sm font-medium mb-2">Services</div>
            <div className="flex flex-wrap gap-1">
              {location.services.map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const ContactInformation: React.FC<ContactInformationProps> = ({ 
  contactInfo, 
  className = "" 
}) => {
  const publicLocations = contactInfo.locations?.filter(loc => loc.isPublic) || [];
  const socialMediaEntries = contactInfo.socialMedia ? 
    Object.entries(contactInfo.socialMedia).filter(([_, url]) => url) : [];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Main Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{contactInfo.companyName}</CardTitle>
          {contactInfo.description && (
            <p className="text-muted-foreground">{contactInfo.description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Contact Methods */}
          <div className="grid md:grid-cols-2 gap-4">
            {contactInfo.phone && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Phone</div>
                  <a href={`tel:${contactInfo.phone}`} className="text-muted-foreground hover:underline">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            )}

            {contactInfo.email && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <a href={`mailto:${contactInfo.email}`} className="text-muted-foreground hover:underline">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Main Address */}
          {contactInfo.address && (
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">Address</div>
                <div className="text-muted-foreground">
                  <div>{contactInfo.address.street}</div>
                  <div>{contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zipCode}</div>
                  <div>{contactInfo.address.country}</div>
                </div>
              </div>
            </div>
          )}

          {/* Business Hours */}
          {contactInfo.businessHours && (
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium mb-2">Business Hours</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(contactInfo.businessHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{day}</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Response Time */}
          {contactInfo.responseTime && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="font-medium mb-1">Response Time</div>
              <p className="text-sm text-muted-foreground">{contactInfo.responseTime}</p>
            </div>
          )}

          {/* Languages */}
          {contactInfo.languages && contactInfo.languages.length > 0 && (
            <div>
              <div className="font-medium mb-2">Languages Spoken</div>
              <div className="flex flex-wrap gap-2">
                {contactInfo.languages.map((language, index) => (
                  <Badge key={index} variant="secondary">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Media Links */}
      {socialMediaEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Follow Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {socialMediaEntries.map(([platform, url]) => (
                <Button
                  key={platform}
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex items-center gap-2"
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <SocialMediaIcon platform={platform} />
                    <span className="capitalize">{platform}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Multiple Locations */}
      {publicLocations.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Locations</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};