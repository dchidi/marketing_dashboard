export const COUNTRIES = [
  { id: 1, code: "all", name: "All Regions" },
  { id: 2, code: "uk", name: "United Kingdom" },
  { id: 3, code: "at", name: "Austria" },
  { id: 4, code: "de", name: "Germany" },
  { id: 5, code: "au", name: "Australia" },
  { id: 6, code: "nz", name: "New Zealand" },
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
    code: "all",
    name: "All Brands",
    country_code: ["all", "au", "nz", "de", "at", "uk"],
  },
  {
    id: 2,
    code: "petcover",
    name: "Petcover",
    country_code: ["all", "au", "nz", "de", "at"],
  },
  {
    id: 3,
    code: "bpis",
    name: "BPIS",
    country_code: ["all", "uk"],
  },
  { id: 4, code: "pet_id", name: "PetID", country_code: ["all", "uk"] },
  { id: 5, code: "bbc", name: "BB Commercial", country_code: ["all", "uk"] },
  { id: 6, code: "ed", name: "Exotic Direct", country_code: ["all", "uk"] },
];

export const PET_TYPE = [
  { id: 1, code: "all", name: "All Pet Types" },
  { id: 2, code: "cat", name: "Cat" },
  { id: 3, code: "dog", name: "Dog" },
  { id: 4, code: "horse", name: "Horse" },
  { id: 5, code: "exotic", name: "Exotic" },
];
