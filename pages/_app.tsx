import 'styles/globals.css';
import Layout from 'components/Layout';
import { ApolloProvider } from '@apollo/client';
import apolloClient from 'lib/apollo';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
