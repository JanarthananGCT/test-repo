import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  Select,
  Text,
  ThemeProvider
} from "@sparrowengg/twigs-react";
import {
  ArrowLeftIcon,
  ChevronRightIcon
} from "@sparrowengg/twigs-react-icons";
import React, { useEffect, useState } from "react";
import Arrow from "../commons/icons/arrow";
import { Mapping as FieldMapping } from "./components/mapping";
import { surveySparrowURL } from "../commons/constants";
import { CustomListFieldType, FieldType, OldResponseFieldType } from "./types";

type FieldMappingPropsType = {
  havingTypeDropdown: boolean
  onSaveMappingLoader: boolean
  surveyDetails: {
    surveyName: string;
    surveyId: string | number;
  };
  integrationName: string;
  fields: Array<FieldType>;
  setFields: React.Dispatch<React.SetStateAction<Array<FieldType>>>;
  integrationFields: any;
  setIntegrationFields: React.Dispatch<React.SetStateAction<any>>;
  apiURL: string;
  token: string;
  accounts: {
    hasAccounts: boolean;
    options: Array<any>;
    value: { label: string; value: string } | null | boolean;
    onChangeHandler: (value: any) => void;
  };
  events: {
    hasEvents: boolean;
    options: Array<any>;
    value: { label: string; value: string } | null | boolean;
    onChangeHandler: (value: any) => void;
  };
  actions: {
    hasActions: boolean;
    options: Array<any>;
    value: { label: string; value: string } | null | boolean;
    onChangeHandler: (value: any) => void;
  };
  isMappingPage: boolean;
  navigateMappingPage: (value?: boolean) => void;
  customList: CustomListFieldType;
  oldResponse: OldResponseFieldType;
  hasPreviousMapping: boolean;
  onSaveHandler: () => void;
  editField: any;
  previousMappingHandler: (value?: boolean) => void;
  onDeleteHandler?: (id: string | number) => void;
};

export const Mapping = ({
  havingTypeDropdown,
  onSaveMappingLoader,
  surveyDetails,
  integrationName,
  fields,
  setFields,
  integrationFields,
  setIntegrationFields,
  apiURL = surveySparrowURL,
  token,
  accounts,
  events,
  actions,
  isMappingPage,
  navigateMappingPage,
  customList,
  oldResponse,
  hasPreviousMapping,
  onSaveHandler,
  editField,
  previousMappingHandler
}: FieldMappingPropsType) => {

  const [previousMapping, setPreviousMapping] = useState(hasPreviousMapping ?? false);

  useEffect(() => {
    if (!!editField?.id) {
      setFields(editField.fieldValues);
      setPreviousMapping(true);
    }
  }, []);

  return (
    <ThemeProvider
      theme={{
        fonts: {
          body: "DM Sans, Roboto Mono, sans-serif",
          heading: "DM Sans, Roboto Mono, sans-serif"
        }
      }}
    >
      <Box css={{ height: "100vh", width: "100vw" }}>
        <MappingHeader
        navigateMappingPage={navigateMappingPage}
        accounts={accounts}
        events={events}
        actions={actions}
        havingTypeDropdown={havingTypeDropdown}
        onSaveMappingLoader={onSaveMappingLoader}
          hasPreviousMapping={previousMapping}
          isMappingPage={isMappingPage}
          fields={fields}
          editFieldId={editField?.id}
          onSaveHandler={onSaveHandler}
          navigateEventPage={() => navigateMappingPage(false)}
          previousMappingHandler={previousMappingHandler}
        />
        {!isMappingPage ? (
          <EventSetup
            surveyDetails={surveyDetails}
            accounts={accounts}
            events={events}
            actions={actions}
            navigateMappingPage={navigateMappingPage}
          />
        ) : (
          <FieldMapping
          havingTypeDropdown={havingTypeDropdown}
            fields={fields}
            setFields={setFields}
            surveyDetails={surveyDetails}
            integrationFields={integrationFields}
            setIntegrationFields={setIntegrationFields}
            surveyId={surveyDetails.surveyId}
            token={token}
            apiURL={apiURL}
            integrationName={integrationName}
            customList={customList}
            oldResponse={oldResponse}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

type EventSetupProps = {
  surveyDetails: {
    surveyName: string;
    surveyId: number | string;
  };
  accounts: {
    hasAccounts: boolean;
    options: Array<any>;
    value: { label: string; value: string } | null | boolean;
    onChangeHandler: (value: any) => void;
  };
  events: {
    hasEvents: boolean;
    options: Array<any>;
    value: { label: string; value: string } | null | boolean;
    onChangeHandler: (value: any) => void;
  };
  actions: {
    hasActions: boolean;
    options: Array<any>;
    value: { label: string; value: string } | null | boolean;
    onChangeHandler: (value: any) => void;
  };
  navigateMappingPage: (value?: boolean) => void;
};

const EventSetup = ({
  surveyDetails,
  accounts,
  events,
  actions,
  navigateMappingPage
}: EventSetupProps) => {
  useEffect(()=>{
    if(actions?.value){
      actions?.onChangeHandler(actions?.value)
    }
    if(events?.value){
      events?.onChangeHandler(events?.value)
    }
  },[actions?.value, events?.value])
  return (
    <Flex
      css={{ paddingTop: "$40" }}
      alignItems="center"
      justifyContent="center"
    >
      <Box css={{ width: 488 }}>
        <Heading size="h5">Account Details</Heading>
        <Flex gap="$2" css={{ marginTop: "$4" }}>
          <Text size="sm"  css={{ color: "$neutral500" }}>
            Survey Name:
          </Text>
          <Text size="sm"  weight={"medium"} css={{ color: "$neutral800" }}>
            {surveyDetails.surveyName}
          </Text>
        </Flex>
        <Flex flexDirection="column" gap="$8" css={{ marginTop: "$16" }}>
          {accounts?.hasAccounts && (
            <Flex gap="$2" flexDirection="column">
              <FormLabel size="xs" css={{ fontWeight: "$5" }}>
                Choose Account
              </FormLabel>
              <Select
                value={accounts.value}
                options={accounts.options}
                placeholder=""
                onChange={(value) => accounts.onChangeHandler(value)}
                size="lg"
              />
            </Flex>
          )}
          {events?.hasEvents && (
            <Flex gap="$2" flexDirection="column">
              <FormLabel size="xs" css={{ fontWeight: "$5" }}>
                Choose Object
              </FormLabel>
              <Select
                options={events.options}
                value={events?.value}
                placeholder=""
                onChange={(value) => events.onChangeHandler(value)}
                size="lg"
              />
            </Flex>
          )}
          {actions?.hasActions && (
            <Flex gap="$2" flexDirection="column">
              <FormLabel size="xs" css={{ fontWeight: "$5" }}>
                Choose Action
              </FormLabel>
              <Select
                size="lg"
                options={actions.options}
                value={actions?.value}
                placeholder=""
                onChange={(value) => actions.onChangeHandler(value)}
              />
            </Flex>
          )}
        </Flex>
        <Button
          size="lg"
          disabled={!actions.value || !events.value}
          rightIcon={<ChevronRightIcon />}
          css={{ marginTop: "$16" }}
          onClick={() => navigateMappingPage()}
        >
          Continue Mapping
        </Button>
      </Box>
    </Flex>
  );
};

type MappingHeaderProps = {
  navigateMappingPage: any;
  accounts: any;
  events: any;
  actions: any;
  havingTypeDropdown: boolean;
  onSaveMappingLoader: boolean;
  hasPreviousMapping: boolean;
  isMappingPage: boolean;
  fields: Array<FieldType>;
  navigateEventPage: () => void;
  onSaveHandler: (editFieldId?: string | number) => void;
  previousMappingHandler: (value?: boolean) => void;
  editFieldId: string | number;
};

const MappingHeader = ({
  navigateMappingPage,
  accounts,
  events,
  actions,
  havingTypeDropdown,
  onSaveMappingLoader,
  hasPreviousMapping,
  isMappingPage,
  fields,
  navigateEventPage,
  onSaveHandler,
  previousMappingHandler,
  editFieldId
}: MappingHeaderProps) => {
  const isDisabled = !actions.value || !events.value;


  const isAllEssentialMapped = (fields: any) => {
    let status = true;
    fields?.map((field: any)=> {
      if(field?.isEssentialField){
         status = status &&  field?.surveySparrowField !== null
        if(havingTypeDropdown){
          status = status &&
          field?.integrationFieldType !== null &&
          field?.integrationField !== null
        }
      } else {
        if(!!field?.integrationField || !!field?.surveySparrowField){
          status = status && !!field?.integrationField && !!field?.surveySparrowField
        }
      }
    })
    return status;
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      css={{
        position: 'sticky',
        width: "100%",
        top: "1px",
        zIndex: "99",
        background: "#ffff",
        borderBottom: "$borderWidths$xs solid $neutral200",
        padding: "$8 $12"
      }}
    >
      <Flex
        gap="$6"
        alignItems="center"
        css={{ visibility: hasPreviousMapping ? "visible" : "hidden" }}
      >
        <IconButton onClick={() => previousMappingHandler()} color="default" icon={<ArrowLeftIcon />} size="lg" />
        <Heading size="h6">{editFieldId ? "Edit Mapping" : "New Mapping"}</Heading>
      </Flex>
      <Flex
        alignItems="center"
        gap="$4"
        css={{
          "& button": { background: "transparent !important", fontSize: "$md" }
        }}
      >
        <Button
          css={{ color: !isMappingPage ? "$neutral900" : "$neutral800" }}
          color="default"
          variant="ghost"
          size="md"
          onClick={() => isMappingPage && navigateEventPage()}
        >
          Event Setup
        </Button>
        <Arrow />
        <Button
          onClick={() => navigateMappingPage()}
           css={{ color: !isDisabled ? "$neutral900" : "$neutral800" }}
           color="default"
           variant="ghost"
           size="md"
           disabled={isDisabled}
        >
          Mapping
        </Button>
      </Flex>
      <Button
      loading={onSaveMappingLoader}
        size="lg"
        disabled={!isAllEssentialMapped(fields)}
        onClick={() => onSaveHandler(editFieldId)}
        css={{ visibility: isMappingPage ? "visible" : "hidden" }}
      >
        Save Mapping
      </Button>
    </Flex>
  );
};
