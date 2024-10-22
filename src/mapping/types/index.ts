export type FieldType = {
  id: string;
  surveySparrowField: { label: string; value: string } | null;
  integrationField: { label: string; value: string, type: string } | null;
  integrationFieldType: { label: string; value: string } | null;
  isEssentialField: boolean;
  essentialFieldLabel?: string;
  mappedType: { label: string; value: string };
  defaultValue?: any;
  dependency: any;
};


export type CommonFieldTypes = {
  options?: Array<{ label: string; value: string }>;
  value: { label: string; value: string } | null | boolean;
  onChangeHandler: (value: any) => void;
};

export type EventFieldType = {
  hasEvents: boolean;
} & CommonFieldTypes;

export type AccountsFieldType = {
  hasAccounts: boolean;
} & CommonFieldTypes;

export type ActionsFieldType = {
  hasActions: boolean;
} & CommonFieldTypes;

export type CustomListFieldType = {
  hasCustomList: boolean;
} & CommonFieldTypes;

export type OldResponseFieldType = {
  hasOldResponse: boolean;
} & Omit<CommonFieldTypes, 'options'>;

export type IntegrationFieldType = {
  id: number;
  label: string;
  value: string;
  type: string;
};

export type MappingTypeProps = {
  havingTypeDropdown: boolean;
  integrationName: string;
  surveyDetails: { surveyName: string; surveyId: string | number };
  surveyId: number | string;
  fields: Array<FieldType>;
  setFields: React.Dispatch<React.SetStateAction<Array<FieldType>>>;
  integrationFields: Array<any>;
  hasCustomMenuProperty?: boolean;
  setIntegrationFields?: React.Dispatch<React.SetStateAction<Array<any>>>;
  apiURL?: string;
  token: string;
  customList: CustomListFieldType;
  oldResponse: OldResponseFieldType;
};

export interface ssMappingDataResponse<T> {
  questions: Array<T>;
  variables: Array<T>;
  contactProperties: Array<T>;
  expressions: Array<T>;
  property?: Array<T>;
}

export interface CustomMenuProps {
  children: React.ReactNode;
  customOnClick?: () => void;
}

export type ResponseType = {
  data: [];
  has_next_page: boolean;
};

export type ImportModalProps = {
  onCloseHandler: () => void;
  onInputHandler: (value: string) => void;
  onSaveHandler: () => void;
};

export type ResultGroupDataOptionsType = {
  label: string;
  parentQuestionId: number;
  type: string;
  value: string;
};

export type ResultGroupDataType = {
  label: string;
  options: Array<ResultGroupDataOptionsType>;
};

export type FieldProps = {
  havingTypeDropdown: boolean;
  field: FieldType;
  isFirstField: boolean;
  handleFieldValue: (id: string, property: string, value: any) => void;
  ssMappingData: ssMappingDataResponse<any>;
  integrationFields: any;
  integrationName: string;
  hasCustomMenuProperty?: boolean;
  isBtnDisabled: boolean;
  removeField?: () => void;
  showCustomPropertyModal: () => void;
};
