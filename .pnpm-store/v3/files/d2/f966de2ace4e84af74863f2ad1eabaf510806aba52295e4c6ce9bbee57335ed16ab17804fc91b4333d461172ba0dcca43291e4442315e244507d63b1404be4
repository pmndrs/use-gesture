---
sidebar: auto
---

# API Reference

## Core

### v8n

- **Signature:** `v8n()`

- **Returns:** `Proxy`

- **Usage:**

  This function is the main entry point for `v8n`. Once this function is called
  rule chaining can be done on it. There can be multiple instances of `v8n` in
  your code independently from one another. Instances can also be
  [reused](/Validation.md#reusing-validations) with some preset of rules that is
  common to multiple validation.

  ```js
  v8n()
    .string()
    .test("Test");
  ```

- **See also:** [Extending](/Extending.md)

### extend

- **Signature:** `extend(newRules)`

- **Arguments:**

  - `newRules: Object`

- **Usage:**

  This function is used to add custom validation rules to `v8n`. It accepts an
  objects of keys and values where the keys are the names for the rule and the
  values are the functions performing the validation. These rules can be
  asynchronous. Refer to the [guide on extending `v8n`](/Extending.md) for more
  information on how rules need to be written.

  ::: danger
  This function is part of the `v8n` object and is not available on `v8n()`.
  Make sure to omit the braces to call `extend()`.
  :::

  ```js
  v8n.extend({
    myRule: expected => value => value === expected;
  });
  ```

- **See also:** [Extending](/Extending.md)

### Rule

- **Properties:**

  - `name: any`
  - `fn: Function`
  - `args: any[]`
  - `modifiers: Modifier[]`

- **Details:**

  This class represents a rule. It is returned from [array-based
  validation](#testall) and is contained in the rule property of a
  [`ValidationError`](#validationerror). The `fn` property contains the actual
  function the validation strategy uses to validate the value.

- **See also:** [Modifier](#modifier), [ValidationError](#validationerror)

### Modifier

- **Properties:**

  - `fork: Function`
  - `exec: Function`

- **Details:**

  This class represents a modifier. It is contained in an array within the
  `modifiers` property of a [`Rule`](#rule). `fork` is a helper function for
  mapping the value to the function correctly. `exec` performs the actual
  modification of the modifier.

- **See also:** [Rule](#rule)

### ValidationError

- **Extends:** [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

- **Properties:**

  - `rule: Rule`
  - `value: any`
  - `cause: Error`
  - `[target: string]`

- **Details:**

  This Exception is an extension of the native JavaScript `Error`. It's thrown
  when validation fails during [exception-based validation](#check) and is
  rejected to when [asynchronous validation](#testAsync) fails. It contains the
  `rule` that failed, the tested `value` and the `cause` of the exception. For
  certain rules it might also have a `target` which would usually represent a
  key in an object.

- **See also:** [Rule](#rule), [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

## Validation strategies

### test

- **Signature:** `test(value)`

- **Arguments:**

  - `value: any`

- **Returns:** `boolean`

- **Usage:**

  This function is used for boolean-based validation. It is chained at the end
  of all the rules and will return either true if all of them passed or false if
  any of them failed. It accepts only the value to be validated.

  ```js
  v8n()
    .string()
    .test("Test"); // True

  v8n()
    .number()
    .test(2); // True

  v8n()
    .null()
    .test([true, false]); // False
  ```

### testAll

- **Signature:** `testAll(value)`

- **Arguments:**

  - `value: any`

- **Returns:** [`ValidationError[]`](#validationerror)

- **Usage:**

  This function is used for array-based validation. It is chained at the end of
  all the rules and will return an array containing ValidationError objects, one
  for each failed rule. The array is empty if the validation succeeded.

  ```js
  v8n()
    .string()
    .first("T")
    .testAll("Test"); // []

  v8n()
    .number()
    .greaterThan(4)
    .test(3);
  // [ ValidationError{ rule: { name: "greaterThan"...}, value: 3 ...} ... ]
  ```

- **See also:** [ValidationError](#validationerror)

### check

- **Signature:** `check(value)`

- **Arguments:**

  - `value: any`

- **Throws:** [`ValidationError`](#validationerror)

- **Usage:**

  This function is used for exception-based validation. It is chained at the end
  of all the rules and will return nothing if the validation passed. If any rule
  fails a [`ValidationError`](#validationerror) is thrown that contains the
  failed rule.

  ```js
  v8n()
    .string()
    .check("Test"); // (no return value)

  v8n()
    .string()
    .test(3); // ValidationError is thrown
  ```

- **See also:** [ValidationError](#validationerror)

### testAsync

- **Signature:** `testAsync(value)`

- **Arguments:**

  - `value: any`

- **Returns:** `Promise<any>`

- **Usage:**

  This function is used for asynchronous validation. It is chained at the end of
  all the rules and will return a `Promise` that will resolve to the validated
  value if validation passes or reject to a
  [`ValidationError`](#validationerror) if it fails. This strategy must be used
  if any asynchronous rules are used. It allows for the use of regular rules
  next to asynchronous ones.

  ::: danger
  All other validation strategies won't work for asynchronous rules.
  :::

  ```js
  v8n()
    .myAsyncRule()
    .testAsync("Test") // Promise
    .then(validatedValue => {
      // Validation passed
    })
    .catch(exception => {
      // Validation failed
    });

  v8n()
    .myAsyncRule()
    .test("Test"); // Unexpected result because the async rule is not resolved

  v8n()
    .string() // This works even though it's not async
    .myAsyncRule()
    .first("T") // This also works
    .testAsync("Test"); // Promise
  ```

- **See also:** [ValidationError](#validationerror)

## Built-in rules

### pattern

- **Signature:** `pattern(pattern)`

- **Arguments:**

  - `pattern: RegExp`

- **Usage:**

  This rule verifies that the tested value matches a `RegExp` pattern.

  ```js
  v8n()
    .pattern(/[a-z]+/)
    .test("hello"); // true

  v8n()
    .pattern(/[0-9]/)
    .test("hello"); // false
  ```

- **See also:** [RegExp](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

### equal

- **Signature:** `equal(expected)`

- **Arguments:**

  - `expected: any`

- **Usage:**

  This rule verifies that the tested value matches the expected value losely.

  ::: warning
  This rule uses `==` to check equality. For strict equality use the
  [`exact`](#exact) rule.
  :::

  ```js
  v8n()
    .equal(10)
    .test("10"); // true

  v8n()
    .equal("Hello")
    .test("Another"); // false
  ```

- **See also:** [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

### exact

- **Signature:** `exact(expected)`

- **Arguments:**

  - `expected: any`

- **Usage:**

  This rule verifies that the tested value matches the expected value.

  ```js
  v8n()
    .exact(10)
    .test("10"); // false

  v8n()
    .exact("Hello")
    .test("Hello"); // true
  ```

### string

- **Signature:** `string()`

- **Usage:**

  This rule verifies that the tested value is a string.

  ```js
  v8n()
    .string()
    .test("Hello"); // true

  v8n()
    .string()
    .test(123); // false
  ```

### number

- **Signature:** `number(allowInfinite = true)`

- **Arguments:**

  - `[allowInfinite: boolean]`

- **Usage:**

  This rule verifies that the tested value is a number. This rule will also
  return `true` for infinite values like `NaN` and `Infinity` by default. You
  may disable this behaviour by setting the `allowInfinite` parameter to
  `false`.

  ::: warning DEPRECATED
  From **v2.0.0** onwards this rule will return `false` for infinite values by
  default.
  :::

  ```js
  v8n()
    .number()
    .test(123); // true

  v8n()
    .number()
    .test("Hello"); // false

  v8n()
    .number()
    .test(NaN); // true

  v8n()
    .number(false)
    .test(NaN); // false
  ```

### numeric

- **Signature:** `numeric()`

- **Usage:**

  This rule verifies that the tested value is numeric. A numeric value is any
  string containing a finite number or a finite number. Notably `Infinity` and
  `NaN` are not numeric.

  ```js
  v8n()
    .numeric()
    .test(123); // true

  v8n()
    .numeric()
    .test("123"); // true

  v8n()
    .numeric()
    .test("1.23"); // true

  v8n()
    .numeric()
    .test(NaN); // false
  ```

### boolean

- **Signature:** `boolean()`

- **Usage:**

  This rule verifies that the tested value is a boolean.

  ```js
  v8n()
    .boolean()
    .test(22); // false

  v8n()
    .boolean()
    .test(false); // true
  ```

### undefined

- **Signature:** `undefined()`

- **Usage:**

  This rule verifies that the tested value is undefined.

  ```js
  v8n()
    .undefined()
    .test("something"); // false

  v8n()
    .undefined()
    .test(undefined); // true

  v8n()
    .undefined()
    .test(); // true
  ```

### null

- **Signature:** `null()`

- **Usage:**

  This rule verifies that the tested value is null.

  ```js
  v8n()
    .null()
    .test(123); // false

  v8n()
    .null()
    .test(null); // true
  ```

### array

- **Signature:** `array()`

- **Usage:**

  This rule verifies that the tested value is an array.

  ```js
  v8n()
    .array()
    .test("hello"); // false

  v8n()
    .array()
    .test([1, 2, 3]); // true
  ```

### object

- **Signature:** `object()`

- **Usage:**

  This rule verifies that the tested value is an object.

  ```js
  v8n()
    .object()
    .test("hello"); // false

  v8n()
    .object()
    .test({ key: "value" }); // true
  ```

### instanceOf

- **Signature:** `instanceOf()`

- **Usage:**

  This rule verifies that the prototype of the tested value appears anywhere in the prototype chain of the provided constructor.

  ```js
  v8n()
    .instanceOf(Date)
    .test("hello"); // false

  v8n()
    .instanceOf(Date)
    .test(new Date()); // true
  ```

### lowercase

- **Signature:** `lowercase()`

- **Usage:**

  This rule verifies that the tested value is all lowercase.

  ```js
  v8n()
    .lowercase()
    .test("hello"); // true

  v8n()
    .lowercase()
    .test("Hello"); // false
  ```

### uppercase

- **Signature:** `uppercase()`

- **Usage:**

  This rule verifies that the tested value is all uppercase.

  ```js
  v8n()
    .uppercase()
    .test("HELLO"); // true

  v8n()
    .uppercase()
    .test("Hello"); // false
  ```

### vowel

- **Signature:** `vowel()`

- **Usage:**

  This rule verifies that the tested value is all vowels.

  ::: warning
  Only vowels of the "words" characters set are valid:
  [Read more](http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.6)
  :::

  ```js
  v8n()
    .vowel()
    .test("AEIOU"); // true

  v8n()
    .vowel()
    .test("AEIOUZ"); // false
  ```

- **See also:** [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.6)

### consonant

- **Signature:** `consonant()`

- **Usage:**

  This rule verifies that the tested value is all consonants.

  ::: warning
  Only consonants of the "words" characters set are valid:
  [Read more](http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.6)
  :::

  ```js
  v8n()
    .consonant()
    .test("vn"); // true

  v8n()
    .consonant()
    .test("me"); // false
  ```

- **See also:** [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.6)

### first

- **Signature:** `first(item)`

- **Arguments:**

  - `item: any`

- **Usage:**

  This rule verifies that the tested value is a string that starts with the
  given letter or an array where the first item is the given item.

  ```js
  v8n()
    .first("H")
    .test("Hello"); // true

  v8n()
    .first("A")
    .test("Hello"); // false
  ```

  ```js
  v8n()
    .first("One")
    .test(["One", "Two", "Three"]); // true

  v8n()
    .first(10)
    .test([0, 10, 20]); // false
  ```

### last

- **Signature:** `last(item)`

- **Arguments:**

  - `item: any`

- **Usage:**

  This rule verifies that the tested value is a string that ends with the
  given letter or an array where the last item is the given item.

  ```js
  v8n()
    .last("o")
    .test("Hello"); // true

  v8n()
    .last("A")
    .test("Hello"); // false
  ```

  ```js
  v8n()
    .last("Three")
    .test(["One", "Two", "Three"]); // true

  v8n()
    .last(10)
    .test([0, 10, 20]); // false
  ```

### empty

- **Signature:** `empty()`

- **Usage:**

  This rule verifies that the tested value is empty.

  ::: warning
  This rule works with any value that has a `length` property.
  :::

  ```js
  v8n()
    .empty()
    .test(""); // true

  v8n()
    .empty()
    .test([1, 2]); // false
  ```

### length

- **Signature:** `length(min, max = min)`

- **Arguments:**

  - `min: number`
  - `[max: number]`

- **Usage:**

  This rule verifies that the tested value has the specified length. The `max`
  parameter is optional and defaults to the value of `min`.

  ::: warning
  This rule works with any value that has a `length` property.
  :::

  ```js
  v8n()
    .length(3, 5)
    .test([1, 2, 3, 4]); // true

  v8n()
    .length(3)
    .test([1, 2, 3, 4]); // false
  ```

### minLength

- **Signature:** `minLength(min)`

- **Arguments:**

  - `min: number`

- **Usage:**

  This rule verifies that the tested value has the at least the specified
  length.

  ::: warning
  This rule works with any value that has a `length` property.
  :::

  ```js
  v8n()
    .minLength(3)
    .test([1, 2, 3, 4]); // true

  v8n()
    .minLength(3)
    .test([1, 2]); // false
  ```

### maxLength

- **Signature:** `maxLength(max)`

- **Arguments:**

  - `max: number`

- **Usage:**

  This rule verifies that the tested value has the at most the specified
  length.

  ::: warning
  This rule works with any value that has a `length` property.
  :::

  ```js
  v8n()
    .maxLength(3)
    .test([1, 2]); // true

  v8n()
    .maxLength(3)
    .test([1, 2, 3, 4]); // false
  ```

### negative

- **Signature:** `negative()`

- **Usage:**

  This rule verifies that the tested value is a negative number.

  ```js
  v8n()
    .negative()
    .test(-1); // true

  v8n()
    .negative()
    .test(0); // false
  ```

### positive

- **Signature:** `positive()`

- **Usage:**

  This rule verifies that the tested value is a positive number.

  ```js
  v8n()
    .positive()
    .test(1); // true

  v8n()
    .positive()
    .test(-1); // false
  ```

### between

- **Signature:** `between(min, max)`

- **Arguments:**

  - `min: number`
  - `max: number`

- **Usage:**

  This rule verifies that the tested value is in within the specified range.

  ::: warning
  The bounds `min` and `max` are included in the range check (inclusive).
  :::

  ```js
  v8n()
    .between(1, 3)
    .test(2); // true

  v8n()
    .between(1, 3)
    .test(4); // false
  ```

### range

- **See also:** This is an alias of [between](#between)

### lessThan

- **Signature:** `lessThan(bound)`

- **Arguments:**

  - `bound: number`

- **Usage:**

  This rule verifies that the tested value is less than the `bound`.

  ```js
  v8n()
    .lessThan(10)
    .test(9); // true

  v8n()
    .lessThan(10)
    .test(10); // false
  ```

- **See also:** [lessThanOrEqual](#lessthanorequal)

### lessThanOrEqual

- **Signature:** `lessThanOrEqual(bound)`

- **Arguments:**

  - `bound: number`

- **Usage:**

  This rule verifies that the tested value is less than or equal to the `bound`.

  ```js
  v8n()
    .lessThanOrEqual(10)
    .test(10); // true

  v8n()
    .lessThanOrEqual(10)
    .test(11); // false
  ```

- **See also:** [lessThan](#lessthan)

### greaterThan

- **Signature:** `greaterThan(bound)`

- **Arguments:**

  - `bound: number`

- **Usage:**

  This rule verifies that the tested value is greater than the `bound`.

  ```js
  v8n()
    .greaterThan(10)
    .test(11); // true

  v8n()
    .greaterThan(10)
    .test(10); // false
  ```

- **See also:** [greaterThanOrEqual](#greaterthanorequal)

### greaterThanOrEqual

- **Signature:** `greaterThanOrEqual(bound)`

- **Arguments:**

  - `bound: number`

- **Usage:**

  This rule verifies that the tested value is greater than or equal to the
  `bound`.

  ```js
  v8n()
    .greaterThanOrEqual(10)
    .test(10); // true

  v8n()
    .greaterThanOrEqual(10)
    .test(9); // false
  ```

- **See also:** [greaterThan](#greaterthan)

### even

- **Signature:** `even()`

- **Usage:**

  This rule verifies that the tested value is an even number.

  ```js
  v8n()
    .even()
    .test(40); // true

  v8n()
    .even()
    .test(21); // false
  ```

### odd

- **Signature:** `odd()`

- **Usage:**

  This rule verifies that the tested value is an odd number.

  ```js
  v8n()
    .odd()
    .test(20); // false

  v8n()
    .odd()
    .test(9); // true
  ```

### includes

- **Signature:** `includes(item)`

- **Arguments:**

  - `item: any`

- **Usage:**

  This rule verifies that the tested value is a string that contains the
  given letter or an array that contains the given item.

  ```js
  v8n()
    .includes(2)
    .test([1, 2, 3]); // true

  v8n()
    .includes("a")
    .test("Hello"); // false
  ```

### integer

- **Signature:** `integer()`

- **Usage:**

  This rule verifies that the tested value is an integer.

  ```js
  v8n()
    .integer()
    .test(20); // true

  v8n()
    .integer()
    .test(2.2); // false
  ```

### schema

- **Signature:** `schema(schema)`

- **Arguments:**

  - `schema: Object`

- **Usage:**

  This rule verifies that the tested value is an object where the `schema`
  matches the given schema. The given schema contains key-validation pairs. The
  values of the given object are then validated based on the validation
  specified for it's key in the schema.

  ```js
  const validation = v8n().schema({
    id: v8n()
      .number()
      .positive(),
    name: v8n()
      .string()
      .minLength(4)
  });

  validation.test({
    id: 1,
    name: "Luke"
  }); // true

  validation.test({
    id: -1,
    name: "Luke"
  }); // false
  ```

### passesAnyOf

- **Signature:** `passesAnyOf(...validations)`

- **Arguments:**

  - `validations: ...Validation`

- **Usage:**

  This rule checks if any of the validations given as its argument passes when
  performed against the validated value. If some of them pass, the rule passes.
  But if all of them fail, the rule fails, too. If no validation is given as the
  argument, the rule fails.

  ```js
  const validation = v8n().passesAnyOf(v8n().number(), v8n().null());

  validation.test(12); // true
  validation.test(null); // true
  validation.test("Hello"); // false
  ```

### optional

- **Signature:** `optional(validation, considerTrimmedEmptyString = false)`

- **Arguments:**

  - `validation: Validation`
  - `considerTrimmedEmptyString: boolean`

- **Usage:**

  Validates an optional value to pass a validation. Will return `true` for any
  `undefined` or `null` values regardless of the given Validation. If the
  `considerTrimmedEmptyString` argument is set to true, it will also pass if
  the value is a trimmed empty string.

  ::: tip
  When the `check()` is used on this rule, an exception resulting from within
  will have the failed rule as in its `cause.rule` parameter.
  :::

  ```js
  const validation = v8n().optional(
    v8n()
      .number()
      .positive()
  );

  validation.test(-1); // false
  validation.test(1); // true
  validation.test(null); // true
  ```

  ```js
  const validation = v8n().optional(
    v8n()
      .number()
      .positive(),
    true // consider trimmed empty strings
  );

  validation.test(-1); // false
  validation.test(1); // true
  validation.test(null); // true
  validation.test(""); // true
  validation.test("   "); // true
  validation.test("hello"); // false
  ```

## Built-in modifiers

### not

- **Applicable Types:** `any`

- **Usage:**

  This modifier will invert the rule that follows it. This allows for checking
  if something does not meet a specified rule.

  ```js
  v8n()
    .string()
    .test("Hello"); // true

  v8n()
    .not.string()
    .test("Hello"); // false
  ```

### some

- **Applicable Types:** `array|string`

- **Usage:**

  This modifier makes the rule check that at least one item in a given array
  passes validation. It applies to the rule chained after it.

  ```js
  v8n()
    .some.positive()
    .test([1, -2, -3]); // true

  v8n()
    .some.positive()
    .test(-1, -2, -3); // false
  ```

### every

- **Applicable Types:** `array|string`

- **Usage:**

  This modifier makes the rule check that all the items in a given array
  pass validation. It applies to the rule chained after it.

  ```js
  v8n()
    .every.positive()
    .test([1, 2, 3]); // true

  v8n()
    .every.positive()
    .test(1, 2, -3); // false
  ```
