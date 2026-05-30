import type { Service } from "@/data/services";
import Header from "@/components/layout/Header";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import LandingHero from "./LandingHero";
import ProblemSection from "./ProblemSection";
import SolutionSection from "./SolutionSection";
import BeforeAfterGallery from "./BeforeAfterGallery";
import ProcedureDetails from "./ProcedureDetails";
import PricingSection from "./PricingSection";
import DoctorMiniProfile from "./DoctorMiniProfile";
import FAQAccordion from "./FAQAccordion";
import TestimonialStrip from "./TestimonialStrip";
import LocationCTA from "./LocationCTA";
import FinalCTA from "./FinalCTA";
import { buildLandingMedia } from "./landingHelpers";

interface LandingPageProps {
  service: Service;
}

export default function LandingPage({ service }: LandingPageProps) {
  const media = buildLandingMedia(service);

  return (
    <div className="min-h-screen bg-[#f6f1e8] text-stone-900">
      <Header />
      <LandingHero service={service} media={media} />
      <ProblemSection
        problems={service.problemPoints}
        tone={service.targetAudience.tone}
        serviceName={service.name}
        media={media}
      />
      <SolutionSection
        solutions={service.solutionPoints}
        benefits={service.benefits}
        tone={service.targetAudience.tone}
        serviceName={service.name}
        media={media}
      />
      <BeforeAfterGallery serviceName={service.name} media={media} />
      <ProcedureDetails
        details={service.procedureDetails}
        steps={service.procedureSteps}
        tone={service.targetAudience.tone}
        media={media}
      />
      <PricingSection
        priceIndicator={service.priceIndicator}
        serviceName={service.name}
        tone={service.targetAudience.tone}
      />
      <DoctorMiniProfile media={media} />
      <FAQAccordion
        faqs={service.faqs}
        serviceName={service.name}
        tone={service.targetAudience.tone}
      />
      <TestimonialStrip tone={service.targetAudience.tone} media={media} />
      <LocationCTA media={media} />
      <FinalCTA service={service} media={media} />
      <WhatsAppButton />
    </div>
  );
}
