export const COUNTRIES = [
  { id: 1, code: "all", name: "ALL REGION" },
  { id: 2, code: "uk", name: "UNITED KINGDOM" },
  { id: 3, code: "at", name: "AUSTRIA" },
  { id: 4, code: "de", name: "GERMANY" },
  { id: 5, code: "au", name: "AUSTRALIA" },
  { id: 6, code: "nz", name: "NEW ZEALAND" },
];

export const DATEFILTERS = [
  { id: 1, code: "mtd", name: "Current Month" },
  { id: 2, code: "wtd", name: "Current Week" },
  { id: 3, code: "now", name: "Today" },
  { id: 4, code: "date_picker", name: "Custom" },
];

export const BRANDS = [
  {
    id: 1,
    code: "petcover",
    name: "Petcover",
    country_code: ["all", "au", "nz", "de", "at"],
  },
  {
    id: 2,
    code: "bpis",
    name: "British Pet Insurance Services",
    country_code: ["all", "uk"],
  },
  { id: 3, code: "pet_id", name: "PetID", country_code: ["all", "uk"] },
  { id: 4, code: "bbc", name: "BB Commercial", country_code: ["all", "uk"] },
  { id: 5, code: "ed", name: "Exotic Direct", country_code: ["all", "uk"] },
];

export const ANIMALTYPE = [
  { id: 1, code: "cat", name: "Cat" },
  { id: 2, code: "dog", name: "Dog" },
  { id: 3, code: "horse", name: "Horse" },
  { id: 4, code: "exotic", name: "Exotic" },
];
