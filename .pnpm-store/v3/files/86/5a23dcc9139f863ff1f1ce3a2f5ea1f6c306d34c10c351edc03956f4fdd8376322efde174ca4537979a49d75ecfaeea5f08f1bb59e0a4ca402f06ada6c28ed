# Introduction

## What's v8n?

v8n aims to be the most fluent and simple validation library for use in any
context. The API is beautifully readable and allows for easy creation of complex
validations in any part of your app. Even though there are many useful default
validation methods, it's a breeze to add your own fluent rules to v8n and use
them anywhere in your app.

The name v8n is actually derived from the structure of the word "validation". If
you look closely you will find that between the _v_ and the _n_ in there are
precisely 8 letters (_a l i d a t i o_). So we get from the sort of boring word
_validation_ to the very nice looking acronym **v8n**.

### Features

- Fluent and chainable API
- Useful standard validation rules (30+)
- Custom validations rules
- Asynchronous validation
- Reusability

## Getting started

Using v8n is supposed to be easy and intuitive. Aside from usage in the browser
with versions hosted on popular CDN services, you can import the library into
your codebase with `import` or `require` depending on how bleeding-edge you
are.

The example below shows one way to get started. Simply create an `.html` file
and add this to it. Now you will be able to use `v8n()` anywhere on that page
right away.

```html
<script src="https://unpkg.com/v8n/dist/v8n.min.js"></script>
```

This is just the most straightforward approach without any build setup or
complex imports. The [Installation](/Installation.md) page gives you an overview
of all the available installation methods.

After you've included v8n in some way you can use it very easily.

```js
v8n()
  .string()
  .test("My string!"); //true
```

## Overview

### Fluent API

One of the main goals of v8n is its simple and fluent usage. You simply chain
your rules and build even incredibly complex rules with easy. You can chain any
number of built-in rules and even combine them with your own custom rules in the
same way. Make sure to check out all the
[built-in rules](/api/#built-in-rules) and how you can add your own.

```javascript
v8n()
  .string()
  .first("H")
  .last("o")
  .test("Hello"); //true
```

The code above simply validates that the given value is a string, it's first
character is `H` and the last is `o`. Doesn't that look really readable? Be sure
to read up on [validation strategies](#validation-strategies) after you wrote
your validations, so that you can leverage them to their full extent.

### Custom rules

Extending is at the core of v8n. And it's easy, too. All you do is pack your own
validation into a function that returns a `boolean`. You can do as much logic
in your rule as you like, all that matters is the boolean return and you're good
to go. Once you created your function just add it using `extend()`. Take a look
at the [Extending](/Extending.md) page for more details and different types of
rules you might want to add.

::: tip
You can also create
[Promise based validation rules](/Validation.md#Asynchronous-validation).
:::

### Validation strategies

Sometimes you might not want a boolean return, maybe you're working in a
try-catch or you need to know which rules failed for the given value. You're
in luck, v8n offers multiple validation strategies that give you great
flexibility when writing your code and give your more than just true or false.
If you want to know more read up about all the
[validation strategies](/Validation.md#strategies) and how to use them.
