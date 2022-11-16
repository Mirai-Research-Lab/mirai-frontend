import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import { SSRProvider } from "react-bootstrap";
import axios from "axios";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import buildClient from "../api/buildClient";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/36895/nft-marketplace/v0.0.1",
});

function MyApp({ Component, pageProps, currentuser }) {
  console.log(currentuser);
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
  let data = {};
  console.log(appContext);
  if (typeof window === "undefined") {
    const { data: responseData } = await axios.get(
      "https://mirai-backend-kappa.vercel.app/api/auth/currentuser",
      {
        headers: {
          cookies: appContext.ctx.req.headers.cookie,
        },
      }
    );
    data = responseData;
  } else {
    console.log(document);
    const { data: responseData } = await axios.get(
      "https://mirai-backend-kappa.vercel.app/api/auth/currentuser",
      {
        headers: {
          cookies: document.cookie,
        },
      }
    );
    data = responseData;
  }
  console.log(data);
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      data.currentuser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
