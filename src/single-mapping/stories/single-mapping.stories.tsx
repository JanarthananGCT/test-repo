import React, { useState } from "react";
import { Flex } from "@sparrowengg/twigs-react";
import { SingleMapping } from "..";
import { sampleIntegrationMappingFields } from "../../commons/constants";

export default {
  component: SingleMapping,
  title: "Layout/SingleMapping",
  args: {},
  argTypes: {}
};

const Template = (args: any) => {
  const [integrationFields, setIntegrationFields] = useState(
    sampleIntegrationMappingFields
  );
  const [isMappingPage, setIsMappingPage] = useState(false);

  return (
    <Flex alignItems="center" justifyContent="center">
      <SingleMapping
        token="prne1UHJhfZQ-y10RWkAIMKNrx4QC4TLU6UETFpkdj6LwDFxShAN6CZ9PW53iteDrWdaTvtircu3KKBWLlsu7JpQ"
        apiURL="https://api.salesparrow.com"
        setIntegrationFields={setIntegrationFields}
        integrationFields={integrationFields}
        surveyDetails={{
          surveyName: "CSM CSAT Feedback",
          surveyId: "1000008125"
        }}
        hasPreviousMapping={false}
        importResponse={{
          hasImportResponse: true,
          value: null,
          onChangeHandler: (value: string) => console.log(value)
        }}
        configuration={{
          hasConfiguration: true,
          configurationFields: [
            {
              id: 1,
              label: "Choose Account",
              fieldType: "select",
              options: [{ label: "sample", value: "another sample" }],
              value: null,
              onChangeHandler: (value: any) => console.log(value)
            },
            {
              id: 1,
              label: "saaravana Account",
              fieldType: "select",
              options: [{ label: "sample", value: "another sample" }],
              value: null,
              onChangeHandler: (value: any) => console.log(value)
            },
            {
              id: 2,
              label: "Action",
              fieldType: "select",
              options: [{ label: "newsample", value: "new sample" }],
              value: null,
              onChangeHandler: (value: any) => console.log(value)
            },
            {
              id: 3,
              label: "Create a new Spreadsheet",
              fieldType: "input",
              value: null,
              onChangeHandler: (value: any) => console.log(value)
            },
            {
              id: 4,
              label: "Import Old response",
              fieldType: "checkbox",
              value: null,
              onChangeHandler: (value: any) => console.log(value)
            }
          ],
          onSaveHandler: () => setIsMappingPage(true)
        }}
        isMappingPage={isMappingPage}
        navigateMappingPage={(value?: boolean) =>
          setIsMappingPage(value ?? !isMappingPage)
        }
        onSaveHandler={(fields: any) => console.log(fields)}
      />
    </Flex>
  );
};
export const Default = Template.bind({});
