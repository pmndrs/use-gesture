import * as React from "react";
import { render, fireEvent, click, focus, press } from "reakit-test-utils";
import { Dialog, DialogDisclosure, DialogBackdrop, useDialogState } from "..";

test("clicking on disclosure opens the dialog", () => {
  const Test = () => {
    const dialog = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} tabIndex={0} aria-label="dialog" />
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure = getByText("disclosure");
  const dialog = getByLabelText("dialog");
  expect(dialog).not.toBeVisible();
  click(disclosure);
  expect(dialog).toBeVisible();
});

test("focus the first tabbable element when dialog opens", () => {
  const Test = () => {
    const dialog = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog">
          <button>button1</button>
          <button>button2</button>
        </Dialog>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const disclosure = getByText("disclosure");
  const button1 = getByText("button1");
  expect(document.body).toHaveFocus();
  click(disclosure);
  expect(button1).toHaveFocus();
});

test("focus the dialog element when dialog opens with tabIndex={0}", () => {
  const Test = () => {
    const dialog = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} tabIndex={0} aria-label="dialog">
          <button>button1</button>
          <button>button2</button>
        </Dialog>
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure = getByText("disclosure");
  const dialog = getByLabelText("dialog");
  expect(document.body).toHaveFocus();
  click(disclosure);
  expect(dialog).toHaveFocus();
});

test("does not auto focus when autoFocusOnShow is falsy", () => {
  const Test = () => {
    const dialog = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog
          {...dialog}
          aria-label="dialog"
          unstable_autoFocusOnShow={false}
        >
          <button>button1</button>
          <button>button2</button>
        </Dialog>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const disclosure = getByText("disclosure");
  expect(document.body).toHaveFocus();
  click(disclosure);
  expect(disclosure).toHaveFocus();
});

test("does not auto focus when dialog was mounted visible", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true });
    return (
      <Dialog {...dialog} aria-label="dialog">
        <button>button1</button>
        <button>button2</button>
      </Dialog>
    );
  };
  render(<Test />);
  expect(document.body).toHaveFocus();
});

test("focus the first tabbable element when non-modal dialog opens", () => {
  const Test = () => {
    const dialog = useDialogState({ modal: false });
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog">
          <button>button1</button>
          <button>button2</button>
        </Dialog>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const disclosure = getByText("disclosure");
  const button1 = getByText("button1");
  expect(document.body).toHaveFocus();
  click(disclosure);
  expect(button1).toHaveFocus();
});

test("does not auto focus non-modal when autoFocusOnShow is falsy", () => {
  const Test = () => {
    const dialog = useDialogState({ modal: false });
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog
          {...dialog}
          aria-label="dialog"
          unstable_autoFocusOnShow={false}
        >
          <button>button1</button>
          <button>button2</button>
        </Dialog>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const disclosure = getByText("disclosure");
  expect(document.body).toHaveFocus();
  click(disclosure);
  expect(disclosure).toHaveFocus();
});

test("focus a given element when dialog opens and initialFocusRef is passed in", () => {
  const Test = () => {
    const dialog = useDialogState();
    const ref = React.useRef<HTMLButtonElement>(null);
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog" unstable_initialFocusRef={ref}>
          <button>button1</button>
          <button ref={ref}>button2</button>
        </Dialog>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const disclosure = getByText("disclosure");
  const button2 = getByText("button2");
  expect(document.body).toHaveFocus();
  click(disclosure);
  expect(button2).toHaveFocus();
});

test("focus a given element when dialog opens and initial focus has been manually set using React.useEffect", () => {
  const Test = () => {
    const dialog = useDialogState();
    const ref = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
      if (dialog.visible && ref.current) {
        ref.current.focus();
      }
    }, [dialog.visible]);

    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog">
          <button>button1</button>
          <button ref={ref}>button2</button>
        </Dialog>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const disclosure = getByText("disclosure");
  const button2 = getByText("button2");
  expect(document.body).toHaveFocus();
  click(disclosure);
  expect(button2).toHaveFocus();
});

test("focus a given element when dialog opens and initial focus has been manually set using autoFocus", () => {
  const Test = () => {
    const dialog = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog">
          {(props) =>
            dialog.visible && (
              <div {...props}>
                <button>button1</button>
                <button autoFocus>button2</button>
              </div>
            )
          }
        </Dialog>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const disclosure = getByText("disclosure");
  expect(document.body).toHaveFocus();
  expect(() => getByText("button2")).toThrow();
  click(disclosure);
  const button2 = getByText("button2");
  expect(button2).toHaveFocus();
});

test("focus dialog itself if there is no tabbable descendant element", () => {
  const Test = () => {
    const dialog = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog" />
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure = getByText("disclosure");
  const dialog = getByLabelText("dialog");
  expect(document.body).toHaveFocus();
  click(disclosure);
  expect(dialog).toHaveFocus();
  expect(console).toHaveWarned();
});

test("focus is trapped within the dialog", () => {
  const Test = () => {
    const dialog = useDialogState();
    return (
      <>
        <button>button1</button>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog">
          <button>button2</button>
          <button>button3</button>
        </Dialog>
        <button>button4</button>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const disclosure = getByText("disclosure");
  const button2 = getByText("button2");
  const button3 = getByText("button3");
  click(disclosure);
  expect(button2).toHaveFocus();
  press.Tab();
  expect(button3).toHaveFocus();
  press.Tab();
  expect(button2).toHaveFocus();
  press.ShiftTab();
  expect(button3).toHaveFocus();
});

test("focus is trapped within the dialog with tabIndex={0}", () => {
  const Test = () => {
    const dialog = useDialogState();
    return (
      <>
        <button>button1</button>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} tabIndex={0} aria-label="dialog">
          <button>button2</button>
          <button>button3</button>
        </Dialog>
        <button>button4</button>
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure = getByText("disclosure");
  const dialog = getByLabelText("dialog");
  const button2 = getByText("button2");
  const button3 = getByText("button3");
  click(disclosure);
  expect(dialog).toHaveFocus();
  press.Tab();
  expect(button2).toHaveFocus();
  press.Tab();
  expect(button3).toHaveFocus();
  press.Tab();
  expect(dialog).toHaveFocus();
  press.Tab();
  expect(button2).toHaveFocus();
  press.ShiftTab();
  expect(dialog).toHaveFocus();
});

test("focus is trapped within the dialog when hideOnClickOutside is falsy", () => {
  const Test = () => {
    const dialog = useDialogState();
    return (
      <>
        <button>button1</button>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog" hideOnClickOutside={false}>
          <button>button2</button>
          <button>button3</button>
        </Dialog>
        <button>button4</button>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const disclosure = getByText("disclosure");
  const button2 = getByText("button2");
  const button3 = getByText("button3");
  click(disclosure);
  expect(button2).toHaveFocus();
  press.Tab();
  expect(button3).toHaveFocus();
  press.Tab();
  expect(button2).toHaveFocus();
  press.ShiftTab();
  expect(button3).toHaveFocus();
});

test("focus is trapped within an empty dialog", () => {
  const Test = () => {
    const dialog = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog" />
        <button>button2</button>
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure = getByText("disclosure");
  const dialog = getByLabelText("dialog");
  click(disclosure);
  expect(dialog).toHaveFocus();
  expect(console).toHaveWarned();
  press.Tab();
  expect(dialog).toHaveFocus();
  press.Tab();
  expect(dialog).toHaveFocus();
  press.ShiftTab();
  expect(dialog).toHaveFocus();
});

test("focus is not trapped within the non-modal dialog", async () => {
  const Test = () => {
    const dialog = useDialogState({ modal: false });
    return (
      <>
        <button>button1</button>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog" hideOnClickOutside={false}>
          <button>button2</button>
          <button>button3</button>
        </Dialog>
        <button>button4</button>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const button1 = getByText("button1");
  const disclosure = getByText("disclosure");
  const button2 = getByText("button2");
  const button3 = getByText("button3");
  const button4 = getByText("button4");
  click(disclosure);
  expect(button2).toHaveFocus();
  press.Tab();
  expect(button3).toHaveFocus();
  press.Tab();
  expect(button4).toHaveFocus();
  press.Tab();
  expect(button1).toHaveFocus();
  press.Tab();
  expect(disclosure).toHaveFocus();
  press.Tab();
  expect(button2).toHaveFocus();
  press.ShiftTab();
  expect(disclosure).toHaveFocus();
});

test("esc closes the dialog", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true });
    return <Dialog {...dialog} aria-label="dialog" />;
  };
  const { getByLabelText } = render(<Test />);
  const dialog = getByLabelText("dialog");
  expect(dialog).toBeVisible();
  press.Escape(dialog);
  expect(dialog).not.toBeVisible();
  expect(console).toHaveWarned();
});

test("esc does not close the dialog when hideOnEsc is falsy", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true });
    return <Dialog {...dialog} aria-label="dialog" hideOnEsc={false} />;
  };
  const { getByLabelText } = render(<Test />);
  const dialog = getByLabelText("dialog");
  expect(dialog).toBeVisible();
  press.Escape(dialog);
  expect(dialog).toBeVisible();
});

test("clicking outside closes the dialog", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true });
    return <Dialog {...dialog} aria-label="dialog" />;
  };
  const { getByLabelText, baseElement } = render(<Test />);
  const dialog = getByLabelText("dialog");
  expect(dialog).toBeVisible();
  click(baseElement);
  expect(dialog).not.toBeVisible();
  expect(console).toHaveWarned();
});

test("clicking on disclosure closes the dialog", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true });
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog" />
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure = getByText("disclosure");
  const dialog = getByLabelText("dialog");
  expect(dialog).toBeVisible();
  click(disclosure);
  expect(dialog).not.toBeVisible();
});

test("clicking on any of multiple disclosures closes the dialog", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true });
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <DialogDisclosure {...dialog}>disclosure2</DialogDisclosure>
        <Dialog {...dialog} tabIndex={0} aria-label="dialog" />
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  const dialog = getByLabelText("dialog");
  expect(dialog).toBeVisible();
  click(disclosure1);
  expect(dialog).not.toBeVisible();
  click(disclosure2);
  expect(dialog).toBeVisible();
  click(disclosure2);
  expect(dialog).not.toBeVisible();
});

test("clicking on an element inside disclosure closes the dialog", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true });
    return (
      <>
        <DialogDisclosure {...dialog}>
          <span data-testid="inside">disclosure</span>
        </DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog" />
      </>
    );
  };
  const { getByTestId, getByLabelText } = render(<Test />);
  const inside = getByTestId("inside");
  const dialog = getByLabelText("dialog");
  expect(dialog).toBeVisible();
  click(inside);
  expect(dialog).not.toBeVisible();
});

test("clicking outside does not close the dialog when hideOnClickOutside is falsy", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true });
    return (
      <Dialog {...dialog} aria-label="dialog" hideOnClickOutside={false} />
    );
  };
  const { getByLabelText, baseElement } = render(<Test />);
  const dialog = getByLabelText("dialog");
  expect(dialog).toBeVisible();
  click(baseElement);
  expect(dialog).toBeVisible();
});

test("clicking outside puts focus on the dialog when hideOnClickOutside is falsy", () => {
  const Test = () => {
    const dialog = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog" hideOnClickOutside={false}>
          <button>button</button>
        </Dialog>
      </>
    );
  };
  const { getByLabelText, getByText, baseElement } = render(<Test />);
  const disclosure = getByText("disclosure");
  const dialog = getByLabelText("dialog");
  const button = getByText("button");
  click(disclosure);
  expect(button).toHaveFocus();
  click(dialog);
  click(baseElement);
  expect(dialog).toHaveFocus();
});

test("focusing outside closes the non-modal dialog", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true, modal: false });
    return (
      <>
        <button>button</button>
        <Dialog {...dialog} aria-label="dialog" />
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const button = getByText("button");
  const dialog = getByLabelText("dialog");
  expect(dialog).toBeVisible();
  focus(button);
  expect(button).toHaveFocus();
  expect(dialog).not.toBeVisible();
});

test("focusing outside does not close the non-modal dialog when hideOnClickOutside is falsy", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true, modal: false });
    return (
      <>
        <button>button</button>
        <Dialog {...dialog} aria-label="dialog" hideOnClickOutside={false} />
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const button = getByText("button");
  const dialog = getByLabelText("dialog");
  expect(dialog).toBeVisible();
  focus(button);
  expect(button).toHaveFocus();
  expect(dialog).toBeVisible();
});

test("focusing disclosure does not close the non-modal dialog", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true, modal: false });
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog" />
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure = getByText("disclosure");
  const dialog = getByLabelText("dialog");
  expect(dialog).toBeVisible();
  focus(disclosure);
  expect(disclosure).toHaveFocus();
  expect(dialog).toBeVisible();
});

test("focus disclosure when dialog closes", () => {
  const Test = () => {
    const dialog = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} tabIndex={0} aria-label="dialog" />
      </>
    );
  };
  const { getByText, getByLabelText, baseElement } = render(<Test />);
  const disclosure = getByText("disclosure");
  const dialog = getByLabelText("dialog");
  click(disclosure);
  expect(dialog).toBeVisible();
  click(baseElement);
  expect(dialog).not.toBeVisible();
  expect(disclosure).toHaveFocus();
});

test("focus the disclosure that has been used to open the dialog when dialog closes", () => {
  const Test = () => {
    const dialog = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <DialogDisclosure {...dialog}>disclosure2</DialogDisclosure>
        <button onClick={dialog.toggle}>disclosure3</button>
        <Dialog {...dialog} tabIndex={0} aria-label="dialog" />
      </>
    );
  };
  const { getByText, getByLabelText, baseElement } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  const disclosure3 = getByText("disclosure3");
  const dialog = getByLabelText("dialog");

  focus(disclosure1);
  click(disclosure1);
  expect(dialog).toBeVisible();
  click(baseElement);
  expect(dialog).not.toBeVisible();
  expect(disclosure1).toHaveFocus();

  focus(disclosure2);
  click(disclosure2);
  expect(dialog).toBeVisible();
  click(baseElement);
  expect(dialog).not.toBeVisible();
  expect(disclosure2).toHaveFocus();

  focus(disclosure3);
  click(disclosure3);
  expect(dialog).toBeVisible();
  click(baseElement);
  expect(dialog).not.toBeVisible();
  expect(disclosure3).toHaveFocus();
});

test("focus disclosure when non-modal dialog closes", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true, modal: false });
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog" />
      </>
    );
  };
  const { getByText, getByLabelText, baseElement } = render(<Test />);
  const disclosure = getByText("disclosure");
  const dialog = getByLabelText("dialog");
  click(baseElement);
  expect(dialog).not.toBeVisible();
  expect(disclosure).toHaveFocus();
});

test("focus a given element when dialog closes", () => {
  const Test = () => {
    const ref = React.useRef<HTMLButtonElement>(null);
    const dialog = useDialogState({ visible: true });
    return (
      <>
        <button ref={ref}>button</button>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog" unstable_finalFocusRef={ref} />
      </>
    );
  };
  const { getByText, getByLabelText, baseElement } = render(<Test />);
  const button = getByText("button");
  const dialog = getByLabelText("dialog");
  click(baseElement);
  expect(dialog).not.toBeVisible();
  expect(button).toHaveFocus();
});

test("focusing an element outside keeps focus on it after the non-modal dialog closes", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true, modal: false });
    return (
      <>
        <button>button</button>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog" />
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const button = getByText("button");
  const dialog = getByLabelText("dialog");
  focus(button);
  expect(dialog).not.toBeVisible();
  expect(button).toHaveFocus();
});

test("focus a given element when non-modal dialog closes", () => {
  const Test = () => {
    const ref = React.useRef<HTMLButtonElement>(null);
    const dialog = useDialogState({ visible: true, modal: false });
    return (
      <>
        <button ref={ref}>button</button>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog" unstable_finalFocusRef={ref} />
      </>
    );
  };
  const { getByText, getByLabelText, baseElement } = render(<Test />);
  const button = getByText("button");
  const dialog = getByLabelText("dialog");
  click(baseElement);
  expect(dialog).not.toBeVisible();
  expect(button).toHaveFocus();
});

test("focus the first tabbable element when nested dialog opens", () => {
  const Test = () => {
    const dialog = useDialogState();
    const dialog2 = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog1">
          <button>button1</button>
          <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
          <Dialog {...dialog2} aria-label="dialog2">
            <button>button2</button>
            <button>button3</button>
          </Dialog>
        </Dialog>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const disclosure1 = getByText("disclosure");
  const disclosure2 = getByText("disclosure2");
  const button1 = getByText("button1");
  const button2 = getByText("button2");
  expect(document.body).toHaveFocus();
  click(disclosure1);
  expect(button1).toHaveFocus();
  click(disclosure2);
  expect(button2).toHaveFocus();
});

test("focus is trapped within the nested dialog", () => {
  const Test = () => {
    const dialog = useDialogState();
    const dialog2 = useDialogState();
    return (
      <>
        <button>button1</button>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog1">
          <button>button2</button>
          <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
          <Dialog {...dialog2} aria-label="dialog2">
            <button>button3</button>
            <button>button4</button>
          </Dialog>
        </Dialog>
        <button>button5</button>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  const button3 = getByText("button3");
  const button4 = getByText("button4");
  click(disclosure1);
  click(disclosure2);
  expect(button3).toHaveFocus();
  press.Tab();
  expect(button4).toHaveFocus();
  press.Tab();
  expect(button3).toHaveFocus();
  press.ShiftTab();
  expect(button4).toHaveFocus();
});

test("focus is not trapped within the nested non-modal dialog", async () => {
  const Test = () => {
    const dialog = useDialogState();
    const dialog2 = useDialogState({ modal: false });
    return (
      <>
        <button>button1</button>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog1">
          <button>button2</button>
          <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
          <Dialog {...dialog2} aria-label="dialog2" hideOnClickOutside={false}>
            <button>button3</button>
            <button>button4</button>
          </Dialog>
          <button>button5</button>
        </Dialog>
        <button>button6</button>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  const button2 = getByText("button2");
  const button3 = getByText("button3");
  const button4 = getByText("button4");
  const button5 = getByText("button5");
  click(disclosure1);
  click(disclosure2);
  expect(button3).toHaveFocus();
  press.Tab();
  expect(button4).toHaveFocus();
  press.Tab();
  expect(button5).toHaveFocus();
  press.Tab();
  expect(button2).toHaveFocus();
  press.Tab();
  expect(disclosure2).toHaveFocus();
  press.Tab();
  expect(button3).toHaveFocus();
  press.ShiftTab();
  expect(disclosure2).toHaveFocus();
});

test("focus is not trapped within two nested non-modal dialog", async () => {
  const Test = () => {
    const dialog = useDialogState({ modal: false });
    const dialog2 = useDialogState({ modal: false });
    return (
      <>
        <button>button1</button>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog1" hideOnClickOutside={false}>
          <button>button2</button>
          <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
          <Dialog {...dialog2} aria-label="dialog2" hideOnClickOutside={false}>
            <button>button3</button>
            <button>button4</button>
          </Dialog>
          <button>button5</button>
        </Dialog>
        <button>button6</button>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const button1 = getByText("button1");
  const disclosure1 = getByText("disclosure1");
  const button2 = getByText("button2");
  const disclosure2 = getByText("disclosure2");
  const button3 = getByText("button3");
  const button4 = getByText("button4");
  const button5 = getByText("button5");
  const button6 = getByText("button6");
  click(disclosure1);
  click(disclosure2);
  expect(button3).toHaveFocus();
  press.Tab();
  expect(button4).toHaveFocus();
  press.Tab();
  expect(button5).toHaveFocus();
  press.Tab();
  expect(button6).toHaveFocus();
  press.Tab();
  expect(button1).toHaveFocus();
  press.Tab();
  expect(disclosure1).toHaveFocus();
  press.Tab();
  expect(button2).toHaveFocus();
  press.Tab();
  expect(disclosure2).toHaveFocus();
  press.Tab();
  expect(button3).toHaveFocus();
  press.ShiftTab();
  expect(disclosure2).toHaveFocus();
});

test("clicking on the nested dialog does not close the parent dialog", () => {
  const Test = () => {
    const dialog = useDialogState();
    const dialog2 = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog1">
          <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
          <Dialog {...dialog2} tabIndex={0} aria-label="dialog2" />
        </Dialog>
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  const dialog1 = getByLabelText("dialog1");
  const dialog2 = getByLabelText("dialog2");
  click(disclosure1);
  click(disclosure2);
  expect(dialog2).toHaveFocus();
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
  click(dialog2);
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
});

test("clicking on the nested non-modal dialog does not close the parent dialog", () => {
  const Test = () => {
    const dialog = useDialogState();
    const dialog2 = useDialogState({ modal: false });
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog1">
          <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
          <Dialog {...dialog2} tabIndex={0} aria-label="dialog2" />
        </Dialog>
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  const dialog1 = getByLabelText("dialog1");
  const dialog2 = getByLabelText("dialog2");
  click(disclosure1);
  click(disclosure2);
  expect(dialog2).toHaveFocus();
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
  click(dialog2);
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
});

test("clicking on the nested dialog does not close the parent non-modal dialog", () => {
  const Test = () => {
    const dialog = useDialogState({ modal: false });
    const dialog2 = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog1">
          <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
          <Dialog {...dialog2} tabIndex={0} aria-label="dialog2" />
        </Dialog>
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  const dialog1 = getByLabelText("dialog1");
  const dialog2 = getByLabelText("dialog2");
  click(disclosure1);
  click(disclosure2);
  expect(dialog2).toHaveFocus();
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
  click(dialog2);
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
});

test("clicking on the nested dialog does not close the grandparent non-modal dialog", () => {
  const Test = () => {
    const dialog = useDialogState({ modal: false });
    const dialog2 = useDialogState();
    const dialog3 = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog1">
          <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
          <Dialog {...dialog2} aria-label="dialog2">
            <DialogDisclosure {...dialog3}>disclosure3</DialogDisclosure>
            <Dialog {...dialog3} tabIndex={0} aria-label="dialog3" />
          </Dialog>
        </Dialog>
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  const disclosure3 = getByText("disclosure3");
  const dialog1 = getByLabelText("dialog1");
  const dialog2 = getByLabelText("dialog2");
  const dialog3 = getByLabelText("dialog3");
  click(disclosure1);
  click(disclosure2);
  click(disclosure3);
  expect(dialog3).toHaveFocus();
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
  expect(dialog3).toBeVisible();
  click(dialog3);
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
  expect(dialog3).toBeVisible();
});

test("clicking on the parent dialog closes the nested dialog", () => {
  const Test = () => {
    const dialog = useDialogState();
    const dialog2 = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog1">
          <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
          <Dialog {...dialog2} tabIndex={0} aria-label="dialog2" />
        </Dialog>
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  const dialog1 = getByLabelText("dialog1");
  const dialog2 = getByLabelText("dialog2");
  click(disclosure1);
  click(disclosure2);
  expect(dialog2).toHaveFocus();
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
  click(dialog1);
  expect(dialog1).toBeVisible();
  expect(dialog2).not.toBeVisible();
});

test("clicking on the parent dialog closes the nested non-modal dialog", () => {
  const Test = () => {
    const dialog = useDialogState();
    const dialog2 = useDialogState({ modal: false });
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog1">
          <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
          <Dialog {...dialog2} tabIndex={0} aria-label="dialog2" />
        </Dialog>
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  const dialog1 = getByLabelText("dialog1");
  const dialog2 = getByLabelText("dialog2");
  click(disclosure1);
  click(disclosure2);
  expect(dialog2).toHaveFocus();
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
  click(dialog1);
  expect(dialog1).toBeVisible();
  expect(dialog2).not.toBeVisible();
});

test("clicking on the parent non-modal dialog closes the nested non-modal dialog", () => {
  const Test = () => {
    const dialog = useDialogState({ modal: false });
    const dialog2 = useDialogState({ modal: false });
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog1">
          <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
          <Dialog {...dialog2} tabIndex={0} aria-label="dialog2" />
        </Dialog>
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  const dialog1 = getByLabelText("dialog1");
  const dialog2 = getByLabelText("dialog2");
  click(disclosure1);
  click(disclosure2);
  expect(dialog2).toHaveFocus();
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
  click(dialog1);
  expect(dialog1).toBeVisible();
  expect(dialog2).not.toBeVisible();
});

test("clicking on the parent non-modal dialog closes the nested dialog", () => {
  const Test = () => {
    const dialog = useDialogState({ modal: false });
    const dialog2 = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog1">
          <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
          <Dialog {...dialog2} tabIndex={0} aria-label="dialog2" />
        </Dialog>
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  const dialog1 = getByLabelText("dialog1");
  const dialog2 = getByLabelText("dialog2");
  click(disclosure1);
  click(disclosure2);
  expect(dialog2).toHaveFocus();
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
  click(dialog1);
  expect(dialog1).toBeVisible();
  expect(dialog2).not.toBeVisible();
});

test("esc closes nested dialog, but not parent dialog", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true });
    const dialog2 = useDialogState({ visible: true });
    return (
      <Dialog {...dialog} aria-label="dialog1">
        <Dialog {...dialog2} aria-label="dialog2" />
      </Dialog>
    );
  };
  const { getByLabelText } = render(<Test />);
  const dialog1 = getByLabelText("dialog1");
  const dialog2 = getByLabelText("dialog2");
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
  press.Escape(dialog2);
  expect(dialog1).toBeVisible();
  expect(dialog2).not.toBeVisible();
  expect(console).toHaveWarned();
});

test("esc on parent dialog closes nested dialogs", () => {
  const Test = () => {
    const dialog = useDialogState({ visible: true });
    const dialog2 = useDialogState({ visible: true, modal: false });
    return (
      <Dialog {...dialog} aria-label="dialog1">
        <Dialog {...dialog2} aria-label="dialog2" />
      </Dialog>
    );
  };
  const { getByLabelText } = render(<Test />);
  const dialog1 = getByLabelText("dialog1");
  const dialog2 = getByLabelText("dialog2");
  expect(dialog1).toBeVisible();
  expect(dialog2).toBeVisible();
  press.Escape(dialog1);
  expect(dialog1).not.toBeVisible();
  expect(dialog2).not.toBeVisible();
  expect(console).toHaveWarned();
});

test("disables hover outside", () => {
  const fn = jest.fn();
  const Test = () => {
    const dialog = useDialogState({ visible: true });
    return (
      <>
        <button onMouseOver={fn} onMouseOut={fn} onBlur={fn} onFocus={fn}>
          button
        </button>
        <Dialog {...dialog} aria-label="dialog" />
      </>
    );
  };
  const { getByLabelText, getByText } = render(<Test />);
  const button = getByText("button");
  const dialog = getByLabelText("dialog");
  expect(dialog).toBeVisible();
  fireEvent.mouseOver(button);
  expect(fn).not.toBeCalled();
  fireEvent.mouseOut(button);
  expect(fn).not.toBeCalled();
});

test("opening a nested orphan dialog closes the parent dialog", () => {
  const Test = () => {
    const dialog = useDialogState();
    const dialog2 = useDialogState();
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <Dialog {...dialog} aria-label="dialog1">
          <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
          <Dialog
            {...dialog2}
            tabIndex={0}
            aria-label="dialog2"
            unstable_orphan
          />
        </Dialog>
      </>
    );
  };
  const { getByText, getByLabelText } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  const dialog1 = getByLabelText("dialog1");
  const dialog2 = getByLabelText("dialog2");
  click(disclosure1);
  expect(dialog1).toBeVisible();
  click(disclosure2);
  expect(dialog1).not.toBeVisible();
  expect(dialog2).toBeVisible();
  expect(dialog2).toHaveFocus();
});

test("nested modal dialog with backdrop markup", () => {
  const Test = () => {
    const dialog = useDialogState({ baseId: "dialog1" });
    const dialog2 = useDialogState({ baseId: "dialog2" });
    return (
      <>
        <DialogDisclosure {...dialog}>disclosure1</DialogDisclosure>
        <DialogBackdrop {...dialog}>
          <Dialog {...dialog} aria-label="dialog1">
            <DialogDisclosure {...dialog2}>disclosure2</DialogDisclosure>
            <Dialog {...dialog2} tabIndex={0} aria-label="dialog2" />
          </Dialog>
        </DialogBackdrop>
      </>
    );
  };
  const { getByText, baseElement } = render(<Test />);
  const disclosure1 = getByText("disclosure1");
  const disclosure2 = getByText("disclosure2");
  click(disclosure1);
  click(disclosure2);
  expect(baseElement.children).toMatchInlineSnapshot(`
    HTMLCollection [
      <div>
        <button
          aria-controls="dialog1"
          aria-expanded="true"
          aria-haspopup="dialog"
          type="button"
        >
          disclosure1
        </button>
      </div>,
      <div
        aria-hidden="true"
        class="__reakit-focus-trap"
        style="position: fixed;"
        tabindex="0"
      />,
      <div
        class="__reakit-portal"
      >
        <div
          data-dialog-ref="dialog1"
          style=""
        >
          <div
            aria-label="dialog1"
            data-dialog="true"
            id="dialog1"
            role="dialog"
            style=""
            tabindex="-1"
          >
            <button
              aria-controls="dialog2"
              aria-expanded="true"
              aria-haspopup="dialog"
              type="button"
            >
              disclosure2
            </button>
          </div>
        </div>
        <div
          aria-hidden="true"
          class="__reakit-focus-trap"
          style="position: fixed;"
          tabindex="0"
        />
        <div
          class="__reakit-portal"
        >
          <div
            aria-label="dialog2"
            aria-modal="true"
            data-dialog="true"
            id="dialog2"
            role="dialog"
            style=""
            tabindex="0"
          />
        </div>
        <div
          aria-hidden="true"
          class="__reakit-focus-trap"
          style="position: fixed;"
          tabindex="0"
        />
      </div>,
      <div
        aria-hidden="true"
        class="__reakit-focus-trap"
        style="position: fixed;"
        tabindex="0"
      />,
    ]
  `);
});

test("should render the default tabIndex when none is specified", () => {
  function Test() {
    const dialog = useDialogState();
    return <Dialog {...dialog} aria-label="dialog" />;
  }

  const { getByLabelText } = render(<Test />);
  expect(getByLabelText("dialog")).toHaveAttribute("tabIndex", "-1");
});

// See https://github.com/reakit/reakit/issues/636
test("passing undefined to tabIndex should render the default tabIndex of -1", () => {
  function Test() {
    const dialog = useDialogState();
    return <Dialog {...dialog} aria-label="dialog" tabIndex={undefined} />;
  }

  const { getByLabelText } = render(<Test />);
  expect(getByLabelText("dialog")).toHaveAttribute("tabIndex", "-1");
});
