import React from 'react';
import { CompanyInfo } from '@shared/types/common';
import { CompanyHistory } from '@shared/types/company';
import { TeamMember } from '@shared/types/team';
import { CompanyHistoryTimeline } from './CompanyHistoryTimeline';
import { TeamMemberGrid } from './TeamMemberGrid';
import { MissionValuesSection } from './MissionValuesSection';
import { cn } from '@/lib/utils';

interface AboutUsSectionProps {
  company: CompanyInfo & { history?: CompanyHistory[] };
  teamMembers: TeamMember[];
  className?: string;
}

export function AboutUsSection({ company, teamMembers, className }: AboutUsSectionProps) {
  return (
    <div className={cn("space-y-16 md:space-y-24", className)}>
      {/* Company Introduction */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          About {company.name}
        </h1>
        {company.description && (
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {company.description}
          </p>
        )}
      </div>

      {/* Mission and Values */}
      <section>
        <MissionValuesSection company={company} />
      </section>

      {/* Company History */}
      {company.history && company.history.length > 0 && (
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the milestones and achievements that have shaped our company over the years.
            </p>
          </div>
          <CompanyHistoryTimeline history={company.history} />
        </section>
      )}

      {/* Team Members */}
      {teamMembers.length > 0 && (
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The talented professionals who bring our vision to life and deliver exceptional results for our clients.
            </p>
          </div>
          <TeamMemberGrid teamMembers={teamMembers} />
        </section>
      )}
    </div>
  );
}