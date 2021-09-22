import React from 'react'
import styled, { useTheme, th, up, css } from '@xstyled/styled-components'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { mdx } from '@mdx-js/react'
import rangeParser from 'parse-numeric-range'
import { LiveProvider, LiveEditor, LiveError, LivePreview as BaseLivePreview } from 'react-live'

const Pre = styled.pre`
  ${(props) => {
    return (
      props.highlight &&
      css`
        .prism-code .token-line.dimmed {
          filter: saturate(50%);
          transition: opacity 350ms ease 350ms;
          opacity: 0.5;
        }

        &:hover .token-line.dimmed {
          opacity: 0.8;
          transition-delay: 0ms;
        }
      `
    )
  }}
  font-size: 15;
  line-height: 1.45;
  word-break: normal;
  overflow: auto;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  margin: 3 -3;
  background-color: editor-background;
  color: editor-on;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  hyphens: none;
  padding: 4 0;
  border-left: ${th.space(4)} solid transparent;
  border-right: ${th.space(4)} solid transparent;
  textarea {
    &:focus {
      outline: none;
    }
  }
  ${up(
    'sm',
    css`
      border-radius: editor;
      margin: 3 -2;
    `
  )}
`

const calculateLinesToHighlight = (meta) => {
  const RE = /{([\d,-]+)}/

  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1]
    const lineNumbers = rangeParser(strlineNumbers)
    return (index) => lineNumbers.includes(index + 1)
  }
  return () => false
}

const LivePreview = styled(BaseLivePreview)`
  padding: preview-padding-y preview-padding-x;
  margin: 3 -3 -3;
  border-top: 1;
  border-color: editor-border;
  border-image: initial;
  white-space: normal;
  font-family: base;
  overflow: hidden;
  background-color: background;
  color: on-background;
  ${up(
    'sm',
    css`
      border-right: 1;
      border-left: 1;
      border-radius: editor;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-color: editor-border;
      margin-left: -2;
      margin-right: -2;
    `
  )}
`

const globalModules = {
  react: 'React'
}

export function LiveConfig({ modules }) {
  Object.assign(globalModules, modules)
  return null
}

function req(path) {
  const dep = globalModules[path]

  if (!dep) {
    throw new Error(`Unable to resolve path to module '${path}'. Use "LiveConfig" to provide modules.`)
  }
  return dep
}

function importToRequire(code) {
  return (
    code
      // { a as b } => { a: b }
      .replace(/([0-9a-z_$]+) as ([0-9a-z_$]+)/gi, '$1: $2')
      // import { a } from "a" => const { a } = require("b")
      .replace(/import {([^}]+)} from ([^\s;]+);?/g, 'const {$1} = require($2);')
      // import a from "a" => const a = require("a").default || require("a")
      .replace(/import ([\S]+) from ([^\s;]+);?/g, 'const $1 = require($2).default || require($2);')
      // import * as a from "a"
      .replace(/import \* as ([\S]+) from ([^\s;]+);?/g, 'const $1 = require($2);')
      // import a from "a" => const a = require("a").default || require("a")
      .replace(
        /import (.+),\s?{([^}]+)} from ([^\s;]+);?/g,
        ['const $1 = require($3).default || require($3);', 'const {$2} = require($3);'].join('\n')
      )
  )
}

export function usePrismTheme() {
  const theme = useTheme()
  return th('prism-theme')({ theme })
}

export function Code({ children, lang = 'markup', live, noInline, editorStyle, highlight, ...rest }) {
  const shouldHighlightLine = calculateLinesToHighlight(highlight)
  const prismTheme = usePrismTheme()

  if (live) {
    return (
      <LiveProvider
        code={children.trim()}
        transformCode={(code) => `/* @jsx mdx */ ${importToRequire(code)}`}
        scope={{ mdx, require: req }}
        language={lang}
        theme={prismTheme}
        noInline={noInline}
      >
        <LivePreview />
        <Pre style={editorStyle}>
          <LiveEditor padding={0} />
        </Pre>
        <LiveError />
      </LiveProvider>
    )
  }
  return (
    <Pre highlight={!!highlight} style={editorStyle}>
      <Highlight {...defaultProps} code={children.trim()} language={lang} theme={prismTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i })

              if (!shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} dimmed`
              }

              return (
                <div {...lineProps}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </Pre>
  )
}
