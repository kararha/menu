"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { ChevronRight, Star, Clock, Flame, Sparkles } from "lucide-react";
import { Pagination, PaginationInfo } from "@/components/Pagination";
import { MenuGridSkeleton } from "@/components/Skeleton";
import { useMenu } from "@/hooks";
import { Icons } from "@/assets/icons";

interface CategoryPageProps {
  category: string;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const t = useTranslations("Category");
  const locale = useLocale();
  const isAr = locale === "ar";

  const getCategoryLabel = () => {
    switch (category) {
      case "appetizers":
        return isAr ? "المقبلات" : "Appetizers";
      case "mains":
        return isAr ? "الأطباق الرئيسية" : "Main Courses";
      case "desserts":
        return isAr ? "التحلية" : "Desserts";
      case "drinks":
        return isAr ? "المشروبات وال wines" : "Drinks & Wines";
      default:
        return "";
    }
  };

  const getCategorySubtitle = () => {
    switch (category) {
      case "appetizers":
        return isAr ? "ابدأ وجبتك بمقبلات لذيذة" : "Start your meal with delicious appetizers";
      case "mains":
        return isAr ? "تشكيلة من الأطباق الرئيسية الفاخرة" : "A selection of premium main courses";
      case "desserts":
        return isAr ? "نهاية مثالية لوجبتك" : "The perfect end to your meal";
      case "drinks":
        return isAr ? "م cocktails ونبيذ مميز" : "Signature cocktails and fine wines";
      default:
        return "";
    }
  };

  const getSidebarCategories = () => {
    switch (category) {
      case "appetizers":
        return [
          { id: "all", label: isAr ? "جميع المقبلات" : "All Appetizers" },
          { id: "soups", label: isAr ? "الشوربات" : "Soups" },
          { id: "salads", label: isAr ? "السلطات" : "Salads" },
          { id: "seafood", label: isAr ? "المأكولات البحرية" : "Seafood" },
          { id: "cheese", label: isAr ? "الأجبان" : "Cheese" },
        ];
      case "mains":
        return [
          { id: "all", label: t("allMains") },
          { id: "beef", label: isAr ? "لحم البقر" : "Beef" },
          { id: "seafood", label: isAr ? "المأكولات البحرية" : "Seafood" },
          { id: "poultry", label: isAr ? "الدواجن" : "Poultry" },
          { id: "lamb", label: isAr ? "الخروف" : "Lamb" },
          { id: "vegetarian", label: isAr ? "نباتي" : "Vegetarian" },
          { id: "pasta", label: isAr ? "الباستا" : "Pasta" },
        ];
      case "desserts":
        return [
          { id: "all", label: isAr ? "جميع التحليات" : "All Desserts" },
          { id: "chocolate", label: isAr ? "الشوكولاتة" : "Chocolate" },
          { id: "fruit", label: isAr ? "الفواكة" : "Fruit" },
          { id: "icecream", label: isAr ? "آيس كريم" : "Ice Cream" },
          { id: "seasonal", label: isAr ? "موسمي" : "Seasonal" },
        ];
      case "drinks":
        return [
          { id: "all", label: isAr ? "جميع المشروبات" : "All Drinks" },
          { id: "cocktails", label: isAr ? "الكوكتيلات" : "Cocktails" },
          { id: "wine", label: isAr ? "النبيذ" : "Wine" },
          { id: "beer", label: isAr ? "الجعة" : "Beer" },
          { id: "non-alcoholic", label: isAr ? "بدون كحول" : "Non-Alcoholic" },
        ];
      default:
        return [];
    }
  };

  const {
    items,
    pagination,
    loading,
    category: activeCategory,
    goToPage,
    changeCategory,
  } = useMenu({
    initialPage: 1,
    initialLimit: 9,
    initialCategory: category,
  });

  const sidebarCategories = getSidebarCategories();

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
                  activeCategory === cat.id || (activeCategory === category && cat.id === "all")
                    ? "bg-brand text-white"
                    : "text-text-secondary hover:bg-surface-card hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Category Promo */}
          <div className="mt-6 rounded-xl border border-border-subtle bg-surface-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-brand" />
              <h3 className="text-sm font-semibold text-white">
                {isAr ? "عرض اليوم" : "Today's Special"}
              </h3>
            </div>
            <p className="mt-1 mb-3 text-xs text-text-secondary">
              {isAr ? "احصل على 20% خصم على طلبك الأول" : "Get 20% off your first order"}
            </p>
            <button className="text-sm font-semibold text-brand transition-colors hover:text-brand-light">
              {isAr ? "اطلب الآن" : "Order Now"}
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
            <span className="text-text-secondary">{getCategoryLabel()}</span>
          </div>

          <h1 className="mb-1 text-3xl font-bold text-white">{getCategoryLabel()}</h1>
          <p className="mb-6 text-sm text-text-secondary">{getCategorySubtitle()}</p>

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
                            ? "Vegan"
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
