"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Search, ShoppingBag, Globe } from "lucide-react";
import { Icons } from "@/assets/icons";

export default function Header() {
    const t = useTranslations("Nav");
    const tc = useTranslations("Common");
    const locale = useLocale();
    const otherLocale = locale === "en" ? "ar" : "en";

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
                    <Link
                        href={`/${locale}`}
                        className="text-sm font-medium text-text-secondary transition-colors hover:text-white"
                    >
                        {t("reservations")}
                    </Link>
                    <Link
                        href={`/${locale}`}
                        className="text-sm font-medium text-text-secondary transition-colors hover:text-white"
                    >
                        {t("events")}
                    </Link>
                    <Link
                        href={`/${locale}`}
                        className="text-sm font-medium text-text-secondary transition-colors hover:text-white"
                    >
                        {t("giftCards")}
                    </Link>
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text"
                            placeholder={t("searchPlaceholder")}
                            className="h-9 w-48 rounded-full border border-border-subtle bg-surface-card ps-9 pe-4 text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        />
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
                        className="flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
                    >
                        <ShoppingBag className="h-4 w-4" />
                        {t("orderNow")}
                    </Link>
                </div>
            </div>
        </header>
    );
}
