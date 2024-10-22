import React, { useState } from "react";
import { Flex } from "@sparrowengg/twigs-react";
import { IntegrationTemplate } from "..";
import { Mapping } from "../../mapping";
import {
  defaultFieldValue,
  sampleIntegrationMappingFields,
} from "../../commons/constants";
import { FieldType } from "../../mapping/types";
import { v4 as uuid } from "uuid";
import { SingleMapping } from "../../single-mapping";
import { Triggers } from "../../triggers";
import { fieldOptions } from "../../triggers/constants";

export default {
  component: IntegrationTemplate,
  title: "Main Configuration/IntegrationTemplate",
  args: {},
  argTypes: {},
};

const Template = (args: any) => {
  const [fields, setFields] = useState<Array<FieldType>>([
    { ...defaultFieldValue },
    {
      ...defaultFieldValue,
      isEssentialField: true,
      essentialFieldLabel: "Email",
    },
    {
      ...defaultFieldValue,
      isEssentialField: true,
      essentialFieldLabel: "Phone Number",
    },
  ]);
  const [integrationFields, setIntegrationFields] = useState(
    sampleIntegrationMappingFields
  );
  const [isMappingPage, setIsMappingPage] = useState(false);
  const [hasOldResponse, setHasOldresponse] = useState(false);
  const [mappingMappedFields, setMappingMappedFields] = useState<any>({
    type: "MULTI_MAPPING",
    fields: [
      // {
      //   id: "a942a0aa-ea19-4ffd-9771-904cdcea2527",
      //   isEnabled: true,
      //   fields: [
      //     {
      //       id: "b09811fc-d39d-4378-bd58-bcb4e9a5cbde",
      //       surveySparrowField: null,
      //       integrationField: null,
      //       integrationFieldType: null,
      //       isEssentialField: false,
      //       mappedType: {
      //         id: 1,
      //         label: "Question",
      //         value: "QUESTION"
      //       },
      //       defaultValue: null
      //     },
      //     {
      //       id: "a1683dc8-7240-457e-8b28-bcf75a007d67",
      //       surveySparrowField: {
      //         label: "fsdfsdfds",
      //         value: 1000076965,
      //         questionType: "TextInput"
      //       },
      //       integrationField: {
      //         id: 2,
      //         label: "Phone Number",
      //         value: "phone_number",
      //         type: "phone"
      //       },
      //       integrationFieldType: {
      //         id: 1,
      //         label: "String",
      //         subLabel: "Textual Data. (Eg: Hello World, 1234)",
      //         value: "STRING"
      //       },
      //       isEssentialField: true,
      //       mappedType: {
      //         id: 1,
      //         label: "Question",
      //         value: "QUESTION"
      //       },
      //       defaultValue: {
      //         type: "STRING",
      //         value: "jkjnklj"
      //       },
      //       essentialFieldLabel: "Email"
      //     },
      //     {
      //       id: "d5e052c4-3847-46c9-bc53-087d8e2e7555",
      //       surveySparrowField: {
      //         label: "fsdfsdfds",
      //         value: 1000076965,
      //         questionType: "TextInput"
      //       },
      //       integrationField: {
      //         id: 2,
      //         label: "Phone Number",
      //         value: "phone_number",
      //         type: "phone"
      //       },
      //       integrationFieldType: {
      //         id: 1,
      //         label: "String",
      //         subLabel: "Textual Data. (Eg: Hello World, 1234)",
      //         value: "STRING"
      //       },
      //       isEssentialField: true,
      //       mappedType: {
      //         id: 1,
      //         label: "Question",
      //         value: "QUESTION"
      //       },
      //       defaultValue: {
      //         type: "STRING",
      //         value: "dsvs"
      //       },
      //       essentialFieldLabel: "Phone Number"
      //     }
      //   ]
      // }
    ],
  });
  const [isTriggerPage, setIsTriggerPage] = useState(false);
  const [actions, setActions] = useState([]);
  const [triggerFields, setTriggerFields] = useState({
    filters: [],
    condition: "AND",
  });

  const [triggerDetails, setTriggerDetails] = useState({
    variables: [],
    shareType: {},
    shareRecipient: {},
    shareChannel: {},
  });
  const [triggerMappedFields, setTriggerMappedFields] = useState<any>([
    // {
    //     "id": "821078fd-3929-44cf-b285-0fc14c15c915",
    //     "isEnabled": true,
    //     "object": "CONTACT",
    //     "action": "CREATED",
    //     "fields": {
    //       "filters": [
    //           {
    //               "id": "5818275b-bc93-4f75-a6af-add3cbee4784",
    //               "filter": [
    //                   {
    //                       "id": "32f48ed0-2089-4962-9481-bd359b0a40b7",
    //                       "field": "DEGREE",
    //                       "dataType": "STRING",
    //                       "comparator": "IS",
    //                       "value": "computer science"
    //                   },
    //                   {
    //                       "id": "71cb480b-01b6-4ecc-8a67-950597bf98a7",
    //                       "field": "GENDER",
    //                       "dataType": "BOOLEAN",
    //                       "comparator": "IS",
    //                       "value": "True"
    //                   },
    //                   {
    //                       "id": "2f05f43f-c50c-4025-9fab-332e7bb060fd",
    //                       "field": "SAMPLE",
    //                       "dataType": "STRING",
    //                       "comparator": "NO_VALUE",
    //                       "value": "kvsdkln"
    //                   }
    //               ],
    //               "condition": "AND"
    //           },
    //           {
    //               "id": "cce23605-6a50-4a93-a8ec-f2145f5f7907",
    //               "filter": [
    //                   {
    //                       "id": "48a88937-497d-474d-9388-c66b058becc8",
    //                       "field": "DOB",
    //                       "dataType": "STRING",
    //                       "comparator": "CONTAINS",
    //                       "value": "another nice work"
    //                   },
    //                   {
    //                       "id": "58b5d500-9d2a-4f5d-a7d0-786e91170661",
    //                       "field": "STUDY",
    //                       "dataType": "STRING",
    //                       "comparator": "CONTAINS",
    //                       "value": "vds"
    //                   }
    //               ],
    //               "condition": "AND"
    //           },
    //           {
    //               "id": "3f8ea3d7-e73d-4ae3-afdf-60635294ddb7",
    //               "filter": [
    //                   {
    //                       "id": "ab3938e8-d761-4ff2-88cf-a52de7206deb",
    //                       "field": "COMPANY_SIZE",
    //                       "dataType": "NUMBER",
    //                       "comparator": "CONTAINS",
    //                       "value": "12"
    //                   }
    //               ],
    //               "condition": "AND"
    //           }
    //       ],
    //       "condition": "AND"
    //   },
    //     "triggerDetails": {
    //         "variables": [
    //             {
    //                 "id": 1,
    //                 "label": "$deal.home_currency",
    //                 "value": "$deal.home_currency"
    //             }
    //         ],
    //         "shareType": {
    //             "id": 1,
    //             "label": "Email",
    //             "value": "EMAIL"
    //         },
    //         "shareRecipient": {
    //             "id": 1,
    //             "type": "EMAIL",
    //             "label": "Customer Email",
    //             "value": "Customer Email"
    //         },
    //         "shareChannel": {
    //             "id": 1,
    //             "type": "EMAIL",
    //             "label": "Email share one",
    //             "value": "Customer Email"
    //         }
    //     }
    // }
  ]);

  const shareRecipentOptions = [
    {
      id: 1,
      type: "EMAIL",
      label: "Customer Email",
      value: "Customer Email",
    },
    {
      id: 2,
      type: "SMS",
      label: "SMS phone number",
      value: "SMS phone number",
    },
    {
      id: 3,
      type: "WHATSAPP",
      label: "Customer whatsapp number",
      value: "Customer whatsapp number",
    },
  ];

  const shareChannelOptions = [
    {
      id: 1,
      type: "EMAIL",
      label: "Email share one",
      value: "Customer Email",
    },
  ];

  const [eventConfiguration, setEventConfiguration] = useState({
    actions: {},
    object: {},
    accounts: {},
  });
  const handlePreviousNavigation = () => {
    setEventConfiguration({
      actions: {},
      object: {},
      accounts: {},
    });
    setTriggerMappedFields([]);
    setMappingMappedFields([]);
  };
  const onEditHandler = (id:any) => {
    console.log("Edit clicked", id);
  }

  return (
    <Flex alignItems="center" justifyContent="center">
      <IntegrationTemplate
      fieldOptions={fieldOptions}
        triggerEnabled={true}
        mappingEnabled={false}
        handlePreviousNavigation={handlePreviousNavigation}
        dashboardDescription="Hello"
        mappingDescription="Sample Description"
        triggerDescription="Sample Description"
        onMappingEditHandler={(id:any)=>onEditHandler(id)}
        mapping={{
          mappedFields: mappingMappedFields,
          setMappedFields: setMappingMappedFields,
        }}
        trigger={{
          mappedFields: triggerMappedFields,
          setMappedFields: setTriggerMappedFields,
        }}
        triggerComponent={
          <Triggers
            onSaveTriggerLoader={false}
            shareRecipentOptions={shareRecipentOptions}
            shareChannelOptions={shareChannelOptions}
            triggerDetails={triggerDetails}
            fieldOptions={fieldOptions}
            setTriggerDetails={setTriggerDetails}
            fields={triggerFields}
            setFields={setTriggerFields}
            navigateTriggerPage={(value?: boolean) =>
              setIsTriggerPage(value ?? !isTriggerPage)
            }
            variableOptions={[
              { label: 'Patient Id', value: 'Patient_id', type: 'STRING' },
              { label: 'Patient Family', value: 'Patient_family', type: 'STRING' },
              { label: 'Patient Given', value: 'Patient_given', type: 'STRING' },
              { label: 'Patient Email', value: 'Patient_email', type: 'STRING' },
              {
                label: 'Patient Work Phone',
                value: 'Patient_phone_work',
                type: 'NUMBER'
              },
              {
                label: 'Patient Home Phone',
                value: 'Patient_phone_home',
                type: 'NUMBER'
              },
              {
                label: 'Patient Mobile Phone',
                value: 'Patient_phone_mobile',
                type: 'NUMBER'
              },
              { label: 'Patient Active', value: 'Patient_active', type: 'BOOLEAN' },
              {
                label: 'Patient Birth Date',
                value: 'Patient_birthDate',
                type: 'DATE_TIME'
              },
              {
                label: 'Patient Gender',
                value: 'Patient_gender',
                type: 'STRING',
              },
              {
                label: 'Patient Deceased',
                value: 'Patient_deceasedBoolean',
                type: 'BOOLEAN'
              },
              {
                label: 'Patient Marital Satus',
                value: 'Patient_maritalStatus',
                type: 'STRING',
              },
              {
                label: 'Patient Communication',
                value: 'Patient_communication',
                type: 'STRING'
              },
              {
                label: 'Patient Home City',
                value: 'Patient_home_city',
                type: 'STRING'
              },
              {
                label: 'Patient Home State',
                value: 'Patient_home_state',
                type: 'STRING'
              },
              {
                label: 'Patient Home Country',
                value: 'Patient_home_country',
                type: 'STRING'
              },
              {
                label: 'Patient Home Postal Code',
                value: 'Patient_home_postalCode',
                type: 'STRING'
              },
              {
                label: 'Patient Work City',
                value: 'Patient_work_city',
                type: 'STRING',
              },
              {
                label: 'Patient Work State',
                value: 'Patient_work_state',
                type: 'STRING'
              },
              {
                label: 'Patient Work Country',
                value: 'Patient_work_country',
                type: 'STRING'
              },
              {
                label: 'Patient Work Postal Code',
                value: 'Patient_work_postalCode',
                type: 'STRING'
              }
            ]
            }
            surveyDetails={{
              surveyName: "CSM CSAT Feedback",
              surveyId: "1000008125",
            }}
            onSaveHandler={() => {
              setTriggerMappedFields([
                {
                  id: uuid(),
                  isEnabled: true,
                  object: "CONTACT",
                  action: "CREATED",
                  fields: triggerFields,
                  triggerDetails: triggerDetails,
                },
              ]);
              return true;
            }}
            isTriggerPage={isTriggerPage}
            token="prCCRhdN009pVksorlB977UMTH5eyc-wEkr_gOMnjUtjdLyQK86n-Ox4rrvk2h5RwPjri2mqg7y6nt7xCzKOTIvg"
            apiURL="https://api.signsparrow.com"
            objects={{
              hasObjects: true,
              isMulti: true,
              options: [
                { label: "EVENT", value: "EVENT" },
                { label: "Contact", value: "CONTACT" },
              ],
              value: null,
              onChangeHandler: (value: any) =>
                setEventConfiguration((prev: any) => ({
                  ...prev,
                  events: value,
                })),
            }}
            accounts={{
              hasAccounts: true,
              isMulti: false,
              options: [{ label: "ACCOUNT", value: "hi" }],
              value: null,
              onChangeHandler: (value: any) =>
                setEventConfiguration((prev: any) => ({
                  ...prev,
                  accounts: value,
                })),
            }}
            actions={{
              hasActions: true,
              isMulti: false,
              options: [
                { label: "Created", value: "hi" },
                { label: "Updated", value: "updated" },
              ],
              value: eventConfiguration?.actions,
              onChangeHandler: (value: any) =>
                setEventConfiguration((prev: any) => ({
                  ...prev,
                  actions: value,
                })),
            }}
          />
        }
        onDeleteHandler={(id: any) => console.log(id)}
        toggleDashboardField={(id: any) => console.log(id)}
        mappingComponent={
          <Mapping
          // hasDataTypeDropdown
          havingTypeDropdown={false}
          onSaveMappingLoader={false}
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
              surveyId: "1000008125",
            }}
            events={{
              hasEvents: true,
              options: [{ label: "EVENT", value: "hi" }],
              value: { label: "EVENT", value: "hi" },
              onChangeHandler: (value: any) => console.log("EVENT", value),
            }}
            // accounts={{
            //   hasAccounts: true,
            //   options: [{ label: "ACCOUNT", value: "hi" }],
            //   value: null,
            //   onChangeHandler: (value: any) => console.log("accounts", value)
            // }}
            actions={{
              hasActions: true,
              options: [
                { label: "ACTIONS", value: "hi" },
                { label: "SAT", value: "sal" },
              ],
              value: { label: "SAT", value: "sal" },
              onChangeHandler: (value: any) => console.log("Actions", value),
            }}
            customList={{
              hasCustomList: false,
              options: [{ label: "Property", value: "property" }],
              value: null,
              onChangeHandler: (value: any) => console.log("VALUE", value),
            }}
            oldResponse={{
              hasOldResponse: false,
              value: hasOldResponse,
              onChangeHandler: (value: any) => setHasOldresponse(value),
            }}
            onSaveHandler={() => {
              setMappingMappedFields((prev: any) => ({
                ...prev,
                fields: [
                  {
                    id: uuid(),
                    isEnabled: true,
                    fields,
                  },
                ],
              }));
              return true;
            }}
          />
        }
        // singleMappingComponent={
        //   <SingleMapping
        //     token="prCCRhdN009pVksorlB977UMTH5eyc-wEkr_gOMnjUtjdLyQK86n-Ox4rrvk2h5RwPjri2mqg7y6nt7xCzKOTIvg"
        //     apiURL="https://api.signsparrow.com"
        //     setIntegrationFields={setIntegrationFields}
        //     integrationFields={integrationFields}
        //     surveyDetails={{
        //       surveyName: "CSM CSAT Feedback",
        //       surveyId: "1000008125"
        //     }}
        //     hasPreviousMapping={isMappingPage}
        //     importResponse={{
        //       hasImportResponse: true,
        //       value: null,
        //       onChangeHandler: (value: string) => console.log(value)
        //     }}
        //     configuration={{
        //       hasConfiguration: true,
        //       configurationFields: [
        //         {
        //           id: 1,
        //           label: "Choose Account",
        //           fieldType: "select",
        //           options: [{ label: "sample", value: "another sample" }],
        //           value: null,
        //           onChangeHandler: (value: any) => console.log(value)
        //         },
        //         {
        //           id: 1,
        //           label: "saaravana Account",
        //           fieldType: "select",
        //           options: [{ label: "sample", value: "another sample" }],
        //           value: null,
        //           onChangeHandler: (value: any) => console.log(value)
        //         },
        //         {
        //           id: 2,
        //           label: "Action",
        //           fieldType: "select",
        //           options: [{ label: "newsample", value: "new sample" }],
        //           value: null,
        //           onChangeHandler: (value: any) => console.log(value)
        //         },
        //         {
        //           id: 3,
        //           label: "Create a new Spreadsheet",
        //           fieldType: "input",
        //           value: null,
        //           onChangeHandler: (value: any) => console.log(value)
        //         },
        //         {
        //           id: 4,
        //           label: "Import Old response",
        //           fieldType: "checkbox",
        //           value: null,
        //           onChangeHandler: (value: any) => console.log(value)
        //         }
        //       ],
        //       onSaveHandler: () => setIsMappingPage(true)
        //     }}
        //     isMappingPage={isMappingPage}
        //     navigateMappingPage={(value?: boolean) => {
        //       setIsMappingPage(value ?? !isMappingPage);
        //       console.log(value, "HERE");
        //     }}
        //     onSaveHandler={(fields: any) => {
        //       console.log(fields);
        //       return true;
        //     }}
        //   />
        // }
        integrationName="MS Dynamics 365"
      />
    </Flex>
  );
};
export const Default = Template.bind({});
