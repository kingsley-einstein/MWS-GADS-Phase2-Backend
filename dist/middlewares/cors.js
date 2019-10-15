"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cors = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var cors = function cors() {
  var origins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
  var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Authorization, Content-Type';
  var methods = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'POST, GET, PATCH, DELETE, PUT';
  return (
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res, next) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                res.header('Access-Control-Allow-Origins', origins);
                res.header('Access-Control-Allow-Headers', headers);
                res.header('Access-Control-Allow-Methods', methods);
                next();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

exports.cors = cors;