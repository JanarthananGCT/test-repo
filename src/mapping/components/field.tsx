import {
  Box,
  Flex,
  FormLabel,
  IconButton,
  Input,
  Select,
  Text,
} from "@sparrowengg/twigs-react";
import React, {useEffect} from "react";
import Trash from "../../commons/icons/trash";
import CustomMenu from "./custom-menu";
import { mappingType, subMenuOptions } from "../../commons/constants";
import { handleMappingOptions } from "../../commons/helpers";
import Arrow from "../../commons/icons/arrow";
import { FieldProps } from "../types";
import CustomDateMenu from "./custom-date-menu";
import CustomOption from "./custom-option";
import PlaceholderSpan from "./placeholder-span";
import { DateValue } from "@internationalized/date";

const customStyles = {
  menuList: (prevStyles: any) => ({
    ...prevStyles,
    maxHeight: 176,
  }),
};

const subMenuCustomStyles = {
  menu: (prevStyles: any) => ({
    ...prevStyles,
    width: 260,
    right: 0,
  }),
};

const Field = ({
  havingTypeDropdown,
  field,
  isFirstField,
  handleFieldValue,
  ssMappingData,
  integrationFields,
  integrationName,
  hasCustomMenuProperty,
  isBtnDisabled,
  removeField,
  showCustomPropertyModal,
}: FieldProps) => {
  useEffect(()=>{
    if(!field.integrationField){
      field.integrationField =  integrationFields.find((integrationField: any)=> integrationField.label === field?.essentialFieldLabel)
    }
  },[])
  return (
    <Flex flexDirection="column" gap="$8">
      {field?.essentialFieldLabel && (
        <Text size="sm" weight="bold">
          {field.essentialFieldLabel}
          <PlaceholderSpan color="$negative500">*</PlaceholderSpan>
        </Text>
      )}
      <Flex
        key={field.id}
        css={{
          width: "100%",
          "&:hover": {
            "& button": {
              opacity: 1,
            },
            "& #arrow path": {
              fill: "$secondary500",
            },
          },
        }}
        alignItems="center"
        gap="$6"
      >
        <Flex flexDirection="column" gap="$2" css={{ width: 144 }}>
          {(isFirstField || field.isEssentialField) && (
            <FormLabel size="xs" css={{ fontWeight: "$5" }}>
              Type
            </FormLabel>
          )}
          <Select
            placeholder="Choose"
            size="lg"
            isSearchable={false}
            value={field?.mappedType}
            options={mappingType}
            onChange={(type: any) => handleFieldValue(field?.id, "type", type)}
            styles={customStyles}
          />
        </Flex>
        <Flex alignItems="center" css={{ flex: 1 }} gap="11px">
          <Flex flexDirection="column" gap="$2" css={{ width: "100%" }}>
            {(isFirstField || field.isEssentialField) && (
              <FormLabel size="xs" css={{ fontWeight: "$5" }}>
                SurveySparrow Field
              </FormLabel>
            )}
            <Select
              size="lg"
              placeholder="Choose"
              value={field?.surveySparrowField}
              onChange={(ssField) =>
                handleFieldValue(field?.id, "surveySparrowField", ssField)
              }
              options={handleMappingOptions(
                field?.mappedType?.value ?? "QUESTION",
                ssMappingData.questions,
                ssMappingData.contactProperties,
                ssMappingData.variables,
                ssMappingData.expressions
              )}
              styles={customStyles}
            />
          </Flex>
          <Box
            as="span"
            id="arrow"
            css={{
              paddingTop: isFirstField || field.isEssentialField ? "$9" : 0,
            }}
          >
            <Arrow />
          </Box>
          <Flex flexDirection="column" gap="$2" >
            {(isFirstField || field.isEssentialField) && (
              <FormLabel size="xs" css={{ fontWeight: "$5" }}>
                {`${integrationName} Field`}
              </FormLabel>
            )}
            <Flex alignItems="center">
              <Select
                placeholder="Choose"
                size="lg"
                value={field?.integrationField ?? integrationFields.find((integrationField: any)=> integrationField.label === field?.essentialFieldLabel)}
                isDisabled={integrationFields.find((integrationField: any)=> integrationField.label === field?.essentialFieldLabel)}
                onChange={(integration: any) =>{
                  handleFieldValue(field?.id, "integrationField", integration)
                }
                }
                css={{
                  width: 260,
                  "& .twigs-select__control": {
                    borderTopRightRadius: havingTypeDropdown ? 0 : '$lg',
                    borderBottomRightRadius: havingTypeDropdown ? 0 : '$lg',
                  },
                }}
                options={integrationFields}
                styles={customStyles}
                components={{
                  ...(hasCustomMenuProperty && {
                    Menu: (props) => (
                      <CustomMenu
                        {...props}
                        customOnClick={showCustomPropertyModal}
                      />
                    ),
                  }),
                }}
              />
              {havingTypeDropdown && (
                <Select
                  css={{
                    width: 112,
                    "& .twigs-select__control": {
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      border: "$borderWidths$xs solid $neutral200",
                    },
                  }}
                  isDisabled={!field?.integrationField?.value}
                  value={field?.integrationFieldType}
                  onChange={(integration) =>
                    handleFieldValue(
                      field?.id,
                      "integrationFieldType",
                      integration
                    )
                  }
                  styles={subMenuCustomStyles}
                  options={subMenuOptions}
                  closeMenuOnSelect
                  // @ts-ignore
                  noneOptionHandler={(value) =>
                    handleFieldValue(field?.id, "integrationFieldType", value)
                  }
                  components={{ Menu: CustomMenu, Option: CustomOption }}
                  placeholder="Choose"
                  size="lg"
                />
              )}
            </Flex>
          </Flex>
          <Flex
            flexDirection="column"
            gap="$2"
            css={{ maxWidth: 180, width: "100%" }}
          >
            {(isFirstField || field.isEssentialField) && (
              <FormLabel size="xs" css={{ fontWeight: "$5" }}>
                {"Default Value (Optional)"}
              </FormLabel>
            )}
            <DefaultField
              handleFieldValue={(value: any) => {
                handleFieldValue(field?.id, "defaultValue", value);
              }}
              integrationFieldType={field?.integrationFieldType?.value ?? integrationFields.find((integrationField: any)=> integrationField.label === field?.essentialFieldLabel)?.type}
              value={field?.defaultValue?.value}
            />
          </Flex>
        </Flex>
        {!field.isEssentialField && (
          <IconButton
            css={{
              transition: "all .3s ease",
              marginTop: isFirstField ? "$11" : 0,
            }}
            size="sm"
            icon={<Trash />}
            variant="ghost"
            color="default"
            disabled={isBtnDisabled}
            onClick={removeField}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Field;

const DefaultField = ({
  integrationFieldType,
  handleFieldValue,
  value,
}: {
  integrationFieldType:  string;
  handleFieldValue: (value: any) => void;
  value: any;
}) => {
  switch (`${integrationFieldType}`) {
    case "BOOLEAN":
      return (
        <Select
          options={[
            {
              label: "true",
              value: "TRUE",
            },
            {
              label: "false",
              value: "FALSE",
            },
          ]}
          size="lg"
          value={value}
          placeholder=""
          onChange={(booleanValue) =>
            handleFieldValue({
              type: "BOOLEAN",
              value: booleanValue,
            })
          }
        />
      );
    case "DATE_TIME":
      return (
        <CustomDateMenu
          value={value}
          onChangeHandler={(dateValue: DateValue) => {
            handleFieldValue({
              type: "DATE_TIME",
              value: dateValue,
            });
          }}
        />
      );
    case "NUMBER":
      return (
        <>
        <Input
          size="lg"
          type="number"
          placeholder=""
          value={value}
          min={0}
          onChange={(e) =>
            handleFieldValue({
              type: "NUMBER",
              value: e.currentTarget.value,
            })
          }
        />
        <FormLabel size="xs" >please enter a valid number</FormLabel>
        </>
      );
    default:
      return (
        <Input
          size="lg"
          placeholder=""
          value={value}
          onChange={(e) =>
            handleFieldValue({
              type: "STRING",
              value: e.currentTarget.value,
            })
          }
        />
      );
  }
};
