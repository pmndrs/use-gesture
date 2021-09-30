"use strict";

exports.__esModule = true;
exports.pendingPageDataWritesReducer = void 0;

const pendingPageDataWritesReducer = (state = {
  pagePaths: new Set()
}, action) => {
  switch (action.type) {
    case `ADD_PENDING_PAGE_DATA_WRITE`:
      state.pagePaths.add(action.payload.path);
      return state;

    case `ADD_PENDING_TEMPLATE_DATA_WRITE`:
      {
        for (const page of action.payload.pages) {
          state.pagePaths.add(page);
        }

        return state;
      }

    case `CLEAR_PENDING_PAGE_DATA_WRITE`:
      {
        state.pagePaths.delete(action.payload.page);
        return state;
      }

    default:
      return state;
  }
};

exports.pendingPageDataWritesReducer = pendingPageDataWritesReducer;
//# sourceMappingURL=pending-page-data-writes.js.map