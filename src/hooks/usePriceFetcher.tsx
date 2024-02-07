import { useQuery, useMutation } from "react-query";

interface PriceFetcherResult {
  rate: number | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}

const fetchPrice = async (): Promise<number> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  const data = await response.json();
  return data.ethereum.usd;
};

const usePriceFetcher = (): PriceFetcherResult => {
  const {
    data: price,
    isLoading,
    isError,
  } = useQuery<number>("price", fetchPrice, {
    refetchInterval: 3 * 60 * 1000,
  });

  const mutation = useMutation(fetchPrice);

  const refresh = () => mutation.mutate();

  return {
    rate: price ?? null,
    loading: isLoading,
    error: isError ? new Error("Error fetching price") : null,
    refresh,
  };
};

export default usePriceFetcher;
