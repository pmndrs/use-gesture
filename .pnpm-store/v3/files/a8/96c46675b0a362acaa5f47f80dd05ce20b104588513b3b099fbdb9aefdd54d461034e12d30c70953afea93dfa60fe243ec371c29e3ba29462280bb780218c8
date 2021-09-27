import { getRole } from '../../commons/aria';
import { sanitize, subtreeText } from '../../commons/text';
import standards from '../../standards';

/**
 * Check that an element does not use any prohibited ARIA attributes.
 *
 * Prohibited attributes are taken from the `ariaAttrs` standards object from the attributes `prohibitedAttrs` property.
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
 *       <td>List of all prohibited attributes</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if the element uses any prohibited ARIA attributes. False otherwise.
 */
function ariaProhibitedAttrEvaluate(node, options = {}, virtualNode) {
  const extraElementsAllowedAriaLabel = options.elementsAllowedAriaLabel || [];

  const prohibitedList = listProhibitedAttrs(
    virtualNode,
    extraElementsAllowedAriaLabel
  );

  const prohibited = prohibitedList.filter(attrName => {
    if (!virtualNode.attrNames.includes(attrName)) {
      return false;
    }
    return sanitize(virtualNode.attr(attrName)) !== '';
  });

  if (prohibited.length === 0) {
    return false;
  }

  this.data(prohibited);
  const hasTextContent = sanitize(subtreeText(virtualNode)) !== '';
  // Don't fail if there is text content to announce
  return hasTextContent ? undefined : true;
}

function listProhibitedAttrs(virtualNode, elementsAllowedAriaLabel) {
  const role = getRole(virtualNode, { chromium: true });
  const roleSpec = standards.ariaRoles[role];
  if (roleSpec) {
    return roleSpec.prohibitedAttrs || [];
  }

  const { nodeName } = virtualNode.props;
  if (!!role || elementsAllowedAriaLabel.includes(nodeName)) {
    return [];
  }
  return ['aria-label', 'aria-labelledby'];
}

export default ariaProhibitedAttrEvaluate;
