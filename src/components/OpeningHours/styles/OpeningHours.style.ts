import { globalStyles as gs } from "../../../styles/App";

export const OpeningHoursStyle = {
  font: {
    family: {
      regular: gs.font.family.regular,
      medium: gs.font.family.medium,
      bold: gs.font.family.bold,
    },
    size: {
      large: gs.font.size.large,
      regular: gs.font.size.regular,
      small: gs.font.size.small,
    },
    lineHeight: {
      large: gs.font.lineHeight.large,
      regular: gs.font.lineHeight.regular,
      small: gs.font.lineHeight.small,
    },
    color: {
      primary: gs.font.color["primary--raisin-black"],
      secondary: gs.font.color["secondary--quicksilver-grey"],
      highlight: gs.font.color["highlight--lime-green"],
    },
  },
  background: {
    main: gs.background["card--paper-white"],
  },
};

const ohs = OpeningHoursStyle;

export const styles = {
  titleIcon: {
    color: ohs.font.color.secondary,
    width: "22px",
    height: "auto",
  },
  title: {
    color: ohs.font.color.primary,
    fontFamily: ohs.font.family.medium,
    fontSize: ohs.font.size.large,
    lineHeight: ohs.font.lineHeight.large,
    textAlign: "left",
    borderBottom: `1px solid ${ohs.font.color.primary}`,
    padding: "0 0 12px 0",
    div: {
      display: "flex",
      alignItems: "center",
      h1: {
        margin: "0 0 0 12px",
        fontSize: ohs.font.size.large,
      },
    },
  },
  cell: {
    padding: "6px 0",
    fontSize: ohs.font.size.regular,
    fontFamily: ohs.font.family.regular,
    lineHeight: ohs.font.lineHeight.regular,
    color: ohs.font.color.primary,
  },
  dayName: {
    fontFamily: ohs.font.family.medium,
  },
  today: {
    display: "inline",
    color: ohs.font.color.highlight,
    lineHeight: ohs.font.lineHeight.small,
    fontFamily: ohs.font.family.bold,
    fontSize: ohs.font.size.small,
    margin: "0 0 0 12px",
  },
  hours: {
    textAlign: "right",
    padding: "0 0 0 8px",
    closed: {
      color: ohs.font.color.secondary,
      fontFamily: ohs.font.family.regular,
    },
  },
};
