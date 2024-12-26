import client from '@/lib/graphql';
import { DocumentNode } from 'graphql';
import redis from '@/lib/redis';

/**
 * Fetches data from a GraphQL API and caches it using Redis.
 *
 * @template T - The expected shape of the response data.
 * @param {DocumentNode} query - The GraphQL query to be executed.
 * @param {string} queryHash - A unique hash for the query to be used as the cache key.
 * @param {number} [staleTime=3600] - The time in seconds for which the cached data is considered fresh. Defaults to 1 minute.
 * @returns {Promise<T>} - A promise that resolves to the fetched data.
 * @throws {Error} - Throws an error if the query fails.
 */

const fetchGraphQL = async <T>(
  query: DocumentNode,
  queryHash: string,
  staleTime: number = 3600 // default to 1 minute
): Promise<T> => {
  try {
    // First check if the data is in the cache
    const cachedData = await redis.get(queryHash);
    // if (cachedData) {
    //   return JSON.parse(cachedData) as T;
    // }

    // If not, fetch the data from the API
    const response = await client.query({
      query: query,
      fetchPolicy: 'network-only',
    });
    const data = response.data;
    console.log('🚀 ~ data:', data);

    // Store the data in the cache
    await redis.set(queryHash, JSON.stringify(data), 'EX', staleTime);

    return data as T;
  } catch (e: unknown) {
    console.error(e);
    return null as T;
  }
};

export default fetchGraphQL;
