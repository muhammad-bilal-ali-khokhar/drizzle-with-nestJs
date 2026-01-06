export type ShardRegion = 'as' | 'us';

export interface User {
  id: string;
  name: string;
  email: string;
  region: ShardRegion;
}