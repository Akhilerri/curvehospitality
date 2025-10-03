import { BlogPost, BlogCategory, BlogAuthor, BlogTag } from '../../../shared/types/blog';

export const mockBlogCategories: BlogCategory[] = [
  {
    id: 'design-trends',
    name: 'Design Trends',
    description: 'Latest trends in interior design and architecture',
    slug: 'design-trends',
    postCount: 8,
    color: '#3B82F6'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Insights into our manufacturing processes and capabilities',
    slug: 'manufacturing',
    postCount: 5,
    color: '#10B981'
  },
  {
    id: 'project-management',
    name: 'Project Management',
    description: 'Best practices for managing design and construction projects',
    slug: 'project-management',
    postCount: 6,
    color: '#F59E0B'
  },
  {
    id: 'sustainability',
    name: 'Sustainability',
    description: 'Sustainable design practices and eco-friendly materials',
    slug: 'sustainability',
    postCount: 4,
    color: '#059669'
  },
  {
    id: 'case-studies',
    name: 'Case Studies',
    description: 'Detailed project case studies and client success stories',
    slug: 'case-studies',
    postCount: 7,
    color: '#8B5CF6'
  }
];

export const mockBlogAuthors: BlogAuthor[] = [
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    bio: 'Lead Interior Designer with over 15 years of experience in commercial and residential projects.',
    avatar: {
      url: '/images/team/sarah-johnson.jpg',
      alt: 'Sarah Johnson',
      width: 400,
      height: 400
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarah-johnson-design',
      website: 'https://sarahjohnsondesign.com'
    },
    postCount: 12
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    bio: 'Manufacturing Director specializing in custom furniture and architectural elements.',
    avatar: {
      url: '/images/team/michael-chen.jpg',
      alt: 'Michael Chen',
      width: 400,
      height: 400
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/michael-chen-manufacturing'
    },
    postCount: 8
  },
  {
    id: 'emma-rodriguez',
    name: 'Emma Rodriguez',
    bio: 'Project Manager with expertise in large-scale commercial interior projects.',
    avatar: {
      url: '/images/team/emma-rodriguez.jpg',
      alt: 'Emma Rodriguez',
      width: 400,
      height: 400
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/emma-rodriguez-pm',
      twitter: 'https://twitter.com/emma_pm_design'
    },
    postCount: 10
  }
];

export const mockBlogTags: BlogTag[] = [
  { name: 'Modern Design', slug: 'modern-design', postCount: 15 },
  { name: 'Sustainable Materials', slug: 'sustainable-materials', postCount: 8 },
  { name: 'Commercial Spaces', slug: 'commercial-spaces', postCount: 12 },
  { name: 'Custom Furniture', slug: 'custom-furniture', postCount: 6 },
  { name: 'Project Planning', slug: 'project-planning', postCount: 9 },
  { name: 'Color Theory', slug: 'color-theory', postCount: 5 },
  { name: 'Lighting Design', slug: 'lighting-design', postCount: 7 },
  { name: 'Space Planning', slug: 'space-planning', postCount: 11 },
  { name: 'Material Selection', slug: 'material-selection', postCount: 8 },
  { name: 'Budget Management', slug: 'budget-management', postCount: 4 }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'modern-office-design-trends-2024',
    companyId: 'company-1',
    title: 'Modern Office Design Trends Shaping 2024',
    slug: 'modern-office-design-trends-2024',
    excerpt: 'Explore the latest trends in office design that are creating more productive and engaging workspaces in 2024.',
    content: `
# Modern Office Design Trends Shaping 2024

The workplace continues to evolve, and with it, the design principles that create productive, engaging, and healthy work environments. As we move through 2024, several key trends are emerging that are reshaping how we think about office spaces.

## Biophilic Design Takes Center Stage

One of the most significant trends we're seeing is the integration of natural elements into office environments. Biophilic design goes beyond simply adding plants to a space – it's about creating a connection with nature that can improve employee wellbeing and productivity.

### Key Elements of Biophilic Design:
- Living walls and vertical gardens
- Natural lighting optimization
- Water features and natural sounds
- Organic shapes and materials
- Views of nature from workspaces

## Flexible and Adaptive Spaces

The hybrid work model has fundamentally changed how offices are used. Modern office design now prioritizes flexibility and adaptability, creating spaces that can serve multiple functions throughout the day.

### Design Solutions for Flexibility:
- Modular furniture systems
- Moveable partitions and walls
- Multi-purpose meeting rooms
- Hot-desking solutions
- Quiet zones and collaboration areas

## Technology Integration

Seamless technology integration is no longer optional – it's essential. The best office designs make technology invisible while ensuring it's always accessible when needed.

## Wellness-Focused Design

Employee wellness has become a top priority, and office design plays a crucial role in supporting physical and mental health.

### Wellness Design Elements:
- Ergonomic furniture and workstations
- Air quality monitoring and improvement
- Circadian lighting systems
- Fitness and meditation spaces
- Healthy food options and hydration stations

## Conclusion

The office of 2024 is a far cry from the cubicle farms of the past. Today's workspaces are designed to be flexible, healthy, and inspiring – places where employees want to spend time and can do their best work.

At our company, we're helping organizations implement these trends in ways that align with their culture and business objectives. Contact us to learn how we can transform your workspace for the modern era.
    `,
    author: 'Sarah Johnson',
    category: 'Design Trends',
    tags: ['Modern Design', 'Commercial Spaces', 'Space Planning'],
    featuredImage: {
      url: '/images/blog/modern-office-design-2024.jpg',
      alt: 'Modern office space with biophilic design elements',
      width: 1200,
      height: 630
    },
    publishedAt: new Date('2024-01-15'),
    isPublished: true,
    readingTime: 8,
    viewCount: 1247,
    seo: {
      title: 'Modern Office Design Trends Shaping 2024 | Interior Design Insights',
      description: 'Discover the latest office design trends for 2024, including biophilic design, flexible spaces, and wellness-focused environments.',
      keywords: ['office design', 'workplace trends', 'biophilic design', 'flexible workspace', '2024 trends']
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'sustainable-manufacturing-practices',
    companyId: 'company-1',
    title: 'Sustainable Manufacturing Practices in Custom Furniture',
    slug: 'sustainable-manufacturing-practices',
    excerpt: 'Learn how we\'re implementing sustainable practices in our manufacturing processes to create beautiful, eco-friendly furniture.',
    content: `
# Sustainable Manufacturing Practices in Custom Furniture

Sustainability is no longer just a buzzword – it's a fundamental responsibility that drives innovation in manufacturing. In the custom furniture industry, we have a unique opportunity to lead by example, creating beautiful pieces while minimizing our environmental impact.

## Material Selection and Sourcing

The foundation of sustainable manufacturing begins with responsible material selection. We prioritize:

### Certified Sustainable Wood
- FSC (Forest Stewardship Council) certified lumber
- Reclaimed and salvaged wood materials
- Local sourcing to reduce transportation emissions
- Partnership with sustainable forestry operations

### Low-Impact Materials
- Water-based finishes and adhesives
- Recycled metal components
- Natural fiber upholstery options
- Biodegradable packaging materials

## Waste Reduction Strategies

Our manufacturing process is designed to minimize waste at every stage:

### Design for Efficiency
- Computer-aided design optimization
- Nesting software for material efficiency
- Modular design principles
- Standardized components where possible

### Waste Stream Management
- Wood waste recycling and repurposing
- Metal scrap collection and recycling
- Finish and adhesive waste minimization
- Packaging material reuse programs

## Energy Efficiency and Renewable Power

We've invested heavily in energy-efficient manufacturing processes:

### Equipment Upgrades
- High-efficiency machinery and tools
- LED lighting throughout facilities
- Smart climate control systems
- Energy monitoring and optimization

### Renewable Energy Integration
- Solar panel installation
- Energy storage systems
- Grid-tie capabilities for excess generation
- Carbon offset programs for remaining emissions

## Quality and Longevity Focus

The most sustainable furniture is furniture that lasts. Our approach emphasizes:

### Durability by Design
- Robust joinery techniques
- High-quality hardware selection
- Timeless aesthetic choices
- Repairable and upgradeable designs

### Maintenance and Care Programs
- Client education on proper care
- Refinishing and restoration services
- Replacement part availability
- Upgrade and modification options

## Measuring Our Impact

Transparency is crucial to our sustainability efforts. We track and report on:

### Key Metrics
- Carbon footprint per piece produced
- Waste diversion rates
- Energy consumption efficiency
- Sustainable material percentages

### Continuous Improvement
- Annual sustainability audits
- Process optimization initiatives
- Technology adoption for efficiency
- Supply chain sustainability assessments

## The Future of Sustainable Manufacturing

As we look ahead, we're excited about emerging technologies and practices that will further reduce our environmental impact:

- 3D printing for prototyping and small components
- Advanced material recycling technologies
- Carbon capture and utilization
- Circular economy business models

## Conclusion

Sustainable manufacturing isn't just about doing less harm – it's about creating positive impact through thoughtful design, responsible sourcing, and innovative processes. Every piece we create is an opportunity to demonstrate that sustainability and quality can go hand in hand.

We're committed to continuous improvement in our sustainability practices, and we're always looking for new ways to reduce our environmental footprint while creating beautiful, functional furniture that our clients will treasure for generations.
    `,
    author: 'Michael Chen',
    category: 'Manufacturing',
    tags: ['Sustainable Materials', 'Custom Furniture', 'Manufacturing'],
    featuredImage: {
      url: '/images/blog/sustainable-manufacturing.jpg',
      alt: 'Sustainable furniture manufacturing workshop',
      width: 1200,
      height: 630
    },
    publishedAt: new Date('2024-01-20'),
    isPublished: true,
    readingTime: 12,
    viewCount: 892,
    seo: {
      title: 'Sustainable Manufacturing Practices in Custom Furniture | Green Manufacturing',
      description: 'Discover how sustainable manufacturing practices are revolutionizing custom furniture production with eco-friendly materials and processes.',
      keywords: ['sustainable manufacturing', 'custom furniture', 'eco-friendly', 'green manufacturing', 'sustainable materials']
    },
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'project-management-best-practices',
    companyId: 'company-1',
    title: 'Project Management Best Practices for Interior Design Projects',
    slug: 'project-management-best-practices',
    excerpt: 'Essential project management strategies that ensure interior design projects are completed on time, within budget, and to client satisfaction.',
    content: `
# Project Management Best Practices for Interior Design Projects

Successful interior design projects require more than just creative vision – they demand meticulous planning, clear communication, and effective project management. Over the years, we've refined our approach to ensure every project delivers exceptional results while staying on schedule and within budget.

## Project Planning and Scope Definition

The foundation of any successful project is thorough planning and clear scope definition.

### Initial Client Consultation
- Comprehensive needs assessment
- Budget range establishment
- Timeline expectations setting
- Style and preference exploration
- Functional requirements analysis

### Detailed Project Scope
- Room-by-room specifications
- Material and finish selections
- Furniture and fixture requirements
- Lighting and electrical needs
- Special features and custom elements

## Timeline Development and Management

Realistic timeline development is crucial for project success.

### Phase-Based Scheduling
- Design development phase
- Procurement and ordering phase
- Installation and construction phase
- Final styling and completion phase

### Critical Path Management
- Identifying dependencies between tasks
- Buffer time for unexpected delays
- Vendor lead time coordination
- Installation sequence optimization

## Budget Management and Cost Control

Effective budget management protects both client interests and project profitability.

### Budget Allocation Strategy
- Design fees (15-20%)
- Furniture and furnishings (40-50%)
- Construction and installation (25-35%)
- Contingency fund (10-15%)

### Cost Tracking and Reporting
- Regular budget reviews with clients
- Change order documentation
- Vendor payment scheduling
- Final cost reconciliation

## Communication and Stakeholder Management

Clear, consistent communication is the backbone of successful project management.

### Client Communication Protocol
- Weekly progress updates
- Decision point notifications
- Issue escalation procedures
- Regular site visit scheduling

### Vendor and Contractor Coordination
- Clear scope of work documentation
- Regular progress check-ins
- Quality control inspections
- Payment milestone management

## Quality Control and Delivery

Maintaining high quality standards throughout the project lifecycle.

### Quality Checkpoints
- Design approval milestones
- Material sample approvals
- Installation quality inspections
- Final walkthrough and punch list

### Delivery and Installation Management
- Delivery scheduling coordination
- Installation supervision
- Damage prevention protocols
- Client training and handover

## Risk Management and Problem Solving

Proactive risk management helps prevent issues before they become problems.

### Common Risk Factors
- Vendor delays and availability issues
- Construction complications
- Budget overruns
- Client scope changes
- Quality control failures

### Mitigation Strategies
- Multiple vendor relationships
- Detailed contracts and agreements
- Regular progress monitoring
- Flexible problem-solving approaches
- Clear change management processes

## Technology and Tools

Leveraging technology to improve efficiency and communication.

### Project Management Software
- Task scheduling and tracking
- Document and file sharing
- Communication centralization
- Budget and expense tracking

### Design and Visualization Tools
- 3D modeling and rendering
- Virtual reality presentations
- Material and color visualization
- Space planning software

## Client Satisfaction and Project Closure

Ensuring client satisfaction and proper project closure.

### Final Delivery Process
- Comprehensive walkthrough
- Punch list completion
- Care and maintenance instructions
- Warranty information provision

### Post-Project Follow-up
- Client satisfaction surveys
- Maintenance check-ins
- Future project discussions
- Referral and testimonial requests

## Continuous Improvement

Learning from each project to improve future performance.

### Project Post-Mortems
- What went well analysis
- Challenge identification
- Process improvement opportunities
- Team feedback sessions

### Best Practice Documentation
- Standard operating procedures
- Template development
- Training material updates
- Knowledge sharing sessions

## Conclusion

Effective project management in interior design requires a balance of creative vision and systematic execution. By following these best practices, we ensure that every project not only meets but exceeds client expectations while maintaining profitability and team satisfaction.

The key to success lies in thorough planning, clear communication, proactive problem-solving, and continuous improvement. When these elements come together, the result is a smooth project experience that delivers beautiful, functional spaces that clients will love for years to come.
    `,
    author: 'Emma Rodriguez',
    category: 'Project Management',
    tags: ['Project Planning', 'Budget Management', 'Commercial Spaces'],
    featuredImage: {
      url: '/images/blog/project-management-best-practices.jpg',
      alt: 'Project management meeting with design plans and schedules',
      width: 1200,
      height: 630
    },
    publishedAt: new Date('2024-01-25'),
    isPublished: true,
    readingTime: 15,
    viewCount: 1156,
    seo: {
      title: 'Interior Design Project Management Best Practices | Project Success Guide',
      description: 'Learn essential project management strategies for interior design projects including planning, budgeting, and client communication.',
      keywords: ['project management', 'interior design', 'project planning', 'budget management', 'client communication']
    },
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-25')
  }
];

// Helper functions for filtering and searching
export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return mockBlogPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase() && post.isPublished
  );
};

export const getBlogPostsByTag = (tag: string): BlogPost[] => {
  return mockBlogPosts.filter(post => 
    post.tags?.some(postTag => postTag.toLowerCase() === tag.toLowerCase()) && post.isPublished
  );
};

export const getBlogPostsByAuthor = (author: string): BlogPost[] => {
  return mockBlogPosts.filter(post => 
    post.author.toLowerCase() === author.toLowerCase() && post.isPublished
  );
};

export const searchBlogPosts = (query: string): BlogPost[] => {
  const searchTerm = query.toLowerCase();
  return mockBlogPosts.filter(post => 
    (post.title.toLowerCase().includes(searchTerm) ||
     post.excerpt?.toLowerCase().includes(searchTerm) ||
     post.content.toLowerCase().includes(searchTerm) ||
     post.tags?.some(tag => tag.toLowerCase().includes(searchTerm))) &&
    post.isPublished
  );
};

export const getPublishedBlogPosts = (): BlogPost[] => {
  return mockBlogPosts.filter(post => post.isPublished);
};

export const getFeaturedBlogPosts = (limit: number = 3): BlogPost[] => {
  return getPublishedBlogPosts()
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit);
};

export const getRecentBlogPosts = (limit: number = 5): BlogPost[] => {
  return getPublishedBlogPosts()
    .sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime())
    .slice(0, limit);
};