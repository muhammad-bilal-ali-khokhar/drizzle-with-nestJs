import { Global, Module } from "@nestjs/common";
import { ShardRoutingService } from "./shard-routing.service";

@Global()
@Module({
    providers: [ShardRoutingService],
    exports: [ShardRoutingService],
})
export class ShardModule { }
