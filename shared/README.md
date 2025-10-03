# Shared Types and Validation

This directory contains comprehensive TypeScript interfaces and Zod validation schemas for the business website application.

## Directory Structure

```
shared/
├── types/           # TypeScript interface definitions
│   ├── index.ts     # Main export file
│   ├── common.ts    # Common types and utilities
│   ├── company.ts   # Company-related types
│   ├── team.ts      # Team member types
│   ├── services.ts  # Service types
│   ├── products.ts  # Product and category types
│   ├── projects.ts  # Project and portfolio types
│   ├── blog.ts      # Blog and content types
│   ├── guides.ts    # Downloadable guide types
│   ├── contact.ts   # Contact and form types
│   ├── navigation.ts # Navigation and UI types
│   └── api.ts       # API response and request types
├── validation/      # Zod validation schemas
│   ├── index.ts     # Main export file
│   ├── common.ts    # Common validation schemas
│   ├── company.ts   # Company validation
│   ├── team.ts      # Team member validation
│   ├── services.ts  # Service validation
│   ├── products.ts  # Product validation
│   ├── projects.ts  # Project validation
│   ├── blog.ts      # Blog validation
│   ├── guides.ts    # Guide validation
│   ├── contact.ts   # Contact validation
│   ├── api.ts       # API validation
│   └── forms.ts     # Form-specific validation
└── schema.ts        # Drizzle ORM database schema
```

## Key Features

### Type Definitions

- **Complete Data Models**: All entities (Company, TeamMember, Service, Product, etc.)
- **API Request/Response Types**: Standardized API interfaces
- **Form Data Types**: Client-side form interfaces
- **Navigation Types**: UI navigation and layout types
- **Common Utilities**: Pagination, filtering, sorting, and search types

### Validation Schemas

- **Zod Integration**: All validation using Zod for runtime type safety
- **Form Validation**: Ready-to-use form validation schemas
- **API Validation**: Request/response validation
- **Common Patterns**: Reusable validation patterns (email, phone, URLs, etc.)

### Database Schema

- **Drizzle ORM**: PostgreSQL schema with proper relationships
- **Type Safety**: Generated types from schema
- **Validation Integration**: Zod schemas generated from Drizzle schema

## Usage Examples

### Importing Types

```typescript
import { 
  Company, 
  TeamMember, 
  Product, 
  ContactSubmission 
} from '@shared/types';
```

### Using Validation Schemas

```typescript
import { 
  createCompanySchema, 
  contactFormValidation 
} from '@shared/validation';

// Validate form data
const result = contactFormValidation.safeParse(formData);
if (result.success) {
  // Handle valid data
  console.log(result.data);
}
```

### API Response Types

```typescript
import { CompanyResponse, ProductListResponse } from '@shared/types';

const fetchCompany = async (id: string): Promise<CompanyResponse> => {
  // API call implementation
};
```

## Requirements Coverage

This implementation covers all requirements specified in the task:

### 1.1 - Company Information Types
- ✅ Company entity with history, mission, values
- ✅ Team member profiles with experience and roles
- ✅ Contact information and business details

### 2.1 - Services Types  
- ✅ Service categories (Manufacturing, Interior Design, Procurement, Project Management)
- ✅ Service capabilities and process steps
- ✅ Pricing and duration information

### 3.1 - Products Types
- ✅ Product categories (8 main categories as specified)
- ✅ Product specifications, materials, and pricing
- ✅ Search and filtering capabilities

### 4.1 - Projects Types
- ✅ Project portfolio with case studies
- ✅ Filtering by Brand, Segment, Location
- ✅ Before/after images and testimonials

### 6.1 - Resources Types
- ✅ Blog posts with categories and tags
- ✅ Downloadable guides with lead capture
- ✅ Search and categorization

### 7.1 - Contact Types
- ✅ Contact forms with validation
- ✅ Multiple contact methods
- ✅ Lead management and tracking

### 8.1 - Navigation and UI Types
- ✅ Responsive navigation components
- ✅ Mobile-friendly interfaces
- ✅ Accessibility considerations

## Validation Features

- **Email Validation**: RFC-compliant email validation
- **Phone Validation**: International phone number support
- **URL Validation**: Proper URL format checking
- **File Validation**: File type and size validation
- **Date Validation**: Past/future date constraints
- **Price Validation**: Currency and range validation
- **Text Validation**: Length constraints and content validation

## API Standards

- **Consistent Response Format**: Standardized API response wrapper
- **Error Handling**: Comprehensive error type definitions
- **Pagination**: Built-in pagination support
- **Filtering**: Advanced filtering capabilities
- **Search**: Full-text search with faceting
- **Batch Operations**: Support for bulk operations

## Form Validation

Ready-to-use validation schemas for:
- Contact forms
- Newsletter signup
- Quote requests
- Consultation booking
- File uploads
- Lead capture forms
- Feedback forms

All validation schemas include proper error messages and type safety.