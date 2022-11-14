import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import { SSRProvider } from "react-bootstrap";
import axios from "axios";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/36895/nft-marketplace/v0.0.1",
});

function MyApp({ Component, pageProps, currentuser }) {
  return (
    <>
      <SSRProvider>
        <MoralisProvider initializeOnMount={false}>
          <ApolloProvider client={client}>
            <NotificationProvider>
              <Component
                {...pageProps}
                currentuser={currentuser ? currentuser[0] : ""}
              />
            </NotificationProvider>
          </ApolloProvider>
        </MoralisProvider>
      </SSRProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const { data } = await axios("http://localhost:3001/api/auth/currentuser", {
    headers: appContext.ctx.req?.headers || null,
    method: "GET",
    withCredentials: true,
  });
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      data.currentuser[0]
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
