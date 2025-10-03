import React, { useState } from 'react';
import { TeamMember } from '@shared/types/team';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Mail, Linkedin, Twitter, Globe, GraduationCap } from 'lucide-react';

interface TeamMemberGridProps {
  teamMembers: TeamMember[];
  className?: string;
}

interface TeamMemberProfileProps {
  member: TeamMember;
  isOpen: boolean;
  onClose: () => void;
}

function TeamMemberProfile({ member, isOpen, onClose }: TeamMemberProfileProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage 
                src={member.image?.url} 
                alt={member.image?.alt || `${member.name} profile photo`}
              />
              <AvatarFallback className="text-lg">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl">{member.name}</DialogTitle>
              <DialogDescription className="text-lg font-medium text-primary">
                {member.role}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Bio */}
          {member.bio && (
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
            </div>
          )}

          {/* Skills */}
          {member.skills && member.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {member.experience && member.experience.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Experience</h3>
              <ul className="space-y-2">
                {member.experience.map((exp: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Education */}
          {member.education && member.education.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education
              </h3>
              <div className="space-y-3">
                {member.education.map((edu, index: number) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-4">
                    <div className="font-medium">{edu.degree}</div>
                    {edu.field && (
                      <div className="text-sm text-muted-foreground">{edu.field}</div>
                    )}
                    <div className="text-sm font-medium text-primary">
                      {edu.institution} {edu.year && `• ${edu.year}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {member.certifications && member.certifications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {member.certifications.map((cert: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {member.socialLinks && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Connect</h3>
              <div className="flex gap-2">
                {member.socialLinks.linkedin && (
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={member.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {member.socialLinks.twitter && (
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={member.socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </a>
                  </Button>
                )}
                {member.socialLinks.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={member.socialLinks.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function TeamMemberGrid({ teamMembers, className }: TeamMemberGridProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const activeMembers = teamMembers
    .filter(member => member.isActive !== false)
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  return (
    <>
      <div className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        className
      )}>
        {activeMembers.map((member) => (
          <Card 
            key={member.id} 
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            onClick={() => setSelectedMember(member)}
          >
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Avatar className="h-20 w-20 mx-auto mb-3">
                  <AvatarImage 
                    src={member.image?.url} 
                    alt={member.image?.alt || `${member.name} profile photo`}
                  />
                  <AvatarFallback className="text-lg">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                
                <p className="text-primary font-medium text-sm mb-2">
                  {member.role}
                </p>
              </div>

              {member.bio && (
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                  {member.bio}
                </p>
              )}

              {member.skills && member.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {member.skills.slice(0, 3).map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {member.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{member.skills.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMember && (
        <TeamMemberProfile
          member={selectedMember}
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  );
}