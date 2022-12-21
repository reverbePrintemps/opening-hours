import { styles } from "./styles/OpeningHours.style";
import { DayOfWeek } from "../../api/data-hooks";
import { AccessTime } from "@mui/icons-material";
import moment from "moment";
import {
  capitalize,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "@mui/material";

export enum ShopStateChangeType {
  open = "open",
  close = "close",
}

export type OpeningHoursType = {
  name: keyof typeof DayOfWeek;
  changes: {
    hour: string;
    type: keyof typeof ShopStateChangeType | "closed";
  }[];
};

type DayDisplay = {
  name: string;
  isToday: boolean;
  texts: string[];
  isClosed: boolean;
};

/**
 * Concat opening/closing hours into same array
 * @param day Opening hours data
 * @returns {DayDisplay} Formatted opening hours data
 */
export const reduceToDisplayData = (day: OpeningHoursType): DayDisplay => {
  const isToday = day.name === moment().format("dddd").toLowerCase();
  return day.changes.reduce(
    (previousChanges, currentChanges, index) => {
      const isClosingTime = index % 2 !== 0;
      const isClosed = currentChanges.type === "closed";
      // Every closing time, remove opening time and concat with closing time
      if (isClosingTime) {
        return {
          ...previousChanges,
          texts: [
            ...previousChanges.texts
              .slice(0, previousChanges.texts.length - 1)
              .concat(
                `${previousChanges.texts[previousChanges.texts.length - 1]} ${
                  isClosingTime ? "-" : ""
                } ${currentChanges.hour}`
              ),
          ],
        };
      } else {
        return {
          name: day.name,
          isToday,
          isClosed,
          texts: [...previousChanges.texts, currentChanges.hour],
        };
      }
    },
    // Avoid having empty string in texts array
    { texts: [] as unknown as string[] }
  ) as DayDisplay;
};

interface OpeningHoursProps {
  openingHours: OpeningHoursType[];
}

/**
 * Takes an array of opening hours per day and returns a table of opening hours
 * @param {OpeningHoursProps} openingHours - Array of opening hours per day
 * @returns {JSX.Element}
 */
export const OpeningHours = ({
  openingHours,
}: OpeningHoursProps): JSX.Element => {
  // Concatenate the opening hours for each day to be displayed in a single cell
  const days = openingHours?.map((day) => reduceToDisplayData(day));

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell tabIndex={0} sx={[styles.cell, styles.title]} colSpan={2}>
            <div>
              <AccessTime sx={styles.titleIcon} />
              <h1>Opening hours</h1>
            </div>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {days &&
          days.map((day) => {
            return (
              <TableRow key={day.name}>
                <TableCell tabIndex={0} sx={[styles.cell, styles.dayName]}>
                  {capitalize(day.name)}
                  {day.isToday && <p style={styles.today}>TODAY</p>}
                </TableCell>
                <TableCell tabIndex={0} sx={[styles.cell, styles.hours]}>
                  {day.texts.map((text, index) => {
                    return (
                      <div
                        key={index}
                        style={day.isClosed ? styles.hours.closed : undefined}
                      >
                        {text}
                      </div>
                    );
                  })}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
