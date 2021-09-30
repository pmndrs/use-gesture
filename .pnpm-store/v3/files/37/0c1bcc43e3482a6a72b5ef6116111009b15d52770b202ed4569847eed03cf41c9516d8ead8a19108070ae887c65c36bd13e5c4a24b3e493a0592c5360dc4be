import { createContext } from 'react';

function createNamedContext(name, defaultValue) {
  var Ctx = /*#__PURE__*/createContext(defaultValue);

  if (process.env.NODE_ENV !== "production") {
    Ctx.displayName = name;
  }

  return Ctx;
}

export { createNamedContext };
