import { Box } from "@sparrowengg/twigs-react";
import React, { ReactNode } from "react";

const PlaceholderSpan = ({ color, children }: { color: string, children: ReactNode }) => {
  return (
    <Box as="span" css={{ color: color, fontWeight: 500 }}>
      {children}
    </Box>
  )
}

export default PlaceholderSpan;
