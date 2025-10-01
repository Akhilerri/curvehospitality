# Curve Hospitality Redesign - Design Guidelines

## Design Approach
**Reference-Based Approach** drawing inspiration from premium hospitality and design platforms (Airbnb, high-end interior design portfolios, boutique hotel websites) combined with modern B2B service aesthetics. The design emphasizes visual storytelling, craftsmanship, and trust-building through elegant presentation.

## Core Design Principles
1. **Sophisticated Elegance**: Refined, timeless aesthetic reflecting luxury hospitality standards
2. **Visual First**: Large-scale imagery showcasing portfolio work and interiors
3. **Trust & Authority**: Professional presentation establishing credibility in B2B space
4. **Seamless Experience**: Smooth transitions and intuitive navigation

## Color Palette

### Light Mode
- **Primary**: 25 15% 25% (Deep charcoal - main text, headers)
- **Secondary**: 30 8% 45% (Warm gray - supporting text)
- **Accent**: 200 85% 45% (Refined teal-blue - CTAs, links, highlights)
- **Background**: 0 0% 98% (Soft off-white)
- **Surface**: 0 0% 100% (Pure white - cards, panels)
- **Border**: 0 0% 88% (Light gray - subtle dividers)

### Dark Mode
- **Primary**: 0 0% 95% (Soft white - main text)
- **Secondary**: 0 0% 70% (Light gray - supporting text)
- **Accent**: 200 75% 55% (Brightened teal-blue - CTAs)
- **Background**: 220 15% 8% (Rich dark blue-black)
- **Surface**: 220 12% 12% (Elevated dark gray)
- **Border**: 220 10% 20% (Subtle dark borders)

## Typography

### Font Families
- **Headings**: 'Playfair Display' (serif) - elegant, sophisticated
- **Body**: 'Inter' (sans-serif) - clean, highly readable
- **Accents**: 'Inter' with uppercase letter-spacing for labels

### Scale
- **Hero Title**: text-6xl md:text-7xl lg:text-8xl (72-96px)
- **Section Headers**: text-4xl md:text-5xl (36-48px)
- **Subsection Headers**: text-2xl md:text-3xl (24-30px)
- **Body Large**: text-lg (18px)
- **Body**: text-base (16px)
- **Small**: text-sm (14px)

### Weights & Styles
- Headlines: font-serif font-light to font-normal
- Body: font-sans font-normal
- Emphasis: font-medium
- Labels: font-semibold uppercase tracking-wider

## Layout System

### Spacing Primitives
Primary spacing units: **4, 6, 8, 12, 16, 20, 24, 32**
- Tight spacing: p-4, gap-4 (16px)
- Standard spacing: p-8, gap-8 (32px)
- Section padding: py-20 md:py-32 (80-128px)
- Large gaps: gap-16, gap-20 (64-80px)

### Container Strategy
- **Full-width sections**: w-full with max-w-7xl mx-auto px-6 md:px-8
- **Content sections**: max-w-6xl mx-auto
- **Text content**: max-w-3xl for optimal reading

### Grid Patterns
- **Hero**: Single column, centered content
- **Services (9-step process)**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- **Projects**: Masonry-style grid with varied sizes
- **Events**: grid-cols-1 md:grid-cols-2
- **Testimonials**: Carousel, single card at a time
- **Awards**: grid-cols-2 md:grid-cols-4

## Component Library

### Navigation
- Fixed header with backdrop blur (backdrop-blur-lg bg-white/80 dark:bg-gray-900/80)
- Logo left, navigation center, CTA button right
- Mobile: Slide-in menu with overlay
- Subtle shadow on scroll

### Hero Section
- Full-viewport height (min-h-screen) with large hero image
- Overlay gradient for text readability
- Centered content with large serif headline
- Primary CTA button with outline variant on blurred background
- Subtle scroll indicator at bottom

### Service Cards (9-Step Process)
- Clean cards with hover elevation
- Number badge (01-09) with accent color
- Title and truncated description
- "Explore" link with arrow icon
- Hover: subtle scale and shadow increase

### Project Gallery
- Masonry grid layout with varied image sizes
- Overlay on hover revealing project details
- Filter tabs above gallery (All, Hotels, Restaurants, etc.)
- Modal view with full project details and image carousel

### Testimonial Cards
- Large quotes with elegant serif typography
- Client name and title below
- Carousel navigation dots
- Subtle fade transitions between slides

### Forms (Quote Request)
- Multi-step interface with progress indicator
- Grouped form fields with clear labels
- Radio buttons and checkboxes with custom styling
- File upload with drag-and-drop area
- Primary button for next/submit

### Footer
- Three-column layout: Company info, Quick links, Newsletter signup
- Social media icons
- Awards logos row above
- Copyright and legal links at bottom

## Images

### Required Images & Placement

1. **Hero Section**: 
   - Full-width, high-quality hotel interior or luxury furniture showcase
   - Professional photography showing Curve's work
   - Dimensions: 1920x1080 minimum
   - Placement: Background with dark overlay (bg-black/40)

2. **About Section**:
   - Manufacturing facility or showroom photo
   - Team collaboration image
   - Dimensions: 1200x800 each

3. **Process Section**:
   - Each of 9 steps has an accompanying image/icon
   - Design renderings, manufacturing shots, delivery photos
   - Dimensions: 600x400 each

4. **Projects Gallery**:
   - 12-20 high-quality hotel interior photos
   - Mix of room types: guest rooms, lobbies, restaurants
   - Dimensions: Varied (800x600, 600x800, 1200x800) for masonry effect

5. **Events Section**:
   - Each event card has a venue or event photo
   - Dimensions: 800x500 each

6. **Awards Section**:
   - Logo images for each award (transparent PNG)
   - Dimensions: 200x100 each

7. **Showroom Tour**:
   - 360° virtual tour thumbnail
   - Dimensions: 1000x600

### Image Treatment
- Subtle desaturation filter for consistency
- Rounded corners (rounded-lg) on cards
- Shadow overlays for text readability
- Lazy loading for performance

## Animations & Interactions

**Minimal Animation Philosophy** - Use sparingly for impact:

### Essential Animations Only
- **Fade-in on scroll**: Headlines and cards (subtle, 0.4s duration)
- **Hover elevations**: Cards lift slightly with shadow increase
- **Smooth transitions**: Navigation, modals (0.3s ease)
- **Progress indicators**: Multi-step forms

### Avoided Animations
- No parallax scrolling
- No complex scroll-triggered animations
- No auto-playing carousels (user-controlled only)

## Responsive Breakpoints
- Mobile: < 768px (single column layouts)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full multi-column layouts)

## Accessibility
- WCAG AA contrast ratios maintained
- Dark mode fully supported across all components
- Focus states visible on all interactive elements
- Form inputs with consistent dark mode styling
- Keyboard navigation fully functional