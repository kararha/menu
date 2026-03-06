"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import { ItemDetailSkeleton } from "@/components/Skeleton";
import { Star, ChevronRight, Minus, Plus, Wine, Clock, Flame, Info, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { useButtonClick } from "@/hooks";

interface MenuItem {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  description: string;
  descriptionAr: string;
  image: string;
  category: string;
  subcategory?: string;
  badge?: string | null;
  badgeColor?: string | null;
  rating?: number;
  reviewCount?: number;
  popularity?: number;
  dietary?: string[];
  allergens?: string[];
  calories?: number;
  preparationTime?: number;
  spicyLevel?: number;
  ingredients?: { en: string; ar: string }[];
  customizations?: {
    name: string;
    nameAr: string;
    options: { label: string; labelAr: string; price: number }[];
    required?: boolean;
  }[];
  pairing?: {
    name: string;
    nameAr: string;
    price: number;
  };
}

export default function ItemDetailPage() {
  const t = useTranslations("ItemDetail");
  const locale = useLocale();
  const isAr = locale === "ar";
  const searchParams = useSearchParams();
  const itemId = searchParams.get("id");

  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, number>>({});
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [pairing, setPairing] = useState(false);

  const { handleClick: addToCart, isLoading: isAdding } = useButtonClick(async () => {
    if (!item) return;
    
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: item.id,
          name: isAr ? item.nameAr : item.name,
          nameAr: item.nameAr,
          price: calculateTotal(),
          quantity,
          customizations: selectedCustomizations,
          specialInstructions,
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        window.location.href = `/${locale}/cart`;
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  }, { debounceMs: 1000 });

  useEffect(() => {
    async function fetchItem() {
      if (!itemId) {
        setError("Item not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/menu/${itemId}`);
        const result = await response.json();
        
        if (result.success) {
          setItem(result.data);
        } else {
          setError(result.error || "Failed to load item");
        }
      } catch (err) {
        setError("Failed to load item");
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [itemId]);

  const calculateTotal = () => {
    if (!item) return 0;
    const basePrice = item.price * quantity;
    const customizationPrice = Object.values(selectedCustomizations).reduce((a, b) => a + b, 0);
    const pairingPrice = pairing && item.pairing ? item.pairing.price : 0;
    return basePrice + customizationPrice + pairingPrice;
  };

  const handleCustomizationChange = (optionPrice: number, checked: boolean) => {
    setSelectedCustomizations((prev) => {
      if (checked) {
        return { ...prev, [optionPrice]: optionPrice };
      } else {
        const { [optionPrice]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-dark">
        <Header />
        <ItemDetailSkeleton />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-surface-dark">
        <Header />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-2xl font-bold text-white">{isAr ? "العنصر غير موجود" : "Item Not Found"}</h1>
          <p className="mt-2 text-text-secondary">{error || "The item you're looking for doesn't exist."}</p>
          <Link href={`/${locale}`} className="mt-6 inline-block text-brand hover:text-brand-light">
            {isAr ? "العودة للرئيسية" : "Back to Home"} →
          </Link>
        </div>
      </div>
    );
  }

  const thumbnails = [item.image, item.image, item.image];

  return (
    <div className="min-h-screen bg-surface-dark">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-xs text-text-muted">
          <Link href={`/${locale}`} className="transition-colors hover:text-brand">
            {t("breadcrumbMenu")}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href={`/${locale}/${item.category}`}
            className="transition-colors hover:text-brand"
          >
            {isAr 
              ? item.category === "appetizers" ? "المقبلات" 
              : item.category === "mains" ? "الأطباق الرئيسية"
              : item.category === "desserts" ? "التحلية"
              : "المشروبات"
              : item.category.charAt(0).toUpperCase() + item.category.slice(1)
            }
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-text-secondary">{isAr ? item.nameAr : item.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left — Images */}
          <div>
            <div className="relative mb-4 overflow-hidden rounded-2xl">
              <div className="relative h-[400px] w-full">
                <Image
                  src={selectedImage === 0 ? item.image : thumbnails[selectedImage - 1]}
                  alt={isAr ? item.nameAr : item.name}
                  fill
                  className="object-cover"
                  priority
                />
                {item.badge && (
                  <span className="absolute end-4 top-4 rounded bg-blue-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {item.badge === "chefsChoice" ? t("chefsChoice") : item.badge}
                  </span>
                )}
                {item.spicyLevel && item.spicyLevel > 0 && (
                  <div className="absolute bottom-4 start-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 text-sm font-medium text-white">
                    <Flame className="h-4 w-4 text-orange-500" />
                    {item.spicyLevel}/5
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {[item.image, ...thumbnails].map((thumb, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === i
                      ? "border-brand"
                      : "border-border-subtle hover:border-brand/50"
                  }`}
                >
                  <Image src={thumb} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Quick Info */}
            <div className="mt-4 flex flex-wrap gap-3">
              {item.calories && (
                <div className="flex items-center gap-2 rounded-lg bg-surface-card px-3 py-2 text-sm text-text-secondary">
                  <Info className="h-4 w-4" />
                  {item.calories} cal
                </div>
              )}
              {item.preparationTime && (
                <div className="flex items-center gap-2 rounded-lg bg-surface-card px-3 py-2 text-sm text-text-secondary">
                  <Clock className="h-4 w-4" />
                  {item.preparationTime} min
                </div>
              )}
              {item.rating && (
                <div className="flex items-center gap-2 rounded-lg bg-surface-card px-3 py-2 text-sm text-text-secondary">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {item.rating} ({item.reviewCount} {t("reviews")})
                </div>
              )}
            </div>
          </div>

          {/* Right — Details */}
          <div>
            <div className="mb-4 flex items-start justify-between">
              <h1 className="text-3xl font-bold text-white">{isAr ? item.nameAr : item.name}</h1>
            </div>

            <p className="mb-4 text-2xl font-bold text-brand">${item.price.toFixed(2)}</p>

            <p className="mb-6 text-sm leading-relaxed text-text-secondary">
              {isAr ? item.descriptionAr : item.description}
            </p>

            {/* Dietary Tags */}
            {item.dietary && item.dietary.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {item.dietary.map((diet) => (
                  <span key={diet} className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                    {diet === "vegan" ? "Vegan" : diet === "vegetarian" ? "Vegetarian" : diet === "glutenFree" ? "Gluten-Free" : diet}
                  </span>
                ))}
              </div>
            )}

            {/* Allergens Warning */}
            {item.allergens && item.allergens.length > 0 && (
              <div className="mb-6 rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
                <p className="flex items-center gap-2 text-xs text-amber-400">
                  <AlertTriangle className="h-4 w-4" />
                  <strong>{isAr ? "مسببات الحساسية:" : "Allergens:"}</strong> {item.allergens.join(", ")}
                </p>
              </div>
            )}

            {/* Key Ingredients */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold text-white">{t("keyIngredients")}</h3>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ing, i) => (
                    <span key={i} className="rounded-full bg-surface-card px-3 py-1.5 text-xs font-medium text-text-secondary">
                      {isAr ? ing.ar : ing.en}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Customization Options */}
            {item.customizations && item.customizations.length > 0 && (
              <div className="mb-6 rounded-xl border border-border-subtle bg-surface-card p-5">
                <h3 className="mb-4 text-sm font-semibold text-white">{t("customization")}</h3>

                {item.customizations.map((customGroup, groupIndex) => (
                  <div key={groupIndex} className="mb-4">
                    <h4 className="mb-2 text-xs font-semibold text-text-muted">
                      {isAr ? customGroup.nameAr : customGroup.name}
                      {customGroup.required && " *"}
                    </h4>
                    {customGroup.options.map((option, optIndex) => (
                      <label key={optIndex} className="mb-2 flex cursor-pointer items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type={customGroup.required ? "radio" : "checkbox"}
                            name={customGroup.name}
                            checked={selectedCustomizations[option.price] === option.price}
                            onChange={(e) => handleCustomizationChange(option.price, e.target.checked)}
                            className="h-4 w-4 rounded border-border-subtle bg-surface-dark text-brand accent-brand focus:ring-brand"
                          />
                          <span className="text-sm text-white">{isAr ? option.labelAr : option.label}</span>
                        </div>
                        <span className="text-sm text-brand">
                          {option.price > 0 ? `+$${option.price.toFixed(2)}` : t("free")}
                        </span>
                      </label>
                    ))}
                  </div>
                ))}

                <h4 className="mb-2 text-xs font-semibold text-text-muted">{t("specialRequests")}</h4>
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
            {item.pairing && (
              <div className="mb-6 rounded-xl border border-border-subtle bg-surface-card p-5">
                <h3 className="mb-3 text-sm font-semibold text-white">{t("perfectPairing")}</h3>
                <label className="flex cursor-pointer items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={pairing}
                      onChange={() => setPairing(!pairing)}
                      className="h-4 w-4 rounded border-border-subtle text-brand accent-brand focus:ring-brand"
                    />
                    <Wine className="h-5 w-5 text-amber-400" />
                    <span className="text-sm text-white">{isAr ? item.pairing.nameAr : item.pairing.name}</span>
                  </div>
                  <span className="text-sm text-brand">+${item.pairing.price.toFixed(2)}</span>
                </label>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex items-center gap-4">
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

              <button
                onClick={addToCart}
                disabled={isAdding}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover disabled:opacity-50"
              >
                {isAdding ? (isAr ? "جاري الإضافة..." : "Adding...") : `${t("addToOrderBtn")} $${calculateTotal().toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
