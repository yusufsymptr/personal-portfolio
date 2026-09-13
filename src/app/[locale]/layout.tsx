import Navbar from "@/components/nav/Navbar";
import { Locale } from "@/lib/i18n/dictionaries";
import Preloader from "@/components/Preloader";
import type { Metadata } from "next";

// Konfigurasi SEO Super Kuat
export const metadata: Metadata = {
  title: "Yusuf Syam Putra | Software Engineer & UI/UX Designer",
  description: "Portofolio profesional Yusuf Syam Putra, mahasiswa Teknik Informatika di Politeknik Caltex Riau. Berpengalaman dalam pengembangan Full-stack (Next.js, Laravel), UI/UX (Figma), dan arsitektur data.",
  verification: {
    google: 'PTwolPN2DIEg6IVrdELcHUHgGT5gaR1QHjQMi0iLW8U',
  },
  keywords: [
    "Yusuf Syam Putra", 
    "Yusuf Syam", 
    "Portofolio Yusuf Syamputra", 
    "Yusuf Syam Putra PCR",
    "Yusuf Syamputra Vercel",
    "Software Engineer", 
    "Web Developer Indonesia"
  ],
  authors: [{ name: "Yusuf Syam Putra" }],
  creator: "Yusuf Syam Putra",
  openGraph: {
    title: "Yusuf Syam Putra | Tech Portfolio",
    description: "Jelajahi proyek web, animasi 3D, dan arsitektur jaringan hasil karya Yusuf Syam Putra.",
    url: "https://yusufsyamputra.vercel.app", // Ganti dengan URL Vercel Anda nanti saat sudah deploy
    siteName: "Yusuf Syam Putra Portfolio",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ... sisa kode layout Anda (RootLayout function) ...
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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