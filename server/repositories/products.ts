import { eq, and, ilike, inArray } from "drizzle-orm";
import { products, productCategories, type Product, type InsertProduct, type ProductCategory } from "@shared/schema";
import { BaseRepository } from "./base";
import crypto from "crypto";

export interface ProductFilter {
  companyId?: string;
  categoryId?: string;
  search?: string;
  materials?: string[];
  priceRange?: string;
  isFeatured?: boolean;
}

export class ProductRepository extends BaseRepository {
  async findById(id: string): Promise<Product | undefined> {
    try {
      const result = await this.db
        .select()
        .from(products)
        .where(eq(products.id, id))
        .limit(1);
      
      return result[0];
    } catch (error) {
      this.handleError(error, 'findById');
    }
  }

  async findByCompany(companyId: string, filters?: ProductFilter): Promise<Product[]> {
    try {
      const conditions = [eq(products.companyId, companyId)];

      if (filters?.categoryId) {
        conditions.push(eq(products.categoryId, filters.categoryId));
      }

      if (filters?.search) {
        conditions.push(ilike(products.name, `%${filters.search}%`));
      }

      if (filters?.isFeatured !== undefined) {
        conditions.push(eq(products.isFeatured, filters.isFeatured));
      }

      const query = this.db
        .select()
        .from(products)
        .where(and(...conditions));

      return await query;
    } catch (error) {
      this.handleError(error, 'findByCompany');
    }
  }

  async findWithCategory(id: string): Promise<(Product & { category: ProductCategory }) | undefined> {
    try {
      const result = await this.db
        .select()
        .from(products)
        .leftJoin(productCategories, eq(products.categoryId, productCategories.id))
        .where(eq(products.id, id))
        .limit(1);
      
      if (result.length === 0) return undefined;
      
      const row = result[0];
      return {
        ...row.products,
        category: row.product_categories!
      };
    } catch (error) {
      this.handleError(error, 'findWithCategory');
    }
  }

  async create(data: InsertProduct): Promise<Product> {
    try {
      const result = await this.db
        .insert(products)
        .values(data)
        .returning();
      
      return result[0];
    } catch (error) {
      this.handleError(error, 'create');
    }
  }

  async update(id: string, data: Partial<InsertProduct>): Promise<Product | undefined> {
    try {
      const result = await this.db
        .update(products)
        .set(data)
        .where(eq(products.id, id))
        .returning();
      
      return result[0];
    } catch (error) {
      this.handleError(error, 'update');
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.db
        .delete(products)
        .where(eq(products.id, id))
        .returning();
      
      return result.length > 0;
    } catch (error) {
      this.handleError(error, 'delete');
    }
  }

  async findFeatured(companyId: string, limit: number = 6): Promise<Product[]> {
    try {
      return await this.db
        .select()
        .from(products)
        .where(and(
          eq(products.companyId, companyId),
          eq(products.isFeatured, true)
        ))
        .limit(limit);
    } catch (error) {
      this.handleError(error, 'findFeatured');
    }
  }
}