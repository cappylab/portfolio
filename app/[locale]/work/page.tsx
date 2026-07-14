import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllProjects } from "@/lib/work";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import ScrollReveal from "@/components/ScrollReveal";
import Work from "@/components/Work";

const localePath = (locale: string, path: string) =>
  `${locale === routing.defaultLocale ? "" : "/" + locale}${path}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [work, metadata] = await Promise.all([
    getTranslations({ locale, namespace: "Work" }),
    getTranslations({ locale, namespace: "Metadata" }),
  ]);
  const path = "/work";
  const languages = Object.fromEntries(
    routing.locales.map((currentLocale) => [
      currentLocale,
      localePath(currentLocale, path),
    ])
  );

  return {
    title: `${work("catalogueTitle")} — ${metadata("siteName")}`,
    description: metadata("rootDescription"),
    alternates: {
      canonical: `https://jeonghamin.dev${localePath(locale, path)}`,
      languages,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative min-h-screen" id="main-content">
      <ScrollReveal />
      <AmbientBackground />
      <Nav />
      <Work projects={getAllProjects()} catalogue />
      <Footer />
    </main>
  );
}
