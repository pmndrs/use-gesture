const getTargetOffset = (hash) => {
  const id = window.decodeURI(hash.replace('#', ''))
  if (id !== '') {
    const element = document.getElementById(id)
    if (element) {
      return element.offsetTop - 20
    }
  }
  return null
}

exports.onInitialClientRender = () => {
  requestAnimationFrame(() => {
    const offset = getTargetOffset(window.location.hash)
    if (offset !== null) {
      window.scrollTo(0, offset)
    }
  })
}

exports.shouldUpdateScroll = ({ routerProps: { location } }) => {
  const offset = getTargetOffset(location.hash)
  if (offset !== null) {
    window.scrollTo(0, offset)
    return false
  }
  return true
  // return offset !== null ? [0, offset] : true
}
