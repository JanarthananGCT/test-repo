import { Box, Text } from "@sparrowengg/twigs-react";
import React from "react";
import { components } from "react-select";

const CustomOption = (props: any) => {
  const subLabel = props.options.find((option: any) => option.value === props.value)?.subLabel;
  return (
    <components.Option {...props}>
      <Box css={{ cursor: "pointer" }}>
        <Text size="sm" css={{ lineHeight: "$md", color: "$neutral900" }}>{props.label}</Text>
        {!!subLabel && <Text size="xs" css={{ lineHeight: "$xs", color: "$neutral700" }}>{subLabel}</Text>}
      </Box>
    </components.Option>
  );
};

export default CustomOption;
