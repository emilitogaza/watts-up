import type { Metadata, Viewport } from "next";
import { Mona_Sans } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// Runs synchronously during HTML parsing, before first paint, so the saved (or
// system) theme is applied to <html> with no flash of the wrong colours. Falls
// back to the OS preference when the user hasn't chosen one yet.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

// ── Site identity ─────────────────────────────────────────────────────────
// Replace these three for a new site. The wordmark text lives in
// `app/(course)/layout.tsx` and `components/mobile-nav.tsx`; the icon lives in
// `app/icon.svg` + `public/icons/`. See docs/theming.md.
const SITE_NAME = "Watt's Up";
const SITE_TITLE = "Watt's Up — how electricity actually works";
const SITE_DESCRIPTION =
  "A fun, free mini-course on electricity: what it is, how spinning magnets make it, how it crosses the country into your wall socket, and why the third pin is your bodyguard.";

// Browser UI colour (address bar). Keep in sync with the `--color-volt-*`
// ramp in globals.css: light = volt-50, dark = volt-950.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(48, 90%, 96%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(40, 60%, 4%)" },
  ],
};

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: {
      template: `%s | ${SITE_NAME}`,
      default: SITE_TITLE,
    },
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: `%s | ${SITE_NAME}`,
      default: SITE_TITLE,
    },
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Lets Next.js disable the CSS smooth scroll while it resets the scroll
      // position on navigation, so route transitions don't animate a scroll.
      data-scroll-behavior="smooth"
      // The inline theme script sets the `dark` class before React hydrates.
      suppressHydrationWarning
      className={`${monaSans.variable} h-full antialiased selection:text-ink-flip selection:bg-brand`}
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted inline theme script, no user input */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
