import { OpeningHoursType } from "./../components/OpeningHours/OpeningHours";
import { OPENING_HOURS_RAW_DATA } from "../tests/opening-hours-mock-data";
import { formatOpeningHours } from "../utils/l10n";
import { useEffect, useState } from "react";

export enum DayOfWeek {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

export type ShopStateChange = { type: "open" | "close"; value: number };

export type OpeningHoursData = {
  [key in DayOfWeek]: ShopStateChange[];
};

// Documentation for the hook
/**
 * Returns the opening hours
 * @returns {OpeningHoursType[] | undefined} The opening hours for the current locale.
 */
export const useOpeningHours = (
  shopID: number
): OpeningHoursType[] | undefined => {
  const [openingHours, setOpeningHours] = useState<OpeningHoursData>();

  useEffect(() => {
    // Async fetch to get a shop's opening hours with the given shopID
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchOpeningHours = async () => {
      const response = await fetch(
        `https://wolt-api.opening-hours.com/${shopID}`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    };

    // In a real world scenario...
    // fetchOpeningHours()
    //   .then((data) => setOpeningHours(data))
    //   .catch((error) => handleError(error));

    // But for now...
    setOpeningHours(OPENING_HOURS_RAW_DATA);
  }, [shopID]);

  return openingHours && formatOpeningHours(openingHours);
};
