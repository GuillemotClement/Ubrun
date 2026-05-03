import { Metadata } from "next";

export const layoutMetadata: Metadata = {
  // permet de définir la base de toutes les url => utiliser par open graph
  metadataBase: new URL("https://ubrun.fr"),

  // définis le titre de l'onglet
  title: {
    default: "Ubrun - Outils et calculateurs pour la course à pied",
    template: "%s | Ubrun",
  },

  // afficher par Google sous le titre et ce que les réseaux prenne => mot clé, donne envie de cliquer, affiche clairement le but de l'app
  description:
    "Calcule tes allures, zones d'entraînement, VMA, temps de course et repères utiles pour mieux comprendre et préparer tes sorties running.",

  // mot clé mais pas forcément utiliser par Google
  keywords: [
    "course à pied",
    "running",
    "calculateur running",
    "calcul allure",
    "VMA",
    "zones d'entraînement",
    "temps de course",
    "préparation course",
    "convertisseur allure en vitesse",
    "prédicteur de temps",
  ],

  // utiliser par les réseaux sociaux => preview pour le partage de lien
  openGraph: {
    title: "Ubrun",
    description:
      "Des calculateurs simples pour mieux comprendre ta course à pied.",
    url: "https://ton-domaine.com",
    siteName: "Ubrun",
    // TODO: modifier pour prendre le bon
    // images: [
    //   {
    //     url: "/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Ubrun",
    //   },
    // ],
    locale: "fr_FR",
    type: "website",
  },

  // spécifique à twitter
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Ubrun",
  //   description:
  //     "Calcule tes allures, VMA et zones d'entraînement facilement.",
  //   images: ["/og-image.png"],
  // },

  // autorise le SEO
  robots: {
    index: true, // autorise à apparaitre dans Google
    follow: true, // permet de suivre les liens
  },
};
