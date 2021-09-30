# Extending

Even though v8n comes with more than 30 validation rules already baked right in,
you will often find that you need something else for your project. Of course
it's super easy to extend v8n to use your own rules in the same fluid way. Rules
are importantly just functions with a name that return either `true`, `false` or
in the case of asynchronous validation a `Promise` that resolves to a `boolean`.
Extending is always done using the `extend()` method on the v8n object. It
receives an object as it's only parameter that contains the name of the rule as
the key and the function as the value.

::: tip
Custom rules will override built-in rules with the same name.
:::

## Regular rules

Regular rules are simple functions that ultimately return a `boolean`. You can
do however much you want within the function, including nesting more validation
chains from new v8n calls. Specifically your function needs to be passed to as
the value of an object given to `extend()`. You can have as many parameters on
your rule as you like, but the return value must be a function that returns the
`boolean` mentioned above.

```js
v8n.extend({
  myCustomRule: expected => {
    return value => value === expected;
  }
});

v8n()
  .myCustomRule("bar")
  .test("foo"); // False
```

::: warning
The `extend()` method is not called on `v8n()` but instead is a property of
the `v8n` object. Make sure to ommit the braces here!
:::

If you really love arrow functions and single lines, you could make the above
rule even smaller.

```js
const myCustomRule = expected => value => value === expected;
v8n.extend({ myCustomRule });
```

Your function should return a function and not just the boolean. This is
important so that you can actually work with the value for validation. The value
will be available as the only argument of the returned function so that you can
work with it.

::: tip
Your custom function does not accept the value as a parameter, it only receives
it's own configuration. The value is available from a function within the rule.
:::

If you omit the function return you will still be fine, but your validation
could not work with the value that is being validated. This might be useful if
you are validating that some external condition not dependent on the value is
met. Usually you'll want the value though.

## Asynchronous rules

Asynchronous rules are very similar to regular rules. There are only subtle
differences in declaration and usage.

- Can only be used with `asyncTest()` strategy
- Must return a `Promise` that resolves to `boolean`

Essentially you defined these rules exactly the same as any regular rule. The
thing that these make possible is that you can return `Promise` instead of
actually having to get the value beforehand. This is particularly useful for
calls to a webserver for some sort of backend validation or database checks. The
`Promise` then needs to resolve to a `boolean` value and v8n will handle the
rest, including rejecting if anythingn happens or if it resolves to `false`. You
don't have to reject the `Promise` yourself.

```js
const myAsyncCustomRule = expected => {
  return value => {
    // fetches data from an api, for example, and resolves with the result
    const result = fetch("some API call");
    return Promise.resolve(result == expected);
  };
};
v8n.extend({ myAsyncCustomRule });
```

Most popular HTTP libraries will return Promises, so this will let you simply
pass them to return and be done with it. Everything will be handled by v8n
and the `testAsync()` strategy.
