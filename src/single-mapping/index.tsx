import {
  Flex,
  IconButton,
  Heading,
  Button,
  Box,
  Checkbox,
  FormInput,
  Select,
  FormLabel,
  ThemeProvider,
  Text
} from "@sparrowengg/twigs-react";
import {
  ArrowLeftIcon,
  ChevronRightIcon
} from "@sparrowengg/twigs-react-icons";
import React, { useEffect, useState } from "react";
import Arrow from "../commons/icons/arrow";
import Mapping from "./components/mapping";
import { surveySparrowURL } from "../commons/constants";

type SingleMappingPropsType = {
  integrationFields: Array<any>;
  configuration: {
    hasConfiguration: boolean;
    configurationFields: Array<{
      id: number | string;
      label: string;
      fieldType: string;
      options?: Array<{ label: string; value: string }>;
      value: { label: string; value: string } | string | null;
      onChangeHandler: (value: any) => void;
    }>;
    onSaveHandler: () => void;
  };
  token: string;
  isMappingPage: boolean;
  navigateMappingPage: (value?: boolean) => void;
  apiURL: string;
  surveyDetails: { surveyName: string; surveyId: string | number };
  onSaveHandler: (fields: any) => void;
  setIntegrationFields: React.Dispatch<React.SetStateAction<any>>;
  hasPreviousMapping: boolean;
  importResponse: {
    hasImportResponse: boolean;
    value: null | string | number;
    onChangeHandler: (value: string) => void;
  };
  editField?: any;
  previousMappingHandler?: (value?: boolean) => void;
};

export const SingleMapping = ({
  integrationFields,
  configuration,
  isMappingPage,
  navigateMappingPage,
  setIntegrationFields,
  token,
  apiURL = surveySparrowURL,
  surveyDetails,
  importResponse,
  hasPreviousMapping,
  onSaveHandler,
  editField,
  previousMappingHandler
}: SingleMappingPropsType) => {
  const [ssMappingData, setSSMappingData] = useState<any>({
    questions: [],
    variables: [],
    contactProperties: [],
    expressions: [],
    property: []
  });
  const [previousMapping, setPreviousMapping] = useState(
    hasPreviousMapping ?? false
  );

  useEffect(() => {
    if (!!editField?.id) {
      navigateMappingPage(true);
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
      <Box css={{ width: "100%" }}>
        <MappingHeader
          isMappingPage={isMappingPage}
          hasPreviousMapping={previousMapping}
          navigateConfigPage={() => navigateMappingPage(false)}
          previousMappingHandler={previousMappingHandler}
          onSaveHandler={() => {
            const filteredMapping = Object.fromEntries(
              Object.entries(ssMappingData)
                .map(([key, arr]) => [
                  key,
                  (arr as any).filter((item: any) => item.isEnabled)
                ])
                .filter(([, arr]) => arr.length > 0)
            );
            onSaveHandler(filteredMapping);
          }}
        />
        {!isMappingPage && configuration.hasConfiguration ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            css={{ marginTop: "$40" }}
          >
            <ConfigurationSetup
              configuration={configuration}
              surveyName={surveyDetails.surveyName}
            />
          </Flex>
        ) : (
          <Mapping
            integrationFields={integrationFields}
            setIntegrationFields={setIntegrationFields}
            token={token}
            apiURL={apiURL}
            surveyId={surveyDetails.surveyId}
            importResponse={importResponse}
            ssMappingData={ssMappingData}
            setSSMappingData={setSSMappingData}
            editField={editField}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

const MappingHeader = ({
  hasPreviousMapping,
  isMappingPage,
  navigateConfigPage,
  onSaveHandler,
  previousMappingHandler
}: any) => {
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
          onClick={previousMappingHandler}
          color="default"
          icon={<ArrowLeftIcon />}
          size="lg"
        />
        <Heading size="h6">New Mapping</Heading>
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
          onClick={() => isMappingPage && navigateConfigPage()}
        >
          Configuration
        </Button>
        <Arrow />
        <Button
          css={{ color: isMappingPage ? "$neutral900" : "$neutral800" }}
          color="default"
          variant="ghost"
          size="md"
        >
          Mapping
        </Button>
      </Flex>
      <Button
        size="lg"
        onClick={onSaveHandler}
        css={{ visibility: isMappingPage ? "visible" : "hidden" }}
      >
        Save Mapping
      </Button>
    </Flex>
  );
};

const ConfigurationSetup = ({
  configuration,
  surveyName
}: {
  configuration: any;
  surveyName: string;
}) => {
  return (
    <Box css={{ maxWidth: 488, width: "100%" }}>
      <Heading size="h5">Event Details</Heading>
      <Flex gap="$2" css={{ marginTop: "$4" }}>
        <Text size="sm" css={{ color: "$neutral500" }}>
          Survey Name:
        </Text>
        <Text size="sm"  weight={"medium"} css={{ color: "$neutral800" }}>
          {surveyName}
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        gap="$8"
        css={{
          marginTop: "$12",
          "& label": {
            color: "$neutral800"
          }
        }}
      >
        {configuration.configurationFields?.map((field: any) => (
          <Configuration field={field} />
        ))}
      </Flex>
      <Button
        onClick={() => configuration.onSaveHandler()}
        rightIcon={<ChevronRightIcon />}
        size="lg"
        css={{ marginTop: "$16" }}
      >
        Continue Mapping
      </Button>
    </Box>
  );
};

const Configuration = ({ field }: any) => {
  switch (field.fieldType) {
    case "checkbox":
      return (
        <Checkbox
          checked={field.value}
          onChange={(value) => field.onChangeHandler(value, field.id ?? field.label)}
          size="sm"
        >
          {field.label}
        </Checkbox>
      );
    case "input":
      return (
        <FormInput
          label={field.label}
          value={field.value}
          size="lg"
          onChange={(event) => field.onChangeHandler(event.currentTarget.value, field.id ?? field.label)}
        />
      );
    default:
      return (
        <Flex gap="$2" flexDirection="column">
          <FormLabel size="sm" css={{ fontWeight: "$5" }}>
            {field.label}
          </FormLabel>
          <Select
            value={field.value}
            options={field.options}
            placeholder=""
            onChange={(value) => field.onChangeHandler(value, field.id ?? field.label)}
            size="lg"
          />
        </Flex>
      );
  }
};
