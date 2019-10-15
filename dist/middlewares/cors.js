"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cors = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cors = function cors() {
  var origins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
  var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Authorization, Content-Type';
  var methods = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'POST, GET, PATCH, DELETE, PUT';
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
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