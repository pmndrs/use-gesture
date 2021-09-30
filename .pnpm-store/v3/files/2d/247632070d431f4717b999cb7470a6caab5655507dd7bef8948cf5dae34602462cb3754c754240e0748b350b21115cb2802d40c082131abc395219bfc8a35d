import React from 'react'
// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router'
import styled, { th } from '@xstyled/styled-components'

const TOP_OFFSET = 100

function getHeaderAnchors() {
  return Array.prototype.filter.call(
    document.getElementsByClassName('anchor'),
    (testElement) =>
      testElement.parentNode.nodeName === 'H2' ||
      testElement.parentNode.nodeName === 'H3',
  )
}

function getHeaderDataFromAnchor(el) {
  return {
    url: el.getAttribute('href'),
    text: el.parentElement?.innerText,
    depth: Number(el.parentElement?.nodeName.replace('H', '')),
  }
}

function getAnchorHeaderIdentifier(el) {
  return el?.parentElement?.id
}

export function useTocHighlight(ref) {
  const { pathname } = useLocation()
  const [lastActiveLink, setLastActiveLink] = React.useState(undefined)
  const [headings, setHeadings] = React.useState([])

  React.useEffect(() => {
    setHeadings(getHeaderAnchors().map(getHeaderDataFromAnchor))
  }, [pathname])

  React.useEffect(() => {
    let headersAnchors = []
    let links = []

    function setActiveLink() {
      function getActiveHeaderAnchor() {
        let index = 0
        let activeHeaderAnchor = null

        headersAnchors = getHeaderAnchors()
        while (index < headersAnchors.length && !activeHeaderAnchor) {
          const headerAnchor = headersAnchors[index]
          const { top } = headerAnchor.getBoundingClientRect()

          if (top >= 0 && top <= TOP_OFFSET) {
            activeHeaderAnchor = headerAnchor
          }

          index += 1
        }

        return activeHeaderAnchor
      }

      const activeHeaderAnchor = getActiveHeaderAnchor()

      if (activeHeaderAnchor) {
        let index = 0
        let itemHighlighted = false

        links = ref.current ? ref.current.querySelectorAll('a') : []

        while (index < links.length && !itemHighlighted) {
          const link = links[index]
          const { href } = link
          const anchorValue = decodeURIComponent(
            href.substring(href.indexOf('#') + 1),
          )

          if (getAnchorHeaderIdentifier(activeHeaderAnchor) === anchorValue) {
            if (lastActiveLink) {
              lastActiveLink.removeAttribute('aria-current')
            }

            link.setAttribute('aria-current', 'true')

            setLastActiveLink(link)
            itemHighlighted = true
          }

          index += 1
        }
      }
    }

    document.addEventListener('scroll', setActiveLink)
    document.addEventListener('resize', setActiveLink)

    setActiveLink()

    return () => {
      document.removeEventListener('scroll', setActiveLink)
      document.removeEventListener('resize', setActiveLink)
    }
  })

  return headings
}

const TocContainer = styled.div`
  position: sticky;
  top: ${th.px(50)};
  padding: 5 0 4;
  overflow-y: auto;
  height: calc(100vh - 50px);
  font-size: 15;

  h4 {
    margin: 0;
    font-size: 14;
    font-weight: 500;
    text-transform: uppercase;
    color: on-background-light;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin: 2 0;

      &[data-depth='3'] {
        padding-left: 2;
      }
    }
  }

  a {
    display: inline-block;
    transition: fast;
    color: on-background-light;
    text-decoration: none;
    opacity: 0.85;

    &[aria-current] {
      font-weight: 500;
      color: on-background;
      transform: translateX(2px);
      opacity: 1;
    }

    &:hover {
      color: on-background;
      transform: translateX(2px);
      opacity: 1;
    }
  }
`

export function TableOfContents() {
  const ref = React.useRef()
  const headings = useTocHighlight(ref)
  if (!headings.length) return null
  return (
    <TocContainer ref={ref}>
      <h4>On this page</h4>
      <ul>
        {headings.map((heading, i) =>
          heading.url ? (
            <li key={i} data-depth={heading.depth}>
              <a href={heading.url}>{heading.text}</a>
            </li>
          ) : null,
        )}
      </ul>
    </TocContainer>
  )
}
