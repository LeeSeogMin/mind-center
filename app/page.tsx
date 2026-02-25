import HeroSection from "@/components/home/hero-section";
import ServiceSection from "@/components/home/service-section";
import AboutSection from "@/components/home/about-section";
import ProcessSection from "@/components/home/process-section";
import ReservationCTA from "@/components/home/reservation-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <AboutSection />
      <ProcessSection />
      <ReservationCTA />
    </>
  );
}
