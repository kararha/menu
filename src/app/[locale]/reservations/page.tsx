"use client";

import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import { Calendar, Clock, Users, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ReservationsPage() {
    const t = useTranslations("Reservations");
    const locale = useLocale();
    const isAr = locale === "ar";
    
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState("2");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");

    const timeSlots = [
        "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM",
        "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"
    ];

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

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Form */}
                    <section className="rounded-xl border border-border-subtle bg-surface-card p-6">
                        <h2 className="mb-6 text-xl font-bold text-white">
                            {t("bookTable")}
                        </h2>
                        
                        <form className="space-y-5">
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                                        {t("date")}
                                    </label>
                                    <div className="flex items-center gap-2 rounded-lg border border-border-subtle bg-surface-dark px-3 py-2.5">
                                        <Calendar className="h-4 w-4 text-text-muted" />
                                        <input 
                                            type="date" 
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full bg-transparent text-sm text-white focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                                        {t("time")}
                                    </label>
                                    <div className="flex items-center gap-2 rounded-lg border border-border-subtle bg-surface-dark px-3 py-2.5">
                                        <Clock className="h-4 w-4 text-text-muted" />
                                        <select 
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="w-full bg-transparent text-sm text-white focus:outline-none"
                                        >
                                            <option value="">{t("selectTime")}</option>
                                            {timeSlots.map(slot => (
                                                <option key={slot} value={slot} className="bg-surface-dark">{slot}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                                        {t("guests")}
                                    </label>
                                    <div className="flex items-center gap-2 rounded-lg border border-border-subtle bg-surface-dark px-3 py-2.5">
                                        <Users className="h-4 w-4 text-text-muted" />
                                        <select 
                                            value={guests}
                                            onChange={(e) => setGuests(e.target.value)}
                                            className="w-full bg-transparent text-sm text-white focus:outline-none"
                                        >
                                            {[1,2,3,4,5,6,7,8,9,10].map(n => (
                                                <option key={n} value={n} className="bg-surface-dark">{n} {n === 1 ? t("guest") : t("guests")}</option>
                                            ))}
                                            <option value="10+" className="bg-surface-dark">10+ {t("guests")}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                                        {t("fullName")}
                                    </label>
                                    <input 
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={t("namePlaceholder")}
                                        className="w-full rounded-lg border border-border-subtle bg-surface-dark px-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                                        {t("email")}
                                    </label>
                                    <input 
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t("emailPlaceholder")}
                                        className="w-full rounded-lg border border-border-subtle bg-surface-dark px-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-text-secondary">
                                    {t("phone")}
                                </label>
                                <input 
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder={t("phonePlaceholder")}
                                    className="w-full rounded-lg border border-border-subtle bg-surface-dark px-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-text-secondary">
                                    {t("specialRequests")}
                                </label>
                                <textarea 
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder={t("notesPlaceholder")}
                                    rows={3}
                                    className="w-full rounded-lg border border-border-subtle bg-surface-dark px-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none"
                                />
                            </div>

                            <button 
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
                            >
                                {t("confirmReservation")}
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </form>
                    </section>

                    {/* Info */}
                    <section className="space-y-6">
                        <div className="rounded-xl border border-border-subtle bg-surface-card p-6">
                            <h3 className="mb-4 text-lg font-bold text-white">
                                {t("contactInfo")}
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-text-secondary">
                                    <MapPin className="h-5 w-5 text-brand" />
                                    <span>123 Culinary Avenue, Metropolis, NY 10012</span>
                                </div>
                                <div className="flex items-center gap-3 text-text-secondary">
                                    <Phone className="h-5 w-5 text-brand" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-3 text-text-secondary">
                                    <Mail className="h-5 w-5 text-brand" />
                                    <span>reservations@lumiere.com</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-border-subtle bg-surface-card p-6">
                            <h3 className="mb-4 text-lg font-bold text-white">
                                {t("hours")}
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">{t("mondayThursday")}</span>
                                    <span className="text-white">12:00 PM - 10:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">{t("fridaySaturday")}</span>
                                    <span className="text-white">12:00 PM - 11:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">{t("sunday")}</span>
                                    <span className="text-white">12:00 PM - 9:00 PM</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-border-subtle bg-surface-card p-6">
                            <h3 className="mb-4 text-lg font-bold text-white">
                                {t("privateDining")}
                            </h3>
                            <p className="text-sm text-text-secondary">
                                {t("privateDiningDesc")}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
