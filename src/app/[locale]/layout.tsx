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
    en: "At Fox Airlines, every journey is more than just a destination — it's an experience. Whether you're flying across continents or chasing the sunset, we're here to make your adventure seamless, stylish, and unforgettable. With a commitment to comfort, reliability, and a touch of wonder, Fox Airlines takes flight with you in mind.",
    ru: "Авиакомпания Fox Airlines сделает каждое ваше путешествие нечто большим, чем просто перелёт до пункта назначения. Пересекаете ли вы континенты или любуетесь закатом, мы готовы сделать ваше приключение комфортным, стильным и незабываемым. Делая ставку на комфорт, надежность и частичку чуда, авиакомпания Fox Airlines летает, думая о вас.",
    fi: "Fox Airlinesilla jokainen matka on enemmän kuin vain määränpää - se on kokemus. Lennätpä sitten mantereiden halki tai jahtaamassa auringonlaskua, me autamme sinua tekemään seikkailustasi saumattoman, tyylikkään ja unohtumattoman. Sitoutumalla mukavuuteen, luotettavuuteen ja ripaukseen ihmeellisyyttä, Fox Airlines lentää sinua ajatellen.",
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

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
