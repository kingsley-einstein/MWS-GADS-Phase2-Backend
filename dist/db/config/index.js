"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _env = _interopRequireDefault(require("../../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  development: {
    config: {
      define: {
        underscored: true
      },
      dialect: 'postgres'
    },
    url: _env["default"].db_dev
  },
  test: {
    config: {
      define: {
        underscored: true
      },
      dialect: 'postgres'
    },
    url: _env["default"].db_test
  },
  production: {
    config: {
      define: {
        underscored: true
      },
      dialect: 'postgres'
    },
    url: _env["default"].db_prod
  }
};
exports["default"] = _default;