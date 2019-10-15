"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./auth"));

var _favorite = _interopRequireDefault(require("./favorite"));

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the MWS-GADS-Phase2 challenge API'
  });
});
router.use('/', _auth["default"]);
router.use('/', _favorite["default"]);
var _default = router;
exports["default"] = _default;