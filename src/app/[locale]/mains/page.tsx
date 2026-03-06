"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { ChevronRight, Star, Clock, Flame, Sparkles } from "lucide-react";
import { Pagination, PaginationInfo } from "@/components/Pagination";
import { MenuGridSkeleton } from "@/components/Skeleton";
import { useMenu } from "@/hooks";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";

export default function MainsPage() {
  const t = useTranslations("Category");
  const locale = useLocale();
  const isAr = locale === "ar";

  const { items, pagination, loading, goToPage } = useMenu({
    initialPage: 1,
    initialLimit: 9,
    initialCategory: "mains",
  });

  const sidebarCategories = [
    { id: "mains", label: isAr ? "جميع الأطباق" : "All Mains" },
    { id: "mains-beef", label: isAr ? "لحم البقر" : "Beef" },
    { id: "mains-seafood", label: isAr ? "المأكولات البحرية" : "Seafood" },
    { id: "mains-poultry", label: isAr ? "الدواجن" : "Poultry" },
    { id: "mains-lamb", label: isAr ? "الخروف" : "Lamb" },
    { id: "mains-vegetarian", label: isAr ? "نباتي" : "Vegetarian" },
    { id: "mains-pasta", label: isAr ? "الباستا" : "Pasta" },
  ];

  return (
    <div className="min-h-screen bg-surface-dark">
      <Header />
      <div className="mx-auto flex max-w-7xl gap-0 px-6 py-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="flex flex-col gap-1">
            {sidebarCategories.map((cat) => (
              <Link key={cat.id} href={`/${locale}/mains?sub=${cat.id}`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-start text-sm font-medium text-text-secondary transition-all hover:bg-surface-card hover:text-white">
                {cat.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 rounded-xl border border-border-subtle bg-surface-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-brand" />
              <h3 className="text-sm font-semibold text-white">{isAr ? "صفقة العائلة" : "Family Deal"}</h3>
            </div>
            <p className="mt-1 mb-3 text-xs text-text-secondary">
              {isAr ? "اطلبmain وحصل علىطبق مجاني" : "Order any main, get a free appetizer"}
            </p>
            <button className="text-sm font-semibold text-brand transition-colors hover:text-brand-light">
              {isAr ? "شاهد التفاصيل" : "View Details"}
            </button>
          </div>
        </aside>

        <main className="flex-1 ps-0 lg:ps-8">
          <FadeIn>
            <div className="mb-4 flex items-center gap-2 text-xs text-text-muted">
              <Link href={`/${locale}`} className="transition-colors hover:text-brand">{t("breadcrumbHome")}</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href={`/${locale}`} className="transition-colors hover:text-brand">{t("breadcrumbMenu")}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-text-secondary">{isAr ? "الأطباق الرئيسية" : "Main Courses"}</span>
            </div>
            <h1 className="mb-1 text-3xl font-bold text-white">{isAr ? "الأطباق الرئيسية" : "Main Courses"}</h1>
            <p className="mb-6 text-sm text-text-secondary">{isAr ? "تشكيلة من الأطباق الرئيسية الفاخرة" : "A selection of premium main courses"}</p>
          </FadeIn>

          {loading ? (
            <MenuGridSkeleton count={9} />
          ) : (
            <>
              <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <StaggerItem key={item.id}>
                    <Link href={`/${locale}/item?id=${item.id}`} className="group overflow-hidden rounded-xl border border-border-subtle bg-surface-card transition-all hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5">
                      <div className="relative h-48 overflow-hidden">
                        <Image src={item.image} alt={isAr ? item.nameAr : item.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                        {item.badge && (
                          <span className={`absolute start-3 top-3 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${
                            item.badgeColor === "blue" ? "bg-blue-600" : item.badgeColor === "green" ? "bg-green-600" : item.badgeColor === "gold" ? "bg-amber-500" : "bg-orange-500"
                          }`}>{item.badge === "chefsChoice" ? t("chefsChoice") : item.badge}</span>
                        )}
                        {item.preparationTime && <div className="absolute bottom-3 end-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-medium text-white"><Clock className="h-3 w-3" />{item.preparationTime} min</div>}
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-white">{isAr ? item.nameAr : item.name}</h3>
                          <span className="shrink-0 font-bold text-brand">${item.price}</span>
                        </div>
                        <p className="mt-2 text-xs text-text-secondary line-clamp-2">{isAr ? item.descriptionAr : item.description}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {item.rating && <div className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /><span className="text-xs text-text-secondary">{item.rating}</span></div>}
                            {item.spicyLevel && item.spicyLevel > 0 && <div className="flex items-center gap-0.5">{Array.from({ length: item.spicyLevel }).map((_, i) => <Flame key={i} className="h-3 w-3 text-orange-500" />)}</div>}
                          </div>
                          <span className="text-sm font-medium text-brand transition-colors group-hover:text-brand-light">{t("viewDetailsLink")} →</span>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {pagination && pagination.totalPages > 1 ? (
                <FadeIn delay={0.2}>
                  <div className="mt-8 flex flex-col items-center gap-4">
                    <PaginationInfo page={pagination.page} totalPages={pagination.totalPages} totalItems={pagination.totalItems} limit={pagination.limit} />
                    <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} onPageChange={goToPage} />
                  </div>
                </FadeIn>
              ) : null}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
