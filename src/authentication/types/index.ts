export type AuthenticationFieldsProps = {
  id: string | number;
  type: string;
  label: string;
  value: any;
  changeFieldValue: (value: any, fieldId?: number | string) => void;
  options?: Array<{ label: string; value: string | number }>;
  placeholder?: string;
  isPassword?: boolean;
  required?: boolean;
};

export type AuthenticationProps = {
  integrationName: string;
  fields: Array<AuthenticationFieldsProps>;
  onSuccessHandler: () => void;
};