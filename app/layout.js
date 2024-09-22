import { Analytics } from "@vercel/analytics/react"
import { Oldenburg } from "next/font/google";
import "./globals.css";

const oldenburg = Oldenburg({ subsets: ["latin"], weight: '400' });

export const metadata = {
  title: "Interactive map for Dungeonborne",
  description: "Interactive map for Dungeonborne",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`overflow-x-hidden ${oldenburg.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
