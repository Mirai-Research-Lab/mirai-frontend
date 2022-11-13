import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import { SSRProvider } from "react-bootstrap";
import axios from "axios";

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <>
      <SSRProvider>
        <MoralisProvider initializeOnMount={false}>
          <NotificationProvider>
            <Component {...pageProps} currentUser={currentUser} />
          </NotificationProvider>
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
      client,
      data.currentuser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
