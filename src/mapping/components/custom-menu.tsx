import React from "react";
import { components } from "react-select";
import { Box, Flex, Text } from "@sparrowengg/twigs-react";
import { PlusIcon } from "@sparrowengg/twigs-react-icons";

const CustomMenu = (props: any) => {
  return (
    <components.Menu {...props}>
      <Box
        css={{
          paddingBottom: "$4",
          marginBlock: "$6 $4",
          borderBottom: "$borderWidths$xs solid $neutral100"
        }}
      >
        <Text
          onClick={() => {
            props.selectProps?.noneOptionHandler({
              label: "None",
              value: "NONE"
            });
            props.selectProps?.onMenuClose();
          }}
          size="sm"
          css={{ padding: "$3 $6", color: "$neutral900", cursor: "pointer" }}
        >
          None
        </Text>
      </Box>
      {props.children}
      <Flex
        onClick={() => props?.selectProps?.customOnClick()}
        css={{
          background: "rgba(100, 116, 139, 0.06)",
          padding: "$6 $8"
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Text size="xs" css={{ color: "$neutral600", lineHeight: "$xs" }}>
          Select the right data type for the mapping to prevent errors when
          sharing value.
        </Text>
      </Flex>
    </components.Menu>
  );
};

export default CustomMenu;
