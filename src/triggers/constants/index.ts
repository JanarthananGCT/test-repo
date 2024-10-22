export const comparatorConstants = {
  IS: "IS",
  IS_NOT: "IS_NOT",
  CONTAINS: "CONTAINS",
  CONTAINS_NOT: "CONTAINS_NOT",
  NO_VALUE: "NO_VALUE",
  ANY_VALUE: "ANY_VALUE",
  TRUE: "TRUE",
  FALSE: "FALSE",
  AFTER: "AFTER",
  BEFORE: "BEFORE",
  ON: 'ON'
};

export const topLevelCondition = [
  {
    label: "all",
    value: "AND"
  },
  {
    label: "any",
    value: "OR"
  }
];

export const fieldOptions = [
  {
    id: 1,
    label: "Date of Birth",
    value: "DOB"
  },
  {
    id: 2,
    label: "Degree",
    value: "DEGREE"
  },
  {
    id: 3,
    label: "Company Size",
    value: "COMPANY_SIZE",
    type: "STRING",
    options: [
      {
        label: "Some Value",
        value: "value",
        id: 1
      },
      {
        label: "Some Text",
        value: "Text",
        id: 2
      },
      {
        label: "Some Description",
        value: "Description",
        id: 3
      },
    ],
  },
  {
    id: 4,
    type: "NUMBER",
    label: "Field of study",
    value: "STUDY"
  },
  {
    id: 5,
    label: "Gender",
    value: "GENDER"
  },
  {
    id: 6,
    label: "Buying role",
    value: "ROLE"
  },
  {
    id: 7,
    label: "Sample test",
    value: "SAMPLE"
  }
];
