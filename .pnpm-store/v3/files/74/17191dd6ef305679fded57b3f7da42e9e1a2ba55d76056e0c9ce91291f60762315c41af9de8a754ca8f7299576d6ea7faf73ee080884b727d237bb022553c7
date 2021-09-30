import React from 'react'
import styled, { x, css, up, down, th, useUp } from '@xstyled/styled-components'
import { useDialogState, Dialog, DialogDisclosure } from 'reakit/Dialog'
import { Portal } from 'reakit/Portal'
import { VscChevronUp } from 'react-icons/vsc'
import { RiPencilLine } from 'react-icons/ri'
import { ScreenContainer } from './ScreenContainer'
import { SideNav, useSideNavState, useSideNavPrevNext } from './SideNav'
import { PageLayout } from './PageLayout'
import { SiblingNav, SiblingNavLink } from './SiblingNav'
import { Article } from './Article'
import { TableOfContents } from './TableOfContents'

const SidebarDialog = styled.div`
  background-color: background-light-a50;
  backdrop-filter: blur(3px);
  position: fixed;
  top: 50;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  overflow: auto;
  transition: base;
  opacity: 0;
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  transform: translate3d(0, 10vh, 0);

  &[data-enter] {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  &:focus {
    outline: none;
  }
`

const Container = styled.div`
  z-index: 0;
  position: relative;

  ${up(
    'md',
    css`
      display: grid;
      grid-template-columns: 288px minmax(0, 1fr);
      grid-gap: ${th.space(5)};

      .sidebar-container {
        display: none;
      }
    `,
  )}

  ${up(
    'xl',
    css`
      grid-template-columns: 288px minmax(0, 1fr) 288px;

      .sidebar-container {
        display: none;
      }
    `,
  )}
`

const TocContainer = styled.div`
  ${down(
    'xl',
    css`
      display: none;
    `,
  )}
`

const SidebarSticky = styled.aside`
  position: sticky;
  top: ${th.px(50)};
  padding: 4 0;
  overflow-y: auto;
  height: calc(100vh - 50px);
  width: 288px;

  ${down(
    'md',
    css`
      display: none;
    `,
  )}
`

const MenuButton = styled.button`
  appearance: none;
  border: 0;
  border-radius: 50%;
  width: 60;
  height: 60;
  position: fixed;
  right: ${th.size(8)};
  bottom: ${th.size(8)};
  z-index: 25;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: background;
  background-color: on-background;
  transition: base;
  transition-property: color;

  &:focus {
    color: background;
  }

  > svg {
    width: 24;
    height: 24;
    transition: transform 200ms ease-in-out;

    &:first-child {
      transform: translateX(-1px);
    }

    &:last-child {
      transform: translate(-1px) rotate(180deg);
    }
  }

  &[aria-expanded='true'] {
    > svg:first-child {
      transform: translate(-1px, 16px);
    }

    > svg:last-child {
      transform: translate(-1px, -16px) rotate(180deg);
    }
  }
`

function MobileSidebar({ children }) {
  const dialog = useDialogState({ animated: true })
  return (
    <>
      <Dialog {...dialog} as={SidebarDialog}>
        {children}
      </Dialog>
      <Portal>
        <DialogDisclosure {...dialog} as={MenuButton}>
          <VscChevronUp />
          <VscChevronUp />
        </DialogDisclosure>
      </Portal>
    </>
  )
}

function PrevNextLinks(props) {
  const { prev, next } = useSideNavPrevNext(props)
  if (!prev && !next) return null
  return (
    <SiblingNav>
      {prev && (
        <SiblingNavLink type="previous" to={prev.fields.slug}>
          {prev.fields.title}
        </SiblingNavLink>
      )}
      {next && (
        <SiblingNavLink type="next" to={next.fields.slug}>
          {next.fields.title}
        </SiblingNavLink>
      )}
    </SiblingNav>
  )
}

export function DocLayout({ children, tableOfContents, editLink, ...props }) {
  const upMd = useUp('md')
  const sideNav = useSideNavState()
  return (
    <PageLayout {...props}>
      <ScreenContainer px={0}>
        <Container>
          <SidebarSticky>
            <SideNav {...sideNav} />
          </SidebarSticky>
          <div className="sidebar-container">
            {!upMd && (
              <MobileSidebar>
                <SideNav {...sideNav} />
              </MobileSidebar>
            )}
          </div>
          <x.div pb={6} px={3}>
            <Article>
              {children}
              {editLink && (
                <x.a
                  mt={5}
                  display="grid"
                  gridTemplateColumns="min-content max-content"
                  gridGap={1}
                  alignItems="center"
                  href={editLink}
                >
                  <RiPencilLine /> Edit this page on GitHub
                </x.a>
              )}
              <PrevNextLinks {...sideNav} />
            </Article>
          </x.div>
          <TocContainer>
            <TableOfContents />
          </TocContainer>
        </Container>
      </ScreenContainer>
    </PageLayout>
  )
}
