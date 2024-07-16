import { css } from "styled-components";
import "./font.css";

export const Theme = {
  fonts: {
    title40: css`
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 600;
      font-size: 40px;
    `,
    title32: css`
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 500;
      font-size: 32px;
    `,
    bigButtonText: css`
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 500;
      font-size: 24px;
    `,
    title20: css`
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 400;
      font-size: 20px;
    `,
    default18: css`
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 400;
      font-size: 18px;
    `,
    menuText: css`
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 700;
      font-size: 16px;
    `,
    default16: css`
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 400;
      font-size: 16px;
    `,
    helpText14: css`
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 400;
      font-size: 14px;
    `,
    helpText12: css`
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 400;
      font-size: 12px;
    `,
  },

  colors: {
    backgroundColor: "#F7F7F7",
    helperText: "#9B9B9B",
    headerLink: "#C3C3C3",
    greenButton: "#B7E899",
    black: "#000000",
    white: "#FFFFFF",
    error: "#FF5858",
    check: "#4FD80E",
    green100: "#E6FADC",
    green200: "#D7EFC8",
    percentRed: "#FF9797",
    dateGray: "#B6B6B6",
    ingredient: "#FCFDDA",
  },
};
