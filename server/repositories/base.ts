import { getDb } from "../db";

export abstract class BaseRepository {
  protected db = getDb();
  
  protected handleError(error: any, operation: string): never {
    console.error(`Repository error in ${operation}:`, error);
    
    if (error.code === '23505') {
      throw new Error('Resource already exists');
    }
    
    if (error.code === '23503') {
      throw new Error('Referenced resource not found');
    }
    
    if (error.code === '23502') {
      throw new Error('Required field is missing');
    }
    
    throw new Error(`Database operation failed: ${operation}`);
  }
}