import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? 'http://3.85.210.229/api/graphql' : 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

export default apolloClient;
