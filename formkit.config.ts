import { generateClasses } from "@formkit/themes";
import myTailwindTheme from "./src/tailwind-theme";

export default {
  config: {
    classes: generateClasses(myTailwindTheme),
  },
};
