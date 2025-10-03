# Content Management API Documentation

This document describes the REST API endpoints for managing content in the business website.

## Authentication

All admin endpoints require authentication using JWT tokens.

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "1",
    "username": "admin",
    "role": "admin"
  }
}
```

### Using the Token
Include the token in the Authorization header for protected endpoints:
```
Authorization: Bearer jwt_token_here
```

## Team Members API

### Get All Team Members
```
GET /api/team?companyId=uuid
```

### Get Single Team Member
```
GET /api/team/:id
```

### Create Team Member (Admin)
```
POST /api/team
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "companyId": "uuid",
  "name": "John Doe",
  "role": "Senior Designer",
  "bio": "Experienced interior designer...",
  "imageUrl": "/uploads/images/john-doe.jpg",
  "experience": ["10 years in commercial design", "LEED certified"],
  "orderIndex": 1,
  "isActive": true
}
```

### Update Team Member (Admin)
```
PUT /api/team/:id
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "John Doe Updated",
  "role": "Lead Designer"
}
```

### Delete Team Member (Admin)
```
DELETE /api/team/:id
Authorization: Bearer jwt_token_here
```

## Services API

### Get All Services
```
GET /api/services?companyId=uuid
```

### Get Single Service
```
GET /api/services/:id
```

### Create Service (Admin)
```
POST /api/services
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "companyId": "uuid",
  "title": "Interior Design",
  "description": "Complete interior design services...",
  "capabilities": ["Space planning", "Material selection"],
  "processSteps": ["Initial consultation", "Design development"],
  "images": ["/uploads/images/service1.jpg"],
  "orderIndex": 1
}
```

### Update Service (Admin)
```
PUT /api/services/:id
Authorization: Bearer jwt_token_here
```

### Delete Service (Admin)
```
DELETE /api/services/:id
Authorization: Bearer jwt_token_here
```

## Products API

### Get All Products
```
GET /api/products?companyId=uuid&categoryId=uuid&search=chair&materials=wood&priceRange=$$&isFeatured=true&limit=20&offset=0
```

### Get Single Product
```
GET /api/products/:id
```

### Create Product (Admin)
```
POST /api/products
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "companyId": "uuid",
  "categoryId": "uuid",
  "name": "Executive Chair",
  "description": "Comfortable executive chair...",
  "specifications": {
    "dimensions": "30\"W x 32\"D x 45\"H",
    "weight": "45 lbs"
  },
  "images": ["/uploads/images/chair1.jpg"],
  "materials": ["leather", "steel"],
  "priceRange": "$$$",
  "isFeatured": true
}
```

### Update Product (Admin)
```
PUT /api/products/:id
Authorization: Bearer jwt_token_here
```

### Delete Product (Admin)
```
DELETE /api/products/:id
Authorization: Bearer jwt_token_here
```

## Projects API

### Get All Projects
```
GET /api/projects?companyId=uuid&brand=Marriott&segment=hospitality&location=New York&isFeatured=true&limit=20&offset=0
```

### Get Single Project
```
GET /api/projects/:id
```

### Create Project (Admin)
```
POST /api/projects
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "companyId": "uuid",
  "title": "Marriott Hotel Renovation",
  "client": "Marriott International",
  "location": "New York, NY",
  "brand": "Marriott",
  "segment": "hospitality",
  "description": "Complete renovation of 200-room hotel...",
  "challenges": ["Tight timeline", "Working around guests"],
  "solutions": ["Phased approach", "Night work schedule"],
  "results": ["Completed on time", "Increased guest satisfaction"],
  "images": [
    {
      "url": "/uploads/images/project1-before.jpg",
      "caption": "Before renovation",
      "type": "before"
    }
  ],
  "completedAt": "2024-01-15",
  "isFeatured": true
}
```

### Update Project (Admin)
```
PUT /api/projects/:id
Authorization: Bearer jwt_token_here
```

### Delete Project (Admin)
```
DELETE /api/projects/:id
Authorization: Bearer jwt_token_here
```

## Blog API

### Get All Blog Posts
```
GET /api/blog?companyId=uuid&category=design&search=trends&isPublished=true&limit=10&offset=0
```

### Get Blog Post by Slug
```
GET /api/blog/slug/latest-design-trends-2024
```

### Get Single Blog Post
```
GET /api/blog/:id
```

### Create Blog Post (Admin)
```
POST /api/blog
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "companyId": "uuid",
  "title": "Latest Design Trends 2024",
  "slug": "latest-design-trends-2024",
  "excerpt": "Discover the hottest design trends...",
  "content": "Full blog post content here...",
  "author": "Jane Smith",
  "category": "Design Trends",
  "tags": ["design", "trends", "2024"],
  "featuredImage": "/uploads/images/blog-featured.jpg",
  "publishedAt": "2024-01-15T10:00:00Z",
  "isPublished": true
}
```

### Update Blog Post (Admin)
```
PUT /api/blog/:id
Authorization: Bearer jwt_token_here
```

### Delete Blog Post (Admin)
```
DELETE /api/blog/:id
Authorization: Bearer jwt_token_here
```

### Get Blog Categories
```
GET /api/blog/meta/categories?companyId=uuid
```

## Media Management API

### Upload Single File (Admin)
```
POST /api/media/upload
Authorization: Bearer jwt_token_here
Content-Type: multipart/form-data

Form data:
- file: [file to upload]
```

Response for image:
```json
{
  "success": true,
  "data": {
    "filename": "image-123456789.jpg",
    "originalName": "my-image.jpg",
    "mimetype": "image/jpeg",
    "size": 1024000,
    "path": "uploads/images/image-123456789.jpg",
    "url": "/uploads/images/image-123456789.jpg",
    "isImage": true,
    "variants": {
      "original": "uploads/images/image-123456789.jpg",
      "thumbnail": "uploads/images/image-123456789-thumb.webp",
      "medium": "uploads/images/image-123456789-medium.webp",
      "optimized": "uploads/images/image-123456789-optimized.webp"
    },
    "urls": {
      "original": "/uploads/images/image-123456789.jpg",
      "thumbnail": "/uploads/images/image-123456789-thumb.webp",
      "medium": "/uploads/images/image-123456789-medium.webp",
      "optimized": "/uploads/images/image-123456789-optimized.webp"
    }
  }
}
```

### Upload Multiple Files (Admin)
```
POST /api/media/upload-multiple
Authorization: Bearer jwt_token_here
Content-Type: multipart/form-data

Form data:
- files: [array of files to upload]
```

### List Files (Admin)
```
GET /api/media/list?type=all&limit=50&offset=0
```

Types: `all`, `images`, `documents`

### Get File Information (Admin)
```
GET /api/media/info/:filename?type=images
```

### Delete File (Admin)
```
DELETE /api/media/:filename?type=images
Authorization: Bearer jwt_token_here
```

## File Upload Guidelines

### Supported File Types
- **Images**: JPEG, JPG, PNG, WebP, GIF
- **Documents**: PDF, DOC, DOCX, XLS, XLSX

### File Size Limits
- Maximum file size: 10MB
- Maximum files per request: 10

### Image Optimization
When images are uploaded, the system automatically creates optimized versions:
- **Thumbnail**: 150x150px, WebP format
- **Medium**: 800x600px max, WebP format  
- **Optimized**: 1200x900px max, WebP format
- **Original**: Unchanged

### Error Responses
All endpoints return errors in this format:
```json
{
  "error": "Error message here",
  "details": "Additional details if available"
}
```

Common HTTP status codes:
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (missing or invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error