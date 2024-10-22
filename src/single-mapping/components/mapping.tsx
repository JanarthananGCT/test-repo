import {
  Box,
  Checkbox,
  Chip,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text
} from "@sparrowengg/twigs-react";
import React, { useEffect, useState } from "react";
import {
  surveySparrowURL,
  mappingTabValues,
  mappingPropertyValues
} from "../../commons/constants";
import { Spinner } from "../../commons/components/spinner";
import {
  fetchSurveyQuestions,
  fetchSurveyVariables,
  fetchContactProperties,
  fetchSurveyExpression
} from "../../mapping/services";
import { SearchIcon } from "@sparrowengg/twigs-react-icons";

const Mapping = ({
  surveyId,
  apiURL = surveySparrowURL,
  token,
  importResponse,
  ssMappingData,
  setSSMappingData,
  editField,
}: any) => {
  const [loader, setLoader] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const modifiedMappingData = (mappingData: any, commonLabel: string) => {
    const fields = mappingData.map((data: any) => ({
      id: data.id ?? data.name,
      name: data.rtxt ?? data.name,
      isEnabled: false
    }));
    fields.unshift({ id: "ALL", name: commonLabel, isEnabled: false });
    return fields;
  };

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
        questions: modifiedMappingData(questions, "Select all Questions"),
        contactProperties: modifiedMappingData(
          contactProperties,
          "Select all Contact Properties"
        ),
        variables: modifiedMappingData(variables, "Select all Variables"),
        expressions: modifiedMappingData(expressions, "Select all Expressions"),
        property: mappingPropertyValues
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const handleFieldValues = (
    type: string,
    id: string | number,
    value: boolean
  ) => {
    if (id === "ALL") {
      setSSMappingData((prev: any) => ({
        ...prev,
        [type]: prev[type]?.map((mapping: any) => {
          return { ...mapping, isEnabled: value };
        })
      }));
    } else {
      let modifiedMappedField = ssMappingData[type]?.map((mapping: any) => {
        if (mapping.id === id) {
          return { ...mapping, isEnabled: value };
        }
        return { ...mapping };
      });
      if (
        modifiedMappedField
          .filter((field: any) => field.id !== "ALL")
          .every((field: any) => field.isEnabled)
      ) {
        modifiedMappedField = modifiedMappedField.map((field: any) => ({
          ...field,
          isEnabled: true
        }));
      } else {
        modifiedMappedField = modifiedMappedField.map((field: any) => {
          if (field.id === "ALL") {
            return { ...field, isEnabled: false };
          }
          return field;
        });
      }

      const mappedFields = {
        ...ssMappingData,
        [type]: modifiedMappedField
      };
      setSSMappingData(mappedFields);
    }
  };

  const getMappingCount = (mappingField: any) => {
    let count = 0;
    const mappedField = ssMappingData[mappingField];
    mappedField?.forEach((field: any) => {
      if (field.isEnabled) count += 1;
    });
    return count;
  };

  useEffect(() => {
    if (!!token && token?.length > 60 && !!surveyId && !editField.id) {
      fetchInitalMappingData();
    } else if (!!editField?.id) {
      const { fieldValues } = editField;
      setSSMappingData({
        questions: fieldValues.questions,
        variables: fieldValues.variables,
        contactProperties: fieldValues.contactProperties,
        expressions: fieldValues.expressions,
        property: fieldValues.property
      });
      setLoader(false);
    } else {
      setLoader(false);
    }
  }, [token, surveyId]);

  return (
    <Flex alignItems="center" justifyContent="center">
      {loader ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          css={{ height: "calc(100vh - 57px)" }}
        >
          <Spinner />
        </Flex>
      ) : (
        <Box css={{ maxWidth: 600, width: "100%", marginBlock: "$40" }}>
          {importResponse?.hasImportResponse ? (
            <Flex flexDirection="column">
              <Heading size="h5">Select Import Data</Heading>
              <RadioGroup
                defaultValue={importResponse.value}
                onChange={(value) => importResponse.onChangeHandler(value)}
              >
                <Flex
                  alignItems="center"
                  gap="$20"
                  css={{
                    marginTop: "$12",
                    "& label": { color: "$neutral800" }
                  }}
                >
                  <Radio size="md" value="SELECTED_DATA">
                    Send selected data
                  </Radio>
                  <Radio size="md" value="SEND_ALL_DATA">
                    Send all data
                  </Radio>
                </Flex>
              </RadioGroup>
            </Flex>
          ) : null}
          <Box css={{ marginTop: "$20" }}>
            <Tabs defaultValue="QUESTIONS">
              <TabsList
                css={{
                  borderBottom: "$borderWidths$xs solid $neutral200"
                }}
              >
                {mappingTabValues.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.value}
                    onClick={() => setSearchInput("")}
                  >
                    {tab.name}
                    {!!getMappingCount(tab.placeholder) && (
                      <Chip css={{ marginLeft: "$2" }} variant="outline">
                        {getMappingCount(tab.placeholder)}
                      </Chip>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContentComponent
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                value="QUESTIONS"
                placeholder="Questions"
                fields={ssMappingData.questions}
                handleFieldValues={(field: any, value: boolean) =>
                  handleFieldValues("questions", field.id, value)
                }
              />
              <TabsContentComponent
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                fields={ssMappingData.variables}
                value="VARIABLE"
                placeholder="Variables"
                handleFieldValues={(field: any, value: boolean) =>
                  handleFieldValues("variables", field.id, value)
                }
              />
              <TabsContentComponent
                fields={ssMappingData.contactProperties}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                value="CONTACT"
                placeholder="Contacts"
                handleFieldValues={(field, value) =>
                  handleFieldValues("contactProperties", field.id, value)
                }
              />
              <TabsContentComponent
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                value="EXPRESSION"
                placeholder="Expressions"
                fields={ssMappingData.expressions}
                handleFieldValues={(field, value) =>
                  handleFieldValues("expressions", field.id, value)
                }
              />
              <TabsContentComponent
                value="PROPERTY"
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                placeholder="Properties"
                fields={ssMappingData.property}
                handleFieldValues={(field: any, value: boolean) =>
                  handleFieldValues("property", field.id, value)
                }
              />
            </Tabs>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default Mapping;

const TabsContentComponent = ({
  value,
  searchInput,
  setSearchInput,
  fields,
  handleFieldValues,
  placeholder
}: {
  value: string;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  fields: any;
  handleFieldValues: (field: any, value: boolean) => void;
  placeholder: string;
}) => {
  const mappingFields =
    fields &&
    fields.filter((field: any) =>
      field.name?.toLowerCase().includes(searchInput.toLowerCase())
    );

  return (
    <TabsContent value={value} css={{ padding: 0, position: "relative" }}>
      <Input
        leftIcon={<SearchIcon />}
        variant="filled"
        placeholder={`Search ${placeholder}`}
        size="lg"
        css={{ marginTop: "$8" }}
        value={searchInput}
        onChange={(event) => setSearchInput(event.currentTarget.value)}
      />
      <Flex
        css={{
          padding: "$12 $4 $32 $4",
          height: "calc(100vh - 408px)",
          overflow: "auto",
          "& label": {
            lineHeight: "$sm"
          }
        }}
        flexDirection="column"
        gap="$6"
      >
        {!!mappingFields.length ? (
          <>
            {mappingFields.map((field: any) => (
              <Checkbox
                size="sm"
                checked={field.isEnabled}
                onChange={(value) => handleFieldValues(field, value as boolean)}
              >
                {field.name}
              </Checkbox>
            ))}
          </>
        ) : (
          <Flex
            alignItems="center"
            justifyContent="center"
            css={{ marginTop: "$40" }}
          >
            <Text size="sm">{`No ${placeholder} available for this survey`}</Text>
          </Flex>
        )}
      </Flex>
      <Box
        css={{
          position: "absolute",
          top: "88%",
          height: "$25",
          width: "100%",
          background:
            "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0))"
        }}
      />
    </TabsContent>
  );
};
