export type Locale = "en" | "id";

const dictionaries = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    home: {
      role: "Software Engineering Enthusiast",
      title: "YUSUF SYAMPUTRA",
      intro: "I enjoy building things for the web and exploring how technology can solve real problems. Currently exploring my path toward Machine Learning.",
      viewProjects: "View Projects",
      viewCV: "View CV",
      cvUnavailable: "CV coming soon",
      marqueeItems: [
        "Web Development", "React & Next.js", "Laravel", "Database Design", 
        "Machine Learning", "Artificial Intelligence", "UI/UX Wireframing", "REST API"
      ],
    },
    about: {
      title: "About Me",
      bio: "I am a 5th-semester Informatics Engineering student who enjoys building full stack web applications. I spend a lot of my time working with backend logic and frameworks like Laravel to create systems that just work. Moving forward, my main competency focus is expanding my skills into Mobile Development and Machine Learning. I always keep one personal motto in mind: I may not be #1, but I'm beyond #2.",
      educationTitle: "Education",
      education: [
        {
          school: "Politeknik Caltex Riau",
          degree: "Applied Bachelor (D4) in Informatics Engineering",
          year: "5th Semester (Current)"
        },
        {
          school: "MAN 2 Padang",
          degree: "Science / Mathematics (MIPA)",
          year: "Alumnus"
        }
      ],
      journeyTitle: "Journey",
      journey: [
        {
          year: "Present",
          title: "ITSA Member",
          description: "Active member of the Informatics Engineering Student Association (ITSA) at Politeknik Caltex Riau, participating in various technical and organizational initiatives."
        },
        {
          year: "2025 - 2026",
          title: "Community Chairperson",
          description: "Leading a student community representing students from West Sumatra, managing organizational structures and events."
        }
      ],
      interestsTitle: "Current Focus & Interests",
      interests: ["Full Stack Web", "Laravel", "Mobile Development", "Machine Learning", "REST API", "Database Design"]
    },
    projects: {
      title: "Projects",
      subtitle: "Some things I've built, ranging from web applications to data architecture and game development.",
      items: [
        {
          id: "nyamaw",
          title: "Nyam.aw",
          description: "A web-based food ordering platform featuring user authentication, cart management, and dynamic controller logic.",
          images: ["/images/nyamaw.png", "/images/nyamaw1.png", "/images/nyamaw2.png", "/images/nyamaw3.png"],
          tags: ["Laravel", "Full Stack", "MySQL"]
        },
        {
          id: "data-warehouse",
          title: "Retail Data Warehouse",
          description: "Data warehouse architecture design utilizing the 9-step Kimball methodology, star schemas, and ETL processes for retail sales forecasting.",
          images: ["/images/dw.png"], 
          tags: ["Data Engineering", "Tableau", "Kimball Method"]
        },
        {
          id: "rpg-game",
          title: "Echoes of The Past (RPG)",
          description: "A 16-bit style role-playing game focusing on complex event logic, turn-based battle mechanics, and immersive storytelling.",
          images: ["/images/rpg.png", "/images/rpg1.png", "/images/rpg2.png", "/images/rpg3.png"],
          tags: ["RPG Maker", "Event Logic", "Game Design"]
        },
        {
          id: "unity-game",
          title: "Cybernintern",
          description: "A 3D interactive game developed in Unity, exploring environmental physics, player movement mechanics, and level design.",
          images: ["/images/unity.png", "/images/unity1.png", "/images/unity2.png", "/images/unity5.png"],
          tags: ["Unity", "C#", "3D Development"]
        }
      ]
    },
    skills: {
      title: "System Competency",
      subtitle: "My technical expertise visualized as real-time system data extraction.",
      statusLoading: "EXTRACTING DATA...",
      statusComplete: "SYSTEM READY",
      items: [
        {
          name: "Full-Stack Web Architecture",
          percentage: 85,
          description: "Engineering scalable server-side logic and responsive client interfaces using Laravel and modern web frameworks."
        },
        {
          name: "Data Engineering & Modeling",
          percentage: 80,
          description: "Designing optimized relational schemas, ETL pipelines, and robust data warehousing solutions for analytics."
        },
        {
          name: "Infrastructure & Network Topology",
          percentage: 75,
          description: "Configuring robust enterprise network protocols, system communications, and maintaining secure data flow."
        },
        {
          name: "Interactive Media & Logic Synthesis",
          percentage: 65,
          description: "Developing complex event systems, physics simulations, and immersive virtual environments using Unity and RPG Maker."
        }
      ]
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Have a project in mind, a question, or just want to say hi? Fill out the form below or reach out directly.",
      directInfo: "Contact Information",
      availability: "Availability",
      availabilityValue: "Open for Opportunities (Remote)",
      socials: "Digital Presence",
      form: {
        name: "Your Name",
        email: "Email Address",
        message: "Your Message",
        send: "Send Message",
        sending: "Sending...",
        sent: "Message Sent Successfully!"
      }
    }
  },
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      projects: "Proyek",
      skills: "Keahlian",
      contact: "Kontak",
    },
    home: {
      role: "Software Engineering Enthusiast",
      title: "YUSUF SYAMPUTRA",
      intro: "Saya senang membangun sesuatu untuk web dan mengeksplorasi bagaimana teknologi bisa menyelesaikan masalah nyata. Saat ini saya sedang mendalami Machine Learning.",
      viewProjects: "Lihat Proyek",
      viewCV: "Lihat CV",
      cvUnavailable: "CV segera hadir",
      marqueeItems: [
        "Web Development", "React & Next.js", "Laravel", "Database Design", 
        "Machine Learning", "Artificial Intelligence", "UI/UX Wireframing", "REST API"
      ],
    },
    about: {
      title: "Tentang Saya",
      bio: "Saya adalah mahasiswa Teknik Informatika semester 5 yang suka membangun aplikasi web full stack. Saya menghabiskan banyak waktu mengurus backend dan menggunakan framework seperti Laravel untuk membuat sistem yang berjalan lancar. Ke depannya, fokus kompetensi utama saya adalah memperdalam keahlian di bidang Pengembangan Mobile dan Machine Learning. Saya selalu berpegang pada satu moto pribadi: Mungkin saya bukan nomor 1, tapi saya jauh melampaui nomor 2.",
      educationTitle: "Pendidikan",
      education: [
        {
          school: "Politeknik Caltex Riau",
          degree: "D4 Teknik Informatika",
          year: "Semester 5 (Sekarang)"
        },
        {
          school: "MAN 2 Padang",
          degree: "Matematika dan Ilmu Pengetahuan Alam (MIPA)",
          year: "Alumni"
        }
      ],
      journeyTitle: "Perjalanan",
      journey: [
        {
          year: "Sekarang",
          title: "Anggota ITSA",
          description: "Anggota aktif Himpunan Mahasiswa Teknik Informatika (ITSA) di Politeknik Caltex Riau, berpartisipasi dalam berbagai inisiatif teknis maupun organisasi."
        },
        {
          year: "2025 - 2026",
          title: "Ketua Komunitas",
          description: "Memimpin paguyuban/komunitas mahasiswa asal Sumatera Barat di kampus, mengelola struktur organisasi dan berbagai kegiatan kemahasiswaan."
        }
      ],
      interestsTitle: "Fokus & Eksplorasi",
      interests: ["Full Stack Web", "Laravel", "Pengembangan Mobile", "Machine Learning", "REST API", "Desain Database"]
    },
    projects: {
      title: "Proyek",
      subtitle: "Beberapa proyek yang telah saya kerjakan, mulai dari aplikasi web hingga arsitektur data dan pengembangan game.",
      items: [
        {
          id: "nyamaw",
          title: "Nyam.aw",
          description: "Platform pemesanan makanan berbasis web yang dilengkapi dengan autentikasi pengguna, manajemen keranjang, dan logika controller dinamis.",
          images: ["/images/nyamaw.png", "/images/nyamaw1.png", "/images/nyamaw2.png", "/images/nyamaw3.png"],
          tags: ["Laravel", "Full Stack", "MySQL"]
        },
        {
          id: "data-warehouse",
          title: "Retail Data Warehouse",
          description: "Perancangan arsitektur data warehouse menggunakan metodologi Kimball 9-langkah, star schema, dan proses ETL untuk peramalan penjualan ritel.",
          images: ["/images/dw.png"], 
          tags: ["Data Engineering", "Tableau", "Metode Kimball"]
        },
        {
          id: "rpg-game",
          title: "Echoes of The Past (RPG)",
          description: "Game RPG bergaya 16-bit yang berfokus pada logika event yang kompleks, mekanik pertarungan turn-based, dan alur cerita.",
          images: ["/images/rpg.png", "/images/rpg1.png", "/images/rpg2.png", "/images/rpg3.png"],
          tags: ["RPG Maker", "Logika Event", "Game Design"]
        },
        {
          id: "unity-game",
          title: "Cybernintern",
          description: "Game interaktif 3D yang dikembangkan menggunakan Unity, mengeksplorasi fisika lingkungan, mekanik pergerakan pemain, dan desain level.",
          images: ["/images/unity.png", "/images/unity1.png", "/images/unity2.png", "/images/unity5.png"],
          tags: ["Unity", "C#", "3D Development"]
        }
      ]
    },
    skills: {
      title: "Kompetensi Sistem",
      subtitle: "Tingkat penguasaan teknis yang divisualisasikan sebagai ekstraksi data sistem secara real-time.",
      statusLoading: "EKSTRAKSI DATA...",
      statusComplete: "SISTEM SIAP",
      items: [
        {
          name: "Arsitektur Web Full-Stack",
          percentage: 85,
          description: "Membangun logika sisi server yang skalabel dan antarmuka klien yang responsif menggunakan Laravel serta framework web modern."
        },
        {
          name: "Rekayasa & Pemodelan Data",
          percentage: 80,
          description: "Merancang skema relasional yang teroptimasi, pipeline ETL, dan solusi data warehousing yang tangguh untuk kebutuhan analitik."
        },
        {
          name: "Infrastruktur & Topologi Jaringan",
          percentage: 75,
          description: "Mengonfigurasi protokol jaringan skala enterprise, komunikasi sistem, dan menjaga keamanan aliran data."
        },
        {
          name: "Media Interaktif & Sintesis Logika",
          percentage: 65,
          description: "Mengembangkan sistem event yang kompleks, simulasi fisika, dan lingkungan virtual imersif menggunakan Unity dan RPG Maker."
        }
      ]
    },
    contact: {
      title: "Hubungi Saya",
      subtitle: "Ada ide proyek, pertanyaan, atau sekadar ingin menyapa? Silakan isi formulir di bawah atau hubungi saya langsung.",
      directInfo: "Informasi Kontak",
      availability: "Ketersediaan",
      availabilityValue: "Terbuka untuk Peluang (Remote)",
      socials: "Kehadiran Digital",
      form: {
        name: "Nama Anda",
        email: "Alamat Email",
        message: "Pesan Anda",
        send: "Kirim Pesan",
        sending: "Mengirim...",
        sent: "Pesan Berhasil Terkirim!"
      }
    }
  },
};

export const getDictionary = (locale: Locale) => dictionaries[locale] ?? dictionaries.en;