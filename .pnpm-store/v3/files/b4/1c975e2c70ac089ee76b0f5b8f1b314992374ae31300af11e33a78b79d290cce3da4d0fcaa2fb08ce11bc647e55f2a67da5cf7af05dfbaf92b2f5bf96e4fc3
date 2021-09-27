"use strict";

exports.__esModule = true;
exports.createSchemaComposer = void 0;

var _graphqlCompose = require("graphql-compose");

var _extensions = require("./extensions");

var _date = require("./types/date");

var _nodeInterface = require("./types/node-interface");

const createSchemaComposer = ({
  fieldExtensions
} = {}) => {
  const schemaComposer = new _graphqlCompose.SchemaComposer();
  (0, _nodeInterface.getNodeInterface)({
    schemaComposer
  });
  schemaComposer.add(_date.GraphQLDate);
  schemaComposer.add(_graphqlCompose.GraphQLJSON);
  (0, _extensions.addDirectives)({
    schemaComposer,
    fieldExtensions
  });
  return schemaComposer;
};

exports.createSchemaComposer = createSchemaComposer;
//# sourceMappingURL=schema-composer.js.map