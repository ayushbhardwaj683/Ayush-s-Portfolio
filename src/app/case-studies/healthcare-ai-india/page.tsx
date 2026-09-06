import type { Metadata } from "next";
import HealthcareStudy from "./study";

export const metadata: Metadata = {
  title: "AI in Indian hospitals: what happens to the staff? | Ayush Bhardwaj",
  description: "A simple business-analysis case study on how AI may change the work, skills and jobs of hospital staff in India, with real examples and a same-team patient-queue exercise.",
};

export default function HealthcareCaseStudy() {
  return <HealthcareStudy />;
}
