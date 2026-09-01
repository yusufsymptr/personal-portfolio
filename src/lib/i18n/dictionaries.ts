export const dictionaries = {
  en: {
    nav: { home: "Home", about: "About", projects: "Projects", skills: "Skills", contact: "Contact" },
    home: {
      title: "YUSUF SYAMPUTRA",
      role: "Software Engineering Enthusiast",
      intro: "I enjoy building things for the web and exploring how technology can solve real problems. Currently exploring my path toward Machine Learning.",
      viewProjects: "View Projects",
      viewCV: "View CV",
    },
  },
  id: {
    nav: { home: "Beranda", about: "Tentang", projects: "Proyek", skills: "Keahlian", contact: "Kontak" },
    home: {
      title: "YUSUF SYAMPUTRA",
      role: "[BELUM DITERJEMAHKAN]",
      intro: "[BELUM DITERJEMAHKAN]",
      viewProjects: "Lihat Proyek",
      viewCV: "Lihat CV",
    },
  },
} as const;

export type Locale = keyof typeof dictionaries;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}