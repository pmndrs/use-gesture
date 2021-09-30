export default function move (array, moveIndex, toIndex) {
  /* #move - Moves an array item from one position in an array to another.

     Note: This is a pure function so a new array will be returned, instead
     of altering the array argument.

    Arguments:
    1. array     (String) : Array in which to move an item.         (required)
    2. moveIndex (Object) : The index of the item to move.          (required)
    3. toIndex   (Object) : The index to move item at moveIndex to. (required)
  */
  let itemRemovedArray = [
    ...array.slice(0, moveIndex),
    ...array.slice(moveIndex + 1, array.length)
  ]
  return [
    ...itemRemovedArray.slice(0, toIndex),
    array[moveIndex],
    ...itemRemovedArray.slice(toIndex, itemRemovedArray.length)
  ]
}

// Examples
// --------

move(['a', 'b','c'], 2, 0)

// -> ['c', 'a', 'b']



move([{name: 'Fred', name: 'Barney', name: 'Wilma', name: 'Betty'}], 2, 1)

// -> [{name: 'Fred', name: 'Wilman', name: 'Barney', name: 'Betty'}]
