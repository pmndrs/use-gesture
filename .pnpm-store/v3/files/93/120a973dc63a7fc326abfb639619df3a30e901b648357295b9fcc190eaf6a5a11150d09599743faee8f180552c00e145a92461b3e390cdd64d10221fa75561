import * as React from "react";
import {
  unstable_useComboboxState as useComboboxState,
  unstable_Combobox as Combobox,
  unstable_ComboboxPopover as ComboboxPopover,
  unstable_ComboboxOption as ComboboxOption,
} from "reakit/Combobox";

import "./style.css";

export default function ComboboxVisible() {
  const combobox = useComboboxState({ visible: true, gutter: 8 });
  return (
    <>
      <Combobox {...combobox} aria-label="Color" />
      <ComboboxPopover {...combobox} aria-label="Colors">
        <ComboboxOption {...combobox} value="Red" />
        <ComboboxOption {...combobox} value="Green" />
        <ComboboxOption {...combobox} value="Blue" />
      </ComboboxPopover>
    </>
  );
}
