import { OpeningHoursType } from "../components/OpeningHours/OpeningHours";
import moment from "moment";
import {
  OpeningHoursData,
  ShopStateChange,
  DayOfWeek,
} from "./../api/data-hooks";

export enum OpeningHourType {
  open = "open",
  close = "close",
  closed = "closed",
}

export const localizeHour = (seconds: number) => {
  if ((seconds / 60) % 60 === 0) {
    return moment.unix(seconds).utc().format("h A");
  } else {
    return moment.unix(seconds).utc().format("h:mm A");
  }
};

/**
 * Formats opening hours data to be used in OpeningHours component
 * @param weekdays Opening hours data
 * @returns {OpeningHoursType[]} Formatted opening hours data
 */
export const formatOpeningHours = (
  weekdays: OpeningHoursData
): OpeningHoursType[] => {
  const openingHours = Object.entries(weekdays).reduce(
    (previousDays, [day, shopStateChanges]) => {
      // Sort the times to make sure we're doing things chronologically
      const sortedShopStateChanges = shopStateChanges.sort(
        (a, b) => a.value - b.value
      );

      // If weekday is empty array, shop is closed all day
      if (sortedShopStateChanges.length === 0) {
        return [
          ...previousDays,
          {
            name: day as keyof typeof DayOfWeek,
            changes: [{ type: OpeningHourType.closed, hour: "Closed" }],
          },
        ];
      }

      const todaysHours = sortedShopStateChanges
        .map((shopStateChange: ShopStateChange, index) => {
          if (shopStateChange.type === "close") {
            if (index === 0) {
              // If first shop state change is a close, push closing time to previous day
              previousDays[previousDays.length - 1].changes.push({
                type: OpeningHourType[shopStateChange.type],
                hour: localizeHour(shopStateChange.value),
              });
              // If day only contains one closing action, shop is closed all day
              if (shopStateChanges.length === 1) {
                return {
                  type: OpeningHourType.closed,
                  hour: "Closed",
                };
              }
              // If day has more state changes, return null for the closing action
              // which will be filtered out
              return {
                type: OpeningHourType[shopStateChange.type],
                hour: null,
              };
            }
          }
          return {
            type: OpeningHourType[shopStateChange.type],
            hour: localizeHour(shopStateChange.value),
          };
        })
        // Filter out null values
        .filter((shopStateChange) => shopStateChange.hour !== null);

      return [
        ...previousDays,
        {
          name: day as keyof typeof DayOfWeek,
          changes: todaysHours,
        },
      ] as OpeningHoursType[];
    },
    [] as OpeningHoursType[]
  );
  return openingHours;
};
