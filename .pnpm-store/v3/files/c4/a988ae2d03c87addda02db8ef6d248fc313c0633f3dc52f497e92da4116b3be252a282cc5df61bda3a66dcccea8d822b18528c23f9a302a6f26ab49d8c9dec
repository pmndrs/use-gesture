import styled, { css, up, down } from '@xstyled/styled-components'

export const Article = styled.article`
  .anchor {
    fill: on-background;
  }

  code {
    background-color: background-light;
    color: on-background-primary;
    border-radius: base;
    padding: 0 1;
  }

  mark {
    background-color: background-mark;
  }

  > p {
    margin: 3 0;
    font-size: 16;
    line-height: 1.6;
    max-width: 52em;
  }

  /* Intro */
  > h1 + p {
    font-size: 18;
    font-weight: 300;
    color: on-background-light;
    margin: 2 0 !important;

    ${up(
      'xl',
      css`
        font-size: 22;
        line-height: 1.2;
      `,
    )};

    a,
    strong {
      font-weight: 400;
    }
  }

  > hr {
    margin: 0;
    height: 0;
    border: 0;
    border-top: 1;
    border-color: layout-border;
    margin: 4 0;

    &:first-child {
      margin-top: 0;
    }
  }

  > h1 {
    font-size: 32;
    line-height: 1.1;
    font-weight: 600;
    margin: 40 0 2;
  }

  > h2 {
    font-size: 24;
    line-height: 1.2;
    font-weight: 600;
    margin: 4 0;
    padding-top: 3;
    border-top: 1;
    border-color: layout-border;
  }

  > h1 + h2,
  > h2:first-child {
    border-top: 0;
    margin-top: 0;
    padding-top: 0;
  }

  > h3 {
    font-size: 18;
    line-height: 1.2;
    font-weight: 600;
    margin: 4 0 3;

    ${down(
      'sm',
      css`
        overflow-wrap: break-word;
        word-break: break-word;
      `,
    )}
  }

  > h4 {
    font-weight: 500;
    font-size: 16;
    line-height: 1.2;
    margin: 3 0;
  }

  > h4 + p {
    margin-top: 3;
  }

  > ul + p {
    margin-top: 2;
  }

  .editor {
    background-color: editor-background;
    color: editor-text;
    padding: 3 4;
    margin: 4 -3;
    overflow: auto;
    font-size: 14;
    line-height: 1.45;
    border-radius: base;

    ${down(
      'sm',
      css`
        margin-left: -4;
        margin-right: -4;
        border-radius: 0;
      `,
    )}
  }

  > code {
    background-color: editor-background;
    border-radius: base;
    color: inherit;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,
      Courier New, monospace;
    font-size: 85%;
    padding: 1 2;
  }

  img {
    max-width: 100%;
  }

  ol,
  ul {
    margin-top: 4;
    font-size: 16;
    padding-left: 4;

    p,
    p:first-of-type {
      font-size: 16;
      margin-top: 0;
      line-height: 1.2;
    }

    li {
      margin-top: 2;
    }

    ol,
    ul {
      margin-left: 4;
      margin-top: 2;
    }
  }

  ol {
    list-style: decimal;
  }

  ul {
    list-style: disc;
  }

  > blockquote {
    font-size: 16;
    background-color: blockquote-background;
    border-left: 8;
    border-color: blockquote-border;
    padding: 3;
    margin: 3 -2;
    border-radius: blockquote;

    code {
      background-color: rgba(255, 255, 255, 0.1);
      background-blend-mode: color;
      color: on-background;
      border-radius: base;
      padding: 0 1;
    }

    p {
      margin-top: 3;

      &:first-of-type {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    a {
      transition: fast;
      color: blockquote-link;
      text-decoration: underline;

      &:hover {
        color: on-background;
      }
    }
  }

  a {
    transition: fast;
    text-decoration: underline;
    color: on-background-primary;

    &:hover {
      color: on-background-primary-dark;
    }
  }
`
