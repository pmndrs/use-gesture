"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findByRole = exports.findAllByRole = exports.getByRole = exports.getAllByRole = exports.queryAllByRole = exports.queryByRole = void 0;

var _domAccessibilityApi = require("dom-accessibility-api");

var _ariaQuery = require("aria-query");

var _roleHelpers = require("../role-helpers");

var _queryHelpers = require("../query-helpers");

var _helpers = require("../helpers");

var _allUtils = require("./all-utils");

function queryAllByRole(container, role, {
  exact = true,
  collapseWhitespace,
  hidden = (0, _allUtils.getConfig)().defaultHidden,
  name,
  trim,
  normalizer,
  queryFallbacks = false,
  selected,
  checked,
  pressed,
  level,
  expanded
} = {}) {
  (0, _helpers.checkContainerType)(container);
  const matcher = exact ? _allUtils.matches : _allUtils.fuzzyMatches;
  const matchNormalizer = (0, _allUtils.makeNormalizer)({
    collapseWhitespace,
    trim,
    normalizer
  });

  if (selected !== undefined) {
    var _allRoles$get;

    // guard against unknown roles
    if (((_allRoles$get = _ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get.props['aria-selected']) === undefined) {
      throw new Error(`"aria-selected" is not supported on role "${role}".`);
    }
  }

  if (checked !== undefined) {
    var _allRoles$get2;

    // guard against unknown roles
    if (((_allRoles$get2 = _ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get2.props['aria-checked']) === undefined) {
      throw new Error(`"aria-checked" is not supported on role "${role}".`);
    }
  }

  if (pressed !== undefined) {
    var _allRoles$get3;

    // guard against unknown roles
    if (((_allRoles$get3 = _ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get3.props['aria-pressed']) === undefined) {
      throw new Error(`"aria-pressed" is not supported on role "${role}".`);
    }
  }

  if (level !== undefined) {
    // guard against using `level` option with any role other than `heading`
    if (role !== 'heading') {
      throw new Error(`Role "${role}" cannot have "level" property.`);
    }
  }

  if (expanded !== undefined) {
    var _allRoles$get4;

    // guard against unknown roles
    if (((_allRoles$get4 = _ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get4.props['aria-expanded']) === undefined) {
      throw new Error(`"aria-expanded" is not supported on role "${role}".`);
    }
  }

  const subtreeIsInaccessibleCache = new WeakMap();

  function cachedIsSubtreeInaccessible(element) {
    if (!subtreeIsInaccessibleCache.has(element)) {
      subtreeIsInaccessibleCache.set(element, (0, _roleHelpers.isSubtreeInaccessible)(element));
    }

    return subtreeIsInaccessibleCache.get(element);
  }

  return Array.from(container.querySelectorAll('*')).filter(node => {
    const isRoleSpecifiedExplicitly = node.hasAttribute('role');

    if (isRoleSpecifiedExplicitly) {
      const roleValue = node.getAttribute('role');

      if (queryFallbacks) {
        return roleValue.split(' ').filter(Boolean).some(text => matcher(text, node, role, matchNormalizer));
      } // if a custom normalizer is passed then let normalizer handle the role value


      if (normalizer) {
        return matcher(roleValue, node, role, matchNormalizer);
      } // other wise only send the first word to match


      const [firstWord] = roleValue.split(' ');
      return matcher(firstWord, node, role, matchNormalizer);
    }

    const implicitRoles = (0, _roleHelpers.getImplicitAriaRoles)(node);
    return implicitRoles.some(implicitRole => matcher(implicitRole, node, role, matchNormalizer));
  }).filter(element => {
    if (selected !== undefined) {
      return selected === (0, _roleHelpers.computeAriaSelected)(element);
    }

    if (checked !== undefined) {
      return checked === (0, _roleHelpers.computeAriaChecked)(element);
    }

    if (pressed !== undefined) {
      return pressed === (0, _roleHelpers.computeAriaPressed)(element);
    }

    if (expanded !== undefined) {
      return expanded === (0, _roleHelpers.computeAriaExpanded)(element);
    }

    if (level !== undefined) {
      return level === (0, _roleHelpers.computeHeadingLevel)(element);
    } // don't care if aria attributes are unspecified


    return true;
  }).filter(element => {
    return hidden === false ? (0, _roleHelpers.isInaccessible)(element, {
      isSubtreeInaccessible: cachedIsSubtreeInaccessible
    }) === false : true;
  }).filter(element => {
    if (name === undefined) {
      // Don't care
      return true;
    }

    return (0, _allUtils.matches)((0, _domAccessibilityApi.computeAccessibleName)(element, {
      computedStyleSupportsPseudoElements: (0, _allUtils.getConfig)().computedStyleSupportsPseudoElements
    }), element, name, text => text);
  });
}

const getMultipleError = (c, role, {
  name
} = {}) => {
  let nameHint = '';

  if (name === undefined) {
    nameHint = '';
  } else if (typeof name === 'string') {
    nameHint = ` and name "${name}"`;
  } else {
    nameHint = ` and name \`${name}\``;
  }

  return `Found multiple elements with the role "${role}"${nameHint}`;
};

const getMissingError = (container, role, {
  hidden = (0, _allUtils.getConfig)().defaultHidden,
  name
} = {}) => {
  if ((0, _allUtils.getConfig)()._disableExpensiveErrorDiagnostics) {
    return `Unable to find role="${role}"`;
  }

  let roles = '';
  Array.from(container.children).forEach(childElement => {
    roles += (0, _roleHelpers.prettyRoles)(childElement, {
      hidden,
      includeName: name !== undefined
    });
  });
  let roleMessage;

  if (roles.length === 0) {
    if (hidden === false) {
      roleMessage = 'There are no accessible roles. But there might be some inaccessible roles. ' + 'If you wish to access them, then set the `hidden` option to `true`. ' + 'Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole';
    } else {
      roleMessage = 'There are no available roles.';
    }
  } else {
    roleMessage = `
Here are the ${hidden === false ? 'accessible' : 'available'} roles:

  ${roles.replace(/\n/g, '\n  ').replace(/\n\s\s\n/g, '\n\n')}
`.trim();
  }

  let nameHint = '';

  if (name === undefined) {
    nameHint = '';
  } else if (typeof name === 'string') {
    nameHint = ` and name "${name}"`;
  } else {
    nameHint = ` and name \`${name}\``;
  }

  return `
Unable to find an ${hidden === false ? 'accessible ' : ''}element with the role "${role}"${nameHint}

${roleMessage}`.trim();
};

const queryAllByRoleWithSuggestions = (0, _queryHelpers.wrapAllByQueryWithSuggestion)(queryAllByRole, queryAllByRole.name, 'queryAll');
exports.queryAllByRole = queryAllByRoleWithSuggestions;
const [queryByRole, getAllByRole, getByRole, findAllByRole, findByRole] = (0, _allUtils.buildQueries)(queryAllByRole, getMultipleError, getMissingError);
exports.findByRole = findByRole;
exports.findAllByRole = findAllByRole;
exports.getByRole = getByRole;
exports.getAllByRole = getAllByRole;
exports.queryByRole = queryByRole;