import {
  Box,
  Button,
  Flex,
  FormInput,
  FormLabel,
  Heading,
  Select,
  ThemeProvider
} from "@sparrowengg/twigs-react";
import { ChevronRightIcon } from "@sparrowengg/twigs-react-icons";
import React from "react";
import { AuthenticationProps } from "./types";
import ThemeWrapper from "../commons/components/theme-wrapper";
import { FieldTypes } from "./constants";

export const Authentication = ({
  integrationName,
  fields,
  onSuccessHandler
}: AuthenticationProps) => {
  return (
    <ThemeWrapper>
      <Flex alignItems="center" justifyContent="center">
        <Box css={{ width: 488 }}>
          <Heading size="h5">{`Connect your ${integrationName} account`}</Heading>
          <Flex flexDirection="column" gap="$8" css={{ marginTop: "$12" }}>
            {fields.map((field) => (
              <>
                {field.type === FieldTypes.SELECT ? (
                  <Flex gap="$2" flexDirection="column" css={{ width: "100%" }}>
                    <FormLabel size="xs" css={{ fontWeight: "$5" }}>
                      {field.label}
                    </FormLabel>{" "}
                    <Select
                      size="lg"
                      value={field.value}
                      required={field?.required}
                      requiredIndicator={field?.required}
                      onChange={(value) =>
                        field.changeFieldValue(value, field.id ?? field.label)
                      }
                      options={field?.options}
                      placeholder={field?.placeholder}
                    />
                  </Flex>
                ) : (
                  <FormInput
                    size="lg"
                    label={field.label}
                    required={field?.required}
                    requiredIndicator={field?.required}
                    placeholder={field?.placeholder}
                    type={
                      field.isPassword ? FieldTypes.PASSWORD : FieldTypes.TEXT
                    }
                    onChange={(e) =>
                      field.changeFieldValue(
                        e.currentTarget.value,
                        field.id ?? field.label
                      )
                    }
                  />
                )}
              </>
            ))}
          </Flex>
          <Button
            css={{ marginTop: "$16" }}
            onClick={onSuccessHandler}
            rightIcon={<ChevronRightIcon />}
            size="lg"
          >
            Authorize & Continue
          </Button>
        </Box>
      </Flex>
    </ThemeWrapper>
  );
};
