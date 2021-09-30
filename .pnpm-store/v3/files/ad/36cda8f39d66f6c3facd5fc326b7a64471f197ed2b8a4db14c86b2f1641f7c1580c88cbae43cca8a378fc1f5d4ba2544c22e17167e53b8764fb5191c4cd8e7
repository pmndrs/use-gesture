import * as React from "react";
import {
  unstable_useComboboxState as useComboboxState,
  unstable_Combobox as Combobox,
  unstable_ComboboxPopover as ComboboxPopover,
  unstable_ComboboxOption as ComboboxOption,
} from "reakit/Combobox";
import { fruits } from "./fruits";

import "./style.css";

export default function ComboboxBothAutoSelect() {
  const combobox = useComboboxState({
    values: fruits,
    inline: true,
    autoSelect: true,
    gutter: 8,
  });
  return (
    <>
      <Combobox {...combobox} aria-label="Fruit" placeholder="Enter a fruit" />
      <ComboboxPopover {...combobox} aria-label="Fruits">
        {combobox.matches.length
          ? combobox.matches.map((value) => (
              <ComboboxOption {...combobox} key={value} value={value} />
            ))
          : "No results found"}
      </ComboboxPopover>
    </>
  );
}
