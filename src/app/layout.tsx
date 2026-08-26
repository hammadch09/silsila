import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

// A neo-grotesque, not a geometric and not a character face. Bricolage had a
// voice at 96px and that voice was "fun" — wrong register for a product asking
// students to trust it with two years. This one is quiet, has real weight
// range, and does not look like the default.
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Labels, day markers, figures. Keeps data reading as data.
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
  themeColor: "#fbfbfd",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${schibsted.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
