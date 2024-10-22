import React, { useState } from "react";
import { Mapping } from "..";
import { Flex } from "@sparrowengg/twigs-react";
import {
  defaultFieldValue,
  sampleIntegrationMappingFields,
  sampleFields,
  sampleIntegrationFields
} from "../../commons/constants";
import { v4 as uuid } from "uuid";
import { FieldType } from "../types";

export default {
  component: Mapping,
  title: "Layout/Mapping",
  args: {
    surveyId: "",
    integrationName: "Klaviyo",
    fields: sampleFields,
    integrationFields: sampleIntegrationFields,
    token: ""
  },
  argTypes: {
    surveyId: {
      control: "number"
    },
    integrationName: {
      control: "text"
    },
    fields: {
      control: "object"
    },
    integrationFields: {
      control: "object"
    },
    token: {
      control: "text"
    }
  }
};

const Template = (args: any) => {
  const [fields, setFields] = useState<Array<FieldType>>([
    {
      ...defaultFieldValue,
      isEssentialField: true,
      essentialFieldLabel: "Email"
    },
    {
      ...defaultFieldValue,
      isEssentialField: true,
      essentialFieldLabel: "Organization"
    },
    { ...defaultFieldValue }
  ]);
  const [integrationFields, setIntegrationFields] = useState(
    sampleIntegrationMappingFields
  );
  const [isMappingPage, setIsMappingPage] = useState(false);
  const [hasOldResponse, setHasOldresponse] = useState(false);
  console.log(fields);
  return (
    <Flex alignItems="center" justifyContent="center">
      <Mapping
        {...args}
        fields={fields}
        setFields={setFields}
        integrationFields={integrationFields}
        setIntegrationFields={setIntegrationFields}
        integrationName="MSDYANMICS"
        token="prCCRhdN009pVksorlB977UMTH5eyc-wEkr_gOMnjUtjdLyQK86n-Ox4rrvk2h5RwPjri2mqg7y6nt7xCzKOTIvg"
        apiURL="https://api.signsparrow.com"
        isMappingPage={isMappingPage}
        navigateMappingPage={(value: boolean) =>
          setIsMappingPage(value ?? !isMappingPage)
        }
        surveyDetails={{
          surveyName: "CSM CSAT Feedback 123",
          surveyId: "1000008125"
        }}
        events={{
          hasEvents: true,
          options: [{ label: "EVENT", value: "hi" }],
          value: null,
          onChangeHandler: (value: any) => console.log("EVENT", value)
        }}
        accounts={{
          hasAccounts: true,
          options: [{ label: "ACCOUNT", value: "hi" }],
          value: null,
          onChangeHandler: (value: any) => console.log("accounts", value)
        }}
        actions={{
          hasActions: true,
          options: [
            { label: "ACTIONS", value: "hi" },
            { label: "SAT", value: "sal" }
          ],
          value: null,
          onChangeHandler: (value: any) => console.log("Actions", value)
        }}
        customList={{
          hasCustomList: false,
          options: [{ label: "Property", value: "property" }],
          value: null,
          onChangeHandler: (value: any) => console.log("VALUE", value)
        }}
        oldResponse={{
          hasOldResponse: false,
          value: hasOldResponse,
          onChangeHandler: (value: any) => setHasOldresponse(value)
        }}
        onSaveHandler={() => {
          console.log("SAVING MAPPING");
          return true;
        }}
      />
    </Flex>
  );
};
export const Default = Template.bind({});
