"use client";

import GlobalStyles from "@/styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import Header from "@/components/common/Header";
import KakaoScript from "@/components/KakaoScript";
import NOSSR from "@/components/common/NOSSR";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <KakaoScript />
      </head>
      <body>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Header />
          <NOSSR>{children}</NOSSR>
        </ThemeProvider>
      </body>
    </html>
  );
}
