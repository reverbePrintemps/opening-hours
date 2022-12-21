import { OpeningHoursData } from "../api/data-hooks";
import { OpeningHoursType } from "../components/OpeningHours/OpeningHours";

export const OPENING_HOURS_RAW_DATA: OpeningHoursData = {
  // Closed
  monday: [],
  // "Regular" cycle
  tuesday: [
    { type: "open", value: 36000 },
    { type: "close", value: 64800 },
  ],
  // Multiple shop state changes + 15mins
  wednesday: [
    { type: "open", value: 36000 },
    { type: "close", value: 64800 },
    { type: "open", value: 80100 },
    { type: "close", value: 86400 },
  ],
  // Open cycle only + overflowing day
  thursday: [{ type: "open", value: 36000 }],
  // Close cycle only
  friday: [{ type: "close", value: 0 }],
  // Open cycle only + overflowing day + half hour
  saturday: [{ type: "open", value: 30600 }],
  // Leading closing + "regular" cycle not in chronological order
  sunday: [
    { type: "close", value: 75600 },
    { type: "close", value: 3600 },
    { type: "open", value: 43200 },
  ],
};

export const OPENING_HOURS_SORTED_AND_LOCALIZED: OpeningHoursType[] = [
  { changes: [{ hour: "Closed", type: "closed" }], name: "monday" },
  {
    changes: [
      { hour: "10 AM", type: "open" },
      { hour: "6 PM", type: "close" },
    ],
    name: "tuesday",
  },
  {
    changes: [
      { hour: "10 AM", type: "open" },
      { hour: "6 PM", type: "close" },
      { hour: "10:15 PM", type: "open" },
      { hour: "12 AM", type: "close" },
    ],
    name: "wednesday",
  },
  {
    changes: [
      { hour: "10 AM", type: "open" },
      { hour: "12 AM", type: "close" },
    ],
    name: "thursday",
  },
  { changes: [{ hour: "Closed", type: "closed" }], name: "friday" },
  {
    changes: [
      { hour: "8:30 AM", type: "open" },
      { hour: "1 AM", type: "close" },
    ],
    name: "saturday",
  },
  {
    changes: [
      { hour: "12 PM", type: "open" },
      { hour: "9 PM", type: "close" },
    ],
    name: "sunday",
  },
];
