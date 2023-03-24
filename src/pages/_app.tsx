import "@/styles/globals.css";
import "@/styles/Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>OpenParkingMap</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
