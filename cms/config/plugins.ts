export default () => ({
   graphql: {
      config: {
         endpoint: '/graphql',
         shadowCRUD: true,
         playgroundAlways: true,
         defaultLimit: 10000,
         maxLimit: 100000,
      },
   },
   upload: {
      config: {
         sizeLimit: 100 * 1024 * 1024,
         provider: 'local',
         providerOptions: {},
      },
   },
});
