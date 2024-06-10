"use client";
import { Spinner } from "@/app/components";
// must convert this component from server to client component bc requires user interaction
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [deleteError, setDeleteError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setDeleteError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        {/* serves as container for the dialog and manages state (open or closed) */}
        <AlertDialog.Trigger>
          {/* trigger for opening the dialog and wraps around delete btn component- when btn is clicked, it triggers the AlertDialog to open */}
          <Button color="red" disabled={isDeleting}>
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
          {/* disabling btn so to not throw an error if delay */}
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
              <Button color="red" onClick={deleteIssue}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={deleteError}>
        {/* this root has a prop called open that can be set t/f */}
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button
            variant="soft"
            color="gray"
            mt="2"
            onClick={() => setDeleteError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
