"use client";

import css from "@/components/Header/Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link className={css.logo} href="/" aria-label="На головну">
        <Image src="/logo.svg" alt="Логотип" width={102} height={16} priority />
      </Link>
      <nav className={css.nav}>
        <Link
          className={`${css.link} ${pathname === "/" ? css.activeLink : ""}`}
          href="/"
          aria-label="На головну"
        >
          <span>Home</span>
        </Link>

        <Link
          className={`${css.link} ${pathname.startsWith("/cars") ? css.activeLink : ""}`}
          href="/cars"
          aria-label="Перейти до списку автомобілів"
        >
          <span>Catalog</span>
        </Link>
      </nav>
    </header>
  );
}
