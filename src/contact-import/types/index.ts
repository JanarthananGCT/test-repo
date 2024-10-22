export type ContactImportFieldType = {
  configure: {};
  fields: Array<{
    id: string | number;
    integrationField: string | number | null;
    surveySparrowField: string | number | null;
    sampleData: Array<string>;
  }>;
};

export type ContactImportProps = {
  hasPreviousMapping?: boolean;
  previousMappingHandler: (value?: boolean) => void;
  onSaveHandler: () => void;
  isContactMappingPage: boolean;
  navigateMappingPage: (value?: boolean) => void;
  contactImportField: ContactImportFieldType;
  setContactImportField: React.Dispatch<React.SetStateAction<any>>;
  listSegmentOptions: Array<{
    id: number | string;
    label: string;
    value: string
  }>;
  integrationName: string;
  contactProperties: any;
  invitePortal: {
    hasInvitePortal: boolean,
    value: any,
    onChangeHandler: (value: any) => void;
  }
};


export type ContactImportHeaderProps = {
  hasPreviousMapping?: boolean;
  previousMappingHandler: (value?: boolean) => void;
  onSaveHandler: () => void;
  isContactMappingPage: boolean;
  navigateMappingPage: (value?: boolean) => void;
  contactImportField: ContactImportFieldType;
  invitePortal: {
    hasInvitePortal: boolean,
    value: any,
    onChangeHandler: (value: any) => void;
  }
}