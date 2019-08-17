import React from 'react';
import { IdentityContextProvider } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css';
import ApolloProvider from './src/apollo';

export const wrapRootElement = ({ element }) => (
  <IdentityContextProvider url={process.env.GATSBY_NETLIFY_URL}>
    <ApolloProvider>{element}</ApolloProvider>
  </IdentityContextProvider>
);
