import client from '@/config/graphql';
import { DocumentNode } from 'graphql';
export default async function fetchGraphQL<T>(
  query: DocumentNode,
  fetchPolicy: 'network-only' | 'cache-first'
): Promise<T> {
  try {
    const data = (await client.query({
      query: query,
      context: {
        fetchOptions: {
          next: { revalidate: 2 },
        },
      },
      fetchPolicy: fetchPolicy,
    })) as T;
    return data;
  } catch (e) {
    console.error(e);
    return {
      data: null,
    } as T;
  }
}
