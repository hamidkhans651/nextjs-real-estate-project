import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";


export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="  ">


      <div className="w-full p-2">
        <Navbar />
        {children}
        <Footer />


      </div>
    </section>
  );
}
