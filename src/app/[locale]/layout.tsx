import { Metadata } from "next";
import { notFound } from "next/navigation";
import "./global.css";

const supportedLocales = ["en", "fi", "ru"];

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const descriptions: Record<string, string> = {
    en: "At Fox Airlines, every journey is more than just a destination...",
    ru: "Авиакомпания Fox Airlines сделает каждое ваше путешествие...",
    fi: "Fox Airlinesilla jokainen matka on enemmän kuin vain määränpää...",
  };

  return {
    title: "Fox Airlines",
    description: descriptions[locale] || descriptions["en"],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  // ✅ no <html> or <body> here
  return <section lang={locale}>{children}</section>;
}
