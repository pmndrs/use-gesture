/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styled, { th, x } from '@xstyled/styled-components'
import { ScreenContainer } from './ScreenContainer'

const InnerFeature = styled.box`
  border-left: 1;
  border-left-style: dashed;
  border-left-color: layout-border;
  padding-right: 5 !important;
`

export const Feature = React.forwardRef((props, ref) => (
  <InnerFeature
    ref={ref}
    col={{ xs: 1, md: 1 / 4 }}
    px={2}
    pt={4}
    pb={{ xs: 2, md: 5 }}
    {...props}
  />
))

export const FeatureTitle = styled.h2`
  margin: 3 0;
  font-size: 16;
  font-weight: 500;
  border-left: 1;
  border-color: primary-400;
  margin-left: ${th.px(-9)};
  padding-left: ${th.px(9)};
`

export const FeatureText = styled.p`
  color: on-background-light;
  font-size: 15;
  text-align: justify;
  margin: 4 0;
`

const InnerFeatureImage = styled.img`
  margin-top: 3;
`

export const FeatureImage = React.forwardRef((props, ref) => (
  <InnerFeatureImage ref={ref} width={48} height={48} {...props} />
))

export const FeatureList = React.forwardRef((props, ref) => (
  <ScreenContainer ref={ref} row my={-4} px={3} {...props} />
))

export const FeatureSection = React.forwardRef((props, ref) => (
  <x.section
    ref={ref}
    py={4}
    borderTop={1}
    borderBottom={1}
    borderColor="layout-border"
    {...props}
  />
))
