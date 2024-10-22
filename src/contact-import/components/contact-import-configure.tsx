import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Select
} from "@sparrowengg/twigs-react";
import { ChevronRightIcon } from "@sparrowengg/twigs-react-icons";
import React, { useState } from "react";

const ContactImportConfigure = ({
  handleConfigureField,
  listSegmentOptions,
  contactImportField
}: any) => {
  const [currentConfig, setCurrentConfig] = useState("LIST");
  const [currentList, setCurrentList] = useState(
    contactImportField?.configure?.listSegmentValue ?? null
  );

  return (
    <Flex justifyContent="center">
      <Box css={{ marginTop: "$40", maxWidth: 488, width: "100%" }}>
        <Heading size="h5">Import Contacts</Heading>
        <RadioGroup
          defaultValue={currentConfig}
          onChange={(value) => {
            setCurrentConfig(value);
            setCurrentList(null);
          }}
        >
          <Flex
            css={{ marginTop: "$12", "& label": { color: "$neutral800" } }}
            alignItems="center"
            gap="$12"
          >
            <Radio size="md" value="LIST" css={{ cursor: "pointer" }}>
              Import from (List/Segment)
            </Radio>
            <Radio size="md" value="ALL" css={{ cursor: "pointer" }}>
              Import All Contacts
            </Radio>
          </Flex>
        </RadioGroup>
        {currentConfig === "LIST" ? (
          <Select
            css={{ marginTop: "$12" }}
            onChange={(value) => setCurrentList(value)}
            size="lg"
            placeholder="Choose (List/Segment)"
            options={listSegmentOptions}
            value={currentList}
          />
        ) : null}
        <Button
          css={{ marginTop: "$16" }}
          disabled={!currentList?.value && currentConfig !== 'ALL'}
          size="lg"
          onClick={() => {
            handleConfigureField({
              type: currentConfig,
              listSegmentValue: currentList
            });
          }}
          rightIcon={<ChevronRightIcon />}
        >
          Next, Mapping
        </Button>
      </Box>
    </Flex>
  );
};

export default ContactImportConfigure;
