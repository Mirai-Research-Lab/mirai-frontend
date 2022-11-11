import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import { SSRProvider } from "react-bootstrap";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SSRProvider>
        <MoralisProvider initializeOnMount={false}>
          <NotificationProvider>
            <Component {...pageProps} />
          </NotificationProvider>
        </MoralisProvider>
      </SSRProvider>
    </>
  );
}

export default MyApp;
