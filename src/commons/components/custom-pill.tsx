import { Flex, IconButton, Text } from "@sparrowengg/twigs-react";
import { CloseCircleFillIcon } from "@sparrowengg/twigs-react-icons";
import React from "react";

const CustomPill = ({
  label,
  onCloseHandler,
  variant,
  radius,
  fontFamily,
  isClosable = true
}: {
  label: string;
  onCloseHandler?: () => void;
  variant: "default" | "success";
  radius: "sm" | "md";
  fontFamily?: "Roboto Mono";
  isClosable?: boolean;
}) => {
  const isDefaultVariant = variant === "default";
  return (
    <Flex
      alignItems="center"
      css={{
        margin: "2px !important",
        height: "$6",
        background: isDefaultVariant
          ? "rgba(100, 116, 139, 0.08)"
          : "$positive100",
        padding: "$2",
        paddingLeft: radius === "sm" ? "$3" : "$2",
        borderRadius: radius === "sm" ? "$sm" : "99px",
        "& > *": {
          fontFamily: fontFamily ?? "DM Sans"
        }
      }}
    >
      <Text
        size="xs"
        weight="medium"
        css={{
          color: isDefaultVariant ? "$secondary800" : "$neutral900",
          paddingInline: "$1"
        }}
      >
        {label}
      </Text>
      {isClosable && (
        <IconButton
          css={{
            padding: "$1",
            height: "$4",
            width: "$4",
            background: "transparent !important",
            ".twigs-button__icon-container": { position: "static" }
          }}
          variant="ghost"
          color="default"
          onClick={onCloseHandler}
          icon={<CloseCircleFillIcon size={12} />}
        />
      )}
    </Flex>
  );
};

export default CustomPill;
