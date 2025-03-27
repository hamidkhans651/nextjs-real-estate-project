import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Toaster } from "react-hot-toast"; // Import the Toaster
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { SessionProvider } from "next-auth/react";

// import { fontSans } from "@/config/fonts";

// Set metadata for light and dark theme color scheme
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

// Viewport for theme colors based on light/dark mode
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>

    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
        )}
      >

        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {/* Toaster for notifications */}
          <Toaster position="top-center" reverseOrder={false} />

          {/* Main content */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
    </SessionProvider>

  );
}
