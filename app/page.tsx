"use client";
import { useCallback, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sections from "@/components/Sections";
import BookingModal from "@/components/BookingModal";
import ServicesSection from "@/components/services/ServicesSection";
import CarDetailingSection from "@/components/CarDetailingSection/CarDetailingSection";
import Footer from "@/components/Footer";
import ServiceAreas from "@/components/Serviceareas/Serviceareas";
import AboutSection from "@/components/Aboutsection/Aboutsection";
import WorkGallery from "@/components/Workgallery/Workgallery";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<string | undefined>();
  const book = useCallback((s?: string) => { setService(s); setOpen(true); }, []);
  return (
    <main>
      <Header onBook={() => book()} />
      <Hero onBook={book} />
      <CarDetailingSection />
      <ServicesSection onBook={book}/>
      <ServiceAreas/>
      <AboutSection/>
      <WorkGallery/>
      {/* <Sections onBook={book} />
      <BookingModal open={open} initialService={service} onClose={() => setOpen(false)} /> */}
      <Footer/>
    </main>
  );
}
