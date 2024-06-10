"use client";
// must convert this component from server to client component bc requires user interaction
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
      {/* serves as container for the dialog and manages state (open or closed) */}
      <AlertDialog.Trigger>
        {/* trigger for opening the dialog and wraps around delete btn component- when btn is clicked, it triggers the AlertDialog to open */}
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        {/* defines content of the dialog that will be displayed when the dialog is opened */}
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              {/* variant flavors the component's color. "soft" lightens the standalone gray */}
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">Delete Issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
