"use client";
import { ReactNode, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { NavLink } from "@/components/nav-link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Loading from "@/app/loading";
import ReactGA from "react-ga4";

const navItems = [
  { href: "/books", label: "Books" },
  { href: "/shipping", label: "Shipping" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Searchbar = ({
  setIsOpen,
}: {
  setIsOpen?: (isOpen: boolean) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchTerm, setSearchTerm] = useState(query || "");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setIsOpen && setIsOpen(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (query) {
      setSearchTerm(decodeURIComponent(query));
    }
  }, [query]);

  return (
    <div className="relative ">
      <Input
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pl-8 font-medium text-foreground"
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground font-semibold"
        size={14}
      />
    </div>
  );
};

export const Nav = ({ headerAuth }: { headerAuth: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const page = "https://kathrinsbooks.com" + pathname;
  useEffect(() => {
    ReactGA.initialize("G-XXXXXXXXX");

    ReactGA.send({ hitType: "pageview", page: page });
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b w-full bg-primary-foreground dark:bg-card">
      <nav className="hidden lg:flex items-center w-full px-8  justify-between gap-10 h-[60px] container lg:my-0 pr-8">
        <Link href="/" className="flex items-center gap-4 ">
          <Image
            src="/logo.png"
            alt="Kathrin's Books"
            className="object-contain"
            height={20}
            width={20}
          />

          <div className=" text-primary text-base font-bold  tracking-wider hover:text-muted-foreground min-w-max">
            Kathrin's Books
          </div>
        </Link>

        <Suspense fallback={<Loading />}>
          <Searchbar />
        </Suspense>

        <div className="flex items-center justify-start gap-8">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center justify-start gap-4">
          {headerAuth}
          <ThemeSwitcher />
        </div>
      </nav>

      <div className="flex items-center w-full justify-between lg:hidden  px-8  h-[60px] container lg:my-0 pr-8">
        <Link href="/" className="flex items-center gap-4 ">
          <Image
            src="/logo.png"
            alt="Kathrin's Books"
            className="object-contain"
            height={20}
            width={20}
          />
          <div className=" text-primary text-base font-bold  tracking-wider hover:text-muted-foreground ">
            Kathrin's Books
          </div>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <RxHamburgerMenu className="h-5 w-5 font-semibold " />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-8">
              <Suspense fallback={<Loading />}>
                <div className=" flex flex-col items-start">
                  <Searchbar />
                </div>
              </Suspense>
              <Separator className="my-2" />
              {navItems.map((item, index) => (
                <div key={item.href}>
                  <NavLink href={item.href} onClick={() => setIsOpen(false)}>
                    {item.label}
                  </NavLink>
                </div>
              ))}
              <Separator className="my-2" />
              <div
                className="flex items-center justify-start gap-4"
                onClick={() => setIsOpen(false)}
              >
                {headerAuth}
                <ThemeSwitcher />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
