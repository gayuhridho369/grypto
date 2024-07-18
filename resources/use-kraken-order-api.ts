import { useEffect, useState } from "react";
import { KRAKEN_API_URL } from "@/constants/api";

const useKrakenOrderAPi = ({
  pair,
  resultKey,
  refresh,
}: {
  pair: string;
  resultKey: string;
  refresh: number;
}) => {
  const [dataOrderAsksApi, setDataOrderAsksApi] = useState([]);
  const [dataOrderBidsApi, setDataOrderBidsApi] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDataOrderAsksApi([]);
    setDataOrderBidsApi([]);

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${KRAKEN_API_URL}/Depth?pair=${pair}`);
        if (!response.ok) {
          throw new Error("Fetch data failed, something went wrong!");
        }
        const result = await response.json();
        const data = result.result[resultKey];
        setDataOrderAsksApi(data.asks || []);
        setDataOrderBidsApi(data.asks || []);

        setLoading(false);
      } catch (error) {
        console.error("error fetch order:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [pair, refresh]);

  return { dataOrderAsksApi, dataOrderBidsApi, dataOrderApiLoading: loading };
};

export default useKrakenOrderAPi;
