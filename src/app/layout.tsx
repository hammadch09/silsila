import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// One family doing display and body. Bricolage is a grotesque with genuinely
// odd proportions — flared stems, tight apertures, a variable width axis — so
// it has a voice at 90px and still sets clean at 16px. Coherent without being
// characterless, which is the thing Inter and Plex cannot do.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  display: "swap",
});

// Labels, day markers, figures. The one cool, technical note in a warm page —
// it keeps the whole thing from tipping into poster.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  // Without this the OG image resolves against localhost in production and the
  // WhatsApp link preview silently breaks — which is the one preview that
  // matters most here.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Silsila — roz ek kaam, aur koi poochne wala",
  description:
    "A 3-month plan. One 30-minute task a day. Graded, not ticked. All on WhatsApp. For computing students in Pakistan who got the roadmap and stopped on day four.",
};

export const viewport: Viewport = {
  themeColor: "#ff7a00",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
