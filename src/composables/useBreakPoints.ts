import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);

const LGsmaller = breakpoints.smaller("lg");
const LGlargeOrEqual = breakpoints.greaterOrEqual("lg");

export { LGsmaller, LGlargeOrEqual };
