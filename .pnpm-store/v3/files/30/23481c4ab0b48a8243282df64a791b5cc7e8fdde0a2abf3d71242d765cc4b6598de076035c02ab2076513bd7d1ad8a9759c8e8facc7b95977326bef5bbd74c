import * as React from "react";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton,
} from "reakit/Form";

type Props = {
  initialName: string;
  onRename: (newName: string) => void;
};

function RenameForm({ initialName = "", onRename }: Props) {
  const form = useFormState({
    values: { name: initialName },
    onValidate: (values) => {
      if (!values.name) {
        const errors = {
          name: "You must provide a name!",
        };
        throw errors;
      }
    },
    onSubmit: (values) => onRename(values.name),
  });
  return (
    <Form {...form}>
      <FormLabel {...form} name="name">
        New name
      </FormLabel>
      <FormInput {...form} name="name" />
      <FormMessage {...form} name="name" />
      <FormSubmitButton {...form}>Rename</FormSubmitButton>
    </Form>
  );
}

export default function DialogWithForm() {
  const [name, setName] = React.useState("Name");
  const dialog = useDialogState();
  return (
    <>
      {name}
      <DialogDisclosure {...dialog}>
        <span role="img" aria-label={`Change name of ${name}`}>
          ✏️
        </span>
      </DialogDisclosure>
      <Dialog {...dialog} aria-label="Choose a new name">
        <RenameForm
          initialName={name}
          onRename={(newName: string) => {
            setName(newName);
            dialog.hide();
          }}
        />
      </Dialog>
    </>
  );
}
