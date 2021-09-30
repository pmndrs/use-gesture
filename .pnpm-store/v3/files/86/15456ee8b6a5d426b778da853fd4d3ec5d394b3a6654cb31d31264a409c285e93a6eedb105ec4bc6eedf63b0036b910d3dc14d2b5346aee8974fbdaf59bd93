import React from 'react';
import algoliasearch from 'algoliasearch/dist/algoliasearch-lite.esm.browser';
import { version } from './version';
export function useSearchClient(appId, apiKey) {
  var searchClient = React.useMemo(function () {
    var client = algoliasearch(appId, apiKey);
    client.addAlgoliaAgent("docsearch (".concat(version, ")"));
    return client;
  }, [appId, apiKey]);
  return searchClient;
}