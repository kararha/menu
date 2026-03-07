"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ShoppingBag, Globe, Menu, X } from "lucide-react";
import { Icons } from "@/assets/icons";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";

export default function Header() {
    const t = useTranslations("Nav");
    const tc = useTranslations("Common");
    const locale = useLocale();
    const otherLocale = locale === "en" ? "ar" : "en";
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { href: `/${locale}/reservations`, label: t("reservations") },
        { href: `/${locale}/events`, label: t("events") },
        { href: `/${locale}/gift-cards`, label: t("giftCards") },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-surface-dark/95 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Icons.KnifeFork className="h-6 w-6 text-brand" />
                    <Link href={`/${locale}`} className="text-xl font-bold text-brand">
                        {t("logo")}
                    </Link>
                </div>

                {/* Center Nav */}
                <nav className="hidden items-center gap-6 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-text-secondary transition-colors hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="hidden md:block">
                        <SearchBar />
                    </div>

                    {/* Mobile Search */}
                    <div className="md:hidden">
                        <SearchBar />
                    </div>

                    {/* Language Switch */}
                    <Link
                        href={`/${otherLocale}`}
                        className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-brand hover:text-white"
                    >
                        <Globe className="h-3.5 w-3.5" />
                        {tc("langSwitch")}
                    </Link>

                    {/* Order Now */}
                    <Link
                        href={`/${locale}/cart`}
                        className="hidden sm:flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
                    >
                        <ShoppingBag className="h-4 w-4" />
                        {t("orderNow")}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="flex items-center justify-center p-2 text-text-secondary hover:text-white md:hidden"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t border-border-subtle bg-surface-dark md:hidden">
                    <nav className="flex flex-col p-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="rounded-lg px-4 py-3 text-sm font-medium text-text-secondary hover:bg-surface-card hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href={`/${locale}/cart`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white sm:hidden"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            {t("orderNow")}
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
