import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { todo } from '../database/schema';
import { DRIZZLE_DB } from '../drizzle/drizzle.module';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @Inject(DRIZZLE_DB) private readonly db: PostgresJsDatabase<any>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const result = await this.db.insert(todo).values(createTodoDto).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.db.select().from(todo).orderBy(todo.created_at);
  }

  async findOne(id: number) {
    const result = await this.db.select().from(todo).where(eq(todo.id, id));
    return result[0];
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const result = await this.db.update(todo).set(updateTodoDto).where(eq(todo.id, id)).returning();
    return result[0];
  }

  async remove(id: number) {
    const result = await this.db.delete(todo).where(eq(todo.id, id)).returning();
    return result[0];
  }
}