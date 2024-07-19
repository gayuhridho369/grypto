"use client";

import { useTheme } from "next-themes";
import { PropagateLoader } from "react-spinners";
import { Coin } from "@/constants/coin";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useBitfinexBookSocket from "@/resources/use-bitfinex-order-socket ";

export default function OrderBook({ coinSelected }: { coinSelected: Coin }) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const primaryColor = isLight ? "#2563EB" : "#3A81F4";

  const { bookData, bookDataLoading } = useBitfinexBookSocket({
    symbol: coinSelected.symbol,
  });

  return (
    <Card>
      <CardContent className="grid gap-2 p-6 md:p-8">
        <>
          <h2 className="text-red-500 font-bold">Asks</h2>
          <div className="h-[200px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookDataLoading ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <div className="h-[120px] flex items-center justify-center">
                        <PropagateLoader color={primaryColor} />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  bookData.map((ask, index) => {
                    if (ask[2] < 0) return null;

                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-red-500">
                          {Number(ask[0])}
                        </TableCell>
                        <TableCell className="font-medium">{ask[1]}</TableCell>
                        <TableCell className="text-right font-medium">
                          {Number(ask[2])}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          <h2 className="text-green-500 font-bold">Bids</h2>
          <div className="h-[200px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookDataLoading ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <div className="h-[120px] flex items-center justify-center">
                        <PropagateLoader color={primaryColor} />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  bookData.map((ask, index) => {
                    if (ask[2] > 0) return null;

                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-green-500">
                          {Number(ask[0])}
                        </TableCell>
                        <TableCell className="font-medium">{ask[1]}</TableCell>
                        <TableCell className="text-right font-medium">
                          {Math.abs(Number(ask[2]))}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </>
      </CardContent>
    </Card>
  );
}
