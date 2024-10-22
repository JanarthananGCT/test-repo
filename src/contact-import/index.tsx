import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Flex,
  FormInput,
  Heading,
  IconButton,
} from "@sparrowengg/twigs-react";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  CloseIcon
} from "@sparrowengg/twigs-react-icons";
import React, { useState } from "react";
import Arrow from "../commons/icons/arrow";
import ContactImportConfigure from "./components/contact-import-configure";
import ContactImportMapping from "./components/contact-import-mapping";
import ThemeWrapper from "../commons/components/theme-wrapper";
import { ContactImportProps, ContactImportHeaderProps } from "./types";

export const ContactImport = ({
  hasPreviousMapping,
  previousMappingHandler,
  onSaveHandler,
  isContactMappingPage,
  navigateMappingPage,
  contactImportField,
  setContactImportField,
  listSegmentOptions,
  integrationName,
  contactProperties,
  invitePortal
}: ContactImportProps) => {
  return (
    <ThemeWrapper>
      <Box css={{ height: "100vh", width: "100vw" }}>
        <ContactImportHeader
          contactImportField={contactImportField}
          hasPreviousMapping={hasPreviousMapping}
          previousMappingHandler={previousMappingHandler}
          onSaveHandler={onSaveHandler}
          isContactMappingPage={isContactMappingPage}
          navigateMappingPage={navigateMappingPage}
          invitePortal={invitePortal}
        />
        {!isContactMappingPage ? (
          <ContactImportConfigure
            contactImportField={contactImportField}
            handleConfigureField={(value: any) => {
              setContactImportField({
                ...contactImportField,
                configure: { ...value }
              });
              navigateMappingPage(true);
            }}
            listSegmentOptions={listSegmentOptions}
          />
        ) : (
          <ContactImportMapping
            contactImportField={contactImportField}
            setContactImportField={setContactImportField}
            integrationName={integrationName}
            contactProperties={contactProperties}
          />
        )}
      </Box>
    </ThemeWrapper>
  );
};

const ContactImportHeader = ({
  hasPreviousMapping,
  previousMappingHandler,
  onSaveHandler,
  isContactMappingPage,
  navigateMappingPage,
  invitePortal
}: ContactImportHeaderProps) => {
  const [showImportModal, setShowImportModal] = useState(false);
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      css={{
        borderBottom: "$borderWidths$xs solid $neutral200",
        padding: "$8 $12"
      }}
    >
      <Flex
        gap="$6"
        alignItems="center"
        css={{ visibility: hasPreviousMapping ? "visible" : "hidden" }}
      >
        <IconButton
          onClick={() => previousMappingHandler()}
          color="default"
          icon={<ArrowLeftIcon />}
          size="lg"
        />
        <Heading size="h6">New Contact Import</Heading>
      </Flex>
      <Flex
        alignItems="center"
        gap="$4"
        css={{
          "& button": { background: "transparent !important", fontSize: "$md" }
        }}
      >
        <Button
          css={{ color: !isContactMappingPage ? "$neutral900" : "$neutral800" }}
          color="default"
          variant="ghost"
          size="md"
          onClick={() => isContactMappingPage && navigateMappingPage(false)}
        >
          Event Setup
        </Button>
        <Arrow />
        <Button
          css={{ color: isContactMappingPage ? "$neutral900" : "$neutral800" }}
          color="default"
          variant="ghost"
          size="md"
          disabled={!isContactMappingPage}
        >
          Mapping
        </Button>
      </Flex>
      <Button
        size="lg"
        onClick={() => setShowImportModal(true)}
        rightIcon={<ChevronRightIcon />}
        css={{ visibility: isContactMappingPage ? "visible" : "hidden" }}
      >
        Continue
      </Button>
      {showImportModal ? (
        <ContactImportModal
          invitePortal={invitePortal}
          onSaveHandler={() => onSaveHandler()}
          onCloseHandler={() => setShowImportModal(false)}
        />
      ) : null}
    </Flex>
  );
};

const ContactImportModal = ({
  onCloseHandler,
  onSaveHandler,
  invitePortal
}: {
  onCloseHandler: () => void;
  onSaveHandler: () => void;
  invitePortal: {
    hasInvitePortal: boolean;
    value: boolean | null;
    onChangeHandler: (value: any) => void;
  };
}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <Dialog open>
      <DialogContent
        css={{
          padding: 0,
          borderRadius: "$3xl",
          maxWidth: 600
        }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          css={{
            padding: "$8 $12",
            borderBottom: "$borderWidths$xs solid $neutral200"
          }}
        >
          <Heading size="h6" css={{ color: "$neutral900" }}>
            Import Configuration
          </Heading>
          <IconButton
            variant="ghost"
            color="default"
            icon={<CloseIcon />}
            size="lg"
            css={{
              "& svg": {
                color: "#64748B !important"
              }
            }}
            onClick={() => onCloseHandler()}
          />
        </Flex>
        <Box
          css={{
            padding: "$12"
          }}
        >
          <FormInput
            label="Title of this import for future reference"
            requiredIndicator
            value={inputValue}
            maxLength={30}
            max={30}
            showCount
            onChange={(event) => setInputValue(event.currentTarget.value)}
            size="lg"
          />
          {invitePortal.hasInvitePortal ? (
            <Box css={{ marginTop: "$12" }}>
              <Checkbox
                checked={!!invitePortal.value}
                onChange={(value) => invitePortal.onChangeHandler(value)}
              >
                Invite to portal whenever a contact is created
              </Checkbox>
            </Box>
          ) : null}
        </Box>
        <Flex
          gap="$4"
          css={{
            justifyContent: "flex-end",
            padding: "$8 $12"
          }}
        >
          <Button size="lg" color="default" onClick={() => onCloseHandler()}>
            Cancel
          </Button>
          <Button size="lg" disabled={!inputValue?.length} onClick={()=>{
            onSaveHandler();
            onCloseHandler();
          }}>
            Finish Import
          </Button>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};
