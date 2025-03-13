import "@/styles/globals.css";
import { Footer } from "@/UI/Components/footer/Footer";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
