import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata = {
  title: "Furniro - No.1 furniture store in the USA",
  description: "No.1 furniture store in the USA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
