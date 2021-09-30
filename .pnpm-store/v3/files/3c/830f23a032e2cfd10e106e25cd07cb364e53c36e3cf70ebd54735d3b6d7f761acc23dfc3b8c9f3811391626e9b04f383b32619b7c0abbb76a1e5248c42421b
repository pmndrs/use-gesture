import * as React from "react";

export function forwardRef<T extends React.ForwardRefRenderFunction<any, any>>(
  component: T
) {
  return (React.forwardRef(component) as unknown) as T;
}
