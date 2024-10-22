import {
  Box,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
  FormLabel,
  Heading,
  Select,
  Text,
} from "@sparrowengg/twigs-react";
import { ChevronDownIcon, PlusIcon } from "@sparrowengg/twigs-react-icons";
import React, { useEffect, useState } from "react";
import { topLevelCondition } from "../constants";
import { v4 as uuid } from "uuid";
import { Filter } from "./subcomponents";
import CustomPill from "../../commons/components/custom-pill";
import { components } from "react-select";
import SMSIcon from "../../commons/icons/sms";
import WhatsappIcon from "../../commons/icons/whatsapp";
import EmailLetterIcon from "../../commons/icons/email-letter";
import { fetchSurveyChannels } from "../services";

const Trigger = ({
  fields,
  setFields,
  token,
  apiURL,
  surveyDetails,
  shareRecipentOptions,
  shareChannelOptions,
  triggerDetails,
  setTriggerDetails,
  fieldOptions,
  variableOptions,
}: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [channels, setChannels] = useState<any>([]);
  const setTriggerFields = (property: string, value: any) => {
    setTriggerDetails((prev: any) => ({
      ...prev,
      [property]: value,
    }));
  };

  const addFilterConditon = () => {
    setFields((prev: any) => ({
      ...prev,
      filters: [
        ...prev.filters,
        {
          id: uuid(),
          filter: [
            {
              id: uuid(),
              field: "",
              dataType: "",
              comparator: "",
              value: "",
            },
          ],
          condition: "AND",
        },
      ],
    }));
  };

  const addNestedFilterCondition = (currentFilterId: string | number) => {
    setIsEditing(true);
    setFields((prev: any) => ({
      ...prev,
      filters: prev.filters.map((filter: any) => {
        if (filter.id === currentFilterId) {
          return {
            ...filter,
            filter: [
              ...filter.filter,
              {
                id: uuid(),
                field: "",
                dataType: "",
                comparator: "",
                value: "",
              },
            ],
          };
        } else {
          return filter;
        }
      }),
    }));
  };

  const fetchShareChannels = async (token: any, apiURL: any, surveyId: any) => {
    const response = await fetchSurveyChannels(token, apiURL, surveyId);
    setChannels(response);
  };

  const setCurrentField = (
    fieldValue: string,
    currentNestedFilterId: number | string,
    currentFilterId: string | number,
    type: string
  ) => {
    setFields((prev: any) => ({
      ...prev,
      filters: prev.filters.map((filter: any) => {
        if (filter.id === currentFilterId) {
          return {
            ...filter,
            filter: filter.filter.map((currentFilter: any) => {
              if (currentFilter.id === currentNestedFilterId) {
                return {
                  ...currentFilter,
                  [type]: fieldValue,
                };
              } else {
                return currentFilter;
              }
            }),
          };
        } else {
          return filter;
        }
      }),
    }));
  };

  const removeCurrentFilter = (currentFilterId: string | number) => {
    setFields((prev: any) => ({
      ...prev,
      filters: prev.filters.filter(
        (currentFilter: any) => currentFilter.id !== currentFilterId
      ),
    }));
  };
  const isEmpty = (object: any) => {
    return Object.entries(object ?? {})?.length === 0;
  };

  const removeNestedField = (
    currentFieldId: string | number,
    currentNestedFilterId: string | number
  ) => {
    setFields((prev: any) => {
      const updatedFilters = prev.filters.reduce(
        (acc: any[], currentField: any) => {
          if (currentField.id === currentFieldId) {
            const updatedFilter = Array.isArray(currentField.filter)
              ? currentField.filter.filter(
                  (currentNestedFilter: any) =>
                    currentNestedFilter.id !== currentNestedFilterId
                )
              : [];
            if (updatedFilter.length > 0) {
              acc.push({
                ...currentField,
                filter: updatedFilter,
              });
            }
          } else {
            acc.push(currentField);
          }
          return acc;
        },
        []
      );

      return {
        ...prev,
        filters: updatedFilters,
      };
    });
  };

  const setNestedFieldCondition = (
    currentFilterId: number | string,
    condition: string
  ) => {
    setFields((prev: any) => ({
      ...prev,
      filters: prev.filters.map((filter: any) => {
        if (filter.id === currentFilterId) {
          return {
            ...filter,
            condition,
          };
        } else {
          return filter;
        }
      }),
    }));
  };
  useEffect(() => {
    fetchShareChannels(token, apiURL, surveyDetails?.surveyId);
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      css={{ marginTop: "$40" }}
    >
      <Box css={{ maxWidth: 488, width: "100%" }}>
        <Heading size="h5">Set Condition</Heading>
        <Flex alignItems="center" css={{ marginTop: "$12" }}>
          <Text
            size="md"
            css={{ color: "$neutral700", display: "inline-flex" }}
          >
            which meet{" "}
          </Text>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Flex
                alignItems="center"
                css={{
                  margin: "0 $2",
                }}
              >
                <Text
                  size="md"
                  weight="medium"
                  css={{ color: "$neutral900", lineHeight: "$sm" }}
                >
                  {
                    topLevelCondition.find(
                      (condition) => condition.value === fields.condition
                    )?.label
                  }
                </Text>
                <ChevronDownIcon size={16} color="#6A6A6A" />
              </Flex>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={5}
              css={{
                padding: "$4 0",
                minWidth: "$15",
              }}
            >
              {topLevelCondition.map((condition) => (
                <DropdownMenuItem
                  onClick={() =>
                    setFields((prev: any) => ({
                      ...prev,
                      condition: condition.value,
                    }))
                  }
                  css={{
                    ...(condition.value === fields.condition && {
                      background: "$primary100",
                      color: "$neutral900",
                      "&:hover": {
                        background: "$primary100",
                        color: "$neutral900",
                      },
                    }),
                  }}
                >
                  {condition.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Text
            size="md"
            css={{ color: "$neutral700", display: "inline-flex" }}
          >
            of these conditions are met:
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          gap="$12"
          css={{ marginTop: fields?.filters?.length ? "$12" : 0 }}
        >
          {fields?.filters?.map((filters: any, index: number) => (
            <Filter
              filters={filters}
              fields={fields}
              index={index}
              isEditing={isEditing}
              setCurrentField={setCurrentField}
              resetEditing={() => setIsEditing(false)}
              addNestedFilterCondition={addNestedFilterCondition}
              setNestedFieldCondition={setNestedFieldCondition}
              removeCurrentFilter={removeCurrentFilter}
              removeNestedField={removeNestedField}
              fieldOptions={fieldOptions}
            />
          ))}
        </Flex>
        {!isEditing && (
          <Button
            css={{ marginTop: "$8", marginLeft: "-$2" }}
            leftIcon={<PlusIcon />}
            variant="ghost"
            size="md"
            onClick={() => {
              setIsEditing(true);
              addFilterConditon();
            }}
          >
            Add Condition
          </Button>
        )}
        {!!fields.filters.some((filter: any) =>
          filter?.filter?.some((currentFilter: any) => !!currentFilter?.value)
        ) ? (
          <Flex flexDirection="column" gap="$12" css={{ marginTop: "$40" }}>
            <Heading size="h5">Pass Variable to Survey</Heading>
            <Flex gap="$2" flexDirection="column">
              <FormLabel size="xs" css={{ fontWeight: "$5" }}>
                Choose Fields
              </FormLabel>
              <Select
                placeholder=""
                size="lg"
                isMulti
                closeMenuOnSelect={false}
                isClearable={false}
                value={triggerDetails?.variables}
                onChange={(field) => {
                  setTriggerFields("variables", field);
                }}
                css={{
                  p: {
                    fontFamily: "'Roboto Mono', monospace !important",
                  },
                  "& .twigs-select__control": {
                    overflow: "auto",
                    maxHeight: 488,
                    height: "100%",
                  },
                  ".twigs-select__value-container--is-multi": {
                    gap: "$2",
                  },
                }}
                components={{
                  MultiValue: CustomMultiValue,
                }}
                options={variableOptions}
              />
            </Flex>
          </Flex>
        ) : null}
        {!!fields.filters.some((filter: any) =>
          filter?.filter?.some((currentFilter: any) => !!currentFilter?.value)
        ) ? (
          <Flex flexDirection="column" gap="$12" css={{ marginBlock: "$40" }}>
            <Heading size="h5">Send Survey</Heading>
            <Flex flexDirection="column" gap="$8">
              <Flex gap="$2" flexDirection="column">
                <FormLabel size="xs" css={{ fontWeight: "$5" }}>
                  Choose Share Type
                </FormLabel>
                <Select
                  placeholder=""
                  size="lg"
                  components={{
                    Option: CustomShareOption,
                    SingleValue: CustomSingleValue,
                  }}
                  styles={{
                    singleValue: (provided, state) => ({
                      ...provided,
                      display: "flex",
                      alignItems: "center",
                    }),
                  }}
                  value={triggerDetails?.shareType}
                  onChange={(field) => {
                    setTriggerFields("shareType", field);
                    setTriggerFields("shareRecipient", null);
                    setTriggerFields("shareChannel", null);
                  }}
                  options={[
                    {
                      id: 1,
                      label: "Email",
                      value: "EMAIL",
                    },
                    {
                      id: 2,
                      label: "SMS",
                      value: "SMS",
                    },
                    {
                      id: 3,
                      label: "Whatsapp",
                      value: "WHATSAPP",
                    },
                  ]}
                />
              </Flex>
              {!isEmpty(triggerDetails?.shareType) && (
                <>
                  <Flex gap="$2" flexDirection="column">
                    <FormLabel size="xs" css={{ fontWeight: "$5" }}>
                      Choose Recipient
                    </FormLabel>
                    <Select
                      placeholder=""
                      size="lg"
                      onChange={(field) =>
                        setTriggerFields("shareRecipient", field)
                      }
                      isDisabled={!triggerDetails?.shareType?.value}
                      value={triggerDetails?.shareRecipient}
                      options={shareRecipentOptions?.filter(
                        (option: any) =>
                          option?.type === triggerDetails.shareType?.value
                      )}
                    />
                  </Flex>
                  <Flex gap="$2" flexDirection="column">
                    <FormLabel size="xs" css={{ fontWeight: "$5" }}>
                      Choose Share Channel
                    </FormLabel>
                    <Select
                      placeholder=""
                      size="lg"
                      isDisabled={!triggerDetails?.shareType?.value}
                      value={triggerDetails?.shareChannel}
                      onChange={(field) =>
                        setTriggerFields("shareChannel", field)
                      }
                      options={channels.filter(
                        (channel: any) =>
                          channel?.type === triggerDetails?.shareType?.value
                      )}
                    />
                  </Flex>
                </>
              )}
            </Flex>
          </Flex>
        ) : null}
      </Box>
    </Flex>
  );
};

export default Trigger;

const CustomShareOption = (props: any) => {
  const getCurrentIcon = (type: string) => {
    switch (type) {
      case "EMAIL":
        return <EmailLetterIcon />;
      case "SMS":
        return <SMSIcon />;
      case "WHATSAPP":
        return <WhatsappIcon />;
      default:
        return null;
    }
  };

  return (
    <components.Option {...props}>
      <Flex css={{ cursor: "pointer" }} alignItems="center" gap="$2">
        {getCurrentIcon(props.data.value)}
        <Text size="sm">{props.label}</Text>
      </Flex>
    </components.Option>
  );
};
const CustomSingleValue = (props: any) => {
  const getCurrentIcon = (type: string) => {
    switch (type) {
      case "EMAIL":
        return <EmailLetterIcon />;
      case "SMS":
        return <SMSIcon />;
      case "WHATSAPP":
        return <WhatsappIcon />;
      default:
        return null;
    }
  };

  return (
    <components.SingleValue {...props}>
      <Flex css={{ cursor: "pointer" }} alignItems="center" gap="$2">
        {getCurrentIcon(props.data.value)}
        <Text size="sm">{props.data.label}</Text>
      </Flex>
    </components.SingleValue>
  );
};

const CustomMultiValue = (props: any) => {
  return (
    <CustomPill
      label={props.data.label}
      onCloseHandler={() => props.removeProps.onClick()}
      variant="success"
      radius="md"
      fontFamily="Roboto Mono"
    />
  );
};
