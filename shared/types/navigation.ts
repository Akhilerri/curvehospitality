// Navigation and UI types

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
  isExternal?: boolean;
  requiresAuth?: boolean;
  badge?: NavigationBadge;
  description?: string;
}

export interface NavigationBadge {
  text: string;
  variant: 'new' | 'updated' | 'hot' | 'coming_soon';
  color?: string;
}

export interface NavigationProps {
  items: NavigationItem[];
  currentPath: string;
  isOpen?: boolean;
  onToggle?: () => void;
  variant?: 'desktop' | 'mobile';
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  maxItems?: number;
}

// Main navigation structure
export interface MainNavigation {
  primary: NavigationItem[];
  secondary?: NavigationItem[];
  footer?: FooterNavigation;
}

export interface FooterNavigation {
  sections: FooterSection[];
  legal?: NavigationItem[];
  social?: SocialLink[];
  newsletter?: NewsletterSignup;
}

export interface FooterSection {
  title: string;
  links: NavigationItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface NewsletterSignup {
  title: string;
  description?: string;
  placeholder: string;
  buttonText: string;
  privacyText?: string;
}

// Page layout types
export interface PageLayout {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: PageAction[];
  tabs?: PageTab[];
  sidebar?: SidebarConfig;
}

export interface PageAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: string;
  disabled?: boolean;
}

export interface PageTab {
  id: string;
  label: string;
  href?: string;
  isActive?: boolean;
  count?: number;
  icon?: string;
}

export interface SidebarConfig {
  position: 'left' | 'right';
  width?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  content: SidebarSection[];
}

export interface SidebarSection {
  title?: string;
  items: NavigationItem[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}