import { ThemeProvider, Flex } from "@sparrowengg/twigs-react";
import React, { ReactNode } from "react";

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      theme={{
        fonts: {
          body: "DM Sans, Roboto Mono, sans-serif",
          heading: "DM Sans, Roboto Mono, sans-serif"
        }
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
