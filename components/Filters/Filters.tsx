"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import css from "./Filters.module.css";
import Select from "react-select";

const brandOptions = [
  { value: "Aston Martin", label: "Aston Martin" },
  { value: "Audi", label: "Audi" },
  { value: "BMW", label: "BMW" },
  { value: "Bentley", label: "Bentley" },
  { value: "Buick", label: "Buick" },
  { value: "Chevrolet", label: "Chevrolet" },
  { value: "Chrysler", label: "Chrysler" },
  { value: "GMC", label: "GMC" },
  { value: "HUMMER", label: "HUMMER" },
];

const priceOptions = [
  { value: "30", label: "30 $" },
  { value: "40", label: "40 $" },
  { value: "50", label: "50 $" },
  { value: "60", label: "60 $" },
  { value: "70", label: "70 $" },
  { value: "80", label: "80 $" },
];

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [, startTransition] = useTransition();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const currentBrand = searchParams.get("brand") || "";
  const selectedBrandOption =
    brandOptions.find((opt) => opt.value === currentBrand) || null;

  const currentPrice = searchParams.get("maxPrice") || "";
  const selectedPriceOption =
    priceOptions.find((opt) => opt.value === currentPrice) || null;

  return (
    <div className={css.filterBar}>
      <div className={css.field}>
        <label className={css.label}>Car brand</label>
        <Select
          options={brandOptions}
          classNamePrefix="custom-select"
          isClearable
          placeholder="Choose a brand"
          value={selectedBrandOption}
          onChange={(selectedOption) => {
            handleFilterChange(
              "brand",
              selectedOption ? selectedOption.value : "",
            );
          }}
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Price/ 1 hour</label>
        <Select
          options={priceOptions}
          classNamePrefix="custom-select"
          isClearable
          placeholder="Choose a price"
          value={selectedPriceOption}
          onChange={(selectedOption) => {
            handleFilterChange(
              "maxPrice",
              selectedOption ? selectedOption.value : "",
            );
          }}
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.inputsRow}>
          <input
            type="number"
            placeholder="From"
            className={css.input}
            value={searchParams.get("minMileage") || ""}
            onChange={(e) => handleFilterChange("minMileage", e.target.value)}
          />
          <input
            type="number"
            placeholder="To"
            className={css.input}
            value={searchParams.get("maxMileage") || ""}
            onChange={(e) => handleFilterChange("maxMileage", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
