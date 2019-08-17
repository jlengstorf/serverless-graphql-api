import React from 'react';
import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { ApolloProvider } from 'react-apollo-hooks';

const client = new ApolloClient({
  uri: `${process.env.GATSBY_NETLIFY_FUNCTIONS_URI}/graphql`,
  fetch
});

export default ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
