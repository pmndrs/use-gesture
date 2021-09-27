import * as React from 'react'
import { Link, navigate } from 'gatsby'
import { createPortal } from 'react-dom'
import styled, { x, createGlobalStyle } from '@xstyled/styled-components'
import { useDocSearchKeyboardEvents } from '@docsearch/react'
import { RiSearchLine } from 'react-icons/ri'
import { Input, InputGroup, InputGroupIcon } from './Input'

require('@docsearch/css')

const GlobalStyle = createGlobalStyle`
  /* Darkmode */
  body.xstyled-color-mode-dark {
    --docsearch-text-color: rgb(245, 246, 247);
    --docsearch-container-background: rgba(9, 10, 17, 0.8);
    --docsearch-modal-background: rgb(21, 23, 42);
    --docsearch-modal-shadow: inset 1px 1px 0 0 rgb(44, 46, 64),
      0 3px 8px 0 rgb(0, 3, 9);
    --docsearch-searchbox-background: rgb(9, 10, 17);
    --docsearch-searchbox-focus-background: #000;
    --docsearch-hit-color: rgb(190, 195, 201);
    --docsearch-hit-shadow: none;
    --docsearch-hit-background: rgb(9, 10, 17);
    --docsearch-key-gradient: linear-gradient(
      -26.5deg,
      rgb(86, 88, 114) 0%,
      rgb(49, 53, 91) 100%
    );
    --docsearch-key-shadow: inset 0 -2px 0 0 rgb(40, 45, 85),
      inset 0 0 1px 1px rgb(81, 87, 125), 0 2px 2px 0 rgba(3, 4, 9, 0.3);
    --docsearch-footer-background: rgb(30, 33, 54);
    --docsearch-footer-shadow: inset 0 1px 0 0 rgba(73, 76, 106, 0.5),
      0 -4px 8px 0 rgba(0, 0, 0, 0.2);
    --docsearch-logo-color: rgb(255, 255, 255);
    --docsearch-muted-color: rgb(127, 132, 151);
  }
`

function Hit({ hit, children }) {
  return <Link to={hit.url}>{children}</Link>
}

const Kbd = styled.kbd`
  border: 1;
  border-color: control-border;
  margin-right: 1;
  background-color: control-background;
  text-align: center;
  padding: 0;
  display: inline-flex;
  justify-content: center;
  font-size: 0.8em;
  line-height: 1.2;
  font-family: sans-serif;
  border-radius: base;
  min-width: 1.5em;
`

let DocSearchModal = null

export const DocSearch = ({ apiKey, indexName }) => {
  const searchButtonRef = React.useRef(null)
  const [isShowing, setIsShowing] = React.useState(false)
  const [initialQuery, setInitialQuery] = React.useState(null)

  const importDocSearchModalIfNeeded = React.useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve()
    }

    return Promise.resolve(import('@docsearch/react/modal')).then(
      ({ DocSearchModal: Modal }) => {
        DocSearchModal = Modal
      },
    )
  }, [])

  const onOpen = React.useCallback(() => {
    importDocSearchModalIfNeeded().then(() => {
      // We check that no other DocSearch modal is showing before opening this
      // one (we use one instance for desktop and one instance for mobile).
      if (document.body.classList.contains('DocSearch--active')) {
        return
      }

      setIsShowing(true)
    })
  }, [importDocSearchModalIfNeeded, setIsShowing])

  const onClose = React.useCallback(() => {
    setIsShowing(false)
  }, [setIsShowing])

  const onInput = React.useCallback(
    (event) => {
      importDocSearchModalIfNeeded().then(() => {
        setIsShowing(true)
        setInitialQuery(event.key)
      })
    },
    [importDocSearchModalIfNeeded, setIsShowing, setInitialQuery],
  )

  useDocSearchKeyboardEvents({
    isOpen: isShowing,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  })

  return (
    <>
      <GlobalStyle />
      <div>
        <InputGroup>
          <InputGroupIcon>
            <RiSearchLine />
          </InputGroupIcon>
          <Input
            ref={searchButtonRef}
            onClick={onOpen}
            type="search"
            placeholder="Search..."
          />
          <x.div
            position="absolute"
            top="50%"
            right={0}
            transform="translateY(-50%)"
            display="inline-flex"
            pointerEvents="none"
            userSelect="none"
          >
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </x.div>
        </InputGroup>
      </div>

      {isShowing &&
        createPortal(
          <DocSearchModal
            apiKey={apiKey}
            indexName={indexName}
            initialQuery={initialQuery}
            onClose={onClose}
            navigator={{
              navigate({ suggestionUrl }) {
                navigate(suggestionUrl)
              },
            }}
            transformItems={(items) => {
              return items.map((item) => {
                const url = new URL(item.url)
                return {
                  ...item,
                  url: item.url.replace(url.origin, ''),
                }
              })
            }}
            hitComponent={Hit}
          />,
          document.body,
        )}
    </>
  )
}
