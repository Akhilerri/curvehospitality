import { sql } from "drizzle-orm";
import { 
  sqliteTable, 
  text, 
  integer, 
  uniqueIndex 
} from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";
import crypto from "crypto";

// Existing users table
export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Companies table for multi-tenant support
export const companies = sqliteTable("companies", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description"),
  foundedYear: integer("founded_year"),
  mission: text("mission"),
  values: text("values"), // Stored as JSON string
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

// Team members
export const teamMembers = sqliteTable("team_members", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  companyId: text("company_id").references(() => companies.id),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio"),
  imageUrl: text("image_url"),
  experience: text("experience"), // Stored as JSON string
  orderIndex: integer("order_index").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
});

// Services
export const services = sqliteTable("services", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  companyId: text("company_id").references(() => companies.id),
  title: text("title").notNull(),
  description: text("description"),
  capabilities: text("capabilities"), // Stored as JSON string
  processSteps: text("process_steps"), // Stored as JSON string
  images: text("images"), // Stored as JSON string
  orderIndex: integer("order_index").default(0),
});

// Product categories
export const productCategories = sqliteTable("product_categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  companyId: text("company_id").references(() => companies.id),
  name: text("name").notNull(),
  description: text("description"),
  parentId: text("parent_id"),
  orderIndex: integer("order_index").default(0),
});

// Products
export const products = sqliteTable("products", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  companyId: text("company_id").references(() => companies.id),
  categoryId: text("category_id").references(() => productCategories.id),
  name: text("name").notNull(),
  description: text("description"),
  specifications: text("specifications"), // Stored as JSON string
  images: text("images"), // Stored as JSON string
  materials: text("materials"), // Stored as JSON string
  priceRange: text("price_range"),
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
});

// Projects
export const projects = sqliteTable("projects", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  companyId: text("company_id").references(() => companies.id),
  title: text("title").notNull(),
  client: text("client"),
  location: text("location"),
  brand: text("brand"),
  segment: text("segment"),
  description: text("description"),
  challenges: text("challenges"), // Stored as JSON string
  solutions: text("solutions"), // Stored as JSON string
  results: text("results"), // Stored as JSON string
  images: text("images"), // Stored as JSON string
  completedAt: integer("completed_at", { mode: "timestamp" }),
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
});

// Blog posts
export const blogPosts = sqliteTable("blog_posts", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  companyId: text("company_id").references(() => companies.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  author: text("author"),
  category: text("category"),
  tags: text("tags"), // Stored as JSON string
  featuredImage: text("featured_image"),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  isPublished: integer("is_published", { mode: "boolean" }).default(false),
});

// Downloadable guides
export const guides = sqliteTable("guides", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  companyId: text("company_id").references(() => companies.id),
  title: text("title").notNull(),
  description: text("description"),
  fileUrl: text("file_url").notNull(),
  fileSize: text("file_size"),
  downloadCount: integer("download_count").default(0),
  requiresLeadCapture: integer("requires_lead_capture", { mode: "boolean" }).default(true),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
});

// Contact form submissions
export const contactSubmissions = sqliteTable("contact_submissions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  companyId: text("company_id").references(() => companies.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  projectType: text("project_type"),
  message: text("message").notNull(),
  submittedAt: integer("submitted_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  status: text("status").default("new"),
});

// Define relationships
export const companiesRelations = relations(companies, ({ many }) => ({
  teamMembers: many(teamMembers),
  services: many(services),
  productCategories: many(productCategories),
  products: many(products),
  projects: many(projects),
  blogPosts: many(blogPosts),
  guides: many(guides),
  contactSubmissions: many(contactSubmissions),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  company: one(companies, {
    fields: [teamMembers.companyId],
    references: [companies.id],
  }),
}));

export const servicesRelations = relations(services, ({ one }) => ({
  company: one(companies, {
    fields: [services.companyId],
    references: [companies.id],
  }),
}));

export const productCategoriesRelations = relations(productCategories, ({ one, many }) => ({
  company: one(companies, {
    fields: [productCategories.companyId],
    references: [companies.id],
  }),
  parent: one(productCategories, {
    fields: [productCategories.parentId],
    references: [productCategories.id],
    relationName: "parentCategory",
  }),
  children: many(productCategories, {
    relationName: "parentCategory",
  }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  company: one(companies, {
    fields: [products.companyId],
    references: [companies.id],
  }),
  category: one(productCategories, {
    fields: [products.categoryId],
    references: [productCategories.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one }) => ({
  company: one(companies, {
    fields: [projects.companyId],
    references: [companies.id],
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  company: one(companies, {
    fields: [blogPosts.companyId],
    references: [companies.id],
  }),
}));

export const guidesRelations = relations(guides, ({ one }) => ({
  company: one(companies, {
    fields: [guides.companyId],
    references: [companies.id],
  }),
}));

export const contactSubmissionsRelations = relations(contactSubmissions, ({ one }) => ({
  company: one(companies, {
    fields: [contactSubmissions.companyId],
    references: [companies.id],
  }),
}));

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCompanySchema = createInsertSchema(companies);
export const insertTeamMemberSchema = createInsertSchema(teamMembers);
export const insertServiceSchema = createInsertSchema(services);
export const insertProductCategorySchema = createInsertSchema(productCategories);
export const insertProductSchema = createInsertSchema(products);
export const insertProjectSchema = createInsertSchema(projects);
export const insertBlogPostSchema = createInsertSchema(blogPosts);
export const insertGuideSchema = createInsertSchema(guides);
export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions);

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type ProductCategory = typeof productCategories.$inferSelect;
export type InsertProductCategory = z.infer<typeof insertProductCategorySchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type Guide = typeof guides.$inferSelect;
export type InsertGuide = z.infer<typeof insertGuideSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;