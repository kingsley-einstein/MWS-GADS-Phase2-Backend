"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _db = _interopRequireDefault(require("../db"));

var _helpers = require("../helpers");

var _env = _interopRequireDefault(require("../env"));

var _db$models = _db["default"].models,
    User = _db$models.User,
    Blacklist = _db$models.Blacklist;
/**
 * @author Kingsley Victor
 */

var AuthController = function AuthController() {
  (0, _classCallCheck2["default"])(this, AuthController);
};

exports.AuthController = AuthController;
(0, _defineProperty2["default"])(AuthController, "register",
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var body, user, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            body = req.body;
            _context.next = 4;
            return User.create(body);

          case 4:
            user = _context.sent;
            data = {
              email: user.email,
              token: _helpers.Jwt.tokenize({
                id: user.id,
                password: user.password
              }, _env["default"].jwt_secret)
            };
            res.status(201).json({
              status: 201,
              data: data
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              status: 500,
              error: _context.t0
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
(0, _defineProperty2["default"])(AuthController, "signIn",
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, email, password, user, data;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context2.next = 4;
            return User.findByEmail(email);

          case 4:
            user = _context2.sent;

            if (user) {
              _context2.next = 8;
              break;
            }

            res.status(404).json({
              status: 404,
              error: 'User not found'
            });
            return _context2.abrupt("return");

          case 8:
            if (_bcryptjs["default"].compareSync(password, user.password)) {
              _context2.next = 11;
              break;
            }

            res.status(400).json({
              status: 400,
              error: 'Incorrect password'
            });
            return _context2.abrupt("return");

          case 11:
            data = {
              email: user.email,
              token: _helpers.Jwt.tokenize({
                id: user.id,
                password: user.password
              }, _env["default"].jwt_secret)
            };
            res.status(200).json({
              status: 200,
              data: data
            });
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              status: 500,
              error: _context2.t0
            });

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
(0, _defineProperty2["default"])(AuthController, "updateItem",
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var user, body, updated, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            user = req.user, body = req.body;
            _context3.next = 4;
            return User.update(body, {
              where: {
                id: user.id
              },
              individualHooks: true,
              returning: true
            });

          case 4:
            updated = _context3.sent;
            data = {
              id: updated[1][0].id,
              email: updated[1][0].email
            };
            res.status(200).json({
              status: 200,
              data: data
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              status: 500,
              error: _context3.t0
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
(0, _defineProperty2["default"])(AuthController, "logOut",
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var user, token, details, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            user = req.user, token = req.token;
            _context4.next = 4;
            return Blacklist.create({
              token: token
            });

          case 4:
            details = _context4.sent;
            data = {
              message: "Successfully signed out user with email ".concat(user.email),
              details: details
            };
            res.status(200).json({
              status: 200,
              data: data
            });
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              status: 500,
              error: _context4.t0
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
(0, _defineProperty2["default"])(AuthController, "getAuthUser",
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var user, data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            try {
              user = req.user;
              data = {
                id: user.id,
                email: user.email
              };
              res.status(200).json({
                status: 200,
                data: data
              });
            } catch (error) {
              res.status(500).json({
                status: 500,
                error: error
              });
            }

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());