# 🎨 Customization Guide

This guide will help you customize your logo, images, and content for your business website.

## 1. 🏷️ **Adding Your Logo**

### Step 1: Add Your Logo Files

Place your logo files in the `client/public` directory:

```
CurveRedo/client/public/
├── logo.svg          # Main logo (recommended)
├── logo.png          # PNG fallback
├── logo-dark.svg     # Dark mode version (optional)
├── logo-white.svg    # White version for dark backgrounds
└── favicon.ico       # Browser favicon
```

### Step 2: Update Navigation Component

The logo appears in two places in `client/src/components/EnhancedNavigation.tsx`:

**Desktop Logo (Line ~185):**
```tsx
<Link
  href="/"
  className="text-2xl font-bold text-primary hover-elevate px-2 py-1 rounded-md"
>
  Curve  {/* Replace this */}
</Link>
```

**Mobile Logo (Line ~120):**
```tsx
<Link
  href="/"
  className="text-2xl font-bold text-blue-600 dark:text-blue-400"
>
  CURVE  {/* Replace this */}
</Link>
```

**Replace with your logo:**
```tsx
<Link href="/" className="flex items-center">
  <img 
    src="/logo.svg" 
    alt="Your Company Name" 
    className="h-8 w-auto"
  />
</Link>
```

### Step 3: Update Company Data

Edit `client/src/data/company.ts` to change the company name throughout the site.

## 2. 🖼️ **Replacing Stock Images**

### Image Locations

Your images should be placed in:
```
CurveRedo/client/public/images/
├── hero/              # Hero section images
├── portfolio/         # Project images
├── products/          # Product images
├── team/              # Team member photos
├── blog/              # Blog post images
└── about/             # About page images
```

### Key Image Files to Replace

1. **Hero Images** - Used on homepage
2. **Portfolio Images** - Project showcase images
3. **Product Images** - Product catalog images
4. **Team Photos** - Staff/team member photos
5. **Blog Images** - Article featured images

### Image Requirements

- **Format**: JPG, PNG, or WebP
- **Hero Images**: 1920x1080px (16:9 ratio)
- **Portfolio Images**: 1200x800px (3:2 ratio)
- **Product Images**: 800x600px (4:3 ratio)
- **Team Photos**: 400x400px (1:1 ratio)
- **Blog Images**: 1200x630px (1.91:1 ratio)

## 3. ✍️ **Updating Content & SEO**

### Main Content Files to Edit

1. **Company Information**: `client/src/data/company.ts`
2. **Services**: `client/src/pages/Services.tsx`
3. **Products**: `client/src/data/mockProducts.ts`
4. **Portfolio**: `client/src/data/mockProjects.ts`
5. **Blog Posts**: `client/src/data/mockBlog.ts`
6. **Team Members**: Mock data in various files

### SEO-Friendly Content Tips

- Use descriptive, keyword-rich titles
- Write compelling meta descriptions (150-160 characters)
- Include relevant keywords naturally in content
- Use proper heading hierarchy (H1, H2, H3)
- Add alt text to all images
- Create unique content for each page

## Quick Start Customization

I can help you update specific sections. Just let me know:

1. **Your company name and logo details**
2. **What type of business you have**
3. **Your services/products**
4. **Your target keywords for SEO**

Would you like me to start with any specific section?