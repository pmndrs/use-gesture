'use strict';

// Generates static `useLocation` hook. The hook always
// responds with initial path provided.
// You can use this for server-side rendering.
var staticLocation = (path = "/", { record = false } = {}) => {
  let hook;
  const navigate = (to, { replace } = {}) => {
    if (record) {
      if (replace) {
        hook.history.pop();
      }
      hook.history.push(to);
    }
  };
  hook = () => [path, navigate];
  hook.history = [path];
  return hook;
};

module.exports = staticLocation;
