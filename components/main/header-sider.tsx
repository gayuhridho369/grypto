"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { LogIn, Menu, MoonIcon, Package2, SunIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HeaderSider() {
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-20 z-50 justify-between">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base text-nowrap"
        >
          <h1 className="text-3xl font-extrabold text-primary">Grypto</h1>
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <h1 className="text-xl font-bold text-primary">Grypto</h1>
            </Link>
            <Link href="/" className="text-foreground hover:text-primary">
              Home
            </Link>
            <Link
              href="#installation"
              className="text-foreground hover:text-primary"
            >
              Installation
            </Link>
            <Link
              href="#market-data"
              className="text-foreground hover:text-primary"
            >
              Market Data
            </Link>
            <Link
              href="#testimonial"
              className="text-foreground hover:text-primary"
            >
              Testimonial
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial flex items-center gap-4 lg:gap-12">
          <Link
            href="/"
            className="text-foreground text-md font-medium transition-colors hover:text-primary hidden md:block"
          >
            Home
          </Link>
          <Link
            href="#installation"
            className="text-foreground text-md font-medium transition-colors hover:text-primary hidden md:block"
          >
            Installation
          </Link>
          <Link
            href="#market-data"
            className="text-foreground text-md font-medium transition-colors hover:text-primary hidden md:block"
          >
            Market Data
          </Link>
          <Link
            href="#testimonial"
            className="text-foreground text-md font-medium transition-colors hover:text-primary hidden md:block"
          >
            Testimonial
          </Link>

          <div className="flex gap-2 md:gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button>
              Sign In <LogIn className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
