import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STRAPI_URL + '/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
  },
});

export default client;
