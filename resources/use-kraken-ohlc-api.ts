import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { KRAKEN_API_URL } from "@/constants/api";

const useKrakenOhlcApi = ({
  pair,
  resultKey,
}: {
  pair: string;
  resultKey: string;
}) => {
  const { theme } = useTheme();

  const [dataOhlcApi, setDataOhlcApi] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentTime = new Date().getTime();
  const oneWeekAgoTime = currentTime - 7 * 24 * 60 * 60 * 1000;
  const oneWeekAgoTimestamp = Math.floor(oneWeekAgoTime / 1000);

  useEffect(() => {
    setDataOhlcApi([]);

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${KRAKEN_API_URL}/OHLC?pair=${pair}&since=${oneWeekAgoTimestamp}`
        );
        if (!response.ok) {
          throw new Error("Fetch data failed, something went wrong!");
        }
        const result = await response.json();
        const data = result.result[resultKey];

        const normalizeData = (data || []).map((arr: Array<undefined>) => {
          const newData = [...arr];
          newData.splice(5, 3);

          const epochTimestampInSeconds = Number(newData[0]);
          const timestampInMilliseconds = epochTimestampInSeconds * 1000;
          const finalData = [timestampInMilliseconds, ...newData.slice(1)];

          return finalData.map(Number);
        });

        setDataOhlcApi(normalizeData);
        setLoading(false);
      } catch (error) {
        console.error("error", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [pair, theme]);

  return { dataOhlcApi, dataOhlcApiLoading: loading };
};

export default useKrakenOhlcApi;
