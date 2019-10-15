"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _middlewares = require("../middlewares");

var _routes = _interopRequireDefault(require("../routes"));

var _default = function _default(app, _ref) {
  var json = _ref.json,
      urlencoded = _ref.urlencoded;
  var isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    app.use(require('morgan')('dev'));
  }

  app.use((0, _middlewares.cors)('*'));
  app.use(json());
  app.use(urlencoded({
    extended: true
  }));
  app.use('/api/v1', _routes["default"]);
};

exports["default"] = _default;