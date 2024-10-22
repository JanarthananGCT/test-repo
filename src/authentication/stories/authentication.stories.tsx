import React from "react";
import { Authentication } from "..";
import { Flex } from "@sparrowengg/twigs-react";

export default {
  component: Authentication,
  title: "Layout/Authentication",
  args: {},
  argTypes: {}
};

const Template = (args: any) => {
  return (
    <Flex alignItems="center" justifyContent="center" css={{ paddingBlock: 112 }}>
      <Authentication
        integrationName="MSDynamics"
        onSuccessHandler={() => console.log("HANDLER")}
        fields={[
          {
            id: 1,
            type: "input",
            placeholder: "NEW VALUE",
            value: "HIII",
            label: "Select the particular api field",
            changeFieldValue: (value: any, fieldId?: string | number) => console.log(value, fieldId),
            options: [{ label: 'NEWSAMPLE', value: 'NEWSAMPLE' }],
            isPassword: true,
            required: true,
          },
          {
            id: 2,
            type: "select",
            placeholder: "TEST",
            value: null,
            label: "Select the api field",
            changeFieldValue: (value: any, fieldId?: string | number) => console.log(value, fieldId),
            options: [{ label: 'NEWSAMPLE', value: 'NEWSAMPLE' }]
          },
          {
            id: 2,
            type: "input",
            placeholder: "TEST",
            value: null,
            label: "Select the api field",
            changeFieldValue: (value: any, fieldId?: string | number) => console.log(value, fieldId),
            options: [{ label: 'NEWSAMPLE', value: 'NEWSAMPLE' }]
          }
        ]}
      />
    </Flex>
  );
};
export const Default = Template.bind({});
