import type { AppProps } from "next/app";
import { Layout } from "../components/layout";
import { Web3Provider } from "../configuration/Web3";
import { ChakraProvider } from "../configuration/Chakra";
import { useIsMounted } from "../hooks/UseIsMounted";
import React, { createContext } from "react";
import { Head } from "../components/layout/Head";
import SEO from "../components/SEO";
import { ToastContainer, toast } from "react-toastify";
import { QueryClientProvider, queryClient } from "../configuration/QueryClient";

import { PriceProvider } from "../contexts/priceContext";

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted();

  return (
    <ChakraProvider>
      <SEO />
      <Head />
      <Web3Provider>
        <QueryClientProvider client={queryClient}>
          {isMounted && (
            <PriceProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PriceProvider>
          )}
        </QueryClientProvider>
        <ToastContainer />
      </Web3Provider>
    </ChakraProvider>
  );
}
