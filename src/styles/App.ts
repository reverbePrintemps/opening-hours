export const globalStyles = {
  font: {
    family: {
      regular: "Roboto Regular",
      medium: "Roboto Medium",
      bold: "Roboto Bold",
    },
    size: {
      large: "24px",
      regular: "16px",
      small: "12px",
    },
    lineHeight: {
      large: "30px",
      regular: "22px",
      small: "16px",
    },
    color: {
      "primary--raisin-black": "#202125",
      "secondary--quicksilver-grey": "#a1a2a4",
      "highlight--lime-green": "#5bcb02",
    },
  },
  background: {
    "card--paper-white": "#ffffff",
    "app--cultured-grey-light": "#f8f8f8",
    "shadow--cultured-grey": "#eeeeee",
  },
};

const gs = globalStyles;

export const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: gs.background["app--cultured-grey-light"],
  },
  card: {
    width: "100%",
    margin: "auto",
    padding: "32px",
    // Arbitrary max width to allow for longest possible time (ie. XX:XX AM - XX:XX PM)
    maxWidth: "380px",
    borderRadius: "12px",
    // Weird yet necessary
    boxSizing: "border-box" as "border-box",
    boxShadow: `2px 2px 4px 0px ${gs.background["shadow--cultured-grey"]}`,
  },
};
