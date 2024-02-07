import React, { createContext, useContext, ReactNode } from "react";
import usePriceFetcher from "../hooks/usePriceFetcher";

interface PriceContextProps {
  children: ReactNode;
}

interface PriceContextValue {
  rate: number | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}

const defaultPriceContextValue: PriceContextValue = {
  rate: null,
  loading: false,
  error: null,
  refresh: () => {},
};

const PriceContext = createContext<PriceContextValue>(defaultPriceContextValue);

export const PriceProvider: React.FC<PriceContextProps> = ({ children }) => {
  const priceFetcher = usePriceFetcher();

  return (
    <PriceContext.Provider
      value={{ ...defaultPriceContextValue, ...priceFetcher }}
    >
      {children}
    </PriceContext.Provider>
  );
};

export const usePriceContext = (): PriceContextValue => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error("usePriceContext must be used within a PriceProvider");
  }
  return context;
};


export function convertWeiToUSD(weiAmount: bigint, ethToUSDRate: number): number {
  const etherAmount = Number(weiAmount) / 1e18;

  let usdPrice = etherAmount * ethToUSDRate;

  usdPrice = Number(usdPrice.toFixed(2));

  return usdPrice;
}
