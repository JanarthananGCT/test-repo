import { v4 as uuid } from "uuid";

export const surveySparrowURL = "https://api.surveysparrow.com";

export const mappingType = [
  {
    id: 1,
    label: "Question",
    value: "QUESTION"
  },
  {
    id: 2,
    label: "Contact",
    value: "CONTACT"
  },
  {
    id: 3,
    label: "Variable",
    value: "VARIABLE"
  },
  {
    id: 4,
    label: "Expression",
    value: "EXPRESSION"
  }
];

export const defaultFieldValue = {
  id: uuid(),
  surveySparrowField: null,
  integrationField: null,
  integrationFieldType: null,
  isEssentialField: false,
  mappedType: mappingType[0],
  defaultValue: null
};

export const sampleIntegrationMappingFields = [
  {
    id: 1,
    label: "Email",
    value: "email",
    type: "email"
  },
  {
    id: 2,
    label: "Phone Number",
    value: "phone_number",
    type: "NUMBER"
  },
  {
    id: 3,
    label: "First Name",
    value: "first_name",
    type: "string"
  },
  {
    id: 4,
    label: "Organization",
    value: "organization",
    type: "string"
  },
  {
    id: 5,
    label: "Title",
    value: "title",
    type: "string"
  },
  {
    id: 6,
    label: "External Id",
    value: "external_id",
    type: "string",
    dependency: [
      {
        ...defaultFieldValue,
        isEssentialField: true,
        essentialFieldLabel: 'Tittle',
        id: 5,
        label: "Title",
        value: "title",
        type: "string"
      },
      {
        ...defaultFieldValue,
        id: 8,
        label: "Image",
        value: "image",
        type: "string"
      },
    ]
  },
  {
    id: 7,
    label: "Last Name",
    value: "last_name",
    type: "string"
  },
  {
    id: 8,
    label: "Image",
    value: "image",
    type: "string"
  },
  {
    id: 9,
    label: "Address1",
    value: "address1",
    type: "string"
  },
  {
    id: 10,
    label: "Address2",
    value: "address2",
    type: "string"
  },
  {
    id: 11,
    label: "City",
    value: "city",
    type: "string"
  },
  {
    id: 12,
    label: "Country",
    value: "country",
    type: "string"
  },
  {
    id: 13,
    label: "Latitude",
    value: "latitude",
    type: "string"
  },
  {
    id: 14,
    label: "Longitude",
    value: "longitude",
    type: "string"
  },
  {
    id: 15,
    label: "Region",
    value: "region",
    type: "string"
  },
  {
    id: 16,
    label: "Zip Code",
    value: "zip",
    type: "string"
  },
  {
    id: 17,
    label: "Time Zone",
    value: "timezone",
    type: "string"
  },
  {
    id: 18,
    label: "IP Address",
    value: "ip",
    type: "string"
  }
];

export const sampleFields = [
  {
    surveySparrowField: null,
    integrationField: null,
    isEssentialField: false,
    mappedType: { label: "Question", value: "QUESTION" }
  },
  {
    id: uuid(),
    surveySparrowField: null,
    integrationField: null,
    isEssentialField: true,
    mappedType: { label: "Question", value: "QUESTION" }
  }
];
export const sampleIntegrationFields = [
  {
    id: 1,
    label: "Email",
    value: "email",
    type: "email"
  }
];

export const mappingTabValues = [
  {
    id: 1,
    name: "Questions",
    value: "QUESTIONS",
    placeholder: "questions"
  },
  {
    id: 2,
    name: "Variable",
    value: "VARIABLE",
    placeholder: "variables"
  },
  {
    id: 3,
    name: "Contact",
    value: "CONTACT",
    placeholder: "contactProperties"
  },
  {
    id: 4,
    name: "Expression",
    value: "EXPRESSION",
    placeholder: "expressions"
  },
  {
    id: 5,
    name: "Property",
    value: "PROPERTY",
    placeholder: "property"
  }
];

export const mappingPropertyValues = [
  {
    name: "Select all Properties",
    id: "ALL",
    isEnabled: false
  },
  {
    name: "Started Time",
    id: "STARTED_TIME",
    isEnabled: false
  },
  {
    name: "Submitted Time",
    id: "SUBMITTED_TIME",
    isEnabled: false
  },
  {
    name: "CompletionStatus",
    id: "COMPLETION_STATUS",
    isEnabled: false
  },
  {
    name: "IP Address",
    id: "IP_ADDRESS",
    isEnabled: false
  },
  {
    name: "Location",
    id: "LOCATION",
    isEnabled: false
  },
  {
    name: "DMS (Lat, Long)",
    id: "DMS",
    isEnabled: false
  },
  {
    name: "Channel Type",
    id: "CHANNEL_TYPE",
    isEnabled: false
  },
  {
    name: "Channel Name",
    id: "CHANNEL_NAME",
    isEnabled: false
  },
  {
    name: "Device ID",
    id: "DEVICE_ID",
    isEnabled: false
  },
  {
    name: "Device Name",
    id: "DEVICE_NAME",
    isEnabled: false
  },
  {
    name: "Browser",
    id: "BROWSER",
    isEnabled: false
  },
  {
    name: "OS",
    id: "OS",
    isEnabled: false
  },
  {
    name: "Submission Id",
    id: "SUBMISSION_ID",
    isEnabled: false
  },
  {
    name: "Time Zone",
    id: "TIME_ZONE",
    isEnabled: false
  },
  {
    name: "Device Type",
    id: "DEVICE_TYPE",
    isEnabled: false
  },
  {
    name: "Browser Language",
    id: "BROWSER_LANGUAGE",
    isEnabled: false
  },
  {
    name: "Tags",
    id: "TAGS",
    isEnabled: false
  },
  {
    name: "Language Name",
    id: "LANGUAGE_NAME",
    isEnabled: false
  }
];

export const subMenuOptions = [
  {
    id: 1,
    label: "String",
    subLabel: "Textual Data. (Eg: Hello World, 1234)",
    value: "STRING"
  },
  {
    id: 2,
    label: "Number",
    subLabel: "Numeric Value. (Eg: 123, -45, 0)",
    value: "NUMBER"
  },
  {
    id: 3,
    label: "Boolean",
    subLabel: "True or False",
    value: "BOOLEAN"
  },
  {
    id: 4,
    label: "Date/Time",
    subLabel: "Timestamp or Calendar Information",
    value: "DATE_TIME"
  }
];

export const operatorOptions = [
  {
    id: 1,
    label: "is equals to",
    value: "IS"
  },
  {
    id: 2,
    label: "is not equals to",
    value: "IS_NOT"
  },
  {
    id: 3,
    label: "contains",
    value: "CONTAINS"
  },
  {
    id: 4,
    label: "not contains",
    value: "CONTAINS_NOT"
  },
  {
    id: 5,
    label: "has no value",
    value: "NO_VALUE"
  },
  {
    id: 6,
    label: "before",
    value: "BEFORE",
    isDateOnly: true
  },
  {
    id: 7,
    label: "after",
    value: "AFTER",
    isDateOnly: true
  },
  {
    id: 8,
    label: "on",
    value: "ON",
    isDateOnly: true
  },
  {
    id: 9,
    label: "has any value",
    value: "ANY_VALUE",
  }
];

export const booleanOptions = [
  {
    id: 1,
    label: "True",
    value: "TRUE"
  },
  {
    id: 2,
    label: "False",
    value: "FALSE"
  }
];
