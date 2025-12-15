
import Navbar from "@/asf/navbar";
import Hero from "@/asf/hero";
import Partners from "@/asf/partners";
import Work from "@/asf/work";
import About from "@/asf/about";
import Faq from "@/asf/faq";
import Hero2 from "@/asf/hero2";
import Footer from "@/asf/footer";
// import Ribbon from "@/asf/ribbon";

export default function Home() {
  return (

    <div className="relative">
      <Navbar />
      <Hero />
      <Hero2 />
      <Partners />
      <Work />
      <About />
      <Faq />
      <Footer />
    </div>
    
  );
}
