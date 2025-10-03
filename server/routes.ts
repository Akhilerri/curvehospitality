import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";
import contactRoutes from "./routes/contact";
import seoRoutes from "./routes/seo";
import teamRoutes from "./routes/team";
import servicesRoutes from "./routes/services";
import productsRoutes from "./routes/products";
import projectsRoutes from "./routes/projects";
import blogRoutes from "./routes/blog";
import mediaRoutes from "./routes/media";
import { loginHandler } from "./middleware/auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from uploads directory
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // Authentication endpoint
  app.post("/api/auth/login", loginHandler);

  // Register contact routes
  app.use("/api/contact", contactRoutes);

  // Register content management routes
  app.use("/api/team", teamRoutes);
  app.use("/api/services", servicesRoutes);
  app.use("/api/products", productsRoutes);
  app.use("/api/projects", projectsRoutes);
  app.use("/api/blog", blogRoutes);
  app.use("/api/media", mediaRoutes);

  // Register SEO routes (sitemap.xml and robots.txt)
  app.use("/", seoRoutes);

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
