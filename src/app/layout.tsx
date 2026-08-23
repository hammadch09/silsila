import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Qadam — one small task a day, checked by a real person",
  description:
    "You got the roadmap. You did three days. Nobody checked in on day four. That's the part we fix. 30–45 minutes a day, all on WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#05100c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning covers exactly one thing: the `data-js`
    // attribute the script below adds before React hydrates. Scoped to <html>
    // itself, so mismatches anywhere else still surface.
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available before first paint, so reveal elements only
            start hidden when something can reveal them. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-js','')`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-ink text-body">
        {children}
      </body>
    </html>
  );
}
