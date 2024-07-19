import { ReactNode } from "react";
import HeaderSider from "./header-sider";
import Footer from "./footer";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-[1600px] m-auto">
      <HeaderSider />
      <main className="flex flex-1 flex-col gap-[64px] md:gap-[96px] p-4 md:p-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
