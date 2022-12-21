import { OPENING_HOURS_SORTED_AND_LOCALIZED } from "./opening-hours-mock-data";
import { renderHook } from "@testing-library/react-hooks";
import { useOpeningHours } from "../api/data-hooks";

describe("useOpeningHours", () => {
  it("should return the opening hours, formatted", () => {
    const { result } = renderHook(() => useOpeningHours(123456789));
    expect(result.current).toEqual(OPENING_HOURS_SORTED_AND_LOCALIZED);
  });
});
