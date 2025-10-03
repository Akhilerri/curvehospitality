import React from 'react';
import { AboutUsSection } from '@/components/sections';
import { CompanyInfo } from '@shared/types/common';
import { CompanyHistory } from '@shared/types/company';
import { TeamMember } from '@shared/types/team';

// Mock data for demonstration
const mockCompany: CompanyInfo & { history: CompanyHistory[] } = {
  id: '1',
  name: 'CurveRedo Design Studio',
  description: 'A leading interior design and manufacturing company dedicated to creating exceptional spaces that inspire and transform lives through innovative design solutions.',
  foundedYear: 2015,
  mission: 'To transform spaces into extraordinary experiences through innovative design, superior craftsmanship, and unwavering commitment to our clients\' vision.',
  values: [
    'Excellence: We strive for perfection in every project, ensuring the highest quality standards in design and execution.',
    'Innovation: We embrace creativity and cutting-edge solutions to deliver unique and forward-thinking designs.',
    'Integrity: We build trust through honest communication, transparent processes, and ethical business practices.',
    'Collaboration: We work closely with our clients and partners to achieve shared goals and exceptional outcomes.',
    'Sustainability: We are committed to environmentally responsible practices and sustainable design solutions.'
  ],
  history: [
    {
      year: 2015,
      milestone: 'Company Founded',
      description: 'CurveRedo Design Studio was established with a vision to revolutionize interior design through innovative approaches and exceptional craftsmanship.'
    },
    {
      year: 2017,
      milestone: 'First Major Commercial Project',
      description: 'Completed our first large-scale commercial project, a 50,000 sq ft corporate headquarters that set new standards for workplace design.'
    },
    {
      year: 2019,
      milestone: 'Manufacturing Division Launch',
      description: 'Expanded our services to include custom furniture manufacturing, allowing us to offer end-to-end design and production solutions.'
    },
    {
      year: 2021,
      milestone: 'Sustainability Initiative',
      description: 'Launched our comprehensive sustainability program, focusing on eco-friendly materials and carbon-neutral operations.'
    },
    {
      year: 2023,
      milestone: '100+ Projects Milestone',
      description: 'Celebrated completing over 100 successful projects across residential, commercial, and hospitality sectors.'
    }
  ]
};

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    companyId: '1',
    name: 'Sarah Johnson',
    role: 'Creative Director & Founder',
    bio: 'With over 15 years of experience in interior design, Sarah founded CurveRedo with a passion for creating spaces that tell stories. Her innovative approach has earned recognition from leading design publications.',
    image: {
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      alt: 'Sarah Johnson profile photo'
    },
    skills: ['Interior Design', 'Space Planning', 'Project Management', 'Client Relations'],
    experience: [
      'Led design teams for 100+ residential and commercial projects',
      'Featured in Architectural Digest and Interior Design Magazine',
      'Certified LEED Green Associate'
    ],
    education: [
      {
        institution: 'Rhode Island School of Design',
        degree: 'Master of Fine Arts',
        field: 'Interior Architecture',
        year: 2008
      }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      instagram: 'https://instagram.com/sarahdesigns'
    },
    orderIndex: 1,
    isActive: true
  },
  {
    id: '2',
    companyId: '1',
    name: 'Michael Chen',
    role: 'Senior Designer',
    bio: 'Michael brings a unique blend of traditional craftsmanship and modern technology to every project. His expertise in sustainable design has helped CurveRedo become a leader in eco-friendly interiors.',
    image: {
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      alt: 'Michael Chen profile photo'
    },
    skills: ['Sustainable Design', '3D Modeling', 'Material Selection', 'CAD Design'],
    experience: [
      'Specialized in LEED-certified commercial spaces',
      '10+ years in sustainable design practices',
      'Expert in AutoCAD and SketchUp'
    ],
    education: [
      {
        institution: 'California College of the Arts',
        degree: 'Bachelor of Fine Arts',
        field: 'Interior Design',
        year: 2013
      }
    ],
    certifications: ['LEED AP BD+C', 'NCIDQ Certified'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/michaelchen'
    },
    orderIndex: 2,
    isActive: true
  },
  {
    id: '3',
    companyId: '1',
    name: 'Emily Rodriguez',
    role: 'Project Manager',
    bio: 'Emily ensures every project runs smoothly from concept to completion. Her attention to detail and exceptional organizational skills have made her an invaluable part of the CurveRedo team.',
    image: {
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      alt: 'Emily Rodriguez profile photo'
    },
    skills: ['Project Management', 'Budget Planning', 'Timeline Coordination', 'Client Communication'],
    experience: [
      'Managed 50+ projects with budgets exceeding $1M',
      'Consistently delivers projects on time and under budget',
      'Expert in project management software and methodologies'
    ],
    education: [
      {
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Business Administration',
        year: 2015
      }
    ],
    certifications: ['PMP Certified', 'Agile Project Management'],
    orderIndex: 3,
    isActive: true
  }
];

export function AboutUsDemo() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <AboutUsSection 
          company={mockCompany} 
          teamMembers={mockTeamMembers}
        />
      </div>
    </div>
  );
}