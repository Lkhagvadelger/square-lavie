import IcomoonReact from "icomoon-react";
import iconSet from "./icons/health.json";

const iconNames: { [key: string]: string } = {
  Allergist: "allergies",
  Allergologist: "allergies",
  Allergology: "allergies",
  Anesthesiologist: "critical_care",
  Anesthesiology: "critical_care",
  Angiologist: "lymph_nodes",
  Angiology: "lymph_nodes",
  Cardiologist: "heart",
  Cardiology: "heart",
  Dentist: "tooth",
  Dentistry: "tooth",
  Dermatologist: "bandage_adhesive",
  Dermatology: "bandage_adhesive",
  Diabetologist: "diabetes_measure",
  Diabetology: "diabetes_measure",
  Endocrinologist: "endocrinology",
  Endocrinology: "endocrinology",
  "ENT doctor": "ears_nose_and_throat",
  "Family Medicine": "stethoscope",
  Gastroenterologist: "gastroenterology",
  Gastroenterology: "gastroenterology",
  "General Practitioner": "stethoscope",
  Genetics: "dna",
  Genomics: "dna",
  Gynecologist: "female_reproductive_system",
  Gynecology: "female_reproductive_system",
  Hematologist: "hematology",
  Hematology: "hematology",
  Hypertensiology: "blood_pressure_monitor",
  Infectiologist: "virus",
  Infectiology: "virus",
  "Infectious Disease": "virus",
  "Internal Diseases Specialist": "virus",
  "Internal Medicine": "stethoscope",
  Neonatologist: "baby_0203_alt",
  Nephrologist: "kidneys",
  Nephrology: "kidneys",
  Neurologist: "neurology",
  Neurology: "neurology",
  Oncologist: "blood_cells",
  Oncology: "blood_cells",
  Ophthalmologist: "eye",
  Ophthalmology: "eye",
  "Orthopedic Specialist": "orthopaedics",
  Orthopedics: "orthopaedics",
  Orthopedist: "orthopaedics",
  Other: "stethoscope",
  "Other specialty": "stethoscope",
  "Other Specialty": "stethoscope",
  Otorhinolaryngology: "ears_nose_and_throat",
  "Otorhinolaryngology specialist": "ears_nose_and_throat",
  "Palliative care": "hospitalized",
  Pediatric: "pediatrics",
  Pediatrician: "pediatrics",
  Pediatrics: "pediatrics",
  "Primary care": "rural_post_alt",
  Psychiatrist: "psychology",
  Psychiatry: "psychology",
  Pulmonologist: "lungs",
  Pulmonology: "lungs",
  Radiologist: "xray",
  Radiology: "xray",
  Rheumatologist: "rheumatology",
  Rheumatology: "rheumatology",
  Surgeon: "surgical_sterilization",
  Surgery: "surgical_sterilization",
  Toxicologist: "poison",
  Toxicology: "poison",
  Traumatologist: "sling",
  Traumatology: "sling",
  Urologist: "urology",
  Urology: "urology",
  Venereologist: "sti",
  Venereology: "sti",
};

export const HealthIcon = ({
  value,
  color,
}: {
  value: string;
  color: string;
}) => (
  <IcomoonReact
    iconSet={iconSet}
    size="full"
    icon={iconNames[value]}
    color={color}
  />
);
