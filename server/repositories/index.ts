// Repository exports for easy importing
export { BaseRepository } from "./base";
export { CompanyRepository } from "./company";
export { ProductRepository } from "./products";

// Create repository instances
export const companyRepository = new CompanyRepository();
export const productRepository = new ProductRepository();