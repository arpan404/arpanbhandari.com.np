export default () => ({
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: true,
      defaultLimit: 10000,
      maxLimit: 100000,
    },
  },
});
