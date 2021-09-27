export default function headingOrderAfter(results) {
  // Construct a map of all headings on the page
  const headingOrder = getHeadingOrder(results);
  results.forEach(result => {
    result.result = getHeadingOrderOutcome(result, headingOrder);
  });
  return results;
}

/**
 * Determine check outcome, based on the position of the result in the headingOrder
 */
function getHeadingOrderOutcome(result, headingOrder) {
  const index = findHeadingOrderIndex(headingOrder, result.node.ancestry);
  const currLevel = headingOrder[index]?.level ?? -1;
  const prevLevel = headingOrder[index - 1]?.level ?? -1;

  // First heading always passes
  if (index === 0) {
    return true;
  }
  // Heading not in the map
  if (currLevel === -1) {
    return undefined;
  }
  // Check if a heading is skipped
  return currLevel - prevLevel <= 1;
}

/**
 * Generate a flattened heading order map, from the data property
 * of heading-order results
 */
function getHeadingOrder(results) {
  // Ensure parent frames are handled first
  results = [...results];
  results.sort(({ node: nodeA }, { node: nodeB }) => {
    return nodeA.ancestry.length - nodeB.ancestry.length;
  });
  // push or splice result.data into headingOrder
  const headingOrder = results.reduce(mergeHeadingOrder, []);
  // Remove all frame placeholders
  return headingOrder.filter(({ level }) => level !== -1);
}

/**
 * Add the data of a heading-order result to the headingOrder map
 */
function mergeHeadingOrder(mergedHeadingOrder, result) {
  const frameHeadingOrder = result.data?.headingOrder;
  const frameAncestry = shortenArray(result.node.ancestry, 1);

  // Only the first result in each frame has a headingOrder. Ignore the rest
  if (!frameHeadingOrder) {
    return mergedHeadingOrder;
  }

  // Prepend node ancestry to each heading.ancestry
  const normalizedHeadingOrder = frameHeadingOrder.map(heading => {
    return addFrameToHeadingAncestry(heading, frameAncestry);
  });

  // Find if the result is from a frame previously processed
  const index = getFrameIndex(mergedHeadingOrder, frameAncestry);
  // heading is not in a frame, stick 'm in at the end.
  if (index === -1) {
    mergedHeadingOrder.push(...normalizedHeadingOrder);
  } else {
    mergedHeadingOrder.splice(index, 0, ...normalizedHeadingOrder);
  }
  return mergedHeadingOrder;
}

/**
 * Determine where the iframe results fit into the top-level heading order
 *
 * If a frame has no headings, but it does have iframes we might not have a result.
 * We can account for this by finding the closest ancestor we do know about.
 */
function getFrameIndex(headingOrder, frameAncestry) {
  while (frameAncestry.length) {
    const index = findHeadingOrderIndex(headingOrder, frameAncestry);
    if (index !== -1) {
      return index;
    }
    frameAncestry = shortenArray(frameAncestry, 1);
  }
  return -1;
}

/**
 * Find the index of a heading in the headingOrder by matching ancestries
 */
function findHeadingOrderIndex(headingOrder, ancestry) {
  return headingOrder.findIndex(heading => {
    return matchAncestry(heading.ancestry, ancestry);
  });
}

/**
 * Prepend the frame ancestry of a node to heading.ancestry
 */
function addFrameToHeadingAncestry(heading, frameAncestry) {
  const ancestry = frameAncestry.concat(heading.ancestry);
  return { ...heading, ancestry };
}

/**
 * Check if two ancestries are identical
 */
function matchAncestry(ancestryA, ancestryB) {
  if (ancestryA.length !== ancestryB.length) {
    return false;
  }
  return ancestryA.every((selectorA, index) => {
    const selectorB = ancestryB[index];
    if (!Array.isArray(selectorA)) {
      return selectorA === selectorB;
    }
    if (selectorA.length !== selectorB.length) {
      return false;
    }
    return selectorA.every((str, index) => selectorB[index] === str);
  });
}

/**
 * Shorten an array by some number of items
 */
function shortenArray(arr, spliceLength) {
  return arr.slice(0, arr.length - spliceLength);
}
