import { useRef, useState, useEffect } from "react";
import { KRAKEN_WEB_SOCKET } from "@/constants/web-socket";

const KRAKEN_OHLC_CHANNEL = "ohlc";

const useKrakenOhlcSocket = ({
  symbol,
  skip,
}: {
  symbol: string;
  skip: boolean;
}) => {
  const [ohlcDataSocket, setOhlcDataSocket] = useState<number[]>([]);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (skip) return;

    ws.current = new WebSocket(KRAKEN_WEB_SOCKET);

    ws.current.onopen = () => {
      ws.current?.send(
        JSON.stringify({
          method: "subscribe",
          params: {
            channel: KRAKEN_OHLC_CHANNEL,
            symbol: [symbol],
            interval: 1,
          },
        })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.channel === KRAKEN_OHLC_CHANNEL) {
        const item = data.data[0];

        setOhlcDataSocket([
          Number(new Date(item.timestamp).getTime()),
          Number(item.open),
          Number(item.high),
          Number(item.low),
          Number(item.close),
        ]);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [symbol]);

  return { ohlcDataSocket };
};

export default useKrakenOhlcSocket;
