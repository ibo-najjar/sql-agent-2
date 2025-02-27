import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/nav/Navbar";
import { cn } from "@/lib/utils";
import Nav from "@/components/nav/nav";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("antialiased overflow-overlay", inter.className)}>
        <Providers>
          {/* @ts-expect-error Server Component */}

          <Nav />
          <main className="grow">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
