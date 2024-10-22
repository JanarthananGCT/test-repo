import {
  Box,
  Flex,
  Heading,
  Text,
  ThemeProvider,
  TooltipProvider,
} from "@sparrowengg/twigs-react";
import React, { ReactNode, useEffect, useState } from "react";
import CursorIcon from "../commons/icons/cursor";
import MappingIcon from "../commons/icons/mapping";
import Dashboard from "./components/dashboard";

export const IntegrationTemplate = ({
  onMappingEditHandler,
  fieldOptions,
  triggerEnabled,
  mappingEnabled,
  mappingComponent,
  handlePreviousNavigation,
  mapping,
  triggerComponent,
  trigger,
  integrationName,
  singleMappingComponent,
  onDeleteHandler,
  toggleDashboardField,
  dashboardDescription,
  mappingDescription,
  triggerDescription,
}: {
  onMappingEditHandler: any;
  fieldOptions: any
  triggerEnabled: boolean;
  mappingEnabled: boolean;
  mappingComponent?: any;
  singleMappingComponent?: any;
  mapping: {
    mappedFields: {
      type: string;
      fields: any;
    };
    setMappedFields: React.Dispatch<React.SetStateAction<any>>;
  };
  triggerComponent: any;
  trigger: {
    mappedFields: Array<any>;
    setMappedFields: React.Dispatch<React.SetStateAction<any>>;
  };
  integrationName: string;
  onDeleteHandler?: (id?: string | number) => void;
  toggleDashboardField?: (id?: string | number) => void;
  dashboardDescription: string;
  mappingDescription: string;
  triggerDescription: string;
  handlePreviousNavigation: () => void;
}) => {
  const hasMultiAccounts = mappingComponent?.props?.accounts?.hasAccounts;
  const isMappingFieldCompleted = !!mapping?.mappedFields?.fields?.length;
  const isTiggerFieldCompleted = !!trigger?.mappedFields?.length;
  const [hasDashboardPage, setHasDashboardPage] = useState(
    !!mapping?.mappedFields?.fields?.length || !!trigger?.mappedFields?.length
  );
  const [hasConfgurationType, setHasConfigurationType] = useState(
    (!!mappingComponent || !!singleMappingComponent) && !!triggerComponent
  );
  const [currentConfigurationType, setCurrentConfigurationType] = useState(
    !hasConfgurationType
      ? !!mappingComponent || !!singleMappingComponent
        ? "MAPPING"
        : "TRIGGER"
      : null
  ); // automatically switch to mapping or trigger screen if any one type is present
  const [editField, setEditField] = useState({});
  const [isMappingPage, setIsMappingPage] = useState(false);

  // temporary previous mapping state to handle within integration template wrapper
  const [tempPreviousMapping, setTempPreviousMapping] = useState(
    !(isMappingFieldCompleted && isTiggerFieldCompleted)
  );

  const navigateMappingPage = (value: boolean) =>
    setIsMappingPage(value ?? !isMappingPage);

  const handleEditField = (field: any) => {
    setEditField({
      type: field.type,
      fieldValues: field.values,
      id: field.id,
    });
  };

  const previousMappingHandler = () => {
    setHasConfigurationType(true);
    setCurrentConfigurationType(null);
    handlePreviousNavigation();
    if (!(isMappingFieldCompleted || isTiggerFieldCompleted)) {
      setHasDashboardPage(false);
    } else {
      setHasDashboardPage(true);
    }
    return;
  };

  const mappingClonedElementProps = {
    previousMappingHandler,
    editField: editField,
    integrationName,
    isMappingPage,
    navigateMappingPage,
    onSaveHandler: (editId?: string | number) => {
      const navigate = mappingComponent?.props?.onSaveHandler(editId);
      if (navigate) setHasDashboardPage(true);
    },
    hasPreviousMapping:
      tempPreviousMapping ?? mappingComponent?.props?.hasPreviousMapping,
  };
  const clonedSingleMappingProps = {
    editField: editField,
    previousMappingHandler,
    integrationName,
    onSaveHandler: async (editId?: string | number) => {
      const navigate =
        await singleMappingComponent?.props?.onSaveHandler(editId);
      if (navigate) setHasDashboardPage(true);
    },
    hasPreviousMapping:
      tempPreviousMapping ?? singleMappingComponent?.props?.hasPreviousMapping,
  };

  const triggerClonedProps = {
    editField,
    previousMappingHandler,
    integrationName,
    onSaveHandler: async (editId?: string | number) => {
      const navigate = await triggerComponent?.props?.onSaveHandler(editId);
      if (navigate) setHasDashboardPage(true);
    },
    previousMapping:
      tempPreviousMapping ?? triggerComponent?.props?.hasPreviousMapping,
  };

  const ClonedMappingComponent = !!mappingComponent
    ? React.cloneElement(mappingComponent, mappingClonedElementProps)
    : mappingComponent;
  const ClonedSingleMappingComponent = !!singleMappingComponent
    ? React.cloneElement(singleMappingComponent, clonedSingleMappingProps)
    : singleMappingComponent;

  const ClonedTriggerComponent = !!triggerComponent
    ? React.cloneElement(triggerComponent, triggerClonedProps)
    : triggerComponent;

  useEffect(() => {
    if (
      !isMappingFieldCompleted &&
      !isTiggerFieldCompleted &&
      hasDashboardPage
    ) {
      setHasDashboardPage(false);
      setHasConfigurationType(true);
      setCurrentConfigurationType(null);
    }
  }, [mapping?.mappedFields?.fields, trigger?.mappedFields]);

  return (
    <ThemeProvider
      theme={{
        fonts: {
          body: "DM Sans, Roboto Mono, sans-serif",
          heading: "DM Sans, Roboto Mono, sans-serif",
        },
      }}
    >
      <TooltipProvider delayDuration={300}>
        <Box css={{ width: "100%" }}>
          {hasDashboardPage ? (
            <Dashboard
            onMappingEditHandler={onMappingEditHandler}
            fieldOptions={fieldOptions}
            triggerEnabled={triggerEnabled}
            mappingEnabled={mappingEnabled}
              hasDropdownComponents={{
                mapping: !!ClonedMappingComponent || !!clonedSingleMappingProps,
                trigger: !!ClonedTriggerComponent,
              }}
              hasMultiAccounts={hasMultiAccounts}
              dashboardDescription={dashboardDescription}
              integrationName={integrationName}
              mappingFields={mapping?.mappedFields}
              triggerFields={trigger?.mappedFields}
              handleConfigurationType={(value: string) => {
                setCurrentConfigurationType(value);
                setHasDashboardPage(false);
                setTempPreviousMapping(true);
                setEditField({});
              }}
              handleEditField={handleEditField}
              deleteFieldHandler={onDeleteHandler}
              toggleDashboardField={toggleDashboardField}
              handleDashboardPage={(value: boolean, type: string) => {
                setHasDashboardPage(value as boolean);
                setCurrentConfigurationType(type);
                setHasConfigurationType(false);
              }}
            />
          ) : (
            <>
              {hasConfgurationType &&
              !["MAPPING", "TRIGGER"].includes(
                `${currentConfigurationType}`
              ) ? (
                <ConfigureTemplate
                  mappingDescription={mappingDescription}
                  triggerDescription={triggerDescription}
                  handleConfigurationType={(value: string) =>
                    setCurrentConfigurationType(value)
                  }
                />
              ) : (
                <>
                  {currentConfigurationType === "MAPPING" &&
                  !!singleMappingComponent
                    ? ClonedSingleMappingComponent
                    : null}
                  {currentConfigurationType === "MAPPING" && !!mappingComponent
                    ? ClonedMappingComponent
                    : null}
                  {currentConfigurationType !== "MAPPING" && !!triggerComponent
                    ? ClonedTriggerComponent
                    : null}
                </>
              )}
            </>
          )}
        </Box>
      </TooltipProvider>
    </ThemeProvider>
  );
};

const ConfigureTemplate = ({
  handleConfigurationType,
  mappingDescription,
  triggerDescription,
}: {
  handleConfigurationType: (value: string) => void;
  mappingDescription: string;
  triggerDescription: string;
}) => {
  return (
    <Box css={{ width: "100%", paddingTop: "$48" }}>
      <Flex flexDirection="column" alignItems="center">
        <Heading size="h5" css={{ color: "$neutral900" }}>
          Select Configuration Type
        </Heading>
        <Text
          size="sm"
          css={{ color: "$neutral600", lineHeight: "$sm", marginTop: "$2" }}
        >
          Choose either Mapping or Triggering to configure their respective
          actions.
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <Flex
          css={{ maxWidth: 960, width: "100%", marginTop: "$36" }}
          alignItems="center"
          justifyContent="center"
          gap="$20"
        >
          <TemplateCard
            icon={<CursorIcon />}
            heading="Trigger"
            description={triggerDescription}
            onClickHandler={() => handleConfigurationType("TRIGGER")}
          />
          <TemplateCard
            icon={<MappingIcon />}
            heading="Mapping"
            description={mappingDescription}
            onClickHandler={() => handleConfigurationType("MAPPING")}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

const TemplateCard = ({
  icon,
  heading,
  description,
  onClickHandler,
}: {
  icon: ReactNode;
  heading: string;
  description: string;
  onClickHandler: () => void;
}) => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      onClick={onClickHandler}
      css={{
        width: 350,
        height: 300,
        outline: "$borderWidths$xs solid $neutral200",
        borderRadius: "$4xl",
        position: "relative",
        cursor: "pointer",
        filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.06))",
        overflow: "auto",
        "&:hover": {
          outline: "$borderWidths$md solid $primary400",
          "& svg circle, rect, path": {
            stroke: "$primary500",
          },
          "& #ellipse": {
            opacity: "10%",
          },
        },
      }}
    >
      <Box
        id="ellipse"
        css={{
          position: "absolute",
          top: "-23%",
          filter: "blur(25px)",
          transition: "all .4s ease",
          width: 334,
          height: "$25",
          opacity: "0%",
          background: "$primary400",
          borderRadius: "50%",
        }}
      />
      <Box css={{ marginBlock: "$32 $16" }}>{icon}</Box>
      <Heading size="h6" css={{ color: "$neutral900" }}>
        {heading}
      </Heading>
      <Text
        size="md"
        css={{
          marginTop: "$8",
          color: "$neutral800",
          width: 222,
          textAlign: "center",
        }}
      >
        {description}
      </Text>
    </Flex>
  );
};
