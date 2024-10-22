import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  Select,
  ThemeProvider,
  Text,
  Chip,
} from "@sparrowengg/twigs-react";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
} from "@sparrowengg/twigs-react-icons";
import React, { useEffect } from "react";
import Arrow from "../commons/icons/arrow";
import CustomPill from "../commons/components/custom-pill";
import Trigger from "./components/trigger";

export const Triggers = ({
  onSaveTriggerLoader,
  objects,
  accounts,
  actions,
  isTriggerPage,
  navigateTriggerPage,
  previousMapping,
  onSaveHandler,
  previousMappingHandler,
  surveyDetails,
  fields,
  token,
  apiURL,
  setFields,
  shareRecipentOptions,
  shareChannelOptions,
  triggerDetails,
  setTriggerDetails,
  editField,
  fieldOptions,
  variableOptions,
}: any) => {
  useEffect(() => {
    if (!!editField?.id) {
      setFields(editField.fieldValues.fields);
      setTriggerDetails(editField.fieldValues.triggerDetails);
    }
  }, []);
  return (
    <ThemeProvider
      theme={{
        fonts: {
          body: "DM Sans, Roboto Mono, sans-serif",
          heading: "DM Sans, Roboto Mono, sans-serif",
        },
      }}
    >
      <Box css={{ height: "100vh", width: "100vw" }}>
        <TriggerHeader
        navigateTriggerPage={navigateTriggerPage}
          objects={objects}
          accounts={accounts}
          actions={actions}
          onSaveTriggerLoader={onSaveTriggerLoader}
          hasPreviousMapping={previousMapping}
          isTriggerPage={isTriggerPage}
          onSaveHandler={onSaveHandler}
          navigateConfigurePage={() => navigateTriggerPage(false)}
          previousMappingHandler={previousMappingHandler}
          triggerDetails={triggerDetails}
          fields={fields}
          editFields={editField?.fieldValues}
          eventFields={editField?.id}
        />
        {!isTriggerPage ? (
          <EventSetup
            eventFields={editField?.fieldValues}
            objects={objects}
            accounts={accounts}
            actions={actions}
            surveyDetails={surveyDetails}
            navigateTriggerPage={navigateTriggerPage}
          />
        ) : (
          <Trigger
            fields={fields}
            setFields={setFields}
            token={token}
            apiURL={apiURL}
            surveyDetails={surveyDetails}
            shareRecipentOptions={shareRecipentOptions}
            shareChannelOptions={shareChannelOptions}
            triggerDetails={triggerDetails}
            setTriggerDetails={setTriggerDetails}
            fieldOptions={fieldOptions}
            variableOptions={variableOptions}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

const EventSetup = ({
  eventFields,
  accounts,
  objects,
  actions,
  surveyDetails,
  navigateTriggerPage,
}: any) => {
  useEffect(()=>{
    if(actions?.options?.find((action:any)=> action?.value === eventFields?.action)){
      actions?.onChangeHandler(actions?.value ?? actions?.options?.find((action:any)=> action?.value === eventFields?.action))
    }
    if(objects?.options?.find((object:any)=> object?.value === eventFields?.object)){
      objects?.onChangeHandler(objects?.value ?? objects?.options?.find((object:any)=> object?.value === eventFields?.object))
    }
  },[actions?.value, objects?.value])
  return (
    <Flex
      css={{ paddingTop: "$40" }}
      alignItems="center"
      justifyContent="center"
    >
      <Box css={{ width: 488 }}>
        <Heading size="h5">Account Details</Heading>
        <Flex gap="$2" css={{ marginTop: "$4" }}>
          <Text size="sm" css={{ color: "$neutral500" }}>
            Survey Name:
          </Text>
          <Text size="sm" weight={"medium"} css={{ color: "$neutral800" }}>
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
                value={accounts.options.find((account:any)=> account.value === eventFields?.account) ?? accounts.value}
                options={accounts.options}
                isMulti={accounts?.isMulti}
                placeholder=""
                onChange={(value) => accounts.onChangeHandler(value)}
                size="lg"
              />
            </Flex>
          )}
          {objects?.hasObjects && (
            <Flex gap="$2" flexDirection="column">
              <FormLabel size="xs" css={{ fontWeight: "$5" }}>
                Choose Events
              </FormLabel>
              <Select
                options={objects.options}
                value={objects.value ?? objects.options.find((object:any)=> object.value === eventFields?.object)}
                isMulti={objects?.isMulti}
                placeholder=""
                onChange={(value) => objects.onChangeHandler(value)}
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
                value={ actions.value ?? actions.options.find((action:any)=> action.value === eventFields?.action)}
                isMulti={actions?.isMulti}
                placeholder=""
                css={{
                  ".twigs-select__value-container--is-multi": {
                    gap: "$2",
                  },
                }}
                components={{
                  MultiValue: CustomMultiValue,
                }}
                onChange={(value) => actions.onChangeHandler(value)}
              />
            </Flex>
          )}
        </Flex>
        <Button
          size="lg"
          rightIcon={<ChevronRightIcon />}
          // disabled={ (!actions.value || !objects.value) &&( !objects.options.find((object:any)=> object.value === eventFields?.object) || !actions.options.find((action:any)=> action.value === eventFields?.action))}
          css={{ marginTop: "$16" }}
          onClick={() => navigateTriggerPage(true)}
        >
          Continue
        </Button>
      </Box>
    </Flex>
  );
};

const CustomMultiValue = (props: any) => {
  return (
    <CustomPill
      label={props.data.label}
      onCloseHandler={() => props.removeProps.onClick()}
      variant="default"
      radius="md"
    />
  );
};
const isEmpty = (object: any) => {
  return Object.entries(object ?? {})?.length === 0;
};

const TriggerHeader = ({
  navigateTriggerPage,
  objects,
  accounts,
  actions,
  onSaveTriggerLoader,
  hasPreviousMapping,
  isTriggerPage,
  onSaveHandler,
  navigateConfigurePage,
  previousMappingHandler,
  fields,
  editFieldId,
  eventFields,
  triggerDetails
}: any) => {
  const isDisabled = (!actions.value || !objects.value) && ( !objects.options.find((object:any)=> object.value === eventFields?.object) || !actions.options.find((action:any)=> action.value === eventFields?.action))
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      css={{
        position: "sticky",
        width: "100%",
        top: "1px",
        zIndex: "99",
        background: "#ffff",
        borderBottom: "$borderWidths$xs solid $neutral200",
        padding: "$8 $12",
      }}
    >
      <Flex
        gap="$6"
        alignItems="center"
      >
        <IconButton
          onClick={() => previousMappingHandler()}
          color="default"
          icon={<ArrowLeftIcon />}
          size="lg"
        />
        <Heading size="h6">{editFieldId ? "Edit Trigger" : "New Trigger"}</Heading>
      </Flex>
      <Flex
        alignItems="center"
        gap="$4"
        css={{
          "& button": { background: "transparent !important", fontSize: "$md" },
        }}
      >
        <Button
          css={{ color: !isTriggerPage ? "$neutral900" : "$neutral800" }}
          color="default"
          variant="ghost"
          size="md"
          onClick={() => isTriggerPage && navigateConfigurePage()}
        >
          Event Setup
        </Button>
        <Arrow />
        <Button
        onClick={(()=> 
          navigateTriggerPage(true)
        )}
          css={{ color: !isDisabled ? "$neutral900" : "$neutral800" }}
          color="default"
          variant="ghost"
          size="md"
          disabled={isDisabled}
        >
          Trigger Conditions
        </Button>
      </Flex>
      <Button
        loading={onSaveTriggerLoader}
        size="lg"
        // disabled={
        //   !fields?.filters.some((filter: any) =>
        //     filter?.filter?.some((currentFilter: any) => !!currentFilter?.value)
        //   ) || isEmpty(triggerDetails.shareChannel) || isEmpty(triggerDetails.shareRecipient) || isEmpty(triggerDetails.shareType)
        // }
        onClick={() => onSaveHandler(editFieldId)}
        css={{ visibility: isTriggerPage ? "visible" : "hidden" }}
      >
        Save Trigger
      </Button>
    </Flex>
  );
};
