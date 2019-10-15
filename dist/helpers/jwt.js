"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Jwt = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @author Kingsley Victor
 */
var Jwt = function Jwt() {
  _classCallCheck(this, Jwt);
};

exports.Jwt = Jwt;

_defineProperty(Jwt, "tokenize", function (payload, secret) {
  return _jsonwebtoken["default"].sign(payload, secret, {
    expiresIn: '3d'
  });
});

_defineProperty(Jwt, "decode", function (token) {
  return _jsonwebtoken["default"].decode(token);
});

_defineProperty(Jwt, "verify", function (token, secret, cb) {
  return _jsonwebtoken["default"].verify(token, secret, null, cb);
});