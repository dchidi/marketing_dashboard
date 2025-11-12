export const BAR_CHART_MAX_HEIGHT = 250;
export const DEFAULT_LIMIT = 50;
export const DEFAULT_SKIP = 0;

export const COUNTRIES = [
  { id: 1, code: "all", name: "All Regions" },
  { id: 2, code: "uk", name: "United Kingdom" },
  { id: 3, code: "at", name: "Austria" },
  { id: 4, code: "de", name: "Germany" },
  { id: 5, code: "au", name: "Australia" },
  { id: 6, code: "nz", name: "New Zealand" },
];

export const DATEFILTERS = [
  { id: 1, code: "yesterday", name: "Yesterday" },
  { id: 2, code: "now", name: "Today" },
  { id: 3, code: "last_week", name: "Last Week" },
  { id: 4, code: "wtd", name: "Current Week" },
  { id: 5, code: "last_month", name: "Last Month" },
  { id: 6, code: "mtd", name: "Current Month" },
  { id: 7, code: "ytd", name: "Year to Date" },
  { id: 8, code: "last_year", name: "Last Year" },
  { id: 9, code: "date_picker", name: "Custom" },
];

export const BRANDS = [
  {
    id: 1,
    code: "all",
    name: "All Brands",
    country_code: ["all", "uk", "at", "de", "au", "nz"],
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
  { id: 4, code: "petid", name: "PetID", country_code: ["all", "uk"] },
  { id: 5, code: "bb", name: "BB Commercial", country_code: ["all", "uk"] },
  { id: 6, code: "ed", name: "Exotic Direct", country_code: ["all", "uk"] },
];

export const PET_TYPE = [
  { id: 1, code: "all", name: "All Pet Types" },
  { id: 2, code: "cat", name: "Cat" },
  { id: 3, code: "dog", name: "Dog" },
  { id: 4, code: "horse", name: "Horse" },
  { id: 5, code: "exotic", name: "Exotic" },
  { id: 6, code: "bbc", name: "BB Commercial" },
];
