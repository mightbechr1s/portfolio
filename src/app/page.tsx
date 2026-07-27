import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
