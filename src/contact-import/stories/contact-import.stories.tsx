import React, { useState } from "react";
import { ContactImport } from "..";
import { Flex } from "@sparrowengg/twigs-react";

export default {
  component: ContactImport,
  title: "Layout/ContactImport",
  args: {},
  argTypes: {}
};

const Template = (args: any) => {
  const [contactImportField, setContactImportField] = useState({
    configure: {},
    fields: [
      {
        id: 0,
        integrationField: "email",
        surveySparrowField: "email",
        sampleData: [
          "richmond49@hotmail.com",
          "myrtle.roob@gmail.com",
          "emely.watsica@gmail.com"
        ]
      },
      {
        id: 1,
        integrationField: "phone_number",
        surveySparrowField: "mobile",
        sampleData: ["+1 202 7490714", "+91-7611223344", "+1 202 5498633"]
      },
      {
        id: 2,
        integrationField: "external_id",
        surveySparrowField: null,
        sampleData: ["TSHMV5W", "DW65ZNR", "JG09KBM"]
      },
      {
        id: 3,
        integrationField: "anonymous_id",
        surveySparrowField: null,
        sampleData: ["xyz789ghi012", "789xyz012ghi", "667tgf266huu"]
      },
      {
        id: 4,
        integrationField: "first_name",
        surveySparrowField: "firstName",
        sampleData: ["Richmond", "Myrtle", "Emely"]
      },
      {
        id: 5,
        integrationField: "last_name",
        surveySparrowField: "lastName",
        sampleData: ["Hyatt", "Roob", "Lynch"]
      },
      {
        id: 6,
        integrationField: "organization",
        surveySparrowField: null,
        sampleData: ["Org1", "Org2", "ABC"]
      },
      {
        id: 7,
        integrationField: "title",
        surveySparrowField: null,
        sampleData: ["Mr.", "Mr.", "Ms."]
      },
      {
        id: 8,
        integrationField: "image",
        surveySparrowField: null,
        sampleData: [
          "https://static.surveysparrow.com/application/eui/production/391448/1705044921561__e842a09cc64e545aa03a77388b9b3eddcd11190953ee51fc__Screenshot2023-06-06at2.44.43PM.png",
          "https://static.surveysparrow.com/application/eui/production/391448/1705044921561__e842a09cc64e545aa03a77388b9b3eddcd11190953ee51fc__Screenshot2023-06-06at2.44.43PM.png",
          "https://static.surveysparrow.com/application/eui/production/391448/1705044921561__e842a09cc64e545aa03a77388b9b3eddcd11190953ee51fc__Screenshot2023-06-06at2.44.43PM.png"
        ]
      },
      {
        id: 9,
        integrationField: "address1",
        surveySparrowField: null,
        sampleData: ["143, North Avenue", "10D, Great Valley", "12F, San Jose"]
      },
      {
        id: 10,
        integrationField: "address2",
        surveySparrowField: null,
        sampleData: ["Baker's Street", "Gulmohar Park", "Santa Rosa"]
      },
      {
        id: 11,
        integrationField: "city",
        surveySparrowField: null,
        sampleData: ["Baltimore", "New Delhi", "California"]
      },
      {
        id: 12,
        integrationField: "country",
        surveySparrowField: null,
        sampleData: ["United States", "India", "United States"]
      },
      {
        id: 13,
        integrationField: "latitude",
        surveySparrowField: null,
        sampleData: ["39.2904° N", "42.3601° N", "36.7783° N"]
      },
      {
        id: 14,
        integrationField: "longitude",
        surveySparrowField: null,
        sampleData: ["76.6122° W", "71.0589° W", "119.4179° W"]
      },
      {
        id: 15,
        integrationField: "region",
        surveySparrowField: null,
        sampleData: ["Owing Mills", "Noida", "West Coast"]
      },
      {
        id: 16,
        integrationField: "zip",
        surveySparrowField: null,
        sampleData: ["21117", "110025", "90011"]
      },
      {
        id: 17,
        integrationField: "timezone",
        surveySparrowField: null,
        sampleData: ["USA (GMT-5)", "Delhi (GMT+5:30)", "USA (GMT-4)"]
      },
      {
        id: 18,
        integrationField: "ip",
        surveySparrowField: null,
        sampleData: ["142.246.2.26", "253.243.34.53", "110.68.121.91"]
      }
    ]
  });
  const [isContactMappingPage, setIsContactMappingPage] = useState(false);
  const contactProperties = [
    {
      id: 1000454324,
      name: "createddate",
      label: "Created Date",
      type: "DATE",
      description: "Date on which contact has been added.",
      contact_property_group_id: null,
      created_at: "2024-07-23T04:14:09.223Z",
      contact_type_id: 1,
      group_id: null,
      group_name: null,
      group_label: null,
      group_description: null,
      group_created_at: null,
      group_updated_at: null,
      group_deleted_at: null,
      group_account_id: null,
      group_user_id: null
    },
    {
      id: 1000454325,
      name: "department_internal",
      label: "Department",
      type: "DEPENDENT_FIELD",
      description: "Department of the employee",
      contact_property_group_id: null,
      created_at: "2024-07-23T04:14:09.423Z",
      contact_type_id: 3,
      group_id: null,
      group_name: null,
      group_label: null,
      group_description: null,
      group_created_at: null,
      group_updated_at: null,
      group_deleted_at: null,
      group_account_id: null,
      group_user_id: null
    },
    {
      id: 1000454326,
      name: "team_internal",
      label: "Team",
      type: "DEPENDENT_FIELD",
      description: "Team of the employee",
      contact_property_group_id: null,
      created_at: "2024-07-23T04:14:09.429Z",
      contact_type_id: 3,
      group_id: null,
      group_name: null,
      group_label: null,
      group_description: null,
      group_created_at: null,
      group_updated_at: null,
      group_deleted_at: null,
      group_account_id: null,
      group_user_id: null
    },
    {
      name: "fullName",
      label: "Full Name",
      type: "SINGLE_LINE_TEXT",
      description: "Name of the contact",
      is_default: true
    },
    {
      name: "firstName",
      label: "First Name",
      type: "SINGLE_LINE_TEXT",
      description: "First name of the contact",
      is_default: true
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "SINGLE_LINE_TEXT",
      description: "Last name of the contact",
      is_default: true
    },
    {
      name: "email",
      label: "Email",
      type: "EMAIL",
      description: "Email address of the contact",
      is_default: true
    },
    {
      name: "phone",
      label: "Phone",
      type: "SINGLE_LINE_TEXT",
      description: "Phone number of the contact",
      is_default: true
    },
    {
      name: "mobile",
      label: "Mobile",
      type: "SINGLE_LINE_TEXT",
      description: "Mobile number of the contact",
      is_default: true
    },
    {
      name: "jobTitle",
      label: "Job Title",
      type: "SINGLE_LINE_TEXT",
      description: "Designation of the contact",
      is_default: true
    },
    {
      name: "language",
      label: "Language",
      type: "DROPDOWN",
      description: "Language of the contact",
      is_default: true
    }
  ];
  const options = [
    {
      id: 1,
      label: "klaviyo",
      value: "sample"
    },
    {
      id: 2,
      label: "New Klaviyo",
      value: "new klaviyo"
    }
  ];

  return (
    <Flex alignItems="center" justifyContent="center">
      <ContactImport
        previousMappingHandler={() => {}}
        isContactMappingPage={isContactMappingPage}
        navigateMappingPage={(value?: boolean) =>
          setIsContactMappingPage(value ?? !isContactMappingPage)
        }
        contactImportField={contactImportField}
        setContactImportField={setContactImportField}
        listSegmentOptions={options}
        integrationName="Klaviyo"
        onSaveHandler={() => console.log("HI")}
        invitePortal={{
          hasInvitePortal: true,
          value: null,
          onChangeHandler: (value: any) => console.log(value)
        }}
        contactProperties={contactProperties?.map((contact) => ({
          ...contact,
          label: contact.label,
          value: contact.name
        }))}
      />
    </Flex>
  );
};
export const Default = Template.bind({});
