"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.post('/favorite', _middlewares.Auth.verifyToken, _controllers.FavoriteController.create);
router.get('/favorite', _middlewares.Auth.verifyToken, _controllers.FavoriteController.getFavorites);
router["delete"]('/favorite/:id', _middlewares.Auth.verifyToken, _controllers.FavoriteController.deleteOne);
router["delete"]('/favorites', _middlewares.Auth.verifyToken, _controllers.FavoriteController.deleteAll);
var _default = router;
exports["default"] = _default;