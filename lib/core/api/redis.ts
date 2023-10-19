import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType;

(async () => {
  redisClient = createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

export namespace RedisService {
  export const getCached = async (key: any): Promise<object | null> => {
    const cached = await redisClient.get(JSON.stringify(key));
    if (cached) return JSON.parse(cached);
    return null;
  };

  export const setCache = async (key: any, value: any) => {
    await redisClient.set(JSON.stringify(key), JSON.stringify(value));
  };
}
