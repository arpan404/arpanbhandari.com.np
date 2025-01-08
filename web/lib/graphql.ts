import { ApolloClient, InMemoryCache } from '@apollo/client';

// Create an Apollo client to connect to the Strapi API and use it in the app
const client = new ApolloClient({
   uri: process.env.NEXT_PUBLIC_STRAPI_URL + '/graphql',
   cache: new InMemoryCache({
      addTypename: false,
      resultCaching: false,
   }),
   headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
   },
});

export default client;
