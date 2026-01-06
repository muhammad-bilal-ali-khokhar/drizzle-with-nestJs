import { SHARD_REGIONS } from "src/sharding/constants/shard.constants";
import { User } from "src/sharding/types/shard.types";

export const user:User = {
    id: '1',
    name: 'Test User',
    email: 'balu@gmail.com',
    region: SHARD_REGIONS.US,
};