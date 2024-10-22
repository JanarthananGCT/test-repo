import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Heading,
  Select,
  Text
} from "@sparrowengg/twigs-react";
import React, { useEffect, useState } from "react";
import { PlusIcon } from "@sparrowengg/twigs-react-icons";
import { defaultFieldValue, surveySparrowURL } from "../../commons/constants";
import { v4 as uuid } from "uuid";
import {
  fetchContactProperties,
  fetchSurveyQuestions,
  fetchSurveyVariables,
  fetchSurveyExpression
} from "../services";
import { MappingTypeProps, ssMappingDataResponse } from "../types";
import ImportModal from "../../commons/components/import-modal";
import { Spinner } from "../../commons/components/spinner";
import Field from "./field";
import PlaceholderSpan from "./placeholder-span";

export const Mapping = ({
  havingTypeDropdown,
  integrationName,
  surveyId,
  fields,
  setFields,
  integrationFields,
  hasCustomMenuProperty,
  setIntegrationFields,
  apiURL = surveySparrowURL,
  token,
  surveyDetails,
  customList,
  oldResponse
}: MappingTypeProps) => {
  const [ssMappingData, setSSMappingData] = useState<
    ssMappingDataResponse<any>
  >({
    questions: [],
    variables: [],
    contactProperties: [],
    expressions: []
  });
  const [showCustomPropertyModal, setShowCustomPropertyModal] = useState(false);
  const [customPropertyField, setCustomPropertyField] = useState("");
  const [loader, setLoader] = useState(true);
  const essentialFields = fields?.filter((field) => field?.isEssentialField);
  const commonFields = fields?.filter((field) => !field?.isEssentialField);

  const customHandler = (field: any, property: string, value: any) => {
    if(field?.integrationField?.dependency?.length){
      return field?.integrationField?.dependency;
    } else {
      return []
    }
  }

  const handleFieldValue = (id: string, property: string, value: any) => {
    let dependentField = [];
    dependentField = customHandler(fields.find(field => field.id === id), property, value);
    let currentFields = [ ...fields, ...dependentField ].filter((obj, index, self) =>
      index === self.findIndex(o => JSON.stringify(o) === JSON.stringify(obj))
    );
    setFields(
      currentFields?.map((field) => {
        if (field.id === id) {
          return property === "type"
            ? { ...field, surveySparrowField: null, mappedType: value, id } :
            property === "integrationFieldType" ? { ...field, defaultValue: null, [property]: value }
            : { ...field, [property]: value };
        } else {
          return { ...field };
        }
      })
    );
  };
  const hasRequiredProps = () =>
    !!fields &&
    !!setFields &&
    !!integrationFields &&
    !!setIntegrationFields &&
    !!token;

  const fetchInitalMappingData = async () => {
    setLoader(true);
    try {
      const [questions, variables, contactProperties, expressions] =
        await Promise.all([
          fetchSurveyQuestions(apiURL, surveyId, token),
          fetchSurveyVariables(apiURL, surveyId, token),
          fetchContactProperties(apiURL, token),
          fetchSurveyExpression(apiURL, surveyId, token)
        ]);
      setSSMappingData({
        questions,
        contactProperties,
        variables,
        expressions
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const getEssentailFieldsNumber = (length: number): string => {
    const numberMapping: any = {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine',
      10: 'ten'
    };
    return numberMapping[length] ?? 'These';
  }

  useEffect(() => {
    setFields(
      fields?.length === 0
        ? [{ ...defaultFieldValue }]
        : fields?.map((field) => ({ ...field, id: uuid() }))
    );
    if (!!token && token?.length > 60 && !!surveyId) {
      fetchInitalMappingData();
    } else {
      setLoader(false);
    }
  }, [token, surveyId]);

  return (
    <Flex alignItems="center" justifyContent="center">
      {hasRequiredProps() ? (
        <>
          {loader ? (
            <Flex
              alignItems="center"
              justifyContent="center"
              css={{ height: "calc(100vh - 57px)" }}
            >
              <Spinner />
            </Flex>
          ) : (
            <Box css={{ maxWidth: 1120, width: "100%", marginBlock: "$40" }}>
              <Heading
                size="h5"
                css={{ color: "$neutral900" }}
              >{`Map to ${integrationName}`}</Heading>
              <Flex gap="$2" css={{ marginTop: "$4" }}>
                <Text size="sm" css={{ color: "$neutral500" }}>
                  Survey Name:
                </Text>
                <Text size="sm"  weight={"medium"} css={{ color: "$neutral800" }}>
                  {surveyDetails.surveyName}
                </Text>
              </Flex>
              {!!essentialFields?.length && (
                <Box
                  css={{
                    width: "100%",
                    paddingBlock: "$12 $20",
                    borderBottom: "$borderWidths$xs dashed $neutral200",
                    maxWidth: 1084
                  }}
                >
                  <Text
                    size="md"
                    css={{
                      color: "$neutral500",
                      lineHeight: "$md",
                      marginTop: "$4"
                    }}
                  >
                    This connection requires{" "}
                    <PlaceholderSpan color="$neutral600">{essentialFields?.length}</PlaceholderSpan>
                    <PlaceholderSpan color="$negative500">
                      *
                    </PlaceholderSpan>{" "}
                    essential mappings
                  </Text>
                  <Flex
                    flexDirection="column"
                    gap="$20"
                    css={{ marginTop: "$12" }}
                  >
                    {essentialFields?.map((field, idx) => (
                      <Field
                      havingTypeDropdown={havingTypeDropdown}
                        key={field.id}
                        field={field}
                        integrationName={integrationName}
                        handleFieldValue={(id, property, value) =>
                          handleFieldValue(id, property, value)
                        }
                        hasCustomMenuProperty={hasCustomMenuProperty}
                        integrationFields={integrationFields}
                        isBtnDisabled={commonFields.length === 1}
                        isFirstField={idx === 0}
                        ssMappingData={ssMappingData}
                        showCustomPropertyModal={() => {
                          setShowCustomPropertyModal(true);
                        }}
                      />
                    ))}
                  </Flex>
                </Box>
              )}
              <Flex flexDirection="column" gap="$16" css={{ marginTop: "$16" }}>
                {commonFields?.map((field, idx) => {
                  return (
                    <Field
                    havingTypeDropdown={havingTypeDropdown}
                      key={field.id}
                      field={field}
                      integrationName={integrationName}
                      removeField={() => {
                        setFields((prev) =>
                          prev.filter(
                            (currentField) => currentField.id !== field.id
                          )
                        );
                      }}
                      handleFieldValue={(id, property, value) =>
                        handleFieldValue(id, property, value)
                      }
                      hasCustomMenuProperty={hasCustomMenuProperty}
                      integrationFields={integrationFields}       
                      isBtnDisabled={false}                      
                      isFirstField={idx === 0}
                      ssMappingData={ssMappingData}
                      showCustomPropertyModal={() => {
                        setShowCustomPropertyModal(true);
                      }}
                    />
                  );
                })}
              </Flex>
                <Button
                  leftIcon={<PlusIcon />}
                  color="default"
                  css={{ marginTop: "$10" }}
                  onClick={() =>
                    setFields([
                      ...fields,
                      {
                        ...defaultFieldValue,
                        id: uuid()
                      }
                    ])
                  }
                  size="md"
                >
                  New mapping field
                </Button>
              {customList?.hasCustomList && (
                <Flex
                  css={{ marginTop: "$40" }}
                  flexDirection="column"
                  gap="$8"
                >
                  <Flex flexDirection="column" gap="$3">
                    <Heading size="h5">Choose a List</Heading>
                    <Text css={{ color: "$neutral500" }} size="sm">
                      Pick a list to save mapped fields; If not, they'll be
                      saved under all profiles.
                    </Text>
                  </Flex>
                  <Select
                    css={{ maxWidth: 400, width: "100%" }}
                    size="lg"
                    options={customList.options}
                    value={customList.value}
                    placeholder=""
                    onChange={(value) => customList.onChangeHandler(value)}
                  />
                </Flex>
              )}
              {/* Old Response */}
              {oldResponse?.hasOldResponse && (
                <Checkbox
                  onChange={(value) => oldResponse.onChangeHandler(value)}
                  css={{ marginBlock: "$8", cursor: "pointer" }}
                  checked={oldResponse.value as boolean}
                >
                  <FormLabel size="sm">Import Old Response</FormLabel>
                </Checkbox>
              )}
              {showCustomPropertyModal && (
                <ImportModal
                  onCloseHandler={() => setShowCustomPropertyModal(false)}
                  onInputHandler={(value) => setCustomPropertyField(value)}
                  onSaveHandler={() => {
                    setIntegrationFields &&
                      setIntegrationFields((prev) => [
                        ...prev,
                        {
                          label: customPropertyField,
                          value: customPropertyField
                        }
                      ]);
                    setShowCustomPropertyModal(false);
                  }}
                />
              )}
            </Box>
          )}
        </>
      ) : (
        <Flex
          alignItems="center"
          justifyContent="center"
          css={{ height: "100%" }}
        >
          <Heading size="h4" weight="bold">
            Provide the needed props to import Mapping Template
          </Heading>
        </Flex>
      )}
    </Flex>
  );
};
