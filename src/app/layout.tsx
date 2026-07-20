import type { Metadata } from "next";

import "@/app/globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: "N&G Partitions | Drylining & Interior Specialists",
    template: "%s | N&G Partitions"
  },
  description: site.description,
  metadataBase: new URL("https://ngpartitions.co.uk"),
  openGraph: {
    title: "N&G Partitions LTD",
    description: site.description,
    images: ["/assets/images/hero/lobby-reception.webp"],
    locale: "en_GB",
    siteName: "N&G Partitions",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  },
  verification: {
    google: "acGV27rniP4_muSyp_bfahUNq2t7MiIBwZiOuSPwT7I"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}