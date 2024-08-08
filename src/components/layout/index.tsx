import { ReactNode } from "react";
import Head from "next/head";
import { GoogleAnalytics } from "@next/third-parties/google";

import Header from "./header";
import Footer from "./footer";

import { Providers } from "./providers";

interface LayoutProps {
  title?: string;
  children: ReactNode;
  showFooter?: boolean;
  customStyles?: string;
}

export function Layout({
  title,
  children,
  showFooter = true,
  customStyles,
}: LayoutProps) {
  return (
    <Providers>
      <Head>
        <title>{title ? `${title} | Surge` : "Surge"}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ""}
      />
      <div className="max-w-screen-2xl px-0 mx-auto">
        <div className=" z-50">
          <Header />
        </div>
        <main className={`w-full pt-10 mx-0 ${customStyles}`}>{children}</main>
      </div>
      {showFooter ? <Footer /> : null}
    </Providers>
  );
}
