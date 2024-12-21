import client from '@/config/graphql';
import { DocumentNode } from 'graphql';
export default async function fetchGraphQL(
  query: DocumentNode
): Promise<Object> {
  try {
    const data = await client.query({
      query: query,
    });
    return data;
  } catch (e) {
    console.error(e);
    return {
      data: null,
    };
  }
}
