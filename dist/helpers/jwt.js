"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Jwt = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

/**
 * @author Kingsley Victor
 */
var Jwt = function Jwt() {
  (0, _classCallCheck2["default"])(this, Jwt);
};

exports.Jwt = Jwt;
(0, _defineProperty2["default"])(Jwt, "tokenize", function (payload, secret) {
  return _jsonwebtoken["default"].sign(payload, secret, {
    expiresIn: '3d'
  });
});
(0, _defineProperty2["default"])(Jwt, "decode", function (token) {
  return _jsonwebtoken["default"].decode(token);
});
(0, _defineProperty2["default"])(Jwt, "verify", function (token, secret, cb) {
  return _jsonwebtoken["default"].verify(token, secret, null, cb);
});