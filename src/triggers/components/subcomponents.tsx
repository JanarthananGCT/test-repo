import React from "react";
import {
  Flex,
  Box,
  IconButton,
  Button,
  Popover,
  TooltipProvider,
  Tooltip,
  PopoverTrigger,
  PopoverContent,
  Input,
  Calendar,
  Chip,
  Text,
  FormInput,
  FormLabel,
} from "@sparrowengg/twigs-react";
import { parseDate, DateValue } from "@internationalized/date";
import dayjs from "dayjs";
import {
  CloseIcon,
  SearchIcon,
  ChevronRightIcon,
} from "@sparrowengg/twigs-react-icons";
import { useState, ReactNode } from "react";
import {
  subMenuOptions,
  operatorOptions,
  booleanOptions,
} from "../../commons/constants";
import NestedAddIcon from "../../commons/icons/nested-add";
import Trash from "../../commons/icons/trash";
import { comparatorConstants } from "../constants";
import CustomPill from "../../commons/components/custom-pill";

const getCurrentConditionText = (text: string, dataType: string) => {
  let currentText = "";
  switch (text) {
    case comparatorConstants.IS:
      currentText = dataType.includes("BOOLEAN")
        ? "is"
        : "is equal to";
      break;
    case comparatorConstants.IS_NOT:
      currentText = "is not equal to";
      break;
    case comparatorConstants.CONTAINS:
      currentText = "contains";
      break;
    case comparatorConstants.CONTAINS_NOT:
      currentText = "not contains";
      break;
    case comparatorConstants.NO_VALUE:
      currentText = "has no value";
      break;
    case comparatorConstants.ANY_VALUE:
      currentText = "has any value";
      break;
    case comparatorConstants.ON:
      currentText = "on";
      break;
    case comparatorConstants.AFTER:
      currentText = "after";
      break;
    case comparatorConstants.BEFORE:
      currentText = "before";
      break;
    case comparatorConstants.TRUE:
    case comparatorConstants.FALSE:
      currentText = "Boolean";
      break;
    default:
      currentText = "";
      break;
  }
  return currentText;
};

export const Filter = ({
  filters,
  fields,
  index,
  isEditing,
  setCurrentField,
  resetEditing,
  addNestedFilterCondition,
  setNestedFieldCondition,
  removeCurrentFilter,
  removeNestedField,
  fieldOptions,
}: any) => {
  return (
    <Flex flexDirection="column" gap="$1">
      <Flex
        alignItems="center"
        gap="5px"
        css={{
          marginBottom: "$4",
          "&:hover": {
            "#action-btn": {
              opacity: 1,
            },
          },
        }}
      >
        <Text
          weight="bold"
          css={{
            whiteSpace: "nowrap",
          }}
        >
          {index > 0 && fields.condition.toLowerCase()} When
        </Text>
        <Box
          css={{
            borderBottom: "$borderWidths$xs solid $black200",
            width: "100%",
            marginLeft: "$3",
            position: "relative",
          }}
        >
          {!isEditing && (
            <Flex
              css={{
                position: "absolute",
                right: 0,
                top: "-$6",
                background: "$white900",
                paddingLeft: "$2",
                opacity: 0,
                transition: "all .3s ease",
              }}
              id="action-btn"
              alignItems="center"
              gap="$4"
            >
              <IconButton
                icon={<NestedAddIcon />}
                size="sm"
                variant="ghost"
                color="default"
                onClick={() => addNestedFilterCondition(filters.id)}
              />
              <IconButton
                icon={<Trash />}
                size="sm"
                variant="ghost"
                color="default"
                onClick={() => removeCurrentFilter(filters.id)}
              />
            </Flex>
          )}
        </Box>
      </Flex>

      {filters.filter.map((currentFilter: any, currentFilterIndex: number) => (
        <Flex
          alignItems="center"
          justifyContent="space-between"
          css={{
            "&:hover": {
              "& button": {
                opacity: 1,
              },
            },
          }}
        >
          <Flex gap="$1" alignItems="center">
            {currentFilterIndex > 0 && (
              <Box
                css={{ cursor: "pointer" }}
                onClick={() => {
                  setNestedFieldCondition(
                    filters.id,
                    filters.condition.toLowerCase() === "or" ? "AND" : "OR"
                  );
                }}
              >
                <CustomPill
                  variant="default"
                  radius="sm"
                  isClosable={false}
                  label={filters.condition.toLowerCase()}
                />
              </Box>
            )}
            {isEditing && !currentFilter.field ? (
              <FieldPopover
                setCurrentField={setCurrentField}
                currentFilter={currentFilter}
                filters={filters}
                fieldOptions={fieldOptions}
              />
            ) : (
              <CustomFieldChip>
                {fieldOptions?.find(
                  (option: any) => option.value === currentFilter.field
                )?.label ?? currentFilter.field}{" "}
              </CustomFieldChip>
            )}
            {isEditing && !currentFilter.comparator && !!currentFilter.field ? (
              <DataTypePopover
                setCurrentField={setCurrentField}
                currentFilter={currentFilter}
                filters={filters}
              />
            ) : (
              <CustomFieldChip>
                {getCurrentConditionText(
                  currentFilter.comparator,
                  currentFilter.dataType
                )}
              </CustomFieldChip>
            )}
            {isEditing &&
            !!currentFilter.comparator &&
            !!currentFilter.dataType &&
            !currentFilter.value ? (
              <FieldValuePopover
                fieldOptions={fieldOptions}
                setCurrentField={setCurrentField}
                currentFilter={currentFilter}
                filters={filters}
                resetEditing={resetEditing}
              />
            ) : (
              <CustomFieldChip>{currentFilter.value}</CustomFieldChip>
            )}
          </Flex>
          {!isEditing && (
            <IconButton
              css={{ opacity: 0 }}
              icon={<CloseIcon />}
              size="sm"
              color="default"
              variant="ghost"
              onClick={() => removeNestedField(filters.id, currentFilter.id)}
            />
          )}
        </Flex>
      ))}
    </Flex>
  );
};
const RenderFieldValuePopover = ({
  fieldOptions,
  setCurrentField,
  currentFilter,
  filters,
  resetEditing,
  setShowPopover,
}: any) => {
  const [date, setDate] = useState<any>(
    parseDate(dayjs().format("YYYY-MM-DD"))
  );
  const [inputValue, setInputValue] = useState("");
  const field = fieldOptions.find(
    (option: any) => option.value === currentFilter.field
  )?.options;
  if (currentFilter.dataType === "BOOLEAN") {
    return (
      <Box css={{ paddingBlock: "$5" }}>
        {booleanOptions.map((option) => (
          <Text
            size="sm"
            onClick={() => {
              setCurrentField(
                option.label,
                currentFilter?.id,
                filters?.id,
                "value"
              );
              setShowPopover(false);
              resetEditing();
            }}
            css={{
              padding: "$3 $6",
              cursor: "pointer",
              "&:hover": {
                background: "$neutral100",
              },
            }}
          >
            {option.label}
          </Text>
        ))}
      </Box>
    );
  } else if (currentFilter.comparator === "NO_VALUE" || currentFilter.comparator === "ANY_VALUE") {
    setCurrentField(" ", currentFilter?.id, filters?.id, "value");
    setShowPopover(false);
    resetEditing();
    return <></>;
  } else if (currentFilter.dataType === "DATE_TIME") {
    return (
      <Box>
        <Calendar
          size="md"
          footerActionText="Apply"
          value={date}
          showTimePicker
          onChange={setDate}
          footerAction={() => {
            setCurrentField(
              dayjs(date).format("MMM D YYYY . hh:mm A"),
              currentFilter?.id,
              filters?.id,
              "value"
            );
            setShowPopover(false);
            resetEditing();
          }}
        />
      </Box>
    );
  } else if (field?.length) {
    return (
      <>
        <Box css={{ padding: "$4" }}>
          <Input
            placeholder="Search"
            leftIcon={<SearchIcon />}
            variant="filled"
            size="lg"
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
        </Box>
        <Flex
          flexDirection="column"
          css={{
            paddingBottom: "$4",
            maxHeight: 240,
            height: "100%",
            overflow: "auto",
          }}
        >
          {!!field.length ? (
            <>
              {field
                .filter((option: any) =>
                  option.label.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((field: any) => (
                  <Box
                    onClick={() => {
                      setCurrentField(
                        field.value,
                        currentFilter?.id,
                        filters?.id,
                        "value"
                      );
                      setShowPopover(false);
                      resetEditing();
                    }}
                    css={{
                      padding: "$3 $6",
                      transition: "all .3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(100, 116, 139, 0.06)",
                      },
                    }}
                    key={field?.id}
                  >
                    <Text size="sm">{field.label}</Text>
                  </Box>
                ))}
            </>
          ) : (
            <Text
              size="sm"
              css={{
                padding: "$3 $6",
                color: "$neutral800",
                textAlign: "center",
              }}
            >
              No options
            </Text>
          )}
        </Flex>
      </>
    );
  } else {
    return (
      <>
        <Box css={{ padding: "$4" }}>
          <FormInput
            placeholder="Enter a value"
            type="text"
            variant="filled"
            size="lg"
            {...(currentFilter.dataType === "NUMBER" && {
              maxLength: 10,
            })}
            value={inputValue}
            onChange={(e) =>
              setInputValue(
                currentFilter.dataType === "NUMBER"
                  ? e.target.value.replace(/\D/g, "")
                  : e.target.value
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue?.length) {
                setCurrentField(inputValue, currentFilter?.id, filters?.id, "value");
                setShowPopover(false);
                resetEditing();
              }
            }}
          />
          {currentFilter.dataType === "NUMBER" && (
            <FormLabel
              size="xs"
              css={{ fontWeight: "$5", marginTop: "$2", marginLeft: "$1" }}
            >
              Enter a valid number without the country code
            </FormLabel>
          )}
        </Box>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          css={{
            borderTop: "$borderWidths$xs solid $neutral100",
            padding: "$4 $6",
            marginTop: "$4",
          }}
        >
          <Button
            size="md"
            color="secondary"
            variant="ghost"
            onClick={() => setShowPopover(false)}
          >
            Cancel
          </Button>
          <Button
            size="md"
            variant="ghost"
            disabled={!inputValue?.length}
            onClick={() => {
              setCurrentField(
                inputValue,
                currentFilter?.id,
                filters?.id,
                "value"
              );
              setShowPopover(false);
              resetEditing();
            }}
          >
            Save
          </Button>
        </Flex>
      </>
    );
  }
};

const FieldValuePopover = ({
  setCurrentField,
  currentFilter,
  filters,
  resetEditing,
  fieldOptions,
}: any) => {
  const [showPopover, setShowPopover] = useState(true);

  const hasError = !currentFilter.value && !showPopover;
  return (
    <Popover defaultOpen open={showPopover}>
      <TooltipProvider delayDuration={0}>
        <Tooltip
          side="right"
          content={hasError ? "Enter Value to complete the condition" : ""}
        >
          <PopoverTrigger asChild onClick={() => setShowPopover(!showPopover)}>
            <Box>
              <CustomConditonChip hasError={hasError}>
                Type Value
              </CustomConditonChip>
            </Box>
          </PopoverTrigger>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent
        onPointerDownOutside={() => setShowPopover(false)}
        sideOffset={4}
        align="start"
        side= {currentFilter.dataType === "DATE_TIME" ? "right": "bottom"}
        css={{
          minWidth: 220,
          borderRadius: "$xl",
          border: "0.7px solid $black300",
          padding: 0,
        }}
      >
        <RenderFieldValuePopover
          fieldOptions={fieldOptions}
          setShowPopover={setShowPopover}
          setCurrentField={setCurrentField}
          currentFilter={currentFilter}
          filters={filters}
          resetEditing={resetEditing}
        />
      </PopoverContent>
    </Popover>
  );
};

const DataTypePopover = ({ setCurrentField, currentFilter, filters }: any) => {
  const [subMenuContent, setSubMenuContent] = useState({
    show: false,
    type: "",
  });

  return (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Box>
          <CustomConditonChip>Choose Data Type</CustomConditonChip>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={4}
        align="start"
        css={{
          width: 260,
          borderRadius: "$xl",
          border: "0.7px solid $black300",
          padding: 0,
        }}
      >
        {!subMenuContent.show && !currentFilter.dataType.length ? (
          <Box css={{ paddingTop: "$6" }}>
            <Text
              size="sm"
              onClick={() => {
                setCurrentField(
                  "NO_PREFERENCE",
                  currentFilter?.id,
                  filters?.id,
                  "dataType"
                );
                setCurrentField(
                  "NO_PREFERENCE",
                  currentFilter?.id,
                  filters?.id,
                  "comparator"
                );
                setSubMenuContent({
                  show: false,
                  type: "",
                });
              }}
              css={{
                padding: "$3 $6",
                marginBottom: "$4",
                cursor: "pointer",
                "&:hover": {
                  background: "$neutral100",
                },
              }}
            >
              No Preference
            </Text>
            <Box
              css={{
                paddingTop: "$4",
                borderTop: "$borderWidths$xs solid $neutral100",
              }}
            >
              <Text
                css={{
                  textTransform: "uppercase",
                  color: "$neutral600",
                  padding: "$4 $6",
                }}
                size="xs"
                weight="bold"
              >
                Select data type
              </Text>
              {subMenuOptions.map((option) => (
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={() => {
                    if (option.value === "BOOLEAN") {
                      setCurrentField(
                        option.value,
                        currentFilter?.id,
                        filters?.id,
                        "dataType"
                      );
                      setCurrentField(
                        comparatorConstants.IS,
                        currentFilter?.id,
                        filters?.id,
                        "comparator"
                      );
                    } else {
                      setCurrentField(
                        option.value,
                        currentFilter?.id,
                        filters?.id,
                        "dataType"
                      );
                      setSubMenuContent({
                        show: true,
                        type: option.value,
                      });
                    }
                  }}
                  css={{
                    cursor: "pointer",
                    padding: "$3 $6",
                    "&:hover": {
                      background: "rgba(100, 116, 139, 0.08)",
                      "#subLabelIcon": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Box>
                    <Text
                      size="sm"
                      css={{ lineHeight: "$md", color: "$neutral900" }}
                    >
                      {option.label}
                    </Text>
                    {!!option.subLabel && (
                      <Text
                        size="xs"
                        css={{ lineHeight: "$xs", color: "$neutral700" }}
                      >
                        {option.subLabel}
                      </Text>
                    )}
                  </Box>
                  <Box css={{ opacity: 0 }} id="subLabelIcon">
                    <ChevronRightIcon size={20} />
                  </Box>
                </Flex>
              ))}
            </Box>
            <Flex
              css={{
                background: "rgba(100, 116, 139, 0.06)",
                padding: "$6 $8",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <Text size="xs" css={{ color: "$neutral600", lineHeight: "$xs" }}>
                Select the right data type for the mapping to prevent errors
                when sharing value.
              </Text>
            </Flex>
          </Box>
        ) : (
          <Box>
            <Flex
              alignItems="center"
              gap="$4"
              css={{
                display: !subMenuOptions.find(
                  (option) => option.value === subMenuContent.type
                )?.label ? "none" : "flex",
                padding: "$5 $4",
                borderRadius: "$xl $xl 0 0",
                backgroundColor: "rgba(100, 116, 139, 0.06)",
                borderBottom:
                  "$borderWidths$xs solid rgba(100, 116, 139, 0.08)",
              }}
            >
              <Box
                onClick={() =>
                  setSubMenuContent({
                    show: false,
                    type: "",
                  })
                }
                css={{
                  borderRight: "$borderWidths$xs solid $secondary100",
                  paddingRight: "$2",
                  cursor: "pointer",
                }}
              >
                <ChevronRightIcon
                  style={{ transform: "scaleX(-1)", color: "#76859A" }}
                  size={20}
                />
              </Box>
              <Flex alignItems="center">
                <Text size="sm" css={{ color: "$secondary400" }}>
                  {
                    subMenuOptions.find(
                      (option) => option.value === subMenuContent.type
                    )?.label
                  }
                </Text>
                <ChevronRightIcon style={{ color: "#76859A" }} size={16} />
                <Text
                  size="sm"
                  weight="medium"
                  css={{ color: "$secondary600" }}
                >
                  {subMenuContent.type === "DATE_TIME" ? "Select" : "Choose"}
                </Text>
              </Flex>
            </Flex>
            <Box
              css={{
                paddingBlock: subMenuContent.type === "DATE_TIME" ? 0 : "$4",
              }}
            >
              <PopoverFields
                type={subMenuContent.type}
                setCurrentField={setCurrentField}
                currentFilter={currentFilter}
                filters={filters}
                resetPopover={() => {
                  setSubMenuContent({
                    show: false,
                    type: "",
                  });
                }}
              />
            </Box>
          </Box>
        )}
      </PopoverContent>
    </Popover>
  );
};

const PopoverFields = ({
  type,
  setCurrentField,
  filters,
  currentFilter,
  resetPopover,
}: {
  type: string;
  setCurrentField: any;
  filters: any;
  currentFilter: any;
  resetPopover: any;
}) => {
  const [date, setDate] = useState();
  switch (type) {
    case "DATE_TIME":
      return (
        <>
          {operatorOptions
            ?.filter((operator) => operator.isDateOnly)
            .map((option) => (
              <Text
                size="sm"
                key={option.id}
                onClick={() => {
                  setCurrentField(
                    option.value,
                    currentFilter?.id,
                    filters?.id,
                    "comparator"
                  );
                  resetPopover();
                }}
                css={{
                  padding: "$3 $6",
                  cursor: "pointer",
                  "&:hover": {
                    background: "rgba(100, 116, 139, 0.08)",
                  },
                }}
              >
                {option.label}
              </Text>
            ))}
        </>
      );
    default:
      return (
        <>
          {operatorOptions
            ?.filter((operator) => !operator.isDateOnly)
            .map((option) => (
              <Text
                size="sm"
                key={option.id}
                onClick={() => {
                  // if( option.value === 'NO_VALUE') {
                  //   setCurrentField(
                  //     null,
                  //     currentFilter?.id,
                  //     filters?.id,
                  //     "value"
                  //   );
                  //   setSubMenuContent({
                  //     show: false,
                  //     type: "",
                  //   });
                  // } else {
                  setCurrentField(
                    option.value,
                    currentFilter?.id,
                    filters?.id,
                    "comparator"
                  );
                  // }
                  resetPopover();
                }}
                css={{
                  padding: "$3 $6",
                  cursor: "pointer",
                  "&:hover": {
                    background: "rgba(100, 116, 139, 0.08)",
                  },
                }}
              >
                {option.label}
              </Text>
            ))}
        </>
      );
  }
};

const FieldPopover = ({
  setCurrentField,
  currentFilter,
  filters,
  fieldOptions,
}: any) => {
  const [inputSearch, setInputSearch] = useState("");
  const currentOptions = fieldOptions?.filter((option: any) =>
    option.label.includes(inputSearch)
  );
  return (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Box>
          <CustomConditonChip>Choose Field</CustomConditonChip>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={4}
        align="start"
        css={{
          paddingBottom: "12px !important",
          width: 220,
          borderRadius: "$xl",
          border: "0.7px solid $black300",
          padding: "0",
        }}
      >
        <Box css={{ padding: "$4" }}>
          <Input
            placeholder="Search"
            leftIcon={<SearchIcon />}
            variant="filled"
            size="lg"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.currentTarget.value)}
          />
        </Box>
        <Flex
          flexDirection="column"
          css={{
            paddingBottom: "$4",
            maxHeight: 240,
            height: "100%",
            overflow: "auto",
          }}
        >
          {!!currentOptions.length ? (
            <>
              {currentOptions.map((field: any) => (
                <Box
                  onClick={() => {
                    setCurrentField(
                      field.value,
                      currentFilter?.id,
                      filters?.id,
                      "field"
                    );
                    if (field?.type) {
                      setCurrentField(
                        field?.type,
                        currentFilter?.id,
                        filters?.id,
                        "dataType"
                      );
                    }
                  }}
                  css={{
                    padding: "$3 $6",
                    transition: "all .3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(100, 116, 139, 0.06)",
                    },
                  }}
                  key={field?.id}
                >
                  <Text size="sm">{field.label}</Text>
                </Box>
              ))}
            </>
          ) : (
            <Text
              size="sm"
              css={{
                padding: "$3 $6",
                color: "$neutral800",
                textAlign: "center",
              }}
            >
              No options
            </Text>
          )}
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

const CustomConditonChip = ({
  children,
  hasError,
}: {
  children: ReactNode;
  hasError?: boolean;
}) => {
  return (
    <Chip
      size="lg"
      css={{
        backgroundColorOpacity: hasError
          ? ["#FDEDE8", 1]
          : ["$primary400", 0.2],
        color: hasError ? "#E75030" : "$primary700",
        padding: "$3 $1",
        fontWeight: "$5",
        lineHeight: "$sm",
      }}
    >
      {children}
    </Chip>
  );
};

const CustomFieldChip = ({ children }: { children: ReactNode }) => {
  return (
    <Chip
      size="lg"
      css={{
        background: "transparent",
        color: "$neutral800",
        padding: "$3 $1",
        fontWeight: "$7",
        lineHeight: "$sm",
      }}
    >
      {children}
    </Chip>
  );
};
