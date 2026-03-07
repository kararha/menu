"use client";

import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Image from "next/image";
import { Gift, Mail, Heart, ArrowRight, CreditCard } from "lucide-react";
import { useState } from "react";

const amounts = [25, 50, 75, 100, 150, 200];

const designs = [
    { id: 1, name: "Classic", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop" },
    { id: 2, name: "Celebration", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=200&fit=crop" },
    { id: 3, name: "Elegant", image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop" },
];

export default function GiftCardsPage() {
    const t = useTranslations("GiftCards");
    const locale = useLocale();
    const isAr = locale === "ar";

    const [amount, setAmount] = useState(50);
    const [design, setDesign] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [recipientName, setRecipientName] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [senderName, setSenderName] = useState("");
    const [message, setMessage] = useState("");

    return (
        <div className="min-h-screen bg-surface-dark">
            <Header />
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero */}
                <section className="mb-12 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/20">
                            <Gift className="h-8 w-8 text-brand" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-4xl font-extrabold text-white">
                        {t("title")}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-text-secondary">
                        {t("subtitle")}
                    </p>
                </section>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Selection */}
                    <section className="space-y-6">
                        <div className="rounded-xl border border-border-subtle bg-surface-card p-6">
                            <h2 className="mb-4 text-lg font-bold text-white">
                                {t("selectAmount")}
                            </h2>
                            <div className="grid grid-cols-3 gap-3">
                                {amounts.map((a) => (
                                    <button
                                        key={a}
                                        onClick={() => setAmount(a)}
                                        className={`rounded-lg py-3 text-sm font-semibold transition-all ${
                                            amount === a
                                                ? "bg-brand text-white"
                                                : "border border-border-subtle text-text-secondary hover:border-brand hover:text-brand"
                                        }`}
                                    >
                                        ${a}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4">
                                <label className="mb-2 block text-sm text-text-secondary">
                                    {t("customAmount")}
                                </label>
                                <input 
                                    type="number"
                                    className="w-full rounded-lg border border-border-subtle bg-surface-dark px-4 py-2.5 text-white focus:border-brand focus:outline-none"
                                    placeholder="$"
                                />
                            </div>
                        </div>

                        <div className="rounded-xl border border-border-subtle bg-surface-card p-6">
                            <h2 className="mb-4 text-lg font-bold text-white">
                                {t("selectDesign")}
                            </h2>
                            <div className="grid grid-cols-3 gap-3">
                                {designs.map((d) => (
                                    <button
                                        key={d.id}
                                        onClick={() => setDesign(d.id)}
                                        className={`relative overflow-hidden rounded-lg transition-all ${
                                            design === d.id ? "ring-2 ring-brand" : "opacity-70 hover:opacity-100"
                                        }`}
                                    >
                                        <Image
                                            src={d.image}
                                            alt={d.name}
                                            width={120}
                                            height={80}
                                            className="h-20 w-full object-cover"
                                        />
                                        <span className="absolute bottom-0 left-0 right-0 bg-black/60 py-1 text-center text-xs text-white">
                                            {d.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border border-border-subtle bg-surface-card p-6">
                            <h2 className="mb-4 text-lg font-bold text-white">
                                {t("quantity")}
                            </h2>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle text-white transition-colors hover:border-brand hover:text-brand"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center text-xl font-bold text-white">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle text-white transition-colors hover:border-brand hover:text-brand"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Delivery */}
                    <section className="space-y-6">
                        <div className="rounded-xl border border-border-subtle bg-surface-card p-6">
                            <h2 className="mb-4 text-lg font-bold text-white">
                                {t("deliveryDetails")}
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                                        {t("recipientName")}
                                    </label>
                                    <input 
                                        type="text"
                                        value={recipientName}
                                        onChange={(e) => setRecipientName(e.target.value)}
                                        className="w-full rounded-lg border border-border-subtle bg-surface-dark px-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                                        {t("recipientEmail")}
                                    </label>
                                    <input 
                                        type="email"
                                        value={recipientEmail}
                                        onChange={(e) => setRecipientEmail(e.target.value)}
                                        className="w-full rounded-lg border border-border-subtle bg-surface-dark px-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                                        {t("senderName")}
                                    </label>
                                    <input 
                                        type="text"
                                        value={senderName}
                                        onChange={(e) => setSenderName(e.target.value)}
                                        className="w-full rounded-lg border border-border-subtle bg-surface-dark px-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                                        {t("personalMessage")}
                                    </label>
                                    <textarea 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={3}
                                        className="w-full rounded-lg border border-border-subtle bg-surface-dark px-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="rounded-xl border border-border-subtle bg-surface-card p-6">
                            <h2 className="mb-4 text-lg font-bold text-white">
                                {t("orderSummary")}
                            </h2>
                            <div className="space-y-3 border-b border-border-subtle pb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-secondary">{t("giftCard")} x{quantity}</span>
                                    <span className="text-white">${(amount * quantity).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-secondary">{t("processingFee")}</span>
                                    <span className="text-white">$0.00</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <span className="font-bold text-white">{t("total")}</span>
                                <span className="text-2xl font-extrabold text-brand">
                                    ${(amount * quantity).toFixed(2)}
                                </span>
                            </div>

                            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover">
                                <CreditCard className="h-4 w-4" />
                                {t("purchase")}
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </section>
                </div>

                {/* Features */}
                <section className="mt-12 grid gap-6 md:grid-cols-3">
                    <div className="rounded-xl border border-border-subtle bg-surface-card p-6 text-center">
                        <div className="mb-3 flex justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/20">
                                <Mail className="h-6 w-6 text-brand" />
                            </div>
                        </div>
                        <h3 className="mb-2 font-bold text-white">{t("feature1Title")}</h3>
                        <p className="text-sm text-text-secondary">{t("feature1Desc")}</p>
                    </div>
                    <div className="rounded-xl border border-border-subtle bg-surface-card p-6 text-center">
                        <div className="mb-3 flex justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/20">
                                <Heart className="h-6 w-6 text-brand" />
                            </div>
                        </div>
                        <h3 className="mb-2 font-bold text-white">{t("feature2Title")}</h3>
                        <p className="text-sm text-text-secondary">{t("feature2Desc")}</p>
                    </div>
                    <div className="rounded-xl border border-border-subtle bg-surface-card p-6 text-center">
                        <div className="mb-3 flex justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/20">
                                <Gift className="h-6 w-6 text-brand" />
                            </div>
                        </div>
                        <h3 className="mb-2 font-bold text-white">{t("feature3Title")}</h3>
                        <p className="text-sm text-text-secondary">{t("feature3Desc")}</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
