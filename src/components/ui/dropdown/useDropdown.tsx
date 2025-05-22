import { useState } from "react";

export const useDropdown = () => {
  const countries = [
    { id: 1, code: "ALL", name: "ALL REGION" },
    { id: 2, code: "UK", name: "UNITED KINGDOM" },
    { id: 3, code: "AT", name: "AUSTRIA" },
    { id: 4, code: "DE", name: "GERMANY" },
    { id: 5, code: "AU", name: "AUSTRALIA" },
    { id: 6, code: "NZ", name: "NEW ZEALAND" },
  ];
  const [country, setCountry] = useState("ALL REGION");
  const [showDropdown, setShowDropdown] = useState(false);

  const countryHandler = (countryCode: string) => {
    const { name } = countries.filter((item) => item.code === countryCode)[0];
    setCountry(name);
    setShowDropdown(false);
  };

  return { countries, country, countryHandler, showDropdown, setShowDropdown };
};
