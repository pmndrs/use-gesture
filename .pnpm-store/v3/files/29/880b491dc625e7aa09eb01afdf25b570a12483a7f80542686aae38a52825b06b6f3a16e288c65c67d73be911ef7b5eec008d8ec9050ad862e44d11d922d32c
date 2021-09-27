export function groupBy(values, predicate) {
  return values.reduce(function (acc, item) {
    var key = predicate(item);

    if (!acc.hasOwnProperty(key)) {
      acc[key] = [];
    }

    acc[key].push(item);
    return acc;
  }, {});
}