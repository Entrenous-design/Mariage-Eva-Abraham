import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Eva & Abraham",
  description: "Nous vous invitons à célébrer notre mariage",
  // ✨ OpenGraph pour l'aperçu du lien sur mobile et réseaux sociaux
  openGraph: {
    title: "Eva & Abraham",
    description: "Nous vous invitons à célébrer notre mariage",
    url: "https://mariage-eva-abraham.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://mariage-eva-abraham.vercel.app/logo-whatsapp.png",
        width: 1200,
        height: 630,
        alt: "Aperçu du mariage Eva & Abraham",
      },
    ],
  },
  // ✨ Twitter Card pour l'aperçu sur Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "Eva & Abraham",
    description: "Nous vous invitons à célébrer notre mariage",
    images: ["https://mariage-eva-abraham.vercel.app/logo-whatsapp.png"],
  },
  // ✨ Apple et autres appareils
  icons: {
    icon: "/preview.jpg",
    apple: "/preview.jpg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/preview.jpg" type="image/jpeg" />
        {/* Préchargement de toutes les images pour améliorer les performances */}
        <link rel="preload" href="/1.svg" as="image" />
        <link rel="preload" href="/2.svg" as="image" />
        <link rel="preload" href="/3.svg" as="image" />
        <link rel="preload" href="/4.svg" as="image" />
        <link rel="preload" href="/5.svg" as="image" />
        <link rel="preload" href="/6.svg" as="image" />
        <link rel="preload" href="/rsvp.svg" as="image" />
        <link rel="preload" href="/logo-whatsapp.png" as="image" />
        <link rel="preload" href="/preview.jpg" as="image" />
      </head>
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
