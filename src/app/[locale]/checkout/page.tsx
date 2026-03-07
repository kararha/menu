"use client";

import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import { checkoutOrderItems } from "@/data/mockData";
import {
    MapPin,
    Calendar,
    Clock,
    CreditCard,
    Plus,
    ArrowRight,
    Lock,
    ChevronRight,
} from "lucide-react";
import { Icons } from "@/assets/icons";
import { useState } from "react";

export default function CheckoutPage() {
    const t = useTranslations("Checkout");
    const locale = useLocale();
    const isAr = locale === "ar";
    const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">(
        "delivery"
    );
    const [paymentMethod, setPaymentMethod] = useState("visa");

    const subtotal = checkoutOrderItems.reduce(
        (sum, item) => sum + item.price,
        0
    );
    const deliveryFee = 5.0;
    const taxes = 6.5;
    const total = subtotal + deliveryFee + taxes;

    return (
        <div className="min-h-screen bg-surface-dark">
            <Header />
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Step Label */}
                <div className="mb-6 flex items-center gap-2 text-xs text-text-muted">
                    <span className="text-text-secondary">{t("stepLabel")}</span>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left — Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Delivery Details */}
                        <section className="rounded-xl border border-border-subtle bg-surface-card p-6">
                            <h2 className="mb-4 text-lg font-bold text-white">
                                {t("deliveryDetails")}
                            </h2>

                            {/* Toggle */}
                            <div className="mb-5 flex rounded-full bg-surface-dark p-1">
                                <button
                                    onClick={() => setDeliveryMode("delivery")}
                                    className={`flex-1 rounded-full py-2 text-sm font-medium transition-all ${deliveryMode === "delivery"
                                            ? "bg-brand text-white"
                                            : "text-text-secondary hover:text-white"
                                        }`}
                                >
                                    {t("deliveryToggle")}
                                </button>
                                <button
                                    onClick={() => setDeliveryMode("pickup")}
                                    className={`flex-1 rounded-full py-2 text-sm font-medium transition-all ${deliveryMode === "pickup"
                                            ? "bg-brand text-white"
                                            : "text-text-secondary hover:text-white"
                                        }`}
                                >
                                    {t("pickupToggle")}
                                </button>
                            </div>

                            {/* Address */}
                            <div className="mb-4 flex items-start justify-between rounded-lg border border-border-subtle bg-surface-dark p-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                                    <div>
                                        <p className="text-sm font-semibold text-white">
                                            {t("homeLabel")}
                                        </p>
                                        <p className="mt-0.5 text-xs text-text-secondary">
                                            {t("address")}
                                        </p>
                                    </div>
                                </div>
                                <button className="text-sm font-medium text-brand transition-colors hover:text-brand-light">
                                    {t("edit")}
                                </button>
                            </div>

                            {/* Date & Time */}
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface-dark p-3">
                                    <Calendar className="h-4 w-4 text-text-muted" />
                                    <span className="text-sm text-white">{t("date")}</span>
                                    <ChevronRight className="ms-auto h-4 w-4 text-text-muted" />
                                </div>
                                <div className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface-dark p-3">
                                    <Clock className="h-4 w-4 text-text-muted" />
                                    <span className="text-sm text-white">{t("time")}</span>
                                    <ChevronRight className="ms-auto h-4 w-4 text-text-muted" />
                                </div>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section className="rounded-xl border border-border-subtle bg-surface-card p-6">
                            <h2 className="mb-4 text-lg font-bold text-white">
                                {t("paymentMethod")}
                            </h2>

                            <div className="space-y-3">
                                {/* Visa */}
                                <label
                                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all ${paymentMethod === "visa"
                                            ? "border-brand bg-brand/5"
                                            : "border-border-subtle bg-surface-dark hover:border-brand/40"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="visa"
                                            checked={paymentMethod === "visa"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="h-4 w-4 border-border-subtle text-brand accent-brand focus:ring-brand"
                                        />
                                        <CreditCard className="h-5 w-5 text-blue-400" />
                                        <div>
                                            <p className="text-sm font-medium text-white">
                                                {t("visaEnding")}
                                            </p>
                                            <p className="text-xs text-text-muted">
                                                {t("expires")}
                                            </p>
                                        </div>
                                    </div>
                                </label>

                                {/* Apple Pay */}
                                <label
                                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all ${paymentMethod === "apple"
                                            ? "border-brand bg-brand/5"
                                            : "border-border-subtle bg-surface-dark hover:border-brand/40"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="apple"
                                            checked={paymentMethod === "apple"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="h-4 w-4 border-border-subtle text-brand accent-brand focus:ring-brand"
                                        />
                                        <Icons.Apple className="h-5 w-5 text-green-400" />
                                        <p className="text-sm font-medium text-white">
                                            {t("applePay")}
                                        </p>
                                    </div>
                                </label>

                                {/* Add New */}
                                <button className="flex w-full items-center gap-3 rounded-lg border border-dashed border-border-subtle p-4 text-text-secondary transition-colors hover:border-brand hover:text-brand">
                                    <Plus className="h-4 w-4" />
                                    <span className="text-sm">{t("addNewPayment")}</span>
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Right — Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-xl border border-border-subtle bg-surface-card p-6">
                            <h2 className="mb-5 text-lg font-bold text-white">
                                {t("orderSummary")}
                            </h2>

                            {/* Items */}
                            <div className="space-y-3 mb-4">
                                {checkoutOrderItems.map((item, i) => (
                                    <div key={i} className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm text-white">
                                                {item.qty}x {isAr ? item.nameAr : item.name}
                                            </p>
                                            {item.extra && (
                                                <p className="text-xs text-text-muted">
                                                    {isAr ? item.extraAr : item.extra}
                                                </p>
                                            )}
                                        </div>
                                        <span className="shrink-0 text-sm text-white">
                                            ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-border-subtle pt-4 space-y-3 text-sm">
                                <div className="flex justify-between text-text-secondary">
                                    <span>{t("subtotal")}</span>
                                    <span className="text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-text-secondary">
                                    <span>{t("deliveryFee")}</span>
                                    <span className="text-white">${deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-text-secondary">
                                    <span>{t("taxes")}</span>
                                    <span className="text-white">${taxes.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="my-4 border-t border-border-subtle" />

                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-white">
                                    {t("total")}
                                </span>
                                <span className="text-2xl font-extrabold text-brand">
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover">
                                {t("payAndPlace")}
                                <ArrowRight className="h-4 w-4" />
                            </button>

                            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-muted">
                                <Lock className="h-3 w-3" />
                                {t("securityNote")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
