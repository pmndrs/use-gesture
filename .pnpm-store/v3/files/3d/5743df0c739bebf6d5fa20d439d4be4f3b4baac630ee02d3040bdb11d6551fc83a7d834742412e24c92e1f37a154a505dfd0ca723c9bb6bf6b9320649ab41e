import { getExplicitRole, getRole, requiredContext } from '../../commons/aria';
import { getRootNode } from '../../commons/dom';
import { getNodeFromTree, escapeSelector } from '../../core/utils';

function getMissingContext(virtualNode, ownGroupRoles, reqContext, includeElement) {
  const explicitRole = getExplicitRole(virtualNode);

  if (!reqContext) {
    reqContext = requiredContext(explicitRole);
  }

  if (!reqContext) {
    return null;
  }

  let vNode = includeElement ? virtualNode : virtualNode.parent;
  while (vNode) {
    const parentRole = getRole(vNode);

    // if parent node has role=group and role=group is an allowed
    // context, check next parent
    if (reqContext.includes('group') && parentRole === 'group') {
      // Allow the own role; i.e. tree > treeitem > group > treeitem
      if (ownGroupRoles.includes(explicitRole)) {
        reqContext.push(explicitRole);
      }
      vNode = vNode.parent;
      continue;
    }

    // if parent node has a role that is not the required role and not
    // presentational we will fail the check
    if (reqContext.includes(parentRole)) {
      return null;
    } else if (parentRole && !['presentation', 'none'].includes(parentRole)) {
      return reqContext;
    }

    vNode = vNode.parent;
  }

  return reqContext;
}

function getAriaOwners(element) {
  var owners = [],
    o = null;

  while (element) {
    if (element.getAttribute('id')) {
      const id = escapeSelector(element.getAttribute('id'));
      const doc = getRootNode(element);
      o = doc.querySelector(`[aria-owns~=${id}]`);
      if (o) {
        owners.push(o);
      }
    }
    element = element.parentElement;
  }

  return owners.length ? owners : null;
}

/**
 * Check if the element has a parent with a required role.
 *
 * Required parent roles are taken from the `ariaRoles` standards object from the roles `requiredContext` property.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String[]</code></td>
 *       <td>List of all missing required parent roles</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if the element has a parent with a required role. False otherwise.
 */
function ariaRequiredParentEvaluate(node, options, virtualNode) {
  const ownGroupRoles = (
    options && Array.isArray(options.ownGroupRoles) 
    ? options.ownGroupRoles 
    : []
  );
  let missingParents = getMissingContext(virtualNode, ownGroupRoles);

  if (!missingParents) {
    return true;
  }

  const owners = getAriaOwners(node);

  if (owners) {
    for (let i = 0, l = owners.length; i < l; i++) {
      missingParents = getMissingContext(
        getNodeFromTree(owners[i]),
        ownGroupRoles,
        missingParents,
        true
      );
      if (!missingParents) {
        return true;
      }
    }
  }

  this.data(missingParents);
  return false;
}

export default ariaRequiredParentEvaluate;
