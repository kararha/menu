import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Work_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ToastProvider } from "@/components/Toast";
import "../globals.css";

const workSans = Work_Sans({
    variable: "--font-work-sans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
    variable: "--font-ibm-arabic",
    subsets: ["arabic"],
    weight: ["300", "400", "500", "600", "700"],
});

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as "en" | "ar")) {
        notFound();
    }

    const messages = await getMessages();
    const dir = locale === "ar" ? "rtl" : "ltr";

    return (
        <html lang={locale} dir={dir}>
            <body
                className={`${workSans.variable} ${ibmPlexArabic.variable} antialiased`}
                style={{
                    fontFamily:
                        locale === "ar"
                            ? "'IBM Plex Sans Arabic', sans-serif"
                            : "'Work Sans', sans-serif",
                }}
            >
                <ToastProvider>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        {children}
                    </NextIntlClientProvider>
                </ToastProvider>
            </body>
        </html>
    );
}
