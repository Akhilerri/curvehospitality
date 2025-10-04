# 🎯 Customize Your Site - Step by Step

## 🏷️ **Step 1: Update Your Company Name**

I've already updated the navigation to show "YOUR COMPANY NAME". To change this:

1. **Replace "YOUR COMPANY NAME" with your actual company name** in:
   - `client/src/components/EnhancedNavigation.tsx` (lines I just updated)

2. **Update company data** in `client/src/data/company.ts`:
   ```typescript
   export const companyData: CompanyInfo = {
     name: 'Your Actual Company Name',
     description: 'Your business description here...',
     // ... rest of the data
   };
   ```

## 🖼️ **Step 2: Add Your Logo**

### Option A: Image Logo
1. **Add your logo files** to `client/public/`:
   ```
   client/public/
   ├── logo.svg (or logo.png)
   ├── logo-white.svg (for dark backgrounds)
   └── favicon.ico
   ```

2. **Replace text with image** in `EnhancedNavigation.tsx`:
   ```tsx
   // Replace the text logo with:
   <Link href="/" className="flex items-center">
     <img 
       src="/logo.svg" 
       alt="Your Company Name" 
       className="h-8 w-auto"
     />
   </Link>
   ```

### Option B: Keep Text Logo
Just replace "YOUR COMPANY NAME" with your actual company name.

## 📝 **Step 3: Update Your Content**

### Main Content Files to Edit:

1. **Company Info** (`client/src/data/company.ts`):
   ```typescript
   export const companyData: CompanyInfo = {
     name: 'Your Company Name',
     description: 'What your company does...',
     mission: 'Your mission statement...',
     values: [
       'Your core value 1',
       'Your core value 2',
       // ...
     ],
     contactInfo: {
       phone: 'Your phone number',
       email: 'your@email.com',
       address: {
         street: 'Your address',
         city: 'Your city',
         // ...
       }
     }
   };
   ```

2. **Services** (in `client/src/pages/Services.tsx`):
   - Update the `mockServices` array with your actual services
   - Change titles, descriptions, capabilities, pricing

3. **Products** (`client/src/data/mockProducts.ts`):
   - Replace with your actual products
   - Update names, descriptions, prices, images

4. **Portfolio/Projects** (`client/src/data/mockProjects.ts`):
   - Add your actual projects/case studies
   - Update images, descriptions, results

5. **Blog Posts** (`client/src/data/mockBlog.ts`):
   - Replace with your actual blog content
   - Update titles, content, images, SEO data

## 🖼️ **Step 4: Replace Images**

### Image Directory Structure:
```
client/public/images/
├── hero/
│   ├── hero-1.jpg
│   └── hero-2.jpg
├── portfolio/
│   ├── project-1.jpg
│   └── project-2.jpg
├── products/
│   ├── product-1.jpg
│   └── product-2.jpg
├── team/
│   ├── team-member-1.jpg
│   └── team-member-2.jpg
└── blog/
    ├── blog-post-1.jpg
    └── blog-post-2.jpg
```

### Image Requirements:
- **Hero Images**: 1920x1080px (landscape)
- **Portfolio**: 1200x800px 
- **Products**: 800x600px
- **Team Photos**: 400x400px (square)
- **Blog Images**: 1200x630px

## 🔍 **Step 5: SEO Optimization**

### Update SEO Data in Each File:

1. **Page Titles**: Make them descriptive and keyword-rich
2. **Meta Descriptions**: 150-160 characters, compelling
3. **Keywords**: Include relevant industry terms
4. **Alt Text**: Describe all images for accessibility

### Example SEO Updates:
```typescript
// In your data files, update SEO fields like:
{
  title: "Professional Interior Design Services | Your Company",
  description: "Expert interior design and custom furniture for hotels and restaurants. Transform your space with our award-winning design team.",
  keywords: ["interior design", "hotel furniture", "restaurant design", "custom furniture"]
}
```

## 🎨 **Step 6: Customize Colors & Branding**

### Update Brand Colors:
Edit `client/src/index.css` to change the color scheme:

```css
:root {
  --primary: your-brand-color;
  --secondary: your-secondary-color;
  /* ... other colors */
}
```

## 🚀 **Quick Start Template**

Tell me:
1. **Your company name**
2. **Your business type** (interior design, restaurant, hotel, etc.)
3. **Your main services** (3-5 key services)
4. **Your location**
5. **Your contact info**

And I'll help you update the key files with your information!

## 📞 **Need Help?**

Just ask me to:
- "Update my company name to [Your Name]"
- "Change my services to [list your services]"
- "Help me write SEO-friendly content for [specific page]"
- "Show me how to add my logo"

I'll make the specific changes for you!