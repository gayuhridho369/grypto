import { useRef, useState, useEffect } from "react";

const useBitfinexBookSocket = ({ symbol }: { symbol: string }) => {
  const [bookData, setBookData] = useState<number[][]>([]);
  const [loading, setLoading] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const isArrayofArrays = (variable: unknown): variable is number[][] => {
    return Array.isArray(variable) && variable.every(Array.isArray);
  };

  let bookDataTemp: number[][] = [];

  const updateBookData = (update: number[]) => {
    const [price, count, amount] = update;

    if (count > 0) {
      const existingOrderIndex = bookDataTemp.findIndex(
        (order) => order[0] === price
      );

      if (existingOrderIndex !== -1) {
        bookDataTemp[existingOrderIndex] = [price, count, amount];
      } else {
        bookDataTemp.push([price, count, amount]);
      }
    } else if (price === 0) {
      bookDataTemp = bookDataTemp.filter((order) => order[0] !== price);
    }
  };

  useEffect(() => {
    setLoading(true);
    setBookData([]);

    ws.current = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

    ws.current.onopen = () => {
      ws.current?.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          symbol: `t${symbol}`,
        })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (Array.isArray(data[1])) {
        if (isArrayofArrays(data[1])) {
          const filteredData = data[1].filter((item) => item[1] !== 0);
          bookDataTemp = filteredData;

          setBookData(filteredData);
          setLoading(false);
        } else {
          updateBookData(data[1]);
        }
      }
    };

    ws.current.onerror = (error) => {
      console.error("Error book bitfinex ws:", error);
    };

    const interval = setInterval(() => {
      setBookData([...bookDataTemp]);
    }, 5000);

    return () => {
      ws.current?.close();
      clearInterval(interval);
    };
  }, [symbol]);

  return { bookData, bookDataLoading: loading };
};

export default useBitfinexBookSocket;
