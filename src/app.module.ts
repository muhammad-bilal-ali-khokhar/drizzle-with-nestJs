import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [DrizzleModule, TodosModule],
})
export class AppModule {}