"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _db = _interopRequireDefault(require("../db"));

var _env = _interopRequireDefault(require("../env"));

var _helpers = require("../helpers");

var _db$models = _db["default"].models,
    User = _db$models.User,
    Blacklist = _db$models.Blacklist;
/**
 * @author Kingsley Victor
 */

var Auth = function Auth() {
  (0, _classCallCheck2["default"])(this, Auth);
};

exports.Auth = Auth;
(0, _defineProperty2["default"])(Auth, "verifyToken",
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var authorization, auth, isValid, isBlacklisted, decoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
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