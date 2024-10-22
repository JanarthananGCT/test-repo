import {
  Box,
  Button,
  Chip,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
  Heading,
  IconButton,
  Switch,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@sparrowengg/twigs-react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DeleteIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  PlusIcon,
} from "@sparrowengg/twigs-react-icons";
import React, { ReactNode, useRef, useState } from "react";
import CursorIcon from "../../commons/icons/cursor";
import MappingIcon from "../../commons/icons/mapping";
import dayjs from "dayjs";
import parse from "html-react-parser";
import { operatorOptions } from "../../commons/constants";
import "./style.css";

const Dashboard = ({
  onMappingEditHandler,
  fieldOptions,
  triggerEnabled,
  mappingEnabled,
  integrationName,
  dashboardDescription,
  mappingFields,
  triggerFields,
  hasMultiAccounts,
  handleConfigurationType,
  handleEditField,
  handleDashboardPage,
  deleteFieldHandler,
  toggleDashboardField,
  hasDropdownComponents,
}: {
  onMappingEditHandler:any;
  fieldOptions:any;
  triggerEnabled: boolean;
  mappingEnabled: boolean;
  integrationName: string;
  dashboardDescription: string;
  mappingFields: {
    type: string;
    fields: Array<any>;
  };
  triggerFields: Array<any>;
  hasMultiAccounts: boolean;
  handleConfigurationType: (type: string) => void;
  handleEditField: (field: any) => void;
  handleDashboardPage: (value: boolean, type: string) => void;
  toggleDashboardField?: (id?: string | number) => void;
  deleteFieldHandler?: (id?: string | number) => void;
  hasDropdownComponents: {
    mapping: boolean;
    trigger: boolean;
  };
}) => {
  return (
    <Flex justifyContent="center">
      <Box css={{ maxWidth: "1120px", width: "100%" }}>
        <Flex
          css={{ marginTop: "$40" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex flexDirection="column" gap="$2">
            <Heading size="h5">{integrationName}</Heading>
            <Text size="sm" css={{ color: "$neutral600" }}>
              {dashboardDescription}
            </Text>
          </Flex>
          <Flex alignItems="center" gap="$4">
            {hasMultiAccounts && (
              <Button size="lg" color="default" leftIcon={<PlusIcon />}>
                Add Account
              </Button>
            )}
            <DropdownMenu>
              <Tooltip
                content={
                  !triggerEnabled && !mappingEnabled
                    ? "You have reached the maximum limit for creating triggers/mappings"
                    : ""
                }
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
                    disabled={!triggerEnabled && !mappingEnabled}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Add New
                  </Button>
                </DropdownMenuTrigger>
              </Tooltip>
              <DropdownMenuContent
                sideOffset={4}
                align="start"
                css={{ maxWidth: 240, zIndex: 10 }}
              >
                {hasDropdownComponents.trigger ? (
                  <DropdownItem
                    toolTipContent={
                      "You have reached the maximum limit for creating triggers"
                    }
                    isDisabled={!triggerEnabled}
                    icon={<CursorIcon size={24} color="#6A6A6A" />}
                    heading={"Trigger"}
                    description="Trigger the Survey when a record is created/updated"
                    onClickHandler={() => handleConfigurationType("TRIGGER")}
                  />
                ) : null}
                 {hasDropdownComponents.mapping ? (
                  <DropdownItem
                    isDisabled={!mappingEnabled}
                    toolTipContent={
                      "You have reached the maximum limit for creating mappings"
                    }
                    icon={<MappingIcon size={24} color="#6A6A6A" />}
                    heading={"Mapping"}
                    description={`Create/Update record in ${integrationName} from survey responses`}
                    onClickHandler={() => handleConfigurationType("MAPPING")}
                  />
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </Flex>
        </Flex>
        <Box css={{
          marginBottom: "$20 !important"
        }}>
        {hasMultiAccounts ? (
          <MultiAccountDashboard
          onMappingEditHandler={onMappingEditHandler}
          fieldOptions={fieldOptions}
            triggerEnabled={triggerEnabled}
            mappingEnabled={mappingEnabled}
            mappingFields={mappingFields}
            triggerFields={triggerFields}
            integrationName={integrationName}
            handleDashboardPage={handleDashboardPage}
            handleEditField={handleEditField}
            handleConfigurationType={handleConfigurationType}
            toggleDashboardField={toggleDashboardField}
            deleteFieldHandler={deleteFieldHandler}
          />
        ) : (
          <SingleAccountDashboard
          onMappingEditHandler={onMappingEditHandler}
          fieldOptions={fieldOptions}
            triggerEnabled={triggerEnabled}
            mappingEnabled={mappingEnabled}
            mappingFields={mappingFields}
            triggerFields={triggerFields}
            integrationName={integrationName}
            handleDashboardPage={handleDashboardPage}
            handleEditField={handleEditField}
            toggleDashboardField={toggleDashboardField}
            deleteFieldHandler={deleteFieldHandler}
          />
        )}
        </Box>
   
      </Box>
    </Flex>
  );
};

export default Dashboard;

const MultiAccountDashboard = ({
  onMappingEditHandler,
  mappingFields,
  triggerFields,
  integrationName,
  handleDashboardPage,
  handleEditField,
  handleConfigurationType,
  toggleDashboardField,
  deleteFieldHandler,
}: any) => {
  return (
    <>
      <Tabs defaultValue="ALL">
        <TabsList
          css={{
            borderBottom: "$borderWidths$xs solid $neutral200",
            marginTop: "$16",
            "& button": { color: "$neutral900" },
          }}
        >
          <TabsTrigger value="ALL">All</TabsTrigger>
          <TabsTrigger value="TRIGGER">Trigger</TabsTrigger>
          <TabsTrigger value="MAPPING">Mapping</TabsTrigger>
        </TabsList>
        <TabsContent
          value="ALL"
          css={{ paddingBlock: "$12", paddingInline: 0 }}
        >
          <Flex flexDirection="column" gap="$8">
            {!!triggerFields?.length ? (
              <>
                {triggerFields?.map((field: any) => (
                  <DashboardItem
                  onMappingEditHandler={onMappingEditHandler}
                    icon={<CursorIcon size={32} color="#56B0BB" />}
                    heading={field.domain ?? field.email}
                    id={field.id}
                    description={`Trigger survey when an event happens in ${integrationName}`}
                    fields={field.fields}
                    isEnabled={field.isEnabled}
                    integrationName={integrationName}
                    handleDashboardPage={handleDashboardPage}
                    handleEditField={handleEditField}
                    type="TRIGGER"
                    toggleDashboardField={toggleDashboardField}
                    deleteFieldHandler={deleteFieldHandler}
                  />
                ))}
              </>
            ) : null}
            {!!mappingFields?.fields?.length ? (
              <>
                {mappingFields?.fields?.map((field: any) => (
                  <>
                    {mappingFields.type === "MULTI_MAPPING" ? (
                      <DashboardItem
                      onMappingEditHandler={onMappingEditHandler}
                        icon={<MappingIcon size={32} color="#56B0BB" />}
                        heading={field.domain ?? field.email}
                        id={field.id}
                        description={`Sync survey responses to ${integrationName}`}
                        fields={field.fields}
                        isEnabled={field.isEnabled}
                        integrationName={integrationName}
                        handleDashboardPage={handleDashboardPage}
                        handleEditField={handleEditField}
                        type="MAPPING"
                        toggleDashboardField={toggleDashboardField}
                        deleteFieldHandler={deleteFieldHandler}
                      />
                    ) : (
                      <SingleMappingDashboardItem
                        field={field}
                        key={field.id}
                        integrationName={integrationName}
                        icon={<MappingIcon size={32} color="#56B0BB" />}
                        handleEditField={handleEditField}
                        handleDashboardPage={handleDashboardPage}
                        toggleDashboardField={toggleDashboardField}
                        deleteFieldHandler={deleteFieldHandler}
                      />
                    )}
                  </>
                ))}
              </>
            ) : null}
          </Flex>
        </TabsContent>
        <TabsContent
          value="TRIGGER"
          css={{ paddingBlock: "$12", paddingInline: 0 }}
        >
          {!!triggerFields?.length ? (
            <Flex flexDirection="column" gap="$8">
              {triggerFields?.map((field: any) => (
                <DashboardItem
                onMappingEditHandler={onMappingEditHandler}
                  icon={<CursorIcon size={32} color="#56B0BB" />}
                  heading="Trigger"
                  id={field.id}
                  description={`Trigger survey when an event happens in ${integrationName}`}
                  fields={field.fields}
                  isEnabled={field.isEnabled}
                  integrationName={integrationName}
                  handleDashboardPage={handleDashboardPage}
                  handleEditField={handleEditField}
                  type="TRIGGER"
                  toggleDashboardField={toggleDashboardField}
                  deleteFieldHandler={deleteFieldHandler}
                />
              ))}
            </Flex>
          ) : (
            <MultiAccountFallback
              title="Trigger"
              onClickHandler={() => handleConfigurationType("TRIGGER")}
            />
          )}
        </TabsContent>
        <TabsContent
          value="MAPPING"
          css={{ paddingBlock: "$12", paddingInline: 0 }}
        >
          {!!mappingFields?.fields?.length ? (
            <>
              <Flex flexDirection="column" gap="$8">
                {mappingFields?.fields?.map((field: any) => (
                  <>
                    {mappingFields.type === "MULTI_MAPPING" ? (
                      <DashboardItem
                      onMappingEditHandler={onMappingEditHandler}
                        icon={<MappingIcon size={32} color="#56B0BB" />}
                        heading="Mapping"
                        id={field.id}
                        description={`Sync survey responses to ${integrationName}`}
                        fields={field.fields}
                        isEnabled={field.isEnabled}
                        integrationName={integrationName}
                        handleDashboardPage={handleDashboardPage}
                        handleEditField={handleEditField}
                        type="MAPPING"
                        toggleDashboardField={toggleDashboardField}
                        deleteFieldHandler={deleteFieldHandler}
                      />
                    ) : (
                      <SingleMappingDashboardItem
                        field={field}
                        key={field.id}
                        integrationName={integrationName}
                        icon={<MappingIcon size={32} color="#56B0BB" />}
                        handleEditField={handleEditField}
                        handleDashboardPage={handleDashboardPage}
                        toggleDashboardField={toggleDashboardField}
                        deleteFieldHandler={deleteFieldHandler}
                      />
                    )}
                  </>
                ))}
              </Flex>
            </>
          ) : (
            <MultiAccountFallback
              title="Mapping"
              onClickHandler={() => handleConfigurationType("MAPPING")}
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

const MultiAccountFallback = ({
  title,
  onClickHandler,
}: {
  title: string;
  onClickHandler: () => void;
}) => {
  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      css={{ paddingTop: 182 }}
    >
      <Heading size="h5">{`Zero ${title} Entries`}</Heading>
      <Text
        css={{
          textAlign: "center",
          maxWidth: 400,
          marginBlock: "$4 $12",
          color: "$neutral800",
        }}
        size="md"
      >
        Creating one is as easy as a breeze. Just a click away to get started.
      </Text>
      <Button
        size="lg"
        leftIcon={<PlusIcon />}
        variant="outline"
        onClick={onClickHandler}
      >
        {`New ${title}`}
      </Button>
    </Flex>
  );
};

const SingleAccountDashboard = ({
  onMappingEditHandler,
  fieldOptions,
  triggerEnabled,
  mappingEnabled,
  mappingFields,
  triggerFields,
  integrationName,
  handleEditField,
  handleDashboardPage,
  toggleDashboardField,
  deleteFieldHandler,
}: any) => {
  return (
    <>
      {!!triggerFields?.length ? (
        <Box css={{ marginTop: "$20" }}>
          {triggerFields?.map((field: any) => (
            <TriggerDasboardItem
            fieldOptions={fieldOptions}
              field={field}
              description={`Trigger survey when an event happens in ${integrationName}`}
              key={field.id}
              integrationName={integrationName}
              icon={<CursorIcon size={32} color="#56B0BB" />}
              handleEditField={handleEditField}
              handleDashboardPage={handleDashboardPage}
              toggleDashboardField={toggleDashboardField}
              deleteFieldHandler={deleteFieldHandler}
            />
          ))}
        </Box>
      ) : null}
      {!!mappingFields?.fields?.length &&
      mappingFields?.type === "MULTI_MAPPING" ? (
        <Box css={{ marginTop: !triggerFields?.length ? "$20" : "$8" }}>
          {mappingFields?.fields?.map((field: any) => (
            <DashboardItem
            onMappingEditHandler={onMappingEditHandler}
              icon={<MappingIcon size={32} color="#56B0BB" />}
              heading="Mapping"
              id={field.id}
              description={`Sync survey responses to ${integrationName}`}
              fields={field.fields}
              isEnabled={field.isEnabled}
              integrationName={integrationName}
              handleDashboardPage={handleDashboardPage}
              handleEditField={handleEditField}
              type="MAPPING"
              toggleDashboardField={toggleDashboardField}
              deleteFieldHandler={deleteFieldHandler}
            />
          ))}
        </Box>
      ) : null}
      {mappingFields?.type !== "MULTI_MAPPING" &&
      !!mappingFields?.fields?.length ? (
        <Box css={{ marginTop: !triggerFields?.length ? "$20" : "$8" }}>
          {mappingFields?.fields?.map((field: any) => (
            <SingleMappingDashboardItem
              field={field}
              key={field.id}
              integrationName={integrationName}
              icon={<MappingIcon size={32} color="#56B0BB" />}
              handleEditField={handleEditField}
              handleDashboardPage={handleDashboardPage}
              toggleDashboardField={toggleDashboardField}
              deleteFieldHandler={deleteFieldHandler}
            />
          ))}
        </Box>
      ) : null}
    </>
  );
};

const TriggerDasboardItem = ({
  fieldOptions,
  icon,
  field,
  description,
  integrationName,
  handleEditField,
  handleDashboardPage,
  toggleDashboardField,
  deleteFieldHandler,
}: any) => {
  const [isMappingDisplayed, setIsMappingDisplayed] = useState(false);

  const transformDataToString = (data: any) => {
    const filterConditions = data.filters
      .map((filterGroup: any) => {
        return filterGroup.filter
          .map((filter: any) => {
            const field = filter.field;
            const comparator = filter.comparator;
            const value = filter.value;
            const formattedComparator =
              operatorOptions.find((option) => option.value === comparator)
                ?.label || comparator;
            const fieldLabel = fieldOptions.find((options: any)=> options.value === field)?.label

            return `${fieldLabel} ${formattedComparator === "NO_PREFERENCE" ? "has no preference" : formattedComparator} ${value}`;
          })
          ?.join(
            ` <span style="color: #6A6A6A;font-weight: 600;">${filterGroup.condition.toLowerCase()}</span> `
          );
      })
      .join(
        `<br /> <span style="color: #6A6A6A;font-weight: 600;">${data.condition.toLowerCase() === "or" ? "Or" : "And"} When,</span> `
      );
     
    return `<p style="font-family: 'DM Sans'; font-size: 13.33px; font-weight: 400;line-height: 30px; color: #848484;"><span style="color: #6A6A6A;font-weight: 600;">When</span> ${filterConditions}</p>`;
  };

  return (
    <Flex
      flexDirection="column"
      css={{ width: "100%", height: "100%", overflow: "auto", marginTop: "$8" }}
    >
      <Flex
        css={{
          border: isMappingDisplayed
            ? "$borderWidths$xs solid $black400"
            : "$borderWidths$xs solid $neutral200",
          borderRadius: isMappingDisplayed ? "$2xl $2xl 0 0" : "$2xl",
          padding: "$10 $12",
          width: "100%",
          backgroundColor: isMappingDisplayed
            ? "rgba(100, 116, 139, 0.04)"
            : "$white900",
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          alignItems="center"
          gap="$4"
          css={{ cursor: "pointer" }}
          onClick={() => setIsMappingDisplayed(!isMappingDisplayed)}
        >
          {isMappingDisplayed ? (
            <ChevronDownIcon size={40} color="#848484" />
          ) : (
            <ChevronRightIcon size={40} color="#848484" />
          )}
          <Flex alignItems="center" gap="$4">
            {icon}
            <Flex gap="$1" flexDirection="column">
              <Text size="md" weight="bold">
                {field?.email ?? "Trigger"}
              </Text>
              <Text size="sm" css={{ color: "$neutral600" }}>
                {description ??
                  `Trigger survey when an event happens in ${integrationName}`}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex alignItems="center" gap="$12">
          <Switch
            size="md"
            checked={field.isEnabled}
            onChange={(value) => toggleDashboardField(field.id, value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                variant="ghost"
                color="default"
                size="lg"
                icon={<EllipsisVerticalIcon />}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              css={{ minWidth: 180, zIndex: 10 }}
              sideOffset={4}
              align="end"
            >
              <DropdownMenuItem
                onClick={() => {
                  handleEditField({
                    type: "TRIGGER",
                    values: field,
                    id: field.id,
                  });
                  handleDashboardPage(false, "TRIGGER");
                }}
              >
                <Flex alignItems="center" gap="$2">
                  <PencilIcon color="#6A6A6A" size={20} />
                  <Text size="sm">Edit</Text>
                </Flex>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteFieldHandler(field.id)}>
                <Flex alignItems="center" gap="$2">
                  <DeleteIcon color="#6A6A6A" size={20} />
                  <Text size="sm">Delete</Text>
                </Flex>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Flex>
      </Flex>

      {isMappingDisplayed && (
        <Box
          css={{
            borderInline: "$borderWidths$xs solid $black400",
            maxHeight: 734,
            height: "100%",
            position: "relative",
            overflow: "auto",
            padding: "$16 $36",
          }}
        >
          <SingleMappingEventWrapper isTrigger field={field} />
          {field?.fields?.filters?.length ? (
            <>
              {" "}
              <Flex
                flexDirection="column"
                gap="$6"
                css={{ paddingBlock: "$8" }}
              >
                <Text
                  size="sm"
                  weight="bold"
                  css={{ textTransform: "uppercase" }}
                >
                  CONDITION
                </Text>
                {parse(transformDataToString(field.fields))}
              </Flex>
              <Box
                css={{
                  marginBlock: "$4",
                  height: "1px",
                  background: "$neutral100",
                }}
              />
            </>
          ) : null}
          {field?.triggerDetails?.variables?.length ? (
            <SingleMappingChipWrapper
              heading={field?.triggerDetails?.variables?.length > 1 ? "PASSING VARIABLES TO SURVEY" : "PASSING VARIABLE TO SURVEY"}
              fields={field.triggerDetails.variables}
              backgroundColor="$positive100"
            />
          ) : null}
          <>
            <Flex flexDirection="column" gap="$6" css={{ paddingBlock: "$8" }}>
              <Text size="sm" weight="bold">
                SEND SURVEY
              </Text>
              <Flex alignItems="center">
                {field?.triggerDetails?.shareType?.value ? (
                  <EventComponent
                    heading="Share Type:"
                    description={field?.triggerDetails?.shareType?.label}
                  />
                ) : null}
                {field?.triggerDetails?.shareRecipient?.value ? (
                  <EventComponent
                    heading="Recipient:"
                    hasBorder
                    description={field?.triggerDetails?.shareRecipient?.label}
                  />
                ) : null}
                {field?.triggerDetails?.shareChannel?.value ? (
                  <EventComponent
                    hasBorder
                    heading="Share Channel:"
                    description={field?.triggerDetails?.shareChannel?.label}
                  />
                ) : null}
              </Flex>
            </Flex>
          </>
        </Box>
      )}

      {isMappingDisplayed && (
        <Box
          css={{
            padding: "$8 $32",
            border: "$borderWidths$xs solid $black400",
            borderTop: "$borderWidths$xs solid $neutral200",
            borderRadius: "0 0 $2xl $2xl",
            height: "100%",
          }}
        >
          <Button
            size="sm"
            leftIcon={<PencilIcon />}
            color={"primary"}
            variant="ghost"
            onClick={() => {
              handleEditField({
                type: "TRIGGER",
                values: field,
                id: field.id,
              });
              handleDashboardPage(false, "TRIGGER");
            }}
          >
            Edit Trigger
          </Button>
        </Box>
      )}
    </Flex>
  );
};

const SingleMappingDashboardItem = ({
  fieldOptions,
  icon,
  field,
  handleEditField,
  handleDashboardPage,
  toggleDashboardField,
  deleteFieldHandler,
}: any) => {
  const [isMappingDisplayed, setIsMappingDisplayed] = useState(false);

  return (
    <Flex
      flexDirection="column"
      css={{ width: "100%", height: "100%", overflow: "auto" }}
    >
      <Flex
        css={{
          border: isMappingDisplayed
            ? "$borderWidths$xs solid $black400"
            : "$borderWidths$xs solid $neutral200",
          borderRadius: isMappingDisplayed ? "$2xl $2xl 0 0" : "$2xl",
          padding: "$10 $12",
          width: "100%",
          backgroundColor: isMappingDisplayed
            ? "rgba(100, 116, 139, 0.04)"
            : "$white900",
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          alignItems="center"
          gap="$4"
          css={{ cursor: "pointer" }}
          onClick={() => setIsMappingDisplayed(!isMappingDisplayed)}
        >
          {isMappingDisplayed ? (
            <ChevronDownIcon size={40} color="#848484" />
          ) : (
            <ChevronRightIcon size={40} color="#848484" />
          )}
          <Flex alignItems="center" gap="$4">
            {icon}
            <Flex gap="$1" flexDirection="column">
              <Text size="md" weight="bold">
                {field?.email ?? "Mapping"}
              </Text>
              <Text size="sm" css={{ color: "$neutral600" }}>
                {field?.description ?? "Sample description"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex alignItems="center" gap="$12">
          <Switch
            size="md"
            checked={field.isEnabled}
            onChange={(value) => toggleDashboardField(field.id, value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                variant="ghost"
                color="default"
                size="lg"
                icon={<EllipsisVerticalIcon />}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              css={{ minWidth: 180, zIndex: 10 }}
              sideOffset={4}
              align="end"
            >
              <DropdownMenuItem
                onClick={() => {
                  handleEditField({
                    type: "MAPPING",
                    values: field,
                    id: field.id,
                  });
                  handleDashboardPage(false, "MAPPING");
                }}
              >
                <Flex alignItems="center" gap="$2">
                  <PencilIcon color="#6A6A6A" size={20} />
                  <Text size="sm">Edit</Text>
                </Flex>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteFieldHandler(field.id)}>
                <Flex alignItems="center" gap="$2">
                  <DeleteIcon color="#6A6A6A" size={20} />
                  <Text size="sm">Delete</Text>
                </Flex>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Flex>
      </Flex>
      <Box
        css={{
          height: isMappingDisplayed ? "100%" : 0,
        }}
      >
        <Box
          css={{
            borderInline: "$borderWidths$xs solid $black400",
            maxHeight: 734,
            height: "100%",
            position: "relative",
            overflow: "auto",
            padding: "$16 $36",
          }}
        >
          <SingleMappingEventWrapper field={field} />
          {!!field.questions ? (
            <SingleMappingChipWrapper
              heading="Questions"
              fields={field.questions}
              backgroundColor="#E5F2FF"
            />
          ) : null}
          {!!field.variables ? (
            <SingleMappingChipWrapper
              heading="Variables"
              placeholder="$"
              fields={field.variables}
              backgroundColor="$positive100"
            />
          ) : null}
          {!!field.contactProperties ? (
            <SingleMappingChipWrapper
              heading="Contacts"
              placeholder="$"
              fields={field.contactProperties}
              backgroundColor="$negative100"
            />
          ) : null}
          {!!field.expressions ? (
            <SingleMappingChipWrapper
              heading="Expression"
              backgroundColor="$neutral100"
              fields={field.expressions}
            />
          ) : null}
          {!!field.property ? (
            <SingleMappingChipWrapper
              heading="Property"
              hideBorder
              fields={field.property}
              backgroundColor="rgba(74, 156, 166, 0.15)"
            />
          ) : null}
        </Box>
        {isMappingDisplayed && (
          <Box
            css={{
              padding: "$8 $32",
              border: "$borderWidths$xs solid $black400",
              borderTop: "$borderWidths$xs solid $neutral200",
              borderRadius: "0 0 $2xl $2xl",
              height: "100%",
            }}
          >
            <Button
              size="sm"
              leftIcon={<PencilIcon />}
              color={"primary"}
              variant="ghost"
              onClick={() => {
                handleEditField({
                  type: "SINGLE_MAPPING",
                  values: field,
                  id: field.id,
                });
                handleDashboardPage(false, "MAPPING");
              }}
            >
              Edit Mapping
            </Button>
          </Box>
        )}
      </Box>
    </Flex>
  );
};
const EventComponent = ({
  heading,
  description,
  hasBorder,
}: {
  heading: string;
  description: string;
  hasBorder?: boolean;
}) => {
  return (
    <Flex alignItems="center">
      {hasBorder && (
        <Box css={{ paddingInline: "$3" }}>
          <Box
            css={{
              height: "$3",
              width: "1px",
              background: "$neutral200",
              marginInline: "$4",
            }}
          />
        </Box>
      )}
      <Flex gap="$2">
        <Text size="sm" css={{ color: "$neutral500" }}>
          {heading}
        </Text>
        <Text size="sm" weight={"medium"} css={{ color: "$neutral800" }}>
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

const SingleMappingEventWrapper = ({
  field,
  isTrigger,
}: {
  field: any;
  isTrigger?: boolean;
}) => {
  const hasEventSection =
    !!field.email ||
    !!field.action ||
    !!field.exisitingSheet ||
    (!!field.object && isTrigger);

  return (
    <>
      {hasEventSection ? (
        <Flex flexDirection="column" gap="$6">
          <Text size="sm" weight="bold" css={{ textTransform: "uppercase" }}>
            Event
          </Text>
          <Flex alignItems="center">
            {!!field.email ? (
              <EventComponent heading="Account:" description={field.email} />
            ) : null}
            {!!field.object ? (
              <EventComponent
                heading="Object:"
                description={field.object?.replace(/^./, (char:any) => char?.toUpperCase())}
              />
            ) : null}
            {!!field.action ? (
              <EventComponent
                hasBorder
                heading="Action:"
                description={field.action}
              />
            ) : null}
            {!!field.exisitingSheet ? (
              <EventComponent
                hasBorder
                heading="Existing Sheet:"
                description={field.exisitingSheet}
              />
            ) : null}
          </Flex>
          <Box
            css={{
              marginBlock: "$4",
              height: "1px",
              background: "$neutral100",
            }}
          />
        </Flex>
      ) : null}
    </>
  );
};

const SingleMappingChipWrapper = ({
  heading,
  fields,
  hideBorder,
  placeholder,
  backgroundColor,
}: {
  heading: string;
  fields: {};
  hideBorder?: boolean;
  placeholder?: string;
  backgroundColor: string;
}) => {
  const modifiedFields = Object.values(fields).filter(
    (field: any) => field.id !== "ALL"
  );
  return (
    <>
      <Flex flexDirection="column" gap="$6" css={{ paddingBlock: "$8" }}>
        <Text size="sm" weight="bold" css={{ textTransform: "uppercase" }}>
          {heading}
        </Text>
        <Flex
          wrap="wrap"
          css={{
            columnGap: "$2",
            rowGap: "$4",
            "& > * ": {fontFamily: "'Roboto Mono', monospace !important" },
          }}
        >
          {modifiedFields.map((field: any) => {
            const chipRef = useRef(null);
            const name = `${!!placeholder ? placeholder : ""}${field?.name ?? field?.label}`;
            const currentChipWidth = (chipRef.current as any)?.offsetWidth;
            return (
              <Tooltip
                delayDuration={300}
                content={currentChipWidth >= 248 ? name : ""}
                size="md"
                sideOffset={4}
              >
                <Chip
                  ref={chipRef}
                  size="md"
                  css={{
                    background: backgroundColor,
                    maxWidth: 248,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "block",
                  }}
                >
                  {"$" + name}
                </Chip>
              </Tooltip>
            );
          })}
        </Flex>
      </Flex>
      {!hideBorder && (
        <Box
          css={{ marginBlock: "$4", height: "1px", background: "$neutral100" }}
        />
      )}
    </>
  );
};

const DashboardItem = ({
  onMappingEditHandler,
  icon,
  heading,
  description,
  fields,
  integrationName,
  isEnabled,
  handleEditField,
  id,
  handleDashboardPage,
  type,
  toggleDashboardField,
  deleteFieldHandler,
}: {
  onMappingEditHandler:any ;
  icon: ReactNode;
  heading: string;
  description: string;
  fields: any;
  isEnabled: boolean;
  integrationName: string;
  handleEditField: (field: any) => void;
  id: string | number;
  handleDashboardPage: (value: boolean, type: string) => void;
  type: string;
  toggleDashboardField: (id: string | number, status: boolean) => void;
  deleteFieldHandler: (id: string | number) => void;
}) => {
  const [isMappingDisplayed, setIsMappingDisplayed] = useState(false);

  const getDefaultFieldValue = (defaultValue: {
    type: string;
    value: any | string;
  }) => {
    let field = "--";
    switch (defaultValue?.type) {
      case "DATE_TIME": {
        field = dayjs(
          `${defaultValue.value.year}-${defaultValue.value.month}-${defaultValue.value.day}`
        ).format("D MMM, YYYY . hh:mm A");
        break;
      }
      case "STRING": {
        field = defaultValue?.value;
        break;
      }
      default: {
        field = defaultValue?.value?.label;
        break;
      }
    }
    return field;
  };

  return (
    <Flex
      flexDirection="column"
      css={{
        marginTop: "$8",
      }}
    >
      <Flex
        css={{
          border: isMappingDisplayed
            ? "$borderWidths$xs solid $black400"
            : "$borderWidths$xs solid $neutral200",
          borderRadius: isMappingDisplayed ? "$2xl $2xl 0 0" : "$2xl",
          padding: "$10 $12",
          width: "100%",
          backgroundColor: isMappingDisplayed
            ? "rgba(100, 116, 139, 0.04)"
            : "$white900",
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          alignItems="center"
          gap="$4"
          css={{ cursor: "pointer" }}
          onClick={() => setIsMappingDisplayed(!isMappingDisplayed)}
        >
          {isMappingDisplayed ? (
            <ChevronDownIcon size={40} color="#848484" />
          ) : (
            <ChevronRightIcon size={40} color="#848484" />
          )}
          <Flex alignItems="center" gap="$4">
            {icon}
            <Flex gap="$1" flexDirection="column">
              <Text size="md" weight="bold">
                {heading}
              </Text>
              <Text size="sm" css={{ color: "$neutral600" }}>
                {description}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex alignItems="center" gap="$12">
          <Switch
            size="md"
            checked={isEnabled}
            onChange={(value) => toggleDashboardField(id, value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                variant="ghost"
                color="default"
                size="lg"
                icon={<EllipsisVerticalIcon />}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              css={{ minWidth: 180, zIndex: 10 }}
              sideOffset={4}
              align="end"
            >
              <DropdownMenuItem
                onClick={() => {
                  onMappingEditHandler(id)
                  handleEditField({
                    type,
                    values: fields,
                    id,
                  });
                  handleDashboardPage(false, type);
                }}
              >
                <Flex alignItems="center" gap="$2">
                  <PencilIcon color="#6A6A6A" size={20} />
                  <Text size="sm">Edit</Text>
                </Flex>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteFieldHandler(id)}>
                <Flex alignItems="center" gap="$2">
                  <DeleteIcon color="#6A6A6A" size={20} />
                  <Text size="sm">Delete</Text>
                </Flex>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Flex>
      </Flex>
      <Box
        css={{
          height: isMappingDisplayed ? "100%" : 0,
        }}
      >
        <Box
          css={{
            borderInline: "$borderWidths$xs solid $black400",
            maxHeight: 432,
            height: "100%",
            position: "relative",
            overflow: "auto",
          }}
        >
          {fields?.length ? (
            <Table css={{ borderCollapse: "collapse", width: "100%" }}>
              <Thead
                css={{
                  background: "$white900",
                  "& th": {
                    padding: "$7 $8",
                    fontSize: "$sm",
                    lineHeight: "$sm",
                    textAlign: "left",
                    borderInline: "none",
                  },
                  borderBottom: "$borderWidths$xs solid $neutral100",
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                }}
              >
                <Th css={{ paddingLeft: "$38 !important" }}>Type</Th>
                <Th>SurveySparrow Field</Th>
                <Th>{`${integrationName} Field`}</Th>
                <Th css={{ paddingRight: "$20 !important" }}>Default Value</Th>
              </Thead>
              <Tbody
                css={{
                  "& tr:last-child": {
                    borderBottom: 0,
                    "& td": {
                      borderBottom: 0,
                    },
                  },
                }}
              >
                {fields.map((field: any) => {
                  return (
                    <Tr
                      css={{
                        borderBottom: "$borderWidths$xs solid $neutral100",
                        "& td": {
                          padding: "$7 $8",
                          fontSize: "$sm",
                          lineHeight: "$sm",
                          borderInline: "none",
                        },
                        "&:hover": {
                          background: "none !important"
                        },
                        "& td:first-child": {
                          paddingLeft: "$38 !important",
                        },
                        "& td:last-child": {
                          paddingRight: "$20 !important",
                        },
                      }}
                    >
                      <Td>{field.mappedType?.label ?? "--"}</Td>
                      <Td>{field.surveySparrowField?.label ?? "--"}</Td>
                      <Td>{field.integrationField?.label ?? "--"}</Td>
                      <Td>
                        {getDefaultFieldValue(field.defaultValue) ?? "--"}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          ) : null}
        </Box>
        {isMappingDisplayed && (
          <Box
            css={{
              padding: "$8 $32",
              border: "$borderWidths$xs solid $black400",
              borderRadius: "0 0 $2xl $2xl",
              height: "100%",
            }}
          >
            <Button
              size="sm"
              onClick={() => {
                onMappingEditHandler(id);
                handleEditField({
                  type,
                  values: fields,
                  id,
                });
                handleDashboardPage(false, type);
              }}
              leftIcon={<PencilIcon />}
              color={"primary"}
              variant="ghost"
            >
              {`Edit ${heading}`}
            </Button>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

const DropdownItem = ({
  icon,
  heading,
  description,
  onClickHandler,
  isDisabled,
  toolTipContent,
}: {
  icon: ReactNode;
  heading: string;
  description: string;
  onClickHandler: () => void;
  isDisabled?: boolean;
  toolTipContent: string;
}) => {
  return (
    <Tooltip content={isDisabled ? toolTipContent : ""} css={{
      zIndex: "99999999",
      minWidth: "280px",
      textAlign: "center"
    }}>
      <Flex>
        <DropdownMenuItem
          css={{ cursor: isDisabled ? "not-allowed !important" : "pointer" }}
          onClick={onClickHandler}
          disabled={isDisabled}
        >
          <Flex alignItems="flex-start" gap="$4">
            <Box css={{ width: "$6" }}>{icon}</Box>
            <Flex flexDirection="column">
              <Text size="md">{heading}</Text>
              <Text size="sm" css={{ color: "$neutral700" }}>
                {description}
              </Text>
            </Flex>
          </Flex>
        </DropdownMenuItem>
      </Flex>
    </Tooltip>
  );
};
