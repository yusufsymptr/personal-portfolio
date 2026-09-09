import Navbar from "@/components/nav/Navbar";
import { Locale } from "@/lib/i18n/dictionaries";
import Preloader from "@/components/Preloader";
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Preloader />
        <Navbar locale={locale} />
        <main className="flex flex-col min-h-dvh pb-20 md:min-h-0 md:block md:pb-0 md:pt-20">{children}</main>
    </>
  );
}