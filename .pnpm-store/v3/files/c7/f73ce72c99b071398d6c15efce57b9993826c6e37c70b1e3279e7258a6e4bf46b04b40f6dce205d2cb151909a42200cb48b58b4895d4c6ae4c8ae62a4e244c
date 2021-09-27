/**
 * Detects right clicks
 *
 * @param nativeEvent
 */
function isRightClick(nativeEvent) {
  return "which" in nativeEvent ? nativeEvent.which === 3 : "button" in nativeEvent ? nativeEvent.button === 2 : false;
}

export { isRightClick };
