"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { cartItems } from "@/data/mockData";
import { Minus, Plus, ArrowRight } from "lucide-react";
import { Icons } from "@/assets/icons";
import { useState } from "react";

export default function CartPage() {
    const t = useTranslations("Cart");
    const locale = useLocale();
    const isAr = locale === "ar";
    const [items, setItems] = useState(
        cartItems.map((item) => ({ ...item }))
    );

    const updateQuantity = (id: number, delta: number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const serviceFee = 2.5;
    const delivery = 5.0;
    const tax = +(subtotal * 0.085).toFixed(2);
    const total = subtotal + serviceFee + delivery + tax;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-surface-dark">
            <Header />
            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <h1 className="mb-6 text-2xl font-bold text-white">{t("title")}</h1>

                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 rounded-xl border border-border-subtle bg-surface-card p-4"
                                >
                                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                                        <Image
                                            src={item.image}
                                            alt={isAr ? item.nameAr : item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-white">
                                                    {isAr ? item.nameAr : item.name}
                                                </h3>
                                                <p className="mt-1 text-xs text-text-secondary line-clamp-2">
                                                    {isAr ? item.descriptionAr : item.description}
                                                </p>
                                            </div>
                                            <span className="shrink-0 font-bold text-brand">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between">
                                            <button className="text-sm font-medium text-brand transition-colors hover:text-brand-light">
                                                {t("editItem")}
                                            </button>
                                            <div className="flex items-center gap-0 rounded-lg border border-border-subtle bg-surface-dark">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:text-white"
                                                >
                                                    <Minus className="h-3.5 w-3.5" />
                                                </button>
                                                <span className="flex h-8 w-8 items-center justify-center text-xs font-semibold text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:text-white"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Special Instructions */}
                        <div className="mt-6">
                            <h3 className="mb-2 text-sm font-semibold text-white">
                                {t("specialInstructions")}
                            </h3>
                            <textarea
                                placeholder={t("specialInstructionsPlaceholder")}
                                className="w-full rounded-xl border border-border-subtle bg-surface-card p-4 text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-xl border border-border-subtle bg-surface-card p-6">
                            <h2 className="mb-5 text-lg font-bold text-white">
                                {t("orderSummary")}
                            </h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-text-secondary">
                                    <span>
                                        {t("subtotal")} ({totalItems} {t("items")})
                                    </span>
                                    <span className="text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-text-secondary">
                                    <span>{t("serviceFee")}</span>
                                    <span className="text-white">${serviceFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-text-secondary">
                                    <span>{t("delivery")}</span>
                                    <span className="text-white">${delivery.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-text-secondary">
                                    <span>{t("estimatedTax")}</span>
                                    <span className="text-white">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="my-5 border-t border-border-subtle" />

                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-white">
                                    {t("total")}
                                </span>
                                <span className="text-2xl font-extrabold text-brand">
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            <Link
                                href={`/${locale}/checkout`}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
                            >
                                {t("proceedToCheckout")}
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href={`/${locale}`}
                                className="mt-3 block text-center text-sm text-text-secondary transition-colors hover:text-brand"
                            >
                                {t("continueShopping")}
                            </Link>

                            {/* Payment Icons */}
                            <div className="mt-5 flex items-center justify-center gap-3 opacity-40">
                                <Icons.CreditCard className="h-4 w-4 text-text-muted" />
                                <span className="text-xs text-text-muted">VISA</span>
                                <span className="text-xs text-text-muted">MC</span>
                                <span className="text-xs text-text-muted">AMEX</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
