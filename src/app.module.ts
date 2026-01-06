import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { TodosModule } from './todos/todos.module';
import { ShardRoutingService } from './sharding/shard-routing.service';

@Module({
  imports: [DrizzleModule, TodosModule],
  providers: [ShardRoutingService],
  exports: [ShardRoutingService],
})
export class AppModule {}