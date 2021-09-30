"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.componentsReducer = void 0;

var _normalizePath = _interopRequireDefault(require("./normalize-path"));

let programStatus = `BOOTSTRAPPING`; // TODO: replace usages of this reducer with queries.trackedComponents
//  It is here merely for compatibility.

const componentsReducer = (state = new Map(), action) => {
  switch (action.type) {
    case `DELETE_CACHE`:
      return new Map();

    case `SET_PROGRAM_STATUS`:
      programStatus = action.payload;
      return state;

    case `CREATE_PAGE`:
      {
        action.payload.componentPath = (0, _normalizePath.default)(action.payload.component); // Create XState service.

        let component = state.get(action.payload.componentPath);

        if (!component) {
          component = {
            componentPath: action.payload.componentPath,
            componentChunkName: action.payload.componentChunkName,
            query: ``,
            pages: new Set(),
            isInBootstrap: true
          };
        }

        component.pages.add(action.payload.path);
        component.isInBootstrap = programStatus === `BOOTSTRAPPING`;
        state.set(action.payload.componentPath, component);
        return state;
      }

    case `QUERY_EXTRACTED`:
      {
        action.payload.componentPath = (0, _normalizePath.default)(action.payload.componentPath);
        const component = state.get(action.payload.componentPath);
        component.query = action.payload.query;
        state.set(action.payload.componentPath, component);
        return state;
      }

    case `REMOVE_STATIC_QUERIES_BY_TEMPLATE`:
      {
        action.payload.componentPath = (0, _normalizePath.default)(action.payload.componentPath);
        state.delete(action.payload.componentPath);
        return state;
      }

    case `DELETE_PAGE`:
      {
        const component = state.get((0, _normalizePath.default)(action.payload.component));
        component.pages.delete(action.payload.path);
        return state;
      }
  }

  return state;
};

exports.componentsReducer = componentsReducer;
//# sourceMappingURL=components.js.map