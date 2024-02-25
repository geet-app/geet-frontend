import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geet",
  description: "Hack@Plaksha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />
      <Body>{children}</Body>
    </html>
  );
}

function Head() {
  return <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"/>
      <link rel="stylesheet" href="assets/css/blobz.min.css" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
}

function Body({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <body className={inter.className}>
      	{children}
      </body>
}
