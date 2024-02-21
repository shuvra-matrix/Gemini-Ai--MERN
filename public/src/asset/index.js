import geminiIcon from "./gemini_sparkle_blue_33c17e77c4ebbdd9490b683b9812247e257b6f70.svg";
import advanceGeminiIcon from "./gemini_sparkle_red_4ed1cbfcbc6c9e84c31b987da73fc4168aec8445.svg";

import { darkIcon } from "./darkIcon/darkIcon";
import { lightIcon } from "./lightIcon/lightIcon";

export const commonIcon = {
  geminiIcon,
  advanceGeminiIcon,
};

export const themeIcon = () => {
  const localTheme = localStorage.getItem("theme") || "dark";
  const icon = localTheme === "dark" ? darkIcon : lightIcon;

  return icon;
};