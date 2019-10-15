"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = void 0;

var _db = _interopRequireDefault(require("../db"));

var _env = _interopRequireDefault(require("../env"));

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _db$models = _db["default"].models,
    User = _db$models.User,
    Blacklist = _db$models.Blacklist;
/**
 * @author Kingsley Victor
 */

var Auth = function Auth() {
  _classCallCheck(this, Auth);
};

exports.Auth = Auth;

_defineProperty(Auth, "verifyToken",
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var authorization, auth, isValid, isBlacklisted, decoded, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authorization = req.headers.authorization;

            if (authorization) {
              _context.next = 4;
              break;
            }

            res.status(401).json({
              status: 401,
              error: 'Authorization header not presnt in request'
            });
            return _context.abrupt("return");

          case 4:
            auth = authorization.split(' ');

            if (!(auth[0] !== 'Bearer')) {
              _context.next = 8;
              break;
            }

            res.status(401).json({
              status: 401,
              error: "Authorization must be of type 'Bearer'"
            });
            return _context.abrupt("return");

          case 8:
            _context.next = 10;
            return new Promise(function (resolve) {
              _helpers.Jwt.verify(auth[1], _env["default"].jwt_secret, function (err, decoded) {
                resolve(decoded);
              });
            });

          case 10:
            isValid = _context.sent;

            if (isValid) {
              _context.next = 14;
              break;
            }

            res.status(401).json({
              status: 401,
              error: 'Invalid token or expired session'
            });
            return _context.abrupt("return");

          case 14:
            _context.next = 16;
            return new Promise(function (resolve) {
              Blacklist.findByToken(auth[1]).then(function (loggedOut) {
                resolve(loggedOut);
              });
            });

          case 16:
            isBlacklisted = _context.sent;

            if (!isBlacklisted) {
              _context.next = 20;
              break;
            }

            res.status(401).json({
              status: 401,
              error: 'Only logged in users can access this resource'
            });
            return _context.abrupt("return");

          case 20:
            decoded = _helpers.Jwt.decode(auth[1]);
            _context.next = 23;
            return new Promise(function (resolve) {
              User.findByPk(decoded.id).then(function (authenticated) {
                resolve(authenticated);
              });
            });

          case 23:
            user = _context.sent;

            if (user) {
              req.user = user;
              req.token = auth[1];
              next();
            } else {
              res.status(401).json({
                status: 401,
                error: 'User not recognized'
              });
            }

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());