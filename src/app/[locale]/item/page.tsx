"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { itemDetail } from "@/data/mockData";
import { Star, ChevronRight, Minus, Plus, Wine, Clock, Flame, Info } from "lucide-react";
import { useState } from "react";
import { useButtonClick } from "@/hooks";

export default function ItemDetailPage() {
    const t = useTranslations("ItemDetail");
    const locale = useLocale();
    const isAr = locale === "ar";
    const [quantity, setQuantity] = useState(1);
    const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, number>>({});
    const [specialInstructions, setSpecialInstructions] = useState("");
    const [selectedImage, setSelectedImage] = useState(0);
    const [pairing, setPairing] = useState(false);

    const { handleClick: addToCart, isLoading: isAdding } = useButtonClick(async () => {
        // API call would go here
        console.log("Adding to cart:", {
            itemId: itemDetail.id,
            quantity,
            customizations: selectedCustomizations,
            specialInstructions,
            withPairing: pairing,
        });
    }, { debounceMs: 1000 });

    // Generate thumbnails from the main image (in production, these would be actual different images)
    const thumbnails = [
        itemDetail.image,
        itemDetail.image,
        itemDetail.image,
    ];

    const basePrice = itemDetail.price * quantity;
    const customizationPrice = Object.values(selectedCustomizations).reduce((a, b) => a + b, 0);
    const pairingPrice = pairing && itemDetail.pairing ? itemDetail.pairing.price : 0;
    const totalPrice = basePrice + customizationPrice + pairingPrice;

    const handleCustomizationChange = (optionPrice: number, checked: boolean) => {
        setSelectedCustomizations(prev => {
            if (checked) {
                return { ...prev, [optionPrice]: optionPrice };
            } else {
                const { [optionPrice]: _, ...rest } = prev;
                return rest;
            }
        });
    };

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
                                    src={selectedImage === 0 ? itemDetail.image : thumbnails[selectedImage - 1]}
                                    alt={isAr ? itemDetail.nameAr : itemDetail.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {itemDetail.badge && (
                                    <span className="absolute end-4 top-4 rounded bg-blue-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                                        {itemDetail.badge === "chefsChoice" ? t("chefsChoice") : itemDetail.badge}
                                    </span>
                                )}
                                {itemDetail.spicyLevel && itemDetail.spicyLevel > 0 && (
                                    <div className="absolute bottom-4 start-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 text-sm font-medium text-white">
                                        <Flame className="h-4 w-4 text-orange-500" />
                                        {itemDetail.spicyLevel}/5
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {[itemDetail.image, ...thumbnails].map((thumb, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                                        selectedImage === i
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

                        {/* Quick Info */}
                        <div className="mt-4 flex flex-wrap gap-3">
                            {itemDetail.calories && (
                                <div className="flex items-center gap-2 rounded-lg bg-surface-card px-3 py-2 text-sm text-text-secondary">
                                    <Info className="h-4 w-4" />
                                    {itemDetail.calories} cal
                                </div>
                            )}
                            {itemDetail.preparationTime && (
                                <div className="flex items-center gap-2 rounded-lg bg-surface-card px-3 py-2 text-sm text-text-secondary">
                                    <Clock className="h-4 w-4" />
                                    {itemDetail.preparationTime} min
                                </div>
                            )}
                            {itemDetail.rating && (
                                <div className="flex items-center gap-2 rounded-lg bg-surface-card px-3 py-2 text-sm text-text-secondary">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    {itemDetail.rating} ({itemDetail.reviewCount} {t("reviews")})
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right — Details */}
                    <div>
                        <div className="mb-4 flex items-start justify-between">
                            <h1 className="text-3xl font-bold text-white">
                                {isAr ? itemDetail.nameAr : itemDetail.name}
                            </h1>
                        </div>

                        <p className="mb-4 text-2xl font-bold text-brand">
                            ${itemDetail.price.toFixed(2)}
                        </p>

                        <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                            {isAr ? itemDetail.descriptionAr : itemDetail.description}
                        </p>

                        {/* Dietary Tags */}
                        {itemDetail.dietary && itemDetail.dietary.length > 0 && (
                            <div className="mb-6 flex flex-wrap gap-2">
                                {itemDetail.dietary.map((diet) => (
                                    <span
                                        key={diet}
                                        className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400"
                                    >
                                        {diet === "vegan" ? "Vegan" : diet === "vegetarian" ? "Vegetarian" : diet === "glutenFree" ? "Gluten-Free" : diet}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Allergens Warning */}
                        {itemDetail.allergens && itemDetail.allergens.length > 0 && (
                            <div className="mb-6 rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
                                <p className="text-xs text-amber-400">
                                    <strong>Allergens:</strong> {itemDetail.allergens.join(", ")}
                                </p>
                            </div>
                        )}

                        {/* Key Ingredients */}
                        {itemDetail.ingredients && itemDetail.ingredients.length > 0 && (
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
                        )}

                        {/* Customization Options */}
                        {itemDetail.customizations && itemDetail.customizations.length > 0 && (
                            <div className="mb-6 rounded-xl border border-border-subtle bg-surface-card p-5">
                                <h3 className="mb-4 text-sm font-semibold text-white">
                                    {t("customization")}
                                </h3>

                                {itemDetail.customizations.map((customGroup, groupIndex) => (
                                    <div key={groupIndex} className="mb-4">
                                        <h4 className="mb-2 text-xs font-semibold text-text-muted">
                                            {isAr ? customGroup.nameAr : customGroup.name}
                                            {customGroup.required && " *"}
                                        </h4>
                                        {customGroup.options.map((option, optIndex) => (
                                            <label
                                                key={optIndex}
                                                className="mb-2 flex cursor-pointer items-center justify-between"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type={customGroup.required ? "radio" : "checkbox"}
                                                        name={customGroup.name}
                                                        checked={selectedCustomizations[option.price] === option.price}
                                                        onChange={(e) => handleCustomizationChange(option.price, e.target.checked)}
                                                        className="h-4 w-4 rounded border-border-subtle bg-surface-dark text-brand accent-brand focus:ring-brand"
                                                    />
                                                    <span className="text-sm text-white">
                                                        {isAr ? option.labelAr : option.label}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-brand">
                                                    {option.price > 0 ? `+$${option.price.toFixed(2)}` : t("free")}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                ))}

                                {/* Special Requests */}
                                <h4 className="mb-2 text-xs font-semibold text-text-muted">
                                    {t("specialRequests")}
                                </h4>
                                <textarea
                                    placeholder={t("specialRequestsPlaceholder")}
                                    value={specialInstructions}
                                    onChange={(e) => setSpecialInstructions(e.target.value)}
                                    className="w-full rounded-lg border border-border-subtle bg-surface-dark p-3 text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                                    rows={3}
                                />
                            </div>
                        )}

                        {/* Perfect Pairing */}
                        {itemDetail.pairing && (
                            <div className="mb-6 rounded-xl border border-border-subtle bg-surface-card p-5">
                                <h3 className="mb-3 text-sm font-semibold text-white">
                                    {t("perfectPairing")}
                                </h3>
                                <label className="flex cursor-pointer items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={pairing}
                                            onChange={() => setPairing(!pairing)}
                                            className="h-4 w-4 rounded border-border-subtle text-brand accent-brand focus:ring-brand"
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
                        )}

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
                            <button
                                onClick={addToCart}
                                disabled={isAdding}
                                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover disabled:opacity-50"
                            >
                                {isAdding ? "Adding..." : `${t("addToOrderBtn")} $${totalPrice.toFixed(2)}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
