export const colors = {
  black: "#24292e",
  white: "#ffffff",
  lightGray: "#f9fafc",
  mediumGray: "#d8d8d8",
  darkGray: "#686f77",
  secondary: "#00b3a3",
  dark: "#27231d",
  darkBlue: "#08306b",
  brightGreen: "#9cb84b",
  red: "#bc403a",
};

export const dimensions = {
  leftColumnWidth: 300,
  imagesPaneHeight: 150,
  rightMenuWidth: 280,
  largeScreenMinWindowWidth: 1250,
};

export const LARGE_SCREEN_MEDIA_QUERY = `@media (min-width: ${
  dimensions.largeScreenMinWindowWidth
}px)`;

export const SMALL_SCREEN_MEDIA_QUERY = `@media (max-width: ${dimensions.largeScreenMinWindowWidth -
  1}px)`;
