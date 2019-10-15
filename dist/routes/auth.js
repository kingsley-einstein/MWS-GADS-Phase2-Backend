"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.post('/auth/register', _controllers.AuthController.register);
router.post('/auth/login', _controllers.AuthController.signIn);
router.patch('/auth/update', _middlewares.Auth.verifyToken, _controllers.AuthController.updateItem);
router.post('/auth/logout', _middlewares.Auth.verifyToken, _controllers.AuthController.logOut);
var _default = router;
exports["default"] = _default;