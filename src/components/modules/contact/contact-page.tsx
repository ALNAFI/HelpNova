import { ContactCta } from "@/components/modules/contact/contact-cta";
import { ContactFaq } from "@/components/modules/contact/contact-faq";
import { ContactFormSection } from "@/components/modules/contact/contact-form";
import { ContactHero } from "@/components/modules/contact/contact-hero";
import { ContactResources } from "@/components/modules/contact/contact-resources";
import { ContactWorkflow } from "@/components/modules/contact/contact-workflow";

export function ContactPage() {
  return (
    <div className="relative isolate">
      <ContactHero />
      <ContactFormSection />
      <ContactWorkflow />
      <ContactResources />
      <ContactFaq />
      <ContactCta />
    </div>
  );
}
