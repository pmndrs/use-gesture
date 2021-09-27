import * as React from "react";
import {
  unstable_useComboboxState as useComboboxState,
  unstable_Combobox as Combobox,
  unstable_ComboboxPopover as ComboboxPopover,
  unstable_ComboboxOption as ComboboxOption,
} from "reakit/Combobox";

import "./style.css";

export default function ComboboxInlineAutoSelect() {
  const combobox = useComboboxState({
    inline: true,
    autoSelect: true,
    gutter: 8,
  });
  return (
    <>
      <Combobox {...combobox} aria-label="Fruit" />
      <ComboboxPopover {...combobox} aria-label="Fruits">
        <ComboboxOption {...combobox} value="Apple" />
        <ComboboxOption {...combobox} value="Orange" />
        <ComboboxOption {...combobox} value="Banana" />
      </ComboboxPopover>
    </>
  );
}
