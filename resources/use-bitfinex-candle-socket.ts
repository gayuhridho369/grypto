import { useRef, useState, useEffect } from "react";

const useBitfinexCandleSocket = ({
  symbol,
  updateCandleData,
}: {
  symbol: string;
  updateCandleData: (value: number[]) => void;
}) => {
  const [candleData, setCandleData] = useState<number[][]>([]);
  const [loading, setLoading] = useState(false);

  const ws = useRef<WebSocket | null>(null);

  const isArrayofArrays = (variable: unknown) => {
    if (!Array.isArray(variable)) {
      return false;
    }
    return variable.every((element) => Array.isArray(element));
  };

  useEffect(() => {
    setLoading(true);
    setCandleData([]);

    ws.current = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

    ws.current.onopen = () => {
      ws.current?.send(
        JSON.stringify({
          event: "subscribe",
          channel: "candles",
          key: `trade:1m:t${symbol}`,
        })
      );
    };

    ws.current.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const data = response?.[1] || [];

      if (Array.isArray(data)) {
        if (isArrayofArrays(data)) {
          const normalizeData = data.map((item: Array<number>) => {
            const [timestamp, open, close, high, low] = item;
            return [timestamp, open, high, low, close];
          });

          setCandleData(normalizeData.reverse());
        } else {
          const [timestamp, open, close, high, low] = data;
          updateCandleData([timestamp, open, high, low, close]);
        }
      }

      setLoading(false);
    };

    ws.current.onerror = (error) => {
      console.error("Error candle bitfinex ws:", error);
    };

    return () => {
      ws.current?.close();
    };
  }, [symbol]);

  return { candleData, candleDataLoading: loading };
};

export default useBitfinexCandleSocket;
