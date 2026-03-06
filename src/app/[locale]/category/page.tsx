"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { ChevronRight, Star, Clock, Flame } from "lucide-react";
import { Pagination, PaginationInfo } from "@/components/Pagination";
import { MenuGridSkeleton } from "@/components/Skeleton";
import { useMenu, useButtonClick } from "@/hooks";

export default function CategoryPage() {
    const t = useTranslations("Category");
    const locale = useLocale();
    const isAr = locale === "ar";

    const {
        items,
        pagination,
        loading,
        category,
        dietary,
        goToPage,
        changeCategory,
        toggleDietary,
    } = useMenu({
        initialPage: 1,
        initialLimit: 9,
        initialCategory: "mains",
    });

    const sidebarCategories = [
        { id: "all", label: t("allMains") },
        { id: "land", label: t("fromLand") },
        { id: "sea", label: t("fromSea") },
        { id: "veg", label: t("vegetarian") },
        { id: "gf", label: t("glutenFree") },
    ];

    const dietaryFilters = [
        { id: "vegan", label: t("veganOptions") },
        { id: "nutfree", label: t("nutFree") },
        { id: "dairyfree", label: t("dairyFree") },
    ];

    const handleAddToCart = useButtonClick(async (itemId: number) => {
        // API call to add to cart would go here
        console.log("Adding item to cart:", itemId);
    }, { debounceMs: 800 });

    return (
        <div className="min-h-screen bg-surface-dark">
            <Header />
            <div className="mx-auto flex max-w-7xl gap-0 px-6 py-6">
                {/* Sidebar */}
                <aside className="hidden w-56 shrink-0 lg:block">
                    <nav className="flex flex-col gap-1">
                        {sidebarCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => changeCategory(cat.id)}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-start text-sm font-medium transition-all ${
                                    category === cat.id
                                        ? "bg-brand text-white"
                                        : "text-text-secondary hover:bg-surface-card hover:text-white"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </nav>

                    {/* Dietary Needs */}
                    <div className="mt-6">
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                            {t("dietaryNeeds")}
                        </h3>
                        {dietaryFilters.map((f) => (
                            <label
                                key={f.id}
                                className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
                            >
                                <input
                                    type="checkbox"
                                    checked={dietary.includes(f.id)}
                                    onChange={() => toggleDietary(f.id)}
                                    className="h-4 w-4 rounded border-border-subtle bg-surface-card text-brand accent-brand focus:ring-brand"
                                />
                                {f.label}
                            </label>
                        ))}
                    </div>

                    {/* Chef's Table Promo */}
                    <div className="mt-6 rounded-xl border border-border-subtle bg-surface-card p-4">
                        <h3 className="text-sm font-semibold text-white">
                            {t("chefsTable")}
                        </h3>
                        <p className="mt-1 mb-3 text-xs text-text-secondary">
                            {t("tastingMenu")}
                        </p>
                        <button className="text-sm font-semibold text-brand transition-colors hover:text-brand-light">
                            {t("reserveNow")}
                        </button>
                    </div>
                </aside>

                {/* Main */}
                <main className="flex-1 ps-0 lg:ps-8">
                    {/* Breadcrumbs */}
                    <div className="mb-4 flex items-center gap-2 text-xs text-text-muted">
                        <Link
                            href={`/${locale}`}
                            className="transition-colors hover:text-brand"
                        >
                            {t("breadcrumbHome")}
                        </Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link
                            href={`/${locale}`}
                            className="transition-colors hover:text-brand"
                        >
                            {t("breadcrumbMenu")}
                        </Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-text-secondary">{t("breadcrumbMains")}</span>
                    </div>

                    <h1 className="mb-1 text-3xl font-bold text-white">{t("title")}</h1>
                    <p className="mb-6 text-sm text-text-secondary">{t("subtitle")}</p>

                    {/* Grid */}
                    {loading ? (
                        <MenuGridSkeleton count={9} />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {items.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/${locale}/item?id=${item.id}`}
                                        className="group overflow-hidden rounded-xl border border-border-subtle bg-surface-card transition-all hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={isAr ? item.nameAr : item.name}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            {item.badge && (
                                                <span
                                                    className={`absolute start-3 top-3 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${
                                                        item.badgeColor === "blue"
                                                            ? "bg-blue-600"
                                                            : item.badgeColor === "green"
                                                            ? "bg-green-600"
                                                            : item.badgeColor === "gold"
                                                            ? "bg-amber-500"
                                                            : "bg-orange-500"
                                                    }`}
                                                >
                                                    {item.badge === "chefsChoice"
                                                        ? t("chefsChoice")
                                                        : item.badge === "vegan"
                                                        ? t("vegan")
                                                        : item.badge}
                                                </span>
                                            )}
                                            {item.preparationTime && (
                                                <div className="absolute bottom-3 end-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-medium text-white">
                                                    <Clock className="h-3 w-3" />
                                                    {item.preparationTime} min
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-semibold text-white">
                                                    {isAr ? item.nameAr : item.name}
                                                </h3>
                                                <span className="shrink-0 font-bold text-brand">
                                                    ${item.price}
                                                </span>
                                            </div>
                                            <p className="mt-2 text-xs text-text-secondary line-clamp-2">
                                                {isAr ? item.descriptionAr : item.description}
                                            </p>
                                            <div className="mt-3 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    {item.rating && (
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-xs text-text-secondary">
                                                                {item.rating}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {item.spicyLevel && item.spicyLevel > 0 && (
                                                        <div className="flex items-center gap-0.5">
                                                            {Array.from({ length: item.spicyLevel }).map((_, i) => (
                                                                <Flame
                                                                    key={i}
                                                                    className="h-3 w-3 text-orange-500"
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-sm font-medium text-brand transition-colors group-hover:text-brand-light">
                                                    {t("viewDetailsLink")} →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination && pagination.totalPages > 1 && (
                                <div className="mt-8 flex flex-col items-center gap-4">
                                    <PaginationInfo
                                        page={pagination.page}
                                        totalPages={pagination.totalPages}
                                        totalItems={pagination.totalItems}
                                        limit={pagination.limit}
                                    />
                                    <Pagination
                                        currentPage={pagination.page}
                                        totalPages={pagination.totalPages}
                                        onPageChange={goToPage}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
