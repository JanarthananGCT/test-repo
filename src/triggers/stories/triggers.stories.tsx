import React, { useState } from "react";
import { Triggers } from "..";
import { Flex } from "@sparrowengg/twigs-react";

export default {
  component: Triggers,
  title: "Layout/Triggers",
  args: {},
  argTypes: {}
};

const Template = (args: any) => {
  const [isTriggerPage, setIsTriggerPage] = useState(true);
  const [actions, setActions] = useState([]);
  const [fields, setFields] = useState({
    filters: [],
    condition: "AND"
  });

  const [triggerDetails, setTriggerDetails] = useState({
    variables: [],
    shareType: {},
    shareRecipient: {},
    shareChannel: {}
  });

  const shareRecipentOptions = [
    {
      id: 1,
      type: "EMAIL",
      label: "Customer Email",
      value: "Customer Email"
    },
    {
      id: 2,
      type: "SMS",
      label: "SMS phone number",
      value: "SMS phone number"
    },
    {
      id: 3,
      type: "WHATSAPP",
      label: "Customer whatsapp number",
      value: "Customer whatsapp number"
    }
  ];

  const shareChannelOptions = [
    {
      id: 1,
      type: "EMAIL",
      label: "Email share one",
      value: "Customer Email"
    }
  ];

  return (
    <Flex alignItems="center" justifyContent="center">
      <Triggers
        navigateTriggerPage={(value?: boolean) =>
          setIsTriggerPage(value ?? !isTriggerPage)
        }
        surveyDetails={{
          surveyName: "CSM CSAT Feedback",
          surveyId: "1000008125"
        }}
        shareRecipentOptions={shareRecipentOptions}
        shareChannelOptions={shareChannelOptions}
        triggerDetails={triggerDetails}
        setTriggerDetails={setTriggerDetails}
        fields={fields}
        setFields={setFields}
        onSaveHandler={() =>   console.log(fields, triggerDetails)}
        isTriggerPage={isTriggerPage}
        objects={{
          hasObjects: true,
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
            { label: "Created", value: "hi" },
            { label: "Updated", value: "updated" }
          ],
          value: actions,
          onChangeHandler: (value: any) => setActions(value)
        }}
      />
    </Flex>
  );
};
export const Default = Template.bind({});
