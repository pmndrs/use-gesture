import * as React from "react";
import { Tabbable } from "reakit/Tabbable";

function onClick(event: React.MouseEvent) {
  const element = event.target as HTMLElement;
  const label = element.textContent || element.getAttribute("aria-label");
  // eslint-disable-next-line no-alert
  alert(label);
}

const CustomComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
>((props, ref) => <div ref={ref} {...props} onClick={onClick} />);

export default function TabbableElements() {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
      <h2>Default</h2>

      <Tabbable>Default div</Tabbable>

      <Tabbable as="button" onClick={onClick}>
        Default button
      </Tabbable>

      <Tabbable as="input" aria-label="Default input" />

      <Tabbable as="a" href="#" onClick={onClick}>
        Default anchor
      </Tabbable>

      <Tabbable as={CustomComponent}>Default custom</Tabbable>

      <h2>Disabled</h2>

      <Tabbable disabled>Disabled div</Tabbable>

      <Tabbable as="button" onClick={onClick} disabled>
        Disabled button
      </Tabbable>

      <Tabbable as="input" aria-label="Disabled input" disabled />

      <Tabbable as="a" href="#" onClick={onClick} disabled>
        Disabled anchor
      </Tabbable>

      <Tabbable as={CustomComponent} disabled>
        Disabled custom
      </Tabbable>

      <h2>Disabled focusable</h2>

      <Tabbable disabled focusable>
        Disabled focusable div
      </Tabbable>

      <Tabbable as="button" onClick={onClick} disabled focusable>
        Disabled focusable button
      </Tabbable>

      <Tabbable
        as="input"
        aria-label="Disabled focusable input"
        disabled
        focusable
      />

      <Tabbable as="a" href="#" onClick={onClick} disabled focusable>
        Disabled focusable anchor
      </Tabbable>

      <Tabbable as={CustomComponent} disabled focusable>
        Disabled focusable custom
      </Tabbable>
    </div>
  );
}
