import { Injectable } from "@nestjs/common";
import { SHARD_REGIONS } from "./constants/shard.constants";
import { User } from "./types/shard.types";

@Injectable()
export class ShardRoutingService {
    getShardBaseUrl(user: User): string | undefined {
        if (user.region === SHARD_REGIONS.AS) {
            return process.env.CHECKY_CHECK_DATABASE_URL;
        }
        if (user.region === SHARD_REGIONS.US) {
            return process.env.PENDING_PARTY_DATABASE_URL;
        }
    }
}
