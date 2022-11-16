import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import { SSRProvider } from "react-bootstrap";
import axios from "axios";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import https from "https";

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
  // const instance = axios.create({
  //   httpsAgent: new https.Agent({
  //     rejectUnauthorized: false,
  //   }),
  // });
  // instance.get("https://mirai-backend-kappa.vercel.app/api/auth/currentuser");

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const { data } = await axios(
    "https://mirai-backend-kappa.vercel.app/api/auth/currentuser",
    {
      httpsAgent: agent,
      headers: appContext.ctx.req?.headers || null,
      method: "GET",
      withCredentials: true,
      rejectUnauthorized: false,
    }
  );

  // const { data } = await axios(
  //   "https://mirai-backend-kappa.vercel.app/api/auth/currentuser",
  //   {
  //     headers: appContext.ctx.req?.headers || null,
  //     method: "GET",
  //     withCredentials: true,
  //   }
  // );

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
