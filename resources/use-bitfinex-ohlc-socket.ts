import { useRef, useState, useEffect } from "react";

const useBitfinexOhlcSocket = ({
  updateData,
  symbol,
}: {
  updateData: (value: number[]) => void;
  symbol: string;
}) => {
  const [ohlcDataSocket, setOhlcDataSocket] = useState<number[][]>([]);
  const [loading, setLoading] = useState(false);

  const ws = useRef<WebSocket | null>(null);

  const isArrayofArrays = (variable: unknown) => {
    if (!Array.isArray(variable)) {
      return false;
    }
    return variable.every((element) => Array.isArray(element));
  };

  function isArrayofSixNumbers(variable: unknown) {
    if (!Array.isArray(variable) || variable.length !== 6) {
      return false;
    }
    return variable.every((element) => typeof element === "number");
  }

  useEffect(() => {
    setLoading(true);
    setOhlcDataSocket([]);

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
      const data = JSON.parse(event.data);

      if (isArrayofArrays(data[1])) {
        const normalizeData = data[1].map((item: Array<number>) => [
          item[0], // timestamp
          item[1], // open
          item[3], // high
          item[4], // lower
          item[2], // close
        ]);

        setOhlcDataSocket(normalizeData.reverse());
      }

      if (isArrayofSixNumbers(data[1])) {
        updateData([
          data[1][0],
          data[1][1],
          data[1][3],
          data[1][4],
          data[1][2],
        ]);
      }

      setLoading(false);
    };

    ws.current.onerror = (error) => {
      console.error("error ws ohlc:", error);
      setLoading(false);
    };

    return () => {
      ws.current?.close();
    };
  }, [symbol]);

  return { ohlcDataSocket, ohlcDataSocketLoading: loading };
};

export default useBitfinexOhlcSocket;
