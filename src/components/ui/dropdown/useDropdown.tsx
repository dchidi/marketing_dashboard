import { useState } from "react";

export const useDropdown = () => {
  const countries = [
    { id: 1, code: "ALL", name: "ALL REGION" },
    { id: 1, code: "UK", name: "UNITED KINGDOM" },
    { id: 1, code: "AT", name: "AUSTRIA" },
    { id: 1, code: "DE", name: "GERMANY" },
    { id: 1, code: "AU", name: "AUSTRALIA" },
    { id: 1, code: "NZ", name: "NEW ZEALAND" },
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
