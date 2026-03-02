"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { itemDetail } from "@/data/mockData";
import { Star, ChevronRight, Minus, Plus, Wine } from "lucide-react";
import { useState } from "react";

export default function ItemDetailPage() {
    const t = useTranslations("ItemDetail");
    const locale = useLocale();
    const isAr = locale === "ar";
    const [quantity, setQuantity] = useState(1);
    const [extraSauce, setExtraSauce] = useState(false);
    const [nutAllergy, setNutAllergy] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [pairing, setPairing] = useState(false);

    const totalPrice =
        itemDetail.price * quantity + (extraSauce ? 2 : 0) + (pairing ? itemDetail.pairing.price : 0);

    return (
        <div className="min-h-screen bg-surface-dark">
            <Header />
            <div className="mx-auto max-w-7xl px-6 py-6">
                {/* Breadcrumbs */}
                <div className="mb-6 flex items-center gap-2 text-xs text-text-muted">
                    <Link
                        href={`/${locale}`}
                        className="transition-colors hover:text-brand"
                    >
                        {t("breadcrumbMenu")}
                    </Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link
                        href={`/${locale}/category`}
                        className="transition-colors hover:text-brand"
                    >
                        {t("breadcrumbStarters")}
                    </Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-text-secondary">
                        {isAr ? itemDetail.nameAr : itemDetail.name}
                    </span>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Left — Images */}
                    <div>
                        <div className="relative mb-4 overflow-hidden rounded-2xl">
                            <div className="relative h-[400px] w-full">
                                <Image
                                    src={
                                        selectedImage === 0
                                            ? itemDetail.image
                                            : itemDetail.thumbnails[selectedImage - 1]
                                    }
                                    alt={isAr ? itemDetail.nameAr : itemDetail.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <span className="absolute end-4 top-4 rounded bg-blue-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                                    {t("chefsChoice")}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {[itemDetail.image, ...itemDetail.thumbnails].map((thumb, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${selectedImage === i
                                            ? "border-brand"
                                            : "border-border-subtle hover:border-brand/50"
                                        }`}
                                >
                                    <Image
                                        src={thumb}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right — Details */}
                    <div>
                        <div className="mb-4 flex items-start justify-between">
                            <h1 className="text-3xl font-bold text-white">
                                {isAr ? itemDetail.nameAr : itemDetail.name}
                            </h1>
                            <div className="flex items-center gap-1.5">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-semibold text-white">
                                    {itemDetail.rating}
                                </span>
                                <span className="text-xs text-text-secondary">
                                    ({itemDetail.reviewCount} {t("reviews")})
                                </span>
                            </div>
                        </div>

                        <p className="mb-4 text-2xl font-bold text-brand">
                            ${itemDetail.price.toFixed(2)}
                        </p>

                        <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                            {t("description")}
                        </p>

                        {/* Key Ingredients */}
                        <div className="mb-6">
                            <h3 className="mb-3 text-sm font-semibold text-white">
                                {t("keyIngredients")}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {itemDetail.ingredients.map((ing, i) => (
                                    <span
                                        key={i}
                                        className="rounded-full bg-surface-card px-3 py-1.5 text-xs font-medium text-text-secondary"
                                    >
                                        {isAr ? ing.ar : ing.en}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Customization */}
                        <div className="mb-6 rounded-xl border border-border-subtle bg-surface-card p-5">
                            <h3 className="mb-4 text-sm font-semibold text-white">
                                {t("customization")}
                            </h3>

                            <label className="mb-3 flex cursor-pointer items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={extraSauce}
                                        onChange={(e) => setExtraSauce(e.target.checked)}
                                        className="h-4 w-4 rounded border-border-subtle bg-surface-dark text-brand accent-brand focus:ring-brand"
                                    />
                                    <span className="text-sm text-white">{t("extraSauce")}</span>
                                </div>
                                <span className="text-sm text-brand">+$2.00</span>
                            </label>

                            <label className="mb-4 flex cursor-pointer items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={nutAllergy}
                                        onChange={(e) => setNutAllergy(e.target.checked)}
                                        className="h-4 w-4 rounded border-border-subtle bg-surface-dark text-brand accent-brand focus:ring-brand"
                                    />
                                    <span className="text-sm text-white">{t("nutAllergy")}</span>
                                </div>
                                <span className="text-sm text-green-400">{t("free")}</span>
                            </label>

                            {/* Special Requests */}
                            <h4 className="mb-2 text-xs font-semibold text-text-muted">
                                {t("specialRequests")}
                            </h4>
                            <textarea
                                placeholder={t("specialRequestsPlaceholder")}
                                className="w-full rounded-lg border border-border-subtle bg-surface-dark p-3 text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                                rows={3}
                            />
                        </div>

                        {/* Perfect Pairing */}
                        <div className="mb-6 rounded-xl border border-border-subtle bg-surface-card p-5">
                            <h3 className="mb-3 text-sm font-semibold text-white">
                                {t("perfectPairing")}
                            </h3>
                            <label className="flex cursor-pointer items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        checked={pairing}
                                        onChange={() => setPairing(!pairing)}
                                        className="h-4 w-4 border-border-subtle text-brand accent-brand focus:ring-brand"
                                    />
                                    <Wine className="h-5 w-5 text-amber-400" />
                                    <span className="text-sm text-white">
                                        {isAr ? itemDetail.pairing.nameAr : itemDetail.pairing.name}
                                    </span>
                                </div>
                                <span className="text-sm text-brand">
                                    +${itemDetail.pairing.price.toFixed(2)}
                                </span>
                            </label>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center gap-4">
                            {/* Quantity */}
                            <div className="flex items-center gap-0 rounded-lg border border-border-subtle bg-surface-card">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-white"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="flex h-10 w-10 items-center justify-center text-sm font-semibold text-white">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-white"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Add to Order */}
                            <Link
                                href={`/${locale}/cart`}
                                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
                            >
                                {t("addToOrderBtn")} ${totalPrice.toFixed(2)}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
