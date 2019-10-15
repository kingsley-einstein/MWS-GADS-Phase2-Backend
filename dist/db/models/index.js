"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user"));

var _favorite = _interopRequireDefault(require("./favorite"));

var _blacklist = _interopRequireDefault(require("./blacklist"));

var _default = {
  UserDefinition: _user["default"],
  FavoriteDefinition: _favorite["default"],
  BlacklistDefinition: _blacklist["default"]
};
exports["default"] = _default;