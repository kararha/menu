"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { seasonalSpecials, chefsRecommendations } from "@/data/mockData";
import { ChevronLeft, ChevronRight, Star, ShoppingBag } from "lucide-react";
import { Icons } from "@/assets/icons";

export default function HomePage() {
    const t = useTranslations("Home");
    const locale = useLocale();
    const isAr = locale === "ar";

    const categories = [
        { id: "all", icon: Icons.Home, label: t("allItems"), active: true },
        { id: "appetizers", icon: Icons.Spoon, label: t("appetizers"), active: false },
        { id: "mains", icon: Icons.Plate, label: t("mainCourses"), active: false },
        { id: "desserts", icon: Icons.IceCream, label: t("desserts"), active: false },
        { id: "drinks", icon: Icons.Wine, label: t("drinksWines"), active: false },
    ];

    return (
        <div className="min-h-screen bg-surface-dark">
            <Header />
            <div className="mx-auto flex max-w-7xl gap-0 px-6 py-6">
                {/* Sidebar */}
                <aside className="hidden w-56 shrink-0 lg:block">
                    <h2 className="text-2xl font-bold text-white">{t("menuTitle")}</h2>
                    <p className="mb-6 mt-1 text-sm text-text-secondary">
                        {t("menuSubtitle")} - Dev branch test
                    </p>

                    <nav className="flex flex-col gap-1">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={
                                    cat.id === "all"
                                        ? `/${locale}`
                                        : `/${locale}/${cat.id}`
                                }
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${cat.active
                                        ? "bg-brand text-white"
                                        : "text-text-secondary hover:bg-surface-card hover:text-white"
                                    }`}
                            >
                                <cat.icon className="h-4 w-4" />
                                {cat.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Loyalty Card */}
                    <div className="mt-8 rounded-xl border border-border-subtle bg-surface-card p-4">
                        <div className="mb-2 flex items-center gap-2">
                            <Icons.Gift className="h-5 w-5 text-brand" />
                            <h3 className="text-sm font-semibold text-white">
                                {t("loyaltyProgram")}
                            </h3>
                        </div>
                        <p className="mb-3 text-xs text-text-secondary">
                            {t("loyaltyDesc")}
                        </p>
                        <button className="text-sm font-semibold text-brand transition-colors hover:text-brand-light">
                            {t("joinNow")}
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ps-0 lg:ps-8">
                    {/* Hero Section */}
                    <section className="relative mb-8 overflow-hidden rounded-2xl">
                        <div className="relative h-[350px] w-full">
                            <Image
                                src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=500&fit=crop"
                                alt="Chef's Special"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
                                <span className="mb-3 inline-block w-fit rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                                    {t("chefsSpecial")}
                                </span>
                                <h1 className="mb-3 max-w-lg text-3xl font-extrabold leading-tight text-white md:text-4xl">
                                    {t("heroTitle")}
                                </h1>
                                <p className="mb-6 max-w-md text-sm text-white/80">
                                    {t("heroDesc")}
                                </p>
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={`/${locale}/item`}
                                        className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
                                    >
                                        <ShoppingBag className="h-4 w-4" />
                                        {t("orderFor")}
                                    </Link>
                                    <Link
                                        href={`/${locale}/item`}
                                        className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
                                    >
                                        {t("viewDetails")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Seasonal Specials */}
                    <section className="mb-8">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">
                                {t("seasonalSpecials")}
                            </h2>
                            <div className="flex gap-2">
                                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-brand hover:text-brand">
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-brand hover:text-brand">
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {seasonalSpecials.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/${locale}/item`}
                                    className="group overflow-hidden rounded-xl border border-border-subtle bg-surface-card transition-all hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
                                >
                                    <div className="relative h-40 overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={isAr ? item.nameAr : item.name}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="text-sm font-semibold text-white">
                                                {isAr ? item.nameAr : item.name}
                                            </h3>
                                            <span className="shrink-0 text-sm font-bold text-brand">
                                                ${item.price}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-text-secondary">
                                            {isAr ? item.descriptionAr : item.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Chef's Recommendations */}
                    <section>
                        <h2 className="mb-4 text-xl font-bold text-white">
                            {t("chefsRecommendations")}
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {chefsRecommendations.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex overflow-hidden rounded-xl border border-border-subtle bg-surface-card transition-all hover:border-brand/40"
                                >
                                    <div className="relative h-auto w-28 shrink-0 md:w-36">
                                        <Image
                                            src={item.image}
                                            alt={isAr ? item.nameAr : item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between p-4">
                                        <div>
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-semibold text-white">
                                                    {isAr ? item.nameAr : item.name}
                                                </h3>
                                                <span className="font-bold text-brand">
                                                    ${item.price}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs text-text-secondary line-clamp-2">
                                                {isAr ? item.descriptionAr : item.description}
                                            </p>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs text-text-secondary">
                                                    {item.rating} ({item.reviewCount})
                                                </span>
                                            </div>
                                            <Link
                                                href={`/${locale}/item`}
                                                className="text-sm font-semibold text-brand transition-colors hover:text-brand-light"
                                            >
                                                {t("addToOrder")}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
