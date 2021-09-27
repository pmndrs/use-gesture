import * as React from "react";

export function memo<T extends React.ComponentType<any>>(
  component: T,
  propsAreEqual?: (
    prevProps: Readonly<React.ComponentProps<T>>,
    nextProps: Readonly<React.ComponentProps<T>>
  ) => boolean
) {
  return (React.memo(component, propsAreEqual) as unknown) as T;
}
