# Building Validations

Setting up validations is really easy with v8n. Everything starts from the base
function `v8n()`. After calling this function you can chain all the rules you
like to create simple or complex validations.

```js
v8n(); // Chain after this!
```

## Chaining rules

In order to build the validation we use a paradigm called chaining. This
essentially means that you build each validation rule after one another. This
creates a fluent writing experience. You can chain any rules to create your
custom validations.

```js
v8n()
  .string()
  .first("B")
  .test("Bread"); // The validation strategy, this will be true
```

::: warning
There are no sanity checks, combining conflicting rules is possible.
:::

At the end of your rules you will chain a
[validation strategy](#validation-strategies). This will end the chain and give
you the result of the validation. There are multiple available, make sure to
find the right one for you.

There is no need to write one rule per line, it's just a nice convention to
follow for clean code. For simple validations you can simply inline your
validation. You can also use these in conditionals and loops directly.

<!-- prettier-ignore -->
```js
if (v8n().number().test(2)) {
  // If 2 is a number, do something!
}
```

It's important to keep types in mind when validating. A string that consists of
just a number is not a number in the JavaScript sense. If you pass `'12'` to
the `number()` rule you'll get a negative result since `'12'` is a string.
v8n makes no assumptions about your types, so you need be explicit here and
convert the string manually beforehand.

```js
v8n()
  .number()
  .test("12"); // False because it's a string

v8n()
  .number()
  .test(Number("12")); // True because Number turns '12' into 12
```

Some rules also have parameters to control how they validate your value. These
are passed right in the chain. Notice that the stuff you pass to rules is not
validated, it is simply configuration for the rule.

```js
v8n()
  .greaterThan(2)
  .test(1); // False, 1 is not at least 2
```

For all the rules you can chain take a look at the
[full list](/api/#built-in-rules).

### Optional Validations

If you have an optional value of some sort you might want to verify that it
passes some sort of validation only if it's defined. You could wrap the whole
validation in an `if` clause, but really there's a much better way. `v8n`
provides optional validation out of the box. This means you can just write your
rule-chain as you like and wrap it in an `optional()` validation rule.

```js
const specialString = v8n()
  .string()
  .length(12);

v8n()
  .optional(specialString)
  .test("I like apples"); // true

v8n()
  .optional(specialString)
  .test("I like oranges"); // false

v8n()
  .optional(specialString)
  .test(undefined); // true
```

## Modifiers

Sometimes you might want the inverse of a rule somewhere in your validation. For
example you might want to check that something isn't `null` when it can be any
other type. This is where modifiers come in. Modifiers are similar to rules,
they are also chained but instead of validating anything they will augment the
following rule.

```js
v8n()
  .not.null()
  .test(2); // True, 2 isn't null

v8n()
  .every.number()
  .test([1, 2, "hello"]); // False, hello isn't a number

v8n()
  .some.number()
  .test([1, 2, "hello"]); // True, there is at least one number
```

::: tip
Modifiers can be combined on a rule. Simply chain them!
:::

Notice how modifiers don't have braces `()`, this distinguishes them from
regular rules. There are three modifiers provided which you can use. Two of them
cater to arrays and one is more general purpose. Take a peek at all the
[built-in modifiers](/api/#built-in-modifiers) for a little more info.

## Validation strategies

Most validation will only return `true` or `false`. While v8n offers this, it
also gives you the ability to validate with different output formats. There are
currently 4 validation strategies for use and all of them are slightly different
from one another.

The validation strategy is chosen with the method at the end of your validation
chain. This method also receives the value you want to validate as it's only
argument. So keep in mind that whatever you actually want to validate is written
at the end of the chain, not anywhere within the rules or at the beginning.

### Boolean based validation

Of course when validating many people will want to know if the given value
passes or not. This is regular `boolean` validation and v8n performs this if
you use the `test()` method. Quite simply this will return true if all the rules
pass and false if any of them fails.

```js
v8n()
  .string()
  .test("Melon"); // True

v8n()
  .string()
  .test({ age: 3 }); // False, this is an object
```

This strategy is most useful for conditionals since you can pass its result
directly into an `if` statement or similar. For more details about `test()`
and for additional examples take a look at it's [API documentation](/api/#test).

### Array based validation

If you really need to know what was wrong with the value you passed to v8n,
simply getting `true` or `false` won't do you any good. This is where
array-based comes in. If you use `testAll()` you will always receive an array in
return. The array will be empty if no rules failed, but it will contain
ValidationError objects indicating each fail if they occur. This also means that
this strategy does not stop when any rule fails like the boolean-based version
does, instead it will always run all the rules.

```js
v8n()
  .string()
  .first("H")
  .last("o")
  .testAll("Hello"); // Returns [] since every rule passes

v8n()
  .string()
  .first("H")
  .last("o")
  .testAll("Hi"); // Returns [ValidationError{rule: {name: "last"...}, ...}]
```

This is useful for providing detailed error messages but can also be used for
any number of other purposes. For some more in-depth examples head over
[to the documentation for `testAll()`](/api/#testall).

::: tip
The array will contain [`ValidationError` objects](/api/#validationexception)
that you can work with.
:::

::: warning
Keep in mind that this validation strategy will work exactly opposite if used
in conditionals compared to `test()`. This is because JavaScript will consider
an empty array to be a falsy value, so no errors would actually result in the
conditional passing here. Make sure to keep this in mind when checking whether
the validation passed here.
:::

### Exception based validation

In some cases you might not want to explicity check if validation passed in a
process. If your entire setup is based on a `try-catch` you might run all of
your code and catch any errors with a single catch to simplify your code. v8n
offers this type of validation too. When you use `check()` an exception will
be thrown if any rule fails. If all rules pass there just won't be any return
value at all.

```js
try {
  v8n()
    .boolean()
    .check("Lion"); // Will throw an exception since "Lion" is not a boolean
} catch (exception) {
  // Handle exception in some way
  exception.rule; // Rule object of the first failed rule
}
```

The resulting [`ValidationError`](/api/#validationexception) will also contain
information about the rule that failed so that you may display errors or
similar. You can find out more in the [documentation for
`check()`](/api/#check).

### Asynchronous validation

A very interesting use-case for validation might be an availability check for
a username or an email. Since your frontend can't know if a user is in the
database, you would need to query the server for this. Requesting something from
the server takes time and any library you might use to achieve it will perform
the request in an asynchronous way. All the strategies above don't support this
type of rule though, since they will return a result before the server has a
chance to respond. This is where we need `testAsync()` to run validations
asynchronously and await all the returns. You will ultimately receive a
`Promise` back which you can react to. It resolves to the value your validated
and would reject to a `ValidationError`.

```js
v8n()
  .string() // You can use regular rules too
  .checkUsernameAvailable() // This asks something from a server
  .testAsync("myUsername") // Promise return
  .then(validatedValue => validatedValue)
  .catch(exception => exception);
```

::: warning
There are no built-in asynchronous rules. If you want to use this feature, you
can check out the guide on [Extending](/Extending.md) and specifically on the
creation of [asynchronous rules](/Extending.md#asynchronous-rules).
:::

Make sure to take a look the [documentation for `testAsync()`](/api/#testasync) to
get a good grasp of the return values it will yield.

## Reusing validations

The flexibility of chaining adds a very nice additional feature. If you have
multiple validations that share common rules you can reuse them across your file
or even export them for use throughout the whole project. This is particulary
useful for complex validations. This also allows you to validate different
values with the same set of rules.

```js
const val = v8n()
  .not.null()
  .greaterThan(2);

val.test(3); // True
val.test(null); // False
val.lessThan(5).test(7); // False
```

You can of course perform different validation strategies on the same set of
rules. The rule-chain is completely decoupled from anything that comes after it,
so you can do as much as you like with it after creation.
