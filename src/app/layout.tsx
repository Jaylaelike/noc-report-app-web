import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "~/components/Header";

const inter = Inter({ subsets: ["latin"] });

import { SessionProvider } from "~/components/providers/Session.provider";
import { validateRequest } from "~/auth/validateRequest";
import Providers from "~/components/providers/Providers";

import localFont from "next/font/local";

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: "../../public/Prompt/Prompt-Regular.ttf",
});

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const sessionData = await validateRequest();
  return (
    <Providers>
      <html lang="en" className={`${GeistSans.variable}`}>
      <SessionProvider value={sessionData}>
        <body className={`${myFont.className}`}>
        <Header />

          <main className="container mx-auto">
           {children}
          </main>
        </body>
        </SessionProvider>
      </html>
    </Providers>
  );
}
