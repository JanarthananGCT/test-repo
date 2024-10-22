import {
  Box,
  Button,
  Flex,
  FormInput,
  FormLabel,
  Heading,
  IconButton,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@sparrowengg/twigs-react";
import { DeleteIcon, PlusIcon } from "@sparrowengg/twigs-react-icons";
import React, { useEffect, useRef } from "react";
const defaultFieldValue = {
  integrationField: null,
  surveySparrowField: "",
  property: "custom"
};

const ContactImportMapping = ({
  contactImportField,
  setContactImportField,
  integrationName,
  contactProperties,
}: any) => {
  const customPropertyRef = useRef<HTMLDivElement | null>(null);
  const initialRenderRef = useRef(true);
  const errorFieldRef = useRef(false);

  useEffect(() => {
    if (initialRenderRef.current) {
      //to skip scroll on initial mounting
      initialRenderRef.current = false;
    } else {
      if (customPropertyRef?.current) {
        customPropertyRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end"
        });
      }
    }
  }, []);

  const customFieldHandler = (
    id: string | number,
    property: string,
    value: any
  ) => {
    setContactImportField({
      ...contactImportField,
      fields: contactImportField.fields.map((field: any) => {
        if (field.id === id) {
          return { ...field, [property]: value };
        } else {
          return { ...field };
        }
      })
    });
  };

  const updateSurveySparrowField = (
    value: any,
    id: string | number,
    manuallyMapped: boolean
  ) => {
    setContactImportField({
      ...contactImportField,
      fields: contactImportField?.fields.map((field: any) => {
        if (field.id === id) {
          return {
            ...field,
            surveySparrowField: value,
            ...(manuallyMapped && { mapped: manuallyMapped })
          };
        } else {
          return { ...field };
        }
      })
    });
  };

  const addCustomProperty = () => {
    setContactImportField({
      ...contactImportField,
      fields: [
        ...contactImportField.fields,
        {
          id: contactImportField.fields?.length
            ? contactImportField.fields[contactImportField.fields?.length - 1]
                .id + 1
            : 1,
          ...defaultFieldValue
        }
      ]
    });
  };

  return (
    <Flex justifyContent="center">
      <Box css={{ marginTop: "$40", maxWidth: 1176, width: "100%" }}>
        <Box
          css={{
            paddingLeft: "$28"
          }}
        >
          <Heading size="h5">Map Contact Properties</Heading>
          <Text css={{ marginTop: "$4", color: "$neutral600" }} size="md">
            Review these mappings before importing. Unmapped columns will be
            ignored.
          </Text>
        </Box>
        <Box
          css={{
            height: "calc(100vh - 241px)",
            paddingTop: "$16",
            overflowY: "auto",
            position: "relative",
            background: "$white900",
            paddingLeft: "$28"
          }}
        >
          <Table
            css={{
              width: "100%",
              background: "$white900",
              borderRadius: "5px",
              borderCollapse: "collapse"
            }}
          >
            <Thead
              css={{
                zIndex: 5,
                position: "sticky",
                top: "-31px",
                "& th": {
                  textAlign: "left",
                  fontWeight: 700,
                  paddingBlock: "$6",
                  lineHeight: "$sm",
                  background: "$white900",
                  boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
                  borderBlock: "$borderWidths$xs solid $neutral200",
                }
              }}
            >
              <Th>{`${integrationName} Profile Fields Data`}</Th>
              <Th css={{ borderLeft: "$borderWidths$xs solid $neutral100" }}>SurveySparrow Mapping</Th>
            </Thead>
            <Tbody
              css={{
                "& tr": {
                  borderBottom: "$borderWidths$xs solid $neutral200"
                }
              }}
            >
              {contactImportField.fields.map((field: any) => {
                const hasSurveyFieldValue = contactProperties.some(
                  (contact: any) => contact.value === field.surveySparrowField
                );
                return (
                  <Tr
                    key={field.id}
                    css={{
                      position: "relative",
                      "& td": {
                        paddingBlock: "$8 $12",
                        paddingInline: "$6",
                        verticalAlign: "top"
                      }
                    }}
                  >
                    <Td
                      css={{
                        width: 560,
                        "& > p": {
                          lineHeight: "$sm",
                          color: "$neutral600"
                        }
                      }}
                    >
                      {field.property !== "custom" ? (
                        <>
                          <Text
                            size="sm"
                            css={{
                              color: "$neutral900 !important"
                            }}
                            weight="medium"
                          >
                            {(
                              field?.integrationField?.charAt(0).toUpperCase() +
                              field?.integrationField.slice(1)
                            ).replace("_", " ")}
                          </Text>
                          {field?.sampleData.length ? (
                            <>
                              {field.sampleData.map((sample: any) => (
                                <Text
                                  size="xs"
                                  css={{
                                    color: "$neutral600",
                                    lineHeight: "$xs !important"
                                  }}
                                >
                                  {sample.length > 40
                                    ? sample.slice(0, 40) + "..."
                                    : sample}
                                </Text>
                              ))}
                            </>
                          ) : null}
                        </>
                      ) : (
                        <Box css={{ position: "relative" }}>
                          <FormInput
                            size="lg"
                            onChange={(event) =>
                              customFieldHandler(
                                field.id,
                                "integrationField",
                                event.currentTarget.value
                              )
                            }
                          />
                          <FormLabel
                            css={{ marginTop: "$4", color: "$neutral400" }}
                          >
                            Enter the exact custom property name for accurate
                            mapping. It is case-sensitive.
                          </FormLabel>
                          {field.property === "custom" ? (
                            <IconButton
                              css={{
                                position: "absolute",
                                top: "0",
                                left: "-70px"
                              }}
                              size="lg"
                              variant="ghost"
                              color="secondary"
                              onClick={() => {
                                  setContactImportField({
                                    ...contactImportField,
                                    fields: contactImportField?.fields.filter((currentField: any) => currentField?.id !== field?.id)
                              })
                              }}
                              icon={<DeleteIcon />}
                            />
                          ) : null}
                        </Box>
                      )}
                    </Td>
                    <Td
                      css={{
                        width: 560,
                        borderLeft: "$borderWidths$xs solid $neutral100"
                      }}
                    >
                      <>
                        <Select
                          size="lg"
                          placeholder="--Choose Property--"
                          value={
                            field.surveySparrowField
                              ? {
                                  label: contactProperties.find(
                                    (contact: any) =>
                                      contact.value === field.surveySparrowField
                                  )?.label,
                                  value: field.surveySparrowField
                                }
                              : null
                          }
                          options={contactProperties.filter(
                            (contact: any) => contact.type !== "DEPENDENT_FIELD"
                          )}
                          onChange={(currentField: any) => {
                            updateSurveySparrowField(
                              currentField.value,
                              field.id,
                              true
                            );
                          }}
                          css={{
                            marginBottom:
                              !hasSurveyFieldValue &&
                              !field.surveySparrowFieldError &&
                              field.property === "custom"
                                ? "$12"
                                : 0,
                            ...(!field.surveySparrowField &&
                              field.surveySparrowFieldError && {
                                "& .twigs-select__control, & .twigs-select__control:hover":
                                  {
                                    boxShadow: "0px 1.5px 0px 0px #f65633",
                                    borderBottom: 0
                                  }
                              })
                          }}
                        />
                        {hasSurveyFieldValue ? (
                          <FormLabel
                            css={{
                              color: field?.mapped ? "$neutral600" : "#0F966C",
                              marginBlock: "$4 $12"
                            }}
                            size="xs"
                          >
                            {field?.mapped
                              ? "Manually mapped by you"
                              : "Automatically mapped"}
                          </FormLabel>
                        ) : null}
                        {!field.surveySparrowField &&
                          field.surveySparrowFieldError && (
                            <FormLabel
                              css={{
                                color: "$negative500",
                                marginTop: "$4"
                              }}
                              size="xs"
                            >
                              Please select the property
                            </FormLabel>
                          )}
                      </>
                    </Td>
                  </Tr>
                );
              })}

              <Tr
                css={{
                  borderBottom: "none !important",
                  "&:hover": {
                    background: "$white900"
                  }
                }}
              >
                <Td colSpan={2}>
                  <Button
                    size="md"
                    variant="ghost"
                    leftIcon={<PlusIcon />}
                    onClick={addCustomProperty}
                  >
                    Add Custom Property
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Flex>
  );
};

export default ContactImportMapping;
