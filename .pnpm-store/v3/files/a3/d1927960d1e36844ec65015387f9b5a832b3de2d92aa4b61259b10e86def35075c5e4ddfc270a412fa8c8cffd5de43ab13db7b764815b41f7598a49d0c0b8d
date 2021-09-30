import * as React from "react";
import {
  unstable_useComboboxState as useComboboxState,
  unstable_Combobox as Combobox,
  unstable_ComboboxPopover as ComboboxPopover,
  unstable_ComboboxOption as ComboboxOption,
} from "reakit/Combobox";
import { fetchFruits } from "./api";

import "./style.css";

export default function ComboboxFetch() {
  const [matches, setMatches] = React.useState<string[]>([]);
  const combobox = useComboboxState({
    list: true,
    inline: true,
    autoSelect: true,
    gutter: 8,
  });

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      fetchFruits(combobox.inputValue).then(setMatches);
    }, 250);
    return () => clearTimeout(timeout);
  }, [combobox.inputValue]);

  return (
    <>
      <Combobox {...combobox} aria-label="Fruit" placeholder="Enter a fruit" />
      <ComboboxPopover {...combobox} aria-label="Fruits">
        {matches.length
          ? matches.map((value) => (
              <ComboboxOption {...combobox} key={value} value={value} />
            ))
          : "No results found"}
      </ComboboxPopover>
    </>
  );
}
