import "@/styles/globals.css";
import "@/styles/Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import Head from "next/head";

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KXX93ZWG0M"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
    </>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>OpenParkingMap</title>
      </Head>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
