import * as React from "react";
import {
  unstable_useComboboxState as useComboboxState,
  unstable_Combobox as Combobox,
  unstable_ComboboxPopover as ComboboxPopover,
  unstable_ComboboxOption as ComboboxOption,
} from "reakit/Combobox";
import { colors } from "./colors";

import "./style.css";

export default function ComboboxList() {
  const combobox = useComboboxState({ values: colors, gutter: 8 });
  return (
    <>
      <Combobox {...combobox} aria-label="Color" placeholder="Type a color" />
      <ComboboxPopover {...combobox} aria-label="Colors">
        {combobox.matches.length
          ? combobox.matches.map((value) => (
              <ComboboxOption {...combobox} key={value} value={value} />
            ))
          : "No results found"}
      </ComboboxPopover>
    </>
  );
}
