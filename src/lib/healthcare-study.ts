// Research snapshot: 7 September 2026. Observation dates are attached to each source.
// These are public aggregate figures, never patient-level data.
export const studySources = {
  workforce: {
    label: "MoHFW · Health Dynamics of India 2022–23",
    url: "https://www.mohfw.gov.in/sites/default/files/Health%20Dynamics%20of%20India%20%28Infrastructure%20%26%20Human%20Resources%29%202022-23_RE%20%281%29.pdf",
    note: "Rural CHC specialist table; position as at 31 March 2023. Required 21,964; in position 4,413; shortfall 17,551. Covers surgeons, obstetricians/gynaecologists, physicians and paediatricians.",
  },
  spending: {
    label: "MoHFW / PIB · National Health Accounts",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2058791&lang=1&reg=3",
    note: "Released 25 September 2024. Out-of-pocket expenditure as a share of total health expenditure: 62.6% in FY2014–15 and 39.4% in FY2021–22. Historical financing data, not an AI impact estimate.",
  },
  apollo: {
    label: "Apollo Hospitals · Annual Report 2024–25",
    url: "https://www.apollohospitals.com/sites/default/files/2025-08/annual-report_2025--1-.pdf",
    note: "Chairman’s message: AI-powered ProHealth, AI-CVD and the Clinical Intelligence Engine. Printed pp. 24–25: over 22,000 robotic surgeries cumulatively across group units by June 2025. Self-reported; not an annual count.",
  },
  max: {
    label: "Max Healthcare · Annual Report 2024–25, p. 98",
    url: "https://max-website20-images.s3.ap-south-1.amazonaws.com/Integrated_Annual_Report_FY_2024_25_Single_Page_View_a0892fc229.pdf",
    note: "Reports real-world testing of GenAI in radiology and clinical functions, and over 20 operational RPA bots across business functions. Does not establish a measured clinical benefit or headcount reduction.",
  },
  medanta: {
    label: "Medanta Noida · Robotics, MIS & General Surgery",
    url: "https://www.medanta.org/hospitals-near-me/noida-hospital/speciality/robotics-mis-general-surgery",
    note: "Undated hospital service page, accessed 7 September 2026. Lists the da Vinci Xi surgical system. Establishes availability at this location, not network-wide adoption or independently verified outcomes.",
  },
  publicAI: {
    label: "PIB · Transforming Healthcare Delivery Through AI",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2227410&lang=1&reg=6",
    note: "13 February 2026. Reports DeepCXR deployment in eight states/UTs and public AI initiatives including eSanjeevani decision support. Programme presence is not a national adoption rate.",
  },
  robotics: {
    label: "Apollo · How robot-assisted surgery works",
    url: "https://www.apollohospitals.com/departments/robotics-surgery/about-robotic-surgery",
    note: "Undated explanatory page, accessed 7 September 2026. The surgeon controls instruments from a console. Robot-assisted surgery is not synonymous with autonomous AI surgery.",
  },
  ethics: {
    label: "ICMR · Ethical Guidelines for AI in Healthcare, 2023",
    url: "https://www.icmr.gov.in/icmrobject/custom_data/pdf/Ethical-guidelines/Ethical_Guidelines_AI_Healthcare_2023.pdf",
    note: "Framework for accountability, safety, fairness, privacy and human oversight. Used to inform the proposed pilot safeguards, not as evidence of pilot results.",
  },
  ageing: {
    label: "UNFPA India · India Ageing Report 2023 overview",
    url: "https://india.unfpa.org/en/news/india-ageing-elderly-make-20-population-2050-unfpa-report",
    note: "2023 report overview projects the elderly population share above 20% by 2050. A demographic projection, not a prediction of admissions, revenue or AI demand.",
  },
} as const;

export const specialistData = { required: 21964, inPosition: 4413, shortfall: 17551 };
export const spendingData = [
  { year: "2014–15", value: 62.6 },
  { year: "2021–22", value: 39.4 },
];

export interface QueueInputs {
  arrivals: number;
  capacity: number;
  capacityChange: number;
}

export const defaultQueue: QueueInputs = { arrivals: 120, capacity: 100, capacityChange: 20 };

// Teaching model: eight weeks, one referral per patient, 60 patients waiting at week 0.
// Capacity change is assumed NET of review, setup and rework; it can be negative.
export function calculateQueue({ arrivals, capacity, capacityChange }: QueueInputs) {
  const assistedCapacity = Math.max(0, Math.floor(capacity * (1 + capacityChange / 100)));
  let baseline = 60;
  let assisted = 60;
  const rows = [{ week: 0, baseline, assisted }];
  for (let week = 1; week <= 8; week++) {
    baseline = Math.max(0, baseline + arrivals - capacity);
    assisted = Math.max(0, assisted + arrivals - assistedCapacity);
    rows.push({ week, baseline, assisted });
  }
  return { rows, assistedCapacity };
}
