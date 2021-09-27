/* eslint-disable global-require */
export function getGraphqlVersion() {
  var _graphql$versionInfo;

  const graphql = require('../graphql');

  if (graphql !== null && graphql !== void 0 && (_graphql$versionInfo = graphql.versionInfo) !== null && _graphql$versionInfo !== void 0 && _graphql$versionInfo.major) {
    var _graphql$versionInfo2, _graphql$versionInfo3;

    return parseFloat(`${graphql === null || graphql === void 0 ? void 0 : (_graphql$versionInfo2 = graphql.versionInfo) === null || _graphql$versionInfo2 === void 0 ? void 0 : _graphql$versionInfo2.major}.${graphql === null || graphql === void 0 ? void 0 : (_graphql$versionInfo3 = graphql.versionInfo) === null || _graphql$versionInfo3 === void 0 ? void 0 : _graphql$versionInfo3.minor}`);
  } else if (graphql.getOperationRootType) {
    return 14.0;
  } else if (graphql.lexicographicSortSchema) {
    return 13.0;
  } else if (graphql.lexographicSortSchema) {
    // 0.13-rc.1
    return 13.0;
  }

  return 11.0;
}
export const graphqlVersion = getGraphqlVersion();