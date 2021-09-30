import Rule from "./Rule";
import Modifier from "./Modifier";
import ValidationError from "./ValidationError";

class Context {
  constructor(chain = [], nextRuleModifiers = []) {
    this.chain = chain;
    this.nextRuleModifiers = nextRuleModifiers;
  }

  _applyRule(ruleFn, name) {
    return (...args) => {
      this.chain.push(
        new Rule(name, ruleFn.apply(this, args), args, this.nextRuleModifiers)
      );
      this.nextRuleModifiers = [];
      return this;
    };
  }

  _applyModifier(modifier, name) {
    this.nextRuleModifiers.push(
      new Modifier(name, modifier.simple, modifier.async)
    );
    return this;
  }

  _clone() {
    return new Context(this.chain.slice(), this.nextRuleModifiers.slice());
  }

  test(value) {
    return this.chain.every(rule => rule._test(value));
  }

  testAll(value) {
    const err = [];
    this.chain.forEach(rule => {
      try {
        rule._check(value);
      } catch (ex) {
        err.push(new ValidationError(rule, value, ex));
      }
    });
    return err;
  }

  check(value) {
    this.chain.forEach(rule => {
      try {
        rule._check(value);
      } catch (ex) {
        throw new ValidationError(rule, value, ex);
      }
    });
  }

  testAsync(value) {
    return new Promise((resolve, reject) => {
      executeAsyncRules(value, this.chain.slice(), resolve, reject);
    });
  }
}

function executeAsyncRules(value, rules, resolve, reject) {
  if (rules.length) {
    const rule = rules.shift();
    rule._testAsync(value).then(
      () => {
        executeAsyncRules(value, rules, resolve, reject);
      },
      cause => {
        reject(new ValidationError(rule, value, cause));
      }
    );
  } else {
    resolve(value);
  }
}

export default Context;
