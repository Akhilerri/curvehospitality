import { sql } from "drizzle-orm";
import { 
  pgTable, 
  text, 
  varchar, 
  uuid, 
  timestamp, 
  integer, 
  boolean, 
  jsonb, 
  date 
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Existing users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Companies table for multi-tenant support
export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  foundedYear: integer("founded_year"),
  mission: text("mission"),
  values: text("values").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Team members
export const teamMembers = pgTable("team_members", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: uuid("company_id").references(() => companies.id),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  bio: text("bio"),
  imageUrl: varchar("image_url", { length: 500 }),
  experience: text("experience").array(),
  orderIndex: integer("order_index").default(0),
  isActive: boolean("is_active").default(true),
});

// Services
export const services = pgTable("services", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: uuid("company_id").references(() => companies.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  capabilities: text("capabilities").array(),
  processSteps: text("process_steps").array(),
  images: text("images").array(),
  orderIndex: integer("order_index").default(0),
});

// Product categories
export const productCategories = pgTable("product_categories", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: uuid("company_id").references(() => companies.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  parentId: uuid("parent_id"),
  orderIndex: integer("order_index").default(0),
});

// Products
export const products = pgTable("products", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: uuid("company_id").references(() => companies.id),
  categoryId: uuid("category_id").references(() => productCategories.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  specifications: jsonb("specifications"),
  images: text("images").array(),
  materials: text("materials").array(),
  priceRange: varchar("price_range", { length: 50 }),
  isFeatured: boolean("is_featured").default(false),
});

// Projects
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: uuid("company_id").references(() => companies.id),
  title: varchar("title", { length: 255 }).notNull(),
  client: varchar("client", { length: 255 }),
  location: varchar("location", { length: 255 }),
  brand: varchar("brand", { length: 255 }),
  segment: varchar("segment", { length: 100 }),
  description: text("description"),
  challenges: text("challenges").array(),
  solutions: text("solutions").array(),
  results: text("results").array(),
  images: jsonb("images"), // Array of image objects with metadata
  completedAt: date("completed_at"),
  isFeatured: boolean("is_featured").default(false),
});

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: uuid("company_id").references(() => companies.id),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  author: varchar("author", { length: 255 }),
  category: varchar("category", { length: 100 }),
  tags: text("tags").array(),
  featuredImage: varchar("featured_image", { length: 500 }),
  publishedAt: timestamp("published_at"),
  isPublished: boolean("is_published").default(false),
});

// Downloadable guides
export const guides = pgTable("guides", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: uuid("company_id").references(() => companies.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  fileUrl: varchar("file_url", { length: 500 }).notNull(),
  fileSize: varchar("file_size", { length: 20 }),
  downloadCount: integer("download_count").default(0),
  requiresLeadCapture: boolean("requires_lead_capture").default(true),
  isActive: boolean("is_active").default(true),
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: uuid("company_id").references(() => companies.id),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  projectType: varchar("project_type", { length: 100 }),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
  status: varchar("status", { length: 50 }).default("new"),
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
