import React from 'react'
import { Link } from 'gatsby'
import styled, { down, css } from '@xstyled/styled-components'

export const InnerSiblingNavLink = styled.aBox`
  display: flex;
  align-items: center;
  font-weight: bold;
  transition: fast;
  text-decoration: none !important;
  p {
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 12;
    margin: 0;
  }
  span {
    margin: 0 16px 0 4px;
  }
  h3 {
    margin: 0;
    font-size: 16;
    color: on-background-primary;
  }
  &:hover {
    color: on-background-primary-dark;
  }
  &[data-type='next'] {
    justify-content: flex-end;
    span {
      margin: 0 4px 0 16px;
    }
  }
  &[data-type='next']:hover {
    transform: translateX(2px);
  }
  &[data-type='previous']:hover {
    transform: translateX(-2px);
  }
`

export const SiblingNavLink = React.forwardRef(({ type, children, ...props }, ref) => {
  return (
    <InnerSiblingNavLink ref={ref} as={Link} data-type={type} gridArea={type} {...props}>
      <span>{type === 'previous' && '← '}</span>
      <div>
        <p>{type === 'previous' ? 'Prev' : 'Next'}</p>
        <h3>{children}</h3>
      </div>
      <span>{type === 'next' && ' →'}</span>
    </InnerSiblingNavLink>
  )
})

export const SiblingNav = styled.navBox`
  display: grid;
  grid-template-areas: 'previous next';
  justify-content: space-between;
  margin: 5 0;
  ${down(
    'sm',
    css`
      display: flex;
      flex-direction: column;
    `
  )}
`
