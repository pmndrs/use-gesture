import v8n from "./v8n";
import Rule from "./Rule";

beforeEach(() => {
  v8n.clearCustomRules();
});

describe("chaining", () => {
  let validation;

  beforeEach(() => {
    validation = v8n()
      .string()
      .not.every.lowercase()
      .not.null()
      .first("a")
      .last("e")
      .some.equal("l")
      .length(3, 5);
  });

  it("should chain rules", () => {
    expect(debugRules(validation)).toEqual([
      "string()",
      "not.every.lowercase()",
      "not.null()",
      'first("a")',
      'last("e")',
      'some.equal("l")',
      "length(3, 5)"
    ]);
  });
});

describe("the 'validation' object", () => {
  it("should be immutable", () => {
    const a = v8n().number();
    const b = a.not.equal(10);
    expect(a).not.toBe(b);
    expect(a.test(10)).toBeTruthy();
    expect(b.test(10)).toBeFalsy();
  });
});

describe("execution functions", () => {
  describe("the 'test' function", () => {
    let validation;

    beforeEach(() => {
      validation = v8n()
        .number()
        .between(10, 20)
        .not.odd();
    });

    it("should return false for invalid value", () => {
      expect(validation.test("Hello")).toBeFalsy();
      expect(validation.test(22)).toBeFalsy();
      expect(validation.test(13)).toBeFalsy();
    });

    it("should return true for valid value", () => {
      expect(validation.test(12)).toBeTruthy();
    });
  });

  describe("the 'testAll' function", () => {
    let validation;

    beforeEach(() => {
      validation = v8n()
        .string()
        .last("o")
        .not.includes("a");
    });

    it("should return an array with a ValidationException for each failed rule", () => {
      const result = validation.testAll(100);
      expect(result).toHaveLength(2);
      for (let i = 0; i < result.length; i++) {
        expect(result[i].rule).toBe(validation.chain[i]);
        expect(result[i].value).toBe(100);
      }
    });

    it("should return an empty array if all rules passed", () => {
      expect(validation.testAll("Hello")).toHaveLength(0);
    });
  });

  describe("the 'check' function", () => {
    let validation;

    beforeEach(() => {
      validation = v8n()
        .string()
        .maxLength(3);
    });

    it("should throw exception for invalid value", () => {
      expect(() => validation.check("abcd")).toThrow();
    });

    it("should pass through for valid value", () => {
      expect(() => validation.check("abc")).not.toThrow();
    });

    describe("the thrown exception", () => {
      let exception;

      beforeEach(() => {
        try {
          validation.check("Hello");
        } catch (ex) {
          exception = ex;
        }
      });

      it("should have rule object", () => {
        expect(exception.rule).toBeInstanceOf(Rule);
      });

      it("should have the validated value", () => {
        expect(exception.value).toBe("Hello");
      });
    });
  });

  describe("the 'testAsync' function", () => {
    beforeEach(() => {
      v8n.extend({ asyncRule });
    });

    it("should return a promise", () => {
      const validation = v8n()
        .minLength(2)
        .asyncRule("Hello");

      expect(validation.testAsync("Hello")).toBeInstanceOf(Promise);
    });

    it("should execute rules in sequence", async () => {
      const validation = v8n()
        .minLength(2)
        .asyncRule("Hi")
        .asyncRule("Hello");

      expect.assertions(4);

      try {
        await validation.testAsync("Hello");
      } catch (ex) {
        expect(ex.rule.name).toBe("asyncRule");
        expect(ex.value).toBe("Hello");
      }

      try {
        await validation.testAsync("Hi");
      } catch (ex) {
        expect(ex.rule.name).toBe("asyncRule");
        expect(ex.value).toBe("Hi");
      }
    });

    describe("working with modifiers", () => {
      it("should work with the 'not' modifier", async () => {
        const validation = v8n()
          .minLength(2)
          .not.asyncRule("Hello");

        expect.assertions(2);

        try {
          await validation.testAsync("Hello");
        } catch (ex) {
          expect(ex.rule.name).toEqual("asyncRule");
          expect(ex.value).toEqual("Hello");
        }
      });

      it("should work with mixed modifiers", async () => {
        const val1 = v8n()
          .some.equal("a")
          .not.every.vowel()
          .length(3);

        await expect(val1.testAsync("abc")).resolves.toBe("abc");
        await expect(val1.testAsync("aei")).rejects.toBeDefined();
        await expect(val1.testAsync("efg")).rejects.toBeDefined();
        await expect(val1.testAsync("abcd")).rejects.toBeDefined();

        const val2 = v8n()
          .some.even()
          .some.odd()
          .not.length(2);

        await expect(val2.testAsync([1, 2, 3])).resolves.toEqual([1, 2, 3]);
        await expect(val2.testAsync([1, 2])).rejects.toBeDefined();
        await expect(val2.testAsync([2, 4, 6])).rejects.toBeDefined();
        await expect(val2.testAsync([1, 3, 5])).rejects.toBeDefined();

        const val3 = v8n()
          .length(3)
          .every.even()
          .not.some.equal(2);

        await expect(val3.testAsync([4, 6, 8])).resolves.toEqual([4, 6, 8]);
        await expect(val3.testAsync([4, 6, 7])).rejects.toBeDefined();
        await expect(val3.testAsync([4, 5, 6, 7])).rejects.toBeDefined();
        await expect(val3.testAsync([2, 4, 6])).rejects.toBeDefined();

        const val4 = v8n()
          .not.every.lowercase()
          .not.every.uppercase();

        await expect(val4.testAsync("abc")).rejects.toBeDefined();
        await expect(val4.testAsync("ABU")).rejects.toBeDefined();
        await expect(val4.testAsync("aBc")).resolves.toEqual("aBc");
        await expect(val4.testAsync("AbC")).resolves.toEqual("AbC");
      });
    });

    describe("working with schema's", () => {
      it("should handle async rule within a schema", async () => {
        v8n.extend({ asyncRule });

        const validation = v8n().schema({
          item: v8n()
            .number()
            .asyncRule([10, 17, 20])
        });

        await expect(
          validation.testAsync({ item: "10" })
        ).rejects.toBeDefined();
        await expect(validation.testAsync({ item: 11 })).rejects.toBeDefined();
        await expect(validation.testAsync({ item: 17 })).resolves.toEqual({
          item: 17
        });
      });
    });

    describe("the returned Promise", () => {
      it("should resolves when valid", async () => {
        const validation = v8n()
          .string()
          .minLength(3)
          .asyncRule("Hello");

        const result = await validation.testAsync("Hello");
        expect(result).toEqual("Hello");
      });

      it("should rejects with ValidationException when invalid", async () => {
        const validation = v8n()
          .minLength(2)
          .asyncRule("Hello");

        expect.assertions(2);
        try {
          await validation.testAsync("Hi");
        } catch (ex) {
          expect(ex.rule.name).toBe("asyncRule");
          expect(ex.value).toBe("Hi");
        }
      });

      it("should rejects with with ValidationException when exception occurs", async () => {
        const validation = v8n()
          .number()
          .between(0, 50)
          .includes("a");

        expect.assertions(3);

        try {
          await validation.testAsync(10);
        } catch (ex) {
          expect(ex.rule.name).toBe("includes");
          expect(ex.value).toBe(10);
          expect(ex.cause).toBeDefined();
        }
      });

      it("should get correct ValidationException from composite failure", async () => {
        function asyncCompositeRule() {
          return value =>
            new Promise(resolve => {
              v8n()
                .schema({
                  a: v8n().string(),
                  b: v8n().number()
                })
                .check(value);
              resolve(true);
            });
        }

        v8n.extend({ asyncCompositeRule });

        const validation = v8n().asyncCompositeRule();

        expect.assertions(4);

        try {
          await validation.testAsync({ a: "one", b: "two" });
        } catch (ex) {
          expect(ex.rule.name).toBe("asyncCompositeRule");
          expect(ex.value).toEqual({ a: "one", b: "two" });
          expect(ex.cause.rule.name).toBe("schema");
          expect(ex.cause.value).toEqual({ a: "one", b: "two" });
        }
      });
    });
  });
});

describe("modifiers", () => {
  describe("the 'not' modifier", () => {
    it("should invert the next rule meaning", () => {
      const validation = v8n()
        .number()
        .not.between(2, 8)
        .not.even();

      expect(validation.test(4)).toBeFalsy();
      expect(validation.test(6)).toBeFalsy();
      expect(validation.test(11)).toBeTruthy();

      expect(() => validation.check(4)).toThrow();
      expect(() => validation.check(6)).toThrow();
      expect(() => validation.check(11)).not.toThrow();
    });

    test("double negative", () => {
      const validation = v8n()
        .not.not.number()
        .not.not.positive();

      expect(validation.test(1)).toBeTruthy();
      expect(() => validation.check(12)).not.toThrow();
      expect(validation.test("12")).toBeFalsy();
      expect(() => validation.check(-1)).toThrow();
    });
  });

  describe("the 'some' modifier", () => {
    it("expect that rule passes on some array value", async () => {
      const validation = v8n().some.positive();
      expect(validation.test([-1, -2, -3])).toBeFalsy();
      expect(validation.test(10)).toBeFalsy();
      expect(validation.test([-1, -2, 1])).toBeTruthy();
      expect(validation.test([1, 2, 3])).toBeTruthy();

      expect(
        v8n()
          .some.schema({ str: v8n().string() })
          .test([true, { str: "hello" }, 12])
      ).toBeTruthy();

      expect(
        v8n()
          .some.schema({ str: v8n().string() })
          .test(["hello", { str: true }, 12])
      ).toBeFalsy();

      expect(() =>
        v8n()
          .some.schema({ str: v8n().string() })
          .check([true, { str: "hello" }, 12])
      ).not.toThrow();

      expect(() =>
        v8n()
          .some.schema({ str: v8n().string() })
          .check(["hello", { str: true }, 12])
      ).toThrow();

      await expect(
        v8n()
          .some.schema({ str: v8n().string() })
          .testAsync([true, { str: "hello" }, 12])
      ).resolves.toEqual([true, { str: "hello" }, 12]);

      await expect(
        v8n()
          .some.schema({ str: v8n().string() })
          .testAsync([false, { str: true }, 12])
      ).rejects.toBeDefined();
    });
  });

  describe("the 'every' modifier", () => {
    it("expect that rule passes for every array value", () => {
      const validation = v8n().every.positive();
      expect(validation.test([1, 2, 3, -1])).toBeFalsy();
      expect(validation.test(10)).toBeFalsy();
      expect(validation.test([1, 2, 3])).toBeTruthy();

      expect(validation.test([1, 2, 3])).toBeTruthy();

      expect(
        v8n()
          .every.schema({ str: v8n().string() })
          .test([{ str: "Hello" }])
      ).toBeTruthy();

      expect(() =>
        v8n()
          .every.schema({ str: v8n().string() })
          .check([{ str: "Hello" }])
      ).not.toThrow();

      expect(() =>
        v8n()
          .every.schema({ str: v8n().string() })
          .check([{ str: true }])
      ).toThrow();

      expect(
        v8n()
          .every.schema({ str: v8n().string() })
          .testAsync([{ str: "Hello" }])
      ).resolves.toEqual([{ str: "Hello" }]);

      expect(
        v8n()
          .every.schema({ str: v8n().string() })
          .testAsync([{ str: true }])
      ).rejects.toBeDefined();
    });
  });

  test("should be able to mix modifiers", () => {
    const validation = v8n().not.some.positive();
    expect(validation.test([-1, -2, 1])).toBeFalsy();
    expect(validation.test([-1, -2, -3])).toBeTruthy();
    expect(validation.test([-5, -5, -1])).toBeTruthy();
  });

  test("fluency", async () => {
    // some item should not be 2
    const a = v8n().some.not.exact(2);
    expect(a.test([2, 2, 3])).toBeTruthy();
    expect(a.test([2, 2, 2])).toBeFalsy();

    // all items should not be 2
    const b = v8n().not.some.exact(2);
    expect(b.test([2, 3, 3])).toBeFalsy();
    expect(b.test([3, 3, 3])).toBeTruthy();

    const c = v8n()
      .not.every.even()
      .some.not.exact(3);
    expect(c.test([2, 4, 6])).toBeFalsy();
    expect(c.test([3, 3, 3])).toBeFalsy();
    expect(c.test([2, 3, 4])).toBeTruthy();
    expect(c.test([2, 4, 5])).toBeTruthy();
  });
});

describe("rules", () => {
  test("equal", () => {
    const is = v8n().equal("123");
    expect(is.test("123")).toBeTruthy();
    expect(is.test(123)).toBeTruthy();
    expect(is.test("Hello")).toBeFalsy();

    const not = v8n().not.equal(123);
    expect(not.test("123")).toBeFalsy();
    expect(not.test(123)).toBeFalsy();
    expect(not.test("Hello")).toBeTruthy();
  });

  test("exact", () => {
    const is = v8n().exact("123");
    expect(is.test("123")).toBeTruthy();
    expect(is.test(123)).toBeFalsy();
    expect(is.test("Hello")).toBeFalsy();

    const not = v8n().not.exact(123);
    expect(not.test(123)).toBeFalsy();
    expect(not.test("123")).toBeTruthy();
    expect(not.test("Hello")).toBeTruthy();
  });

  test("pattern", () => {
    const validation = v8n().pattern(/^[a-z]+$/);
    expect(validation.test("a")).toBeTruthy();
    expect(validation.test("ab")).toBeTruthy();
    expect(validation.test(" ")).toBeFalsy();
    expect(validation.test("A")).toBeFalsy();
    expect(validation.test("Ab")).toBeFalsy();
  });

  test("string", () => {
    const validation = v8n().string();
    expect(validation.test("hello")).toBeTruthy();
    expect(validation.test("")).toBeTruthy();
    expect(validation.test(" ")).toBeTruthy();
    expect(validation.test(123)).toBeFalsy();
    expect(validation.test(true)).toBeFalsy();
    expect(validation.test(false)).toBeFalsy();
    expect(validation.test(undefined)).toBeFalsy();
    expect(validation.test()).toBeFalsy();
    expect(validation.test(null)).toBeFalsy();
  });

  test("undefined", () => {
    const is = v8n().undefined();
    expect(is.test()).toBeTruthy();
    expect(is.test(undefined)).toBeTruthy();
    expect(is.test(null)).toBeFalsy();
    expect(is.test("")).toBeFalsy();
    expect(is.test(0)).toBeFalsy();
    expect(is.test(false)).toBeFalsy();

    const not = v8n().not.undefined();
    expect(not.test()).toBeFalsy();
    expect(not.test(undefined)).toBeFalsy();
    expect(not.test(null)).toBeTruthy();
    expect(not.test("")).toBeTruthy();
    expect(not.test(0)).toBeTruthy();
    expect(not.test(false)).toBeTruthy();
  });

  test("null", () => {
    const is = v8n().null();
    expect(is.test(null)).toBeTruthy();
    expect(is.test()).toBeFalsy();
    expect(is.test(undefined)).toBeFalsy();
    expect(is.test("")).toBeFalsy();
    expect(is.test(0)).toBeFalsy();
    expect(is.test(false)).toBeFalsy();

    const not = v8n().not.null();
    expect(not.test(null)).toBeFalsy();
    expect(not.test()).toBeTruthy();
    expect(not.test(undefined)).toBeTruthy();
    expect(not.test("")).toBeTruthy();
    expect(not.test(0)).toBeTruthy();
    expect(not.test(false)).toBeTruthy();
  });

  test("array", () => {
    const validation = v8n().array();
    expect(validation.test([])).toBeTruthy();
    expect(validation.test([1, 2])).toBeTruthy();
    expect(validation.test(new Array())).toBeTruthy();
    expect(validation.test(null)).toBeFalsy();
    expect(validation.test(undefined)).toBeFalsy();
    expect(validation.test("string")).toBeFalsy();
  });

  test("object", () => {
    const validation = v8n().object();
    expect(validation.test([])).toBeTruthy();
    expect(validation.test({})).toBeTruthy();
    expect(validation.test(null)).toBeTruthy();
    expect(validation.test(() => {})).toBeFalsy();
    expect(validation.test(undefined)).toBeFalsy();
    expect(validation.test("string")).toBeFalsy();
    expect(validation.test(2)).toBeFalsy();
  });

  test("instanceOf", () => {
    const validationDate = v8n().instanceOf(Date);
    expect(validationDate.test(new Date())).toBeTruthy();
    expect(validationDate.test({})).toBeFalsy();
    expect(validationDate.test(null)).toBeFalsy();
    expect(validationDate.test("string")).toBeFalsy();

    const validationObject = v8n().instanceOf(Object);
    expect(validationObject.test(new Date())).toBeTruthy();
    expect(validationObject.test({})).toBeTruthy();
    expect(validationObject.test(null)).toBeFalsy();
    expect(validationObject.test("string")).toBeFalsy();
  });

  test("number", () => {
    const noFlag = v8n().number();
    expect(noFlag.test(34)).toBeTruthy();
    expect(noFlag.test(-10)).toBeTruthy();
    expect(noFlag.test("1")).toBeFalsy();
    expect(noFlag.test(null)).toBeFalsy();
    expect(noFlag.test(undefined)).toBeFalsy();
    expect(noFlag.test(NaN)).toBeTruthy();
    expect(noFlag.test(Infinity)).toBeTruthy();
    expect(noFlag.test(-Infinity)).toBeTruthy();
    const flag = v8n().number(false);
    expect(flag.test(34)).toBeTruthy();
    expect(flag.test(-10)).toBeTruthy();
    expect(flag.test("1")).toBeFalsy();
    expect(flag.test(null)).toBeFalsy();
    expect(flag.test(undefined)).toBeFalsy();
    expect(flag.test(NaN)).toBeFalsy();
    expect(flag.test(Infinity)).toBeFalsy();
    expect(flag.test(-Infinity)).toBeFalsy();
  });

  test("numeric", () => {
    const validation = v8n().numeric();
    expect(validation.test("-10")).toBeTruthy();
    expect(validation.test("0")).toBeTruthy();
    expect(validation.test(0xff)).toBeTruthy();
    expect(validation.test("0xFF")).toBeTruthy();
    expect(validation.test("8e5")).toBeTruthy();
    expect(validation.test("3.1415")).toBeTruthy();
    expect(validation.test(+10)).toBeTruthy();
    expect(validation.test("-0x42")).toBeFalsy();
    expect(validation.test("7.2acdgs")).toBeFalsy();
    expect(validation.test("")).toBeFalsy();
    expect(validation.test({})).toBeFalsy();
    expect(validation.test(NaN)).toBeFalsy();
    expect(validation.test(null)).toBeFalsy();
    expect(validation.test(true)).toBeFalsy();
    expect(validation.test(Infinity)).toBeFalsy();
    expect(validation.test(undefined)).toBeFalsy();
  });

  test("boolean", () => {
    const validation = v8n().boolean();
    expect(validation.test(true)).toBeTruthy();
    expect(validation.test(false)).toBeTruthy();
    expect(validation.test(1)).toBeFalsy();
    expect(validation.test(0)).toBeFalsy();
    expect(validation.test(null)).toBeFalsy();
    expect(validation.test(undefined)).toBeFalsy();
  });

  test("lowercase", () => {
    const validation = v8n().lowercase();
    expect(validation.test("")).toBeFalsy();
    expect(validation.test(" ")).toBeFalsy();
    expect(validation.test("aBc")).toBeFalsy();
    expect(validation.test("abc")).toBeTruthy();
    expect(validation.test("abc def g")).toBeTruthy();
    expect(validation.test(true)).toBeTruthy();
    expect(validation.test(1)).toBeFalsy();
  });

  test("uppercase", () => {
    const validation = v8n().uppercase();
    expect(validation.test("")).toBeFalsy();
    expect(validation.test(" ")).toBeFalsy();
    expect(validation.test("A")).toBeTruthy();
    expect(validation.test("ABC")).toBeTruthy();
    expect(validation.test("ABC DEF G")).toBeTruthy();
    expect(validation.test("abc")).toBeFalsy();
    expect(validation.test("Abc")).toBeFalsy();
  });

  test("first", () => {
    const letter = v8n().first("n");
    expect(letter.test("n")).toBeTruthy();
    expect(letter.test("nice")).toBeTruthy();
    expect(letter.test(null)).toBeFalsy();
    expect(letter.test("N")).toBeFalsy();
    expect(letter.test("wrong")).toBeFalsy();
    expect(letter.test(undefined)).toBeFalsy();
    expect(letter.test(["n", "i", "c", "e"])).toBeTruthy();
    expect(letter.test(["a", "b", "c"])).toBeFalsy();

    const number = v8n().first(2);
    expect(number.test(20)).toBeFalsy();
    expect(number.test(12)).toBeFalsy();
    expect(number.test([2, 3])).toBeTruthy();
    expect(number.test([1, 2])).toBeFalsy();
  });

  test("last", () => {
    const letter = v8n().last("d");
    expect(letter.test("d")).toBeTruthy();
    expect(letter.test("old")).toBeTruthy();
    expect(letter.test(undefined)).toBeFalsy();
    expect(letter.test("D")).toBeFalsy();
    expect(letter.test("don't")).toBeFalsy();
    expect(letter.test(null)).toBeFalsy();

    const number = v8n().last(2);
    expect(number.test(32)).toBeFalsy();
    expect(number.test(23)).toBeFalsy();
    expect(number.test([3, 2])).toBeTruthy();
    expect(number.test([2, 3])).toBeFalsy();
  });

  test("vowel", () => {
    const validation = v8n().vowel();
    expect(validation.test("aeiou")).toBeTruthy();
    expect(validation.test("AEIOU")).toBeTruthy();
    expect(validation.test("abcde")).toBeFalsy();
    expect(validation.test("ABCDE")).toBeFalsy();
  });

  test("consonant", () => {
    const validation = v8n().consonant();
    expect(validation.test("abcde")).toBeFalsy();
    expect(validation.test("bcdf")).toBeTruthy();
    expect(validation.test("^")).toBeFalsy();
    expect(validation.test("ç")).toBeFalsy();
  });

  test("empty", () => {
    const validation = v8n().empty();
    expect(validation.test("")).toBeTruthy();
    expect(validation.test(" ")).toBeFalsy();
    expect(validation.test("ab")).toBeFalsy();
    expect(validation.test([])).toBeTruthy();
    expect(validation.test([, ,])).toBeFalsy();
    expect(validation.test([1, 2])).toBeFalsy();
  });

  test("length", () => {
    const minAndMax = v8n().length(3, 4);
    expect(minAndMax.test("ab")).toBeFalsy();
    expect(minAndMax.test("abc")).toBeTruthy();
    expect(minAndMax.test("abcd")).toBeTruthy();
    expect(minAndMax.test("abcde")).toBeFalsy();
    expect(minAndMax.test([1, 2])).toBeFalsy();
    expect(minAndMax.test([1, 2, 3])).toBeTruthy();
    expect(minAndMax.test([1, 2, 3, 4])).toBeTruthy();
    expect(minAndMax.test([1, 2, 3, 4, 5])).toBeFalsy();

    const exact = v8n().length(3);
    expect(exact.test("ab")).toBeFalsy();
    expect(exact.test("abc")).toBeTruthy();
    expect(exact.test("abcd")).toBeFalsy();
    expect(exact.test([1, 2])).toBeFalsy();
    expect(exact.test([1, 2, 3])).toBeTruthy();
    expect(exact.test([1, 2, 3, 4])).toBeFalsy();
  });

  test("minLength", () => {
    const validation = v8n().minLength(2);
    expect(validation.test("a")).toBeFalsy();
    expect(validation.test("ab")).toBeTruthy();
    expect(validation.test("abc")).toBeTruthy();
    expect(validation.test("abcd")).toBeTruthy();
  });

  test("maxLength", () => {
    const validation = v8n().maxLength(3);
    expect(validation.test("a")).toBeTruthy();
    expect(validation.test("ab")).toBeTruthy();
    expect(validation.test("abc")).toBeTruthy();
    expect(validation.test("abcd")).toBeFalsy();
  });

  test("negative", () => {
    const validation = v8n().negative();
    expect(validation.test(-1)).toBeTruthy();
    expect(validation.test(0)).toBeFalsy();
    expect(validation.test(1)).toBeFalsy();
  });

  test("positive", () => {
    const validation = v8n().positive();
    expect(validation.test(-1)).toBeFalsy();
    expect(validation.test(0)).toBeTruthy();
    expect(validation.test(1)).toBeTruthy();
  });

  test("lessThan", () => {
    const is = v8n().lessThan(3);
    expect(is.test(1)).toBeTruthy();
    expect(is.test(2)).toBeTruthy();
    expect(is.test(-4)).toBeTruthy();
    expect(is.test(3)).toBeFalsy();
    expect(is.test(4)).toBeFalsy();
    expect(is.test(-Infinity)).toBeTruthy();
    expect(is.test(Infinity)).toBeFalsy();

    const not = v8n().not.lessThan(3);
    expect(not.test(1)).toBeFalsy();
    expect(not.test(2)).toBeFalsy();
    expect(not.test(-4)).toBeFalsy();
    expect(not.test(3)).toBeTruthy();
    expect(not.test(4)).toBeTruthy();
    expect(not.test(-Infinity)).toBeFalsy();
    expect(not.test(Infinity)).toBeTruthy();

    expect(
      v8n()
        .lessThan(-Infinity)
        .test(-Infinity)
    ).toBeFalsy();

    expect(
      v8n()
        .lessThan(-Infinity)
        .test(Infinity)
    ).toBeFalsy();

    expect(
      v8n()
        .lessThan(Infinity)
        .test(-Infinity)
    ).toBeTruthy();

    expect(
      v8n()
        .lessThan(Number.MIN_SAFE_INTEGER)
        .test(-Infinity)
    ).toBeTruthy();
  });

  test("lessThanOrEqualTo", () => {
    const is = v8n().lessThanOrEqual(3);
    expect(is.test(-4)).toBeTruthy();
    expect(is.test(-3)).toBeTruthy();
    expect(is.test(1)).toBeTruthy();
    expect(is.test(2)).toBeTruthy();
    expect(is.test(3)).toBeTruthy();
    expect(is.test(4)).toBeFalsy();
    expect(is.test(-Infinity)).toBeTruthy();
    expect(is.test(Infinity)).toBeFalsy();

    const not = v8n().not.lessThanOrEqual(3);
    expect(not.test(-4)).toBeFalsy();
    expect(not.test(-3)).toBeFalsy();
    expect(not.test(1)).toBeFalsy();
    expect(not.test(2)).toBeFalsy();
    expect(not.test(3)).toBeFalsy();
    expect(not.test(4)).toBeTruthy();
    expect(not.test(-Infinity)).toBeFalsy();
    expect(not.test(Infinity)).toBeTruthy();

    expect(
      v8n()
        .lessThanOrEqual(-Infinity)
        .test(-Infinity)
    ).toBeTruthy();

    expect(
      v8n()
        .lessThanOrEqual(-Infinity)
        .test(Infinity)
    ).toBeFalsy();

    expect(
      v8n()
        .lessThanOrEqual(Infinity)
        .test(-Infinity)
    ).toBeTruthy();

    expect(
      v8n()
        .lessThanOrEqual(Number.MIN_SAFE_INTEGER)
        .test(-Infinity)
    ).toBeTruthy();
  });

  test("greaterThan", () => {
    const is = v8n().greaterThan(3);
    expect(is.test(2)).toBeFalsy();
    expect(is.test(-3)).toBeFalsy();
    expect(is.test(3)).toBeFalsy();
    expect(is.test(4)).toBeTruthy();
    expect(is.test(-Infinity)).toBeFalsy();
    expect(is.test(Infinity)).toBeTruthy();

    const not = v8n().not.greaterThan(3);
    expect(not.test(2)).toBeTruthy();
    expect(not.test(-3)).toBeTruthy();
    expect(not.test(3)).toBeTruthy();
    expect(not.test(4)).toBeFalsy();
    expect(not.test(-Infinity)).toBeTruthy();
    expect(not.test(Infinity)).toBeFalsy();

    expect(
      v8n()
        .greaterThan(-Infinity)
        .test(-Infinity)
    ).toBeFalsy();

    expect(
      v8n()
        .greaterThan(-Infinity)
        .test(Infinity)
    ).toBeTruthy();

    expect(
      v8n()
        .greaterThan(Infinity)
        .test(-Infinity)
    ).toBeFalsy();

    expect(
      v8n()
        .greaterThan(Number.MIN_SAFE_INTEGER)
        .test(-Infinity)
    ).toBeFalsy();

    expect(
      v8n()
        .greaterThan(Number.MAX_SAFE_INTEGER)
        .test(Infinity)
    ).toBeTruthy();
  });

  test("greaterThanOrEqual", () => {
    const is = v8n().greaterThanOrEqual(3);
    expect(is.test(2)).toBeFalsy();
    expect(is.test(-3)).toBeFalsy();
    expect(is.test(3)).toBeTruthy();
    expect(is.test(4)).toBeTruthy();
    expect(is.test(-Infinity)).toBeFalsy();
    expect(is.test(Infinity)).toBeTruthy();

    const not = v8n().not.greaterThanOrEqual(3);
    expect(not.test(2)).toBeTruthy();
    expect(not.test(-3)).toBeTruthy();
    expect(not.test(3)).toBeFalsy();
    expect(not.test(4)).toBeFalsy();
    expect(not.test(-Infinity)).toBeTruthy();
    expect(not.test(Infinity)).toBeFalsy();

    expect(
      v8n()
        .greaterThanOrEqual(-Infinity)
        .test(-Infinity)
    ).toBeTruthy();

    expect(
      v8n()
        .greaterThanOrEqual(-Infinity)
        .test(Infinity)
    ).toBeTruthy();

    expect(
      v8n()
        .greaterThanOrEqual(Infinity)
        .test(-Infinity)
    ).toBeFalsy();

    expect(
      v8n()
        .greaterThanOrEqual(Number.MIN_SAFE_INTEGER)
        .test(-Infinity)
    ).toBeFalsy();

    expect(
      v8n()
        .greaterThanOrEqual(Number.MAX_SAFE_INTEGER)
        .test(Infinity)
    ).toBeTruthy();

    expect(
      v8n()
        .greaterThanOrEqual(Infinity)
        .test(Infinity)
    ).toBeTruthy();
  });

  test("range", () => {
    const is = v8n().range(2, 4);
    expect(is.test(1)).toBeFalsy();
    expect(is.test(5)).toBeFalsy();
    expect(is.test(2)).toBeTruthy();
    expect(is.test(3)).toBeTruthy();
    expect(is.test(4)).toBeTruthy();

    const not = v8n().not.range(2, 4);
    expect(not.test(1)).toBeTruthy();
    expect(not.test(5)).toBeTruthy();
    expect(not.test(2)).toBeFalsy();
    expect(not.test(3)).toBeFalsy();
    expect(not.test(4)).toBeFalsy();
  });

  test("even", () => {
    const validation = v8n().even();
    expect(validation.test(-2)).toBeTruthy();
    expect(validation.test(-1)).toBeFalsy();
    expect(validation.test(0)).toBeTruthy();
    expect(validation.test(1)).toBeFalsy();
    expect(validation.test(2)).toBeTruthy();
  });

  test("odd", () => {
    const validation = v8n().odd();
    expect(validation.test(-2)).toBeFalsy();
    expect(validation.test(-1)).toBeTruthy();
    expect(validation.test(0)).toBeFalsy();
    expect(validation.test(1)).toBeTruthy();
    expect(validation.test(2)).toBeFalsy();
  });

  test("between", () => {
    const is = v8n().between(3, 5);
    expect(is.test(2)).toBeFalsy();
    expect(is.test(3)).toBeTruthy();
    expect(is.test(4)).toBeTruthy();
    expect(is.test(5)).toBeTruthy();
    expect(is.test(6)).toBeFalsy();

    const not = v8n().not.between(3, 5);
    expect(not.test(2)).toBeTruthy();
    expect(not.test(3)).toBeFalsy();
    expect(not.test(4)).toBeFalsy();
    expect(not.test(5)).toBeFalsy();
    expect(not.test(6)).toBeTruthy();
  });

  test("includes", () => {
    const is = v8n().includes("2");
    expect(is.test(["1", "2", "3"])).toBeTruthy();
    expect(is.test(["1", "3"])).toBeFalsy();
    expect(is.test(["1", "2"])).toBeTruthy();
    expect(is.test("123")).toBeTruthy();
    expect(is.test("13")).toBeFalsy();
    expect(is.test([1, 2, 3])).toBeFalsy();
    expect(is.test(2)).toBeFalsy();

    const not = v8n().not.includes("2");
    expect(not.test(["1", "2", "3"])).toBeFalsy();
    expect(not.test(["1", "3"])).toBeTruthy();
    expect(not.test(["1", "2"])).toBeFalsy();
    expect(not.test("123")).toBeFalsy();
    expect(not.test("13")).toBeTruthy();
    expect(not.test([1, 2, 3])).toBeTruthy();
    expect(not.test(2)).toBeTruthy();
  });

  test("integer", () => {
    const is = v8n().integer();
    expect(is.test(0)).toBeTruthy();
    expect(is.test(12)).toBeTruthy();
    expect(is.test(99999999999)).toBeTruthy();
    expect(is.test(-100000)).toBeTruthy();
    expect(is.test("12")).toBeFalsy();
    expect(is.test(3.14)).toBeFalsy();
    expect(is.test(NaN)).toBeFalsy();
    expect(is.test(Infinity)).toBeFalsy();

    const not = v8n().not.integer();
    expect(not.test(0)).toBeFalsy();
    expect(not.test(12)).toBeFalsy();
    expect(not.test(99999999999)).toBeFalsy();
    expect(not.test(-100000)).toBeFalsy();
    expect(not.test("12")).toBeTruthy();
    expect(not.test(3.14)).toBeTruthy();
    expect(not.test(NaN)).toBeTruthy();
    expect(not.test(Infinity)).toBeTruthy();
  });

  describe("schema", () => {
    let is, not, validObj, invalidObj;

    beforeEach(() => {
      is = v8n().schema({
        one: v8n().equal(1),
        two: v8n().schema({
          three: v8n().equal(3),
          four: v8n().equal(4),
          five: v8n().schema({
            six: v8n().equal(6)
          })
        }),
        seven: v8n().schema({
          eight: v8n().not.equal(8)
        })
      });

      not = v8n().not.schema({
        one: v8n().equal(1),
        two: v8n().schema({
          three: v8n().equal(3),
          four: v8n().equal(4),
          five: v8n().schema({
            six: v8n().equal(6)
          })
        }),
        seven: v8n().schema({
          eight: v8n().not.equal(8)
        })
      });

      validObj = { one: 1, two: { three: 3, four: 4, five: { six: 6 } } };
      invalidObj = { one: "Hello" };
    });

    it("should work with validation", () => {
      const result = is.testAll(invalidObj);
      expect(result[0].cause).toHaveLength(2);
      expect(result[0].cause[0].rule.name).toBe("equal");
      expect(result[0].cause[1].rule.name).toBe("schema");
      expect(result[0].cause[1].cause).toHaveLength(3);
      expect(result[0].cause[1].cause[2].rule.name).toBe("schema");
      expect(result[0].cause[1].cause[2].cause[0].target).toBe("six");

      expect(is.test(validObj)).toBeTruthy();
      expect(is.test(invalidObj)).toBeFalsy();
      expect(not.test(validObj)).toBeFalsy();
      expect(not.test(invalidObj)).toBeTruthy();
    });

    it("should work with nested validations", () => {
      expect.assertions(12);

      try {
        is.check(invalidObj);
      } catch (ex) {
        expect(ex.cause).toHaveLength(2);
        expect(ex.cause[0].rule.name).toBe("equal");
        expect(ex.cause[0].value).toBe(invalidObj.one);
        expect(ex.cause[1].rule.name).toBe("schema");
        expect(ex.cause[1].cause).toHaveLength(3);
        expect(ex.cause[1].cause[0].rule.name).toBe("equal");
        expect(ex.cause[1].cause[1].rule.name).toBe("equal");
        expect(ex.cause[1].cause[2].rule.name).toBe("schema");
        expect(ex.cause[1].cause[2].cause[0].target).toBe("six");
      }

      expect(() => is.check(validObj)).not.toThrow();
      expect(() => not.check(invalidObj)).not.toThrow();
      expect(() => not.check(validObj)).toThrow();
    });
  });

  describe("passesAnyOf", () => {
    it("should pass if any of the received validation is valid", () => {
      const is = v8n().passesAnyOf(
        v8n().number(),
        v8n().schema({
          id: v8n().string()
        })
      );

      expect(is.test(true)).toBeFalsy();
      expect(is.test(undefined)).toBeFalsy();
      expect(is.test("Hello")).toBeFalsy();
      expect(is.test(null)).toBeFalsy();
      expect(is.test({})).toBeFalsy();
      expect(is.test(11)).toBeTruthy();
      expect(is.test({ id: "ef13c" })).toBeTruthy();

      const not = v8n().not.passesAnyOf(
        v8n().number(),
        v8n().schema({
          id: v8n().string()
        })
      );

      expect(not.test(true)).toBeTruthy();
      expect(not.test(undefined)).toBeTruthy();
      expect(not.test("Hello")).toBeTruthy();
      expect(not.test(null)).toBeTruthy();
      expect(not.test({})).toBeTruthy();
      expect(not.test(11)).toBeFalsy();
      expect(not.test({ id: "ef13c" })).toBeFalsy();
    });

    it("should fail if there's no validation specified", () => {
      expect(
        v8n()
          .passesAnyOf()
          .test("Foo")
      ).toBeFalsy();
    });

    it("should work together with other rules", () => {
      const validation = v8n()
        .string()
        .passesAnyOf(v8n().every.lowercase(), v8n().every.uppercase());

      expect(validation.test("HELLO")).toBeTruthy();
      expect(validation.test("hello")).toBeTruthy();
      expect(validation.test("Hello")).toBeFalsy();
      expect(validation.test({})).toBeFalsy();
    });

    test("composition", () => {
      const validation = v8n().passesAnyOf(
        v8n().passesAnyOf(v8n().null(), v8n().undefined()),
        v8n().passesAnyOf(v8n().number(), v8n().boolean())
      );

      expect(validation.test(null)).toBeTruthy();
      expect(validation.test(undefined)).toBeTruthy();
      expect(validation.test(12)).toBeTruthy();
      expect(validation.test(false)).toBeTruthy();
      expect(validation.test("Hello")).toBeFalsy();
    });
  });

  describe("optional", () => {
    it("should pass when validation passes", () => {
      const optional = v8n().optional(
        v8n()
          .number()
          .positive()
      );

      expect(optional.test(1)).toBe(true);
      expect(optional.test(2)).toBe(true);
      expect(optional.test(1000)).toBe(true);

      expect(
        v8n()
          .optional(v8n().string())
          .test("")
      ).toBe(true);
    });

    it("should fail when validation fails", () => {
      const optional = v8n().optional(
        v8n()
          .number()
          .positive()
      );

      expect(optional.test(-1)).toBe(false);
      expect(optional.test(-2)).toBe(false);
      expect(optional.test(-100)).toBe(false);
    });

    it("should pass for null and undefined", () => {
      const optional = v8n().optional(
        v8n()
          .number()
          .positive()
      );

      expect(optional.test(null)).toBe(true);
      expect(optional.test(undefined)).toBe(true);
    });

    it("should work with the 'string' rule", () => {
      expect(
        v8n()
          .optional(v8n().string(), false)
          .test("")
      ).toBe(true);

      expect(
        v8n()
          .optional(v8n().string(), false)
          .test("hello")
      ).toBe(true);

      expect(
        v8n()
          .optional(v8n().string(), true)
          .test("")
      ).toBe(true);

      expect(
        v8n()
          .optional(v8n().string(), true)
          .test("hello")
      ).toBe(true);

      expect(
        v8n()
          .optional(v8n().string(), true)
          .test("10")
      ).toBe(true);

      expect(
        v8n()
          .optional(v8n().string(), true)
          .test(10)
      ).toBe(false);

      expect(
        v8n()
          .optional(v8n().string(), true)
          .test()
      ).toBe(true);
    });

    it("should not consider trimmed empty string valid by default", () => {
      const optional = v8n().optional(
        v8n()
          .number()
          .positive()
      );

      expect(optional.test("")).toBe(false);
      expect(optional.test("  ")).toBe(false);
    });

    it("should consider trimmed empty string valid when it is set to true", () => {
      const optional = v8n().optional(
        v8n()
          .number()
          .positive(),
        true
      );

      expect(optional.test("")).toBe(true);
      expect(optional.test("  ")).toBe(true);
      expect(optional.test(-1)).toBe(false);
      expect(optional.test("hello")).toBe(false);
    });

    it("should not consider trimmed empty string valid when it is set to false", () => {
      const optional = v8n().optional(
        v8n()
          .number()
          .positive(),
        false
      );

      expect(optional.test("")).toBe(false);
      expect(optional.test("  ")).toBe(false);
    });
  });
});

describe("validation composition", () => {
  let complex, validObj, invalidObj, causes;

  beforeEach(() => {
    // A complex schema
    complex = v8n().schema({
      one: v8n().equal("one"),
      two: v8n().schema({
        two_one: v8n().equal("two_one"),
        two_two: v8n().not.schema({
          two_two_one: v8n().equal("two_two_one")
        })
      }),
      three: v8n().schema({
        three_one: v8n().schema({
          three_one_one: v8n().not.equal("three_one_one")
        }),
        three_two: v8n().not.schema({
          three_two_one: v8n().not.equal("three_two_one")
        })
      })
    });

    validObj = {
      one: "one",
      two: {
        two_one: "two_one",
        two_two: "two_two"
      },
      three: {
        three_one: {
          three_one_one: 311
        },
        three_two: {
          three_two_one: "three_two_one"
        }
      }
    };

    invalidObj = {
      one: "one",
      two: {
        two_one: 21,
        two_two: {
          two_two_one: 221
        }
      },
      three: {
        three_two: {
          three_two_one: 321
        }
      }
    };

    causes = [
      {
        target: "two",
        cause: [{ target: "two_one", rule: { name: "equal" } }]
      },
      {
        target: "three",
        cause: [{ target: "three_two", cause: null }]
      }
    ];
  });

  it("should work with 'test' function", () => {
    expect(complex.test(validObj)).toBeTruthy();
    expect(complex.test(invalidObj)).toBeFalsy();
  });

  it("should work with 'check' function", () => {
    expect.assertions(2);
    expect(() => complex.check(validObj)).not.toThrow();
    try {
      complex.check(invalidObj);
    } catch (ex) {
      expect(ex.cause).toMatchObject(causes);
    }
  });

  it("should work with 'testAll' function", () => {
    expect(complex.testAll(validObj)).toHaveLength(0);
    expect(complex.testAll(invalidObj)).toMatchObject([{ cause: causes }]);
  });

  it("should work with 'testAsync' function", async () => {
    expect.assertions(2);
    await expect(complex.testAsync(validObj)).resolves.toEqual(validObj);
    try {
      await complex.testAsync(invalidObj);
    } catch (ex) {
      expect(ex.cause).toMatchObject(causes);
    }
  });
});

describe("custom rules", () => {
  it("should be chainable", () => {
    v8n.extend({
      newRule: () => value => true
    });

    const validation = v8n()
      .string()
      .newRule()
      .lowercase();

    expect(debugRules(validation)).toEqual([
      "string()",
      "newRule()",
      "lowercase()"
    ]);
  });

  it("should be used in validation", () => {
    v8n.extend({
      or: (a, b) => value => value === a || value === b
    });

    const validation = v8n()
      .string()
      .or("one", "two");

    expect(validation.test("one")).toBeTruthy();
    expect(validation.test("two")).toBeTruthy();
    expect(validation.test("three")).toBeFalsy();
  });

  it("should be inverted by 'not' modifier", () => {
    v8n.extend({
      exact: it => value => value === it
    });

    const validation = v8n()
      .string()
      .not.exact("hello");

    expect(validation.test("hi")).toBeTruthy();
    expect(validation.test("nice")).toBeTruthy();
    expect(validation.test("hello")).toBeFalsy();
  });

  test("extend should be able to call multiple times", () => {
    v8n.extend({
      one: () => value => true
    });

    v8n.extend({
      two: () => value => true
    });

    const validation = v8n()
      .one()
      .two();

    expect(debugRules(validation)).toEqual(["one()", "two()"]);
  });

  describe("the 'clearCustomRules' function", () => {
    beforeEach(() => {
      v8n.extend({
        asyncRule
      });
    });

    it("should clear custom rules", () => {
      expect(v8n().asyncRule).toBeDefined();
      v8n.clearCustomRules();
      expect(v8n().asyncRule).toBeUndefined();
    });
  });
});

describe("fluency", () => {
  test("fluency test 1", () => {
    const validation = v8n()
      .array()
      .some.positive()
      .some.negative()
      .not.every.even()
      .includes(6);

    expect(validation.test(10)).toBeFalsy();
    expect(validation.test([1, 2, 3, 6])).toBeFalsy();
    expect(validation.test([-1, -2, -3])).toBeFalsy();
    expect(validation.test([2, -2, 4, 6])).toBeFalsy();
    expect(validation.test([2, -2, 4, 6, 7])).toBeTruthy();
  });

  test("fluency test 2", () => {
    const validation = v8n()
      .some.odd()
      .some.not.odd()
      .length(3);

    expect(validation.test([1, 3, 5])).toBeFalsy();
    expect(validation.test([1, 2, 3])).toBeTruthy();
    expect(validation.test([1, 2, 3, 4])).toBeFalsy();
  });

  test("fluency test 3", () => {
    const validation = v8n()
      .not.every.positive()
      .some.not.even()
      .not.some.equal(3);

    expect(validation.test([1, 2, 4])).toBeFalsy();
    expect(validation.test([-2, 2, 3])).toBeFalsy();
    expect(validation.test([-2, 2, 4])).toBeFalsy();
    expect(validation.test([-2, 2, 5])).toBeTruthy();
  });

  test("fluency test 4", () => {
    const validation = v8n()
      .not.every.equal(2)
      .every.positive()
      .every.even();

    expect(validation.test([2, 2, 2])).toBeFalsy();
    expect(validation.test([2, 2, -4])).toBeFalsy();
    expect(validation.test([4, 4, 4])).toBeTruthy();
  });

  test("fluency test 5", () => {
    const validation = v8n()
      .string()
      .first("H")
      .not.last("o")
      .not.every.consonant()
      .minLength(3);

    expect(validation.test("Hello")).toBeFalsy();
    expect(validation.test("Hi")).toBeFalsy();
    expect(validation.test("Hbrn")).toBeFalsy();
    expect(validation.test("Hbon")).toBeTruthy();
  });
});

describe("random tests", () => {
  test("random test 1", () => {
    const validation = v8n()
      .number()
      .even()
      .positive();

    expect(validation.test(-2)).toBeFalsy();
    expect(validation.test(-1)).toBeFalsy();
    expect(validation.test(0)).toBeTruthy();
    expect(validation.test(1)).toBeFalsy();
    expect(validation.test(2)).toBeTruthy();
  });

  test("random test 2", () => {
    const validation = v8n()
      .string()
      .minLength(2)
      .maxLength(5)
      .lowercase()
      .first("b")
      .last("o");

    expect(validation.test("bruno")).toBeTruthy();
    expect(validation.test("bruna")).toBeFalsy();
    expect(validation.test("druno")).toBeFalsy();
    expect(validation.test("Bruno")).toBeFalsy();
    expect(validation.test("Bruno")).toBeFalsy();
    expect(validation.test("brunno")).toBeFalsy();
  });

  test("random test 3", () => {
    const validation = v8n()
      .array()
      .minLength(3)
      .maxLength(4)
      .first(2)
      .last("o");

    expect(validation.test([2, "tree", "four", "lo"])).toBeFalsy();
    expect(validation.test([2, "tree", "four", "o"])).toBeTruthy();
    expect(validation.test([2, "tree", "four", "five", "o"])).toBeFalsy();
    expect(validation.test([2, "o"])).toBeFalsy();
    expect(validation.test("234o")).toBeFalsy();
  });

  test("random test 4", () => {
    const validation = v8n()
      .between(10, 20)
      .not.between(12, 14)
      .not.between(16, 18);

    expect(validation.test(9)).toBeFalsy();
    expect(validation.test(10)).toBeTruthy();
    expect(validation.test(11)).toBeTruthy();
    expect(validation.test(12)).toBeFalsy();
    expect(validation.test(13)).toBeFalsy();
    expect(validation.test(14)).toBeFalsy();
    expect(validation.test(15)).toBeTruthy();
    expect(validation.test(16)).toBeFalsy();
    expect(validation.test(17)).toBeFalsy();
    expect(validation.test(18)).toBeFalsy();
    expect(validation.test(19)).toBeTruthy();
    expect(validation.test(20)).toBeTruthy();
    expect(validation.test(21)).toBeFalsy();
  });

  test("random test 5", () => {
    const validation = v8n()
      .number()
      .not.maxLength(5) // Have no max length
      .not.minLength(3); // Have no min length

    expect(validation.test(2)).toBeTruthy();
    expect(validation.test(3)).toBeTruthy();
    expect(validation.test(4)).toBeTruthy();
    expect(validation.test(5)).toBeTruthy();
    expect(validation.test(6)).toBeTruthy();
  });

  test("random test 6", () => {
    const validation = v8n()
      .not.number()
      .not.string();

    expect(validation.test(1)).toBeFalsy();
    expect(validation.test("hello")).toBeFalsy();
    expect(validation.test(undefined)).toBeTruthy();
    expect(validation.test(null)).toBeTruthy();
    expect(validation.test(true)).toBeTruthy();
    expect(validation.test(false)).toBeTruthy();
    expect(validation.test({})).toBeTruthy();
    expect(validation.test([])).toBeTruthy();
    expect(validation.test(Symbol())).toBeTruthy();
  });

  test("random test 7", () => {
    const validation = v8n()
      .array()
      .not.empty()
      .minLength(3)
      .not.includes("a")
      .not.includes("b");

    expect(validation.test(["a", "b", "d"])).toBeFalsy();
    expect(validation.test(["a", "c", "d"])).toBeFalsy();
    expect(validation.test([])).toBeFalsy();
    expect(validation.test(["d", "e"])).toBeFalsy();
    expect(validation.test(["d", "e", "f"])).toBeTruthy();
  });

  test("random test 8", () => {
    const validation = v8n()
      .not.null()
      .between(10, 20)
      .not.equal(15);

    expect(validation.test(9)).toBeFalsy();
    expect(validation.test(21)).toBeFalsy();
    expect(validation.test(15)).toBeFalsy();
    expect(validation.test(10)).toBeTruthy();
    expect(validation.test(12)).toBeTruthy();
    expect(validation.test(17)).toBeTruthy();
    expect(validation.test(20)).toBeTruthy();
  });

  test("random test 9", async () => {
    v8n.extend({ asyncRule });

    const validation = v8n()
      .number()
      .asyncRule([10, 17, 20])
      .not.even();

    await expect(validation.testAsync("10")).rejects.toBeDefined();
    await expect(validation.testAsync(11)).rejects.toBeDefined();
    await expect(validation.testAsync(17)).resolves.toBe(17);
  });
});

function debugRules(validation) {
  return validation.chain.map(ruleId);
}

function ruleId({ name, modifiers, args }) {
  const modifiersStr = modifiers.map(it => it.name).join(".");
  const argsStr = args.map(parseArg).join(", ");
  return `${modifiersStr ? modifiersStr + "." : ""}${name}(${argsStr})`;
}

function parseArg(arg) {
  return typeof arg === "string" ? `"${arg}"` : `${arg}`;
}

function asyncRule(expected, delay = 50, exception) {
  return value =>
    new Promise(resolve => {
      setTimeout(() => {
        if (exception) {
          throw exception;
        }
        resolve(value == expected || expected.includes(value));
      }, delay);
    });
}
