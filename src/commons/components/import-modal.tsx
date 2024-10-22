import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Flex,
  FormInput,
  Heading,
  IconButton
} from "@sparrowengg/twigs-react";
import { CloseIcon } from "@sparrowengg/twigs-react-icons";
import React from "react";
import { ImportModalProps } from "../../mapping/types";

const ImportModal = ({
  onCloseHandler,
  onInputHandler,
  onSaveHandler,
}: ImportModalProps) => {
  return (
    <Dialog open>
      <DialogContent css={{
        padding: 0,
        borderRadius: "$3xl"
      }}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          css={{
            padding: "$8 $12",
            borderBottom: "$borderWidths$xs solid $neutral200"
          }}
        >
          <Heading size="h6" css={{ color: "$neutral900" }}>New Custom Property</Heading>
          <IconButton
            variant="ghost"
            color="default"
            icon={<CloseIcon />}
            size="lg"
            css={{ 
              "& svg": {
                color: "#64748B !important"
              }
            }}
            onClick={() => onCloseHandler()}
          />
        </Flex>
        <Box css={{
          padding: "$12"
        }}>
          <FormInput
            label={"Property Name"}
            requiredIndicator
            onChange={(event) => onInputHandler(event.currentTarget.value)}
            size="lg"
          />
        </Box>
        <Flex gap="$4" css={{
          justifyContent: "flex-end",
          padding: "$8 $12"
        }}>
          <Button size="lg" variant="ghost" color="default" onClick={onCloseHandler}>
            Cancel
          </Button>
          <Button size="lg" onClick={onSaveHandler}>
            {"Save"}
          </Button>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};

export default ImportModal;
