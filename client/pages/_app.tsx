import type { AppProps } from 'next/app';
import '../styles/globals.css'
import SocketsProvider from "../context/socket.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketsProvider>
      <Component {...pageProps} />
    </SocketsProvider>
  );
}

export default MyApp;