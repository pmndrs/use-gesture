import * as React from "react";
import * as ReactDOM from "react-dom";
import { useIsomorphicEffect } from "reakit-utils/useIsomorphicEffect";
import { canUseDOM } from "reakit-utils/canUseDOM";

export type PortalProps = {
  /**
   * Portal's children.
   */
  children: React.ReactNode;
};

function getBodyElement() {
  return canUseDOM ? document.body : null;
}

export const PortalContext = React.createContext<HTMLElement | null>(
  getBodyElement()
);

export function Portal({ children }: PortalProps) {
  // if it's a nested portal, context is the parent portal
  // otherwise it's document.body
  // https://github.com/reakit/reakit/issues/513
  const context = React.useContext(PortalContext) || getBodyElement();
  const [hostNode] = React.useState(() => {
    if (canUseDOM) {
      const element = document.createElement("div");
      element.className = Portal.__className;
      return element;
    }
    // ssr
    return null;
  });

  useIsomorphicEffect(() => {
    if (!hostNode || !context) return undefined;
    context.appendChild(hostNode);
    return () => {
      context.removeChild(hostNode);
    };
  }, [hostNode, context]);

  if (hostNode) {
    return ReactDOM.createPortal(
      <PortalContext.Provider value={hostNode}>
        {children}
      </PortalContext.Provider>,
      hostNode
    );
  }

  // ssr
  return null;
}

Portal.__className = "__reakit-portal";
Portal.__selector = `.${Portal.__className}`;
