import Navbar from "@/components/nav/Navbar";
import { Locale } from "@/lib/i18n/dictionaries";

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
      <Navbar locale={locale} />
      <main className="pb-20 md:pb-0 md:pt-20">{children}</main>
    </>
  );
}