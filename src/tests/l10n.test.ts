import { formatOpeningHours, localizeHour } from "../utils/l10n";
import {
  OPENING_HOURS_RAW_DATA,
  OPENING_HOURS_SORTED_AND_LOCALIZED,
} from "./opening-hours-mock-data";

describe("formatOpeningHours", () => {
  it("should return the opening hours, localized and formatted", () => {
    expect(formatOpeningHours(OPENING_HOURS_RAW_DATA)).toEqual(
      OPENING_HOURS_SORTED_AND_LOCALIZED
    );
  });
});

describe("localizeHour", () => {
  it("should return localized hours", () => {
    expect(localizeHour(80100)).toEqual("10:15 PM");
    expect(localizeHour(0)).toEqual("12 AM");
    expect(localizeHour(86400)).toEqual("12 AM");
  });
});
