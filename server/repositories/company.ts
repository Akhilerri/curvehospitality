import { eq } from "drizzle-orm";
import { companies, type Company, type InsertCompany } from "@shared/schema";
import { BaseRepository } from "./base";

export class CompanyRepository extends BaseRepository {
  async findById(id: string): Promise<Company | undefined> {
    try {
      const result = await this.db
        .select()
        .from(companies)
        .where(eq(companies.id, id))
        .limit(1);
      
      return result[0];
    } catch (error) {
      this.handleError(error, 'findById');
    }
  }

  async findAll(): Promise<Company[]> {
    try {
      return await this.db.select().from(companies);
    } catch (error) {
      this.handleError(error, 'findAll');
    }
  }

  async create(data: InsertCompany): Promise<Company> {
    try {
      const result = await this.db
        .insert(companies)
        .values(data)
        .returning();
      
      return result[0];
    } catch (error) {
      this.handleError(error, 'create');
    }
  }

  async update(id: string, data: Partial<InsertCompany>): Promise<Company | undefined> {
    try {
      const result = await this.db
        .update(companies)
        .set(data)
        .where(eq(companies.id, id))
        .returning();
      
      return result[0];
    } catch (error) {
      this.handleError(error, 'update');
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.db
        .delete(companies)
        .where(eq(companies.id, id))
        .returning();
      
      return result.length > 0;
    } catch (error) {
      this.handleError(error, 'delete');
    }
  }
}