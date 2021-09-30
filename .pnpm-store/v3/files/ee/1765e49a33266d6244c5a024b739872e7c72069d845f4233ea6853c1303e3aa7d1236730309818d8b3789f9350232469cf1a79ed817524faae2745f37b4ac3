"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withFilter = void 0;
var iterall_1 = require("iterall");
exports.withFilter = function (asyncIteratorFn, filterFn) {
    return function (rootValue, args, context, info) {
        var _a;
        var asyncIterator = asyncIteratorFn(rootValue, args, context, info);
        var getNextPromise = function () {
            return new Promise(function (resolve, reject) {
                var inner = function () {
                    asyncIterator
                        .next()
                        .then(function (payload) {
                        if (payload.done === true) {
                            resolve(payload);
                            return;
                        }
                        Promise.resolve(filterFn(payload.value, args, context, info))
                            .catch(function () { return false; })
                            .then(function (filterResult) {
                            if (filterResult === true) {
                                resolve(payload);
                                return;
                            }
                            inner();
                            return;
                        });
                    })
                        .catch(function (err) {
                        reject(err);
                        return;
                    });
                };
                inner();
            });
        };
        var asyncIterator2 = (_a = {
                next: function () {
                    return getNextPromise();
                },
                return: function () {
                    return asyncIterator.return();
                },
                throw: function (error) {
                    return asyncIterator.throw(error);
                }
            },
            _a[iterall_1.$$asyncIterator] = function () {
                return this;
            },
            _a);
        return asyncIterator2;
    };
};
//# sourceMappingURL=with-filter.js.map