import { createContext } from "react";

// empty function: placeholder for this function if there is no provider above it...
// but should never happen...
// we're shoving a Hook in there basically...
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;
