"use strict";

exports.__esModule = true;
exports.loadConfigAndPlugins = exports.saveQueriesDependencies = exports.runQueries = exports.setComponents = exports.buildSchema = exports.setInferenceMetadata = exports.renderHTMLDev = exports.renderHTMLProd = void 0;

var _workerMessaging = require("../../jobs/worker-messaging");

var _reporter = require("../reporter");

var _renderHtml = require("./render-html");

exports.renderHTMLProd = _renderHtml.renderHTMLProd;
exports.renderHTMLDev = _renderHtml.renderHTMLDev;

var _schema = require("./schema");

exports.setInferenceMetadata = _schema.setInferenceMetadata;
exports.buildSchema = _schema.buildSchema;

var _queries = require("./queries");

exports.setComponents = _queries.setComponents;
exports.runQueries = _queries.runQueries;
exports.saveQueriesDependencies = _queries.saveQueriesDependencies;

var _loadConfigAndPlugins = require("./load-config-and-plugins");

exports.loadConfigAndPlugins = _loadConfigAndPlugins.loadConfigAndPlugins;
(0, _workerMessaging.initJobsMessagingInWorker)();
(0, _reporter.initReporterMessagingInWorker)(); // Note: this doesn't check for conflicts between module exports
//# sourceMappingURL=index.js.map