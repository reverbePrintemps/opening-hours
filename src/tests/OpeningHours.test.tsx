import { OPENING_HOURS_SORTED_AND_LOCALIZED } from "./opening-hours-mock-data";
import { render, screen } from "@testing-library/react";
import { DayOfWeek } from "../api/data-hooks";
import {
  OpeningHours,
  reduceToDisplayData,
  ShopStateChangeType,
} from "../components/OpeningHours/OpeningHours";

// Tests only check whether cells exist and whether they match a day's name or a time range
// Potential improvement for the future: match each row with a specific day name and array of time ranges
describe("OpeningHours", () => {
  it("should display days and opening hours", () => {
    render(<OpeningHours openingHours={OPENING_HOURS_SORTED_AND_LOCALIZED} />);
    // Expect cells to match either a day's name or a time range
    const cells = screen.getAllByRole("cell");
    const regex = new RegExp(/\d{1,2}:?(\d{2})? (AM|PM)|Closed/);
    cells.forEach((cell) => {
      const isDayCell =
        cell.textContent &&
        cell.textContent.replace("TODAY", "").toLowerCase() in DayOfWeek;
      const isTimeRangeCell = cell.textContent && regex.test(cell.textContent);
      expect(isDayCell || isTimeRangeCell).toBeTruthy();
    });
  });
});

describe("reduceDays", () => {
  it("should return a DayDisplay object", () => {
    const day = {
      name: DayOfWeek.monday,
      changes: [
        {
          hour: "10:00 AM",
          type: ShopStateChangeType.open,
        },
        {
          hour: "6:00 PM",
          type: ShopStateChangeType.close,
        },
      ],
    };
    const result = reduceToDisplayData(day);
    expect(result).toEqual({
      name: "monday",
      isToday: false,
      texts: ["10:00 AM - 6:00 PM"],
      isClosed: false,
    });
  });
});
