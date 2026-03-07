"use client";

import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Image from "next/image";
import { Calendar, Users, ArrowRight, Wine, Music, Gift } from "lucide-react";

const events = [
    {
        id: 1,
        title: "Wine Tasting Evening",
        titleAr: "سمسية النبيذ",
        description: "Experience an exclusive wine tasting session featuring premium vintages from renowned vineyards.",
        descriptionAr: "استمتع بجلسة تذوق نبيذ حصرية featuring نبيذ متميز من كروم مشهورة.",
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=400&fit=crop",
        date: "Every Friday",
        dateAr: "كل جمعة",
        price: 75,
        icon: Wine,
    },
    {
        id: 2,
        title: "Live Jazz Night",
        titleAr: "ليلة موسيقى الجاز",
        description: "Enjoy soulful jazz performances by local artists while savoring our gourmet menu.",
        descriptionAr: "استمتع بعروض موسيقى الجاز بينما تستمتع بقائمنا الفاخرة.",
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&h=400&fit=crop",
        date: "Every Saturday",
        dateAr: "كل سبت",
        price: 45,
        icon: Music,
    },
    {
        id: 3,
        title: "Chef's Table Experience",
        titleAr: "تجربة طاولة الشيف",
        description: "An intimate 7-course tasting menu crafted by our executive chef with wine pairings.",
        descriptionAr: "تجربة خاصة من 7 أطباق均由 our executive chef مع اقتران النبيذ.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
        date: "Last Sunday of Month",
        dateAr: "الأحد الأخير من الشهر",
        price: 150,
        icon: Gift,
    },
    {
        id: 4,
        title: "Private Celebrations",
        titleAr: "احتفالات خاصة",
        description: "Host your special occasions in our elegant private dining room.",
        descriptionAr: "احتفي مناسباتك الخاصة في قاعة العشاء الخاصة لدينا.",
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
        date: "By Reservation",
        dateAr: "بالحجز",
        price: null,
        icon: Users,
    },
];

export default function EventsPage() {
    const t = useTranslations("Events");
    const locale = useLocale();
    const isAr = locale === "ar";

    return (
        <div className="min-h-screen bg-surface-dark">
            <Header />
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero */}
                <section className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-extrabold text-white">
                        {t("title")}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-text-secondary">
                        {t("subtitle")}
                    </p>
                </section>

                {/* Events Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {events.map((event) => (
                        <div 
                            key={event.id}
                            className="overflow-hidden rounded-xl border border-border-subtle bg-surface-card transition-all hover:border-brand/40"
                        >
                            <div className="relative h-48 w-full">
                                <Image
                                    src={event.image}
                                    alt={isAr ? event.titleAr : event.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand/90">
                                    <event.icon className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="mb-2 flex items-center gap-2 text-sm text-brand">
                                    <Calendar className="h-4 w-4" />
                                    <span>{isAr ? event.dateAr : event.date}</span>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-white">
                                    {isAr ? event.titleAr : event.title}
                                </h3>
                                <p className="mb-4 text-sm text-text-secondary">
                                    {isAr ? event.descriptionAr : event.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    {event.price ? (
                                        <span className="text-lg font-bold text-brand">
                                            ${event.price} <span className="text-sm font-normal text-text-secondary">/ person</span>
                                        </span>
                                    ) : (
                                        <span className="text-lg font-bold text-brand">
                                            {t("customQuote")}
                                        </span>
                                    )}
                                    <button className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand">
                                        {t("bookNow")}
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <section className="mt-12 rounded-xl border border-border-subtle bg-gradient-to-r from-brand/20 to-purple-600/20 p-8 text-center">
                    <h2 className="mb-3 text-2xl font-bold text-white">
                        {t("ctaTitle")}
                    </h2>
                    <p className="mx-auto mb-6 max-w-lg text-text-secondary">
                        {t("ctaDesc")}
                    </p>
                    <button className="rounded-full bg-brand px-6 py-3 font-bold text-white transition-colors hover:bg-brand-hover">
                        {t("contactUs")}
                    </button>
                </section>
            </div>
        </div>
    );
}
