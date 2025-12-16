import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <div className="w-full h-16" />
      <div className="min-h-[calc(100vh-60px)]">{children}</div>
      <Footer />
    </>
  );
}
