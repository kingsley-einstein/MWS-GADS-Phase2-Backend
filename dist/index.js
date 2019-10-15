"use strict";

var _express = _interopRequireDefault(require("express"));

var _db = _interopRequireDefault(require("./db"));

var _config = _interopRequireDefault(require("./config"));

var _env = _interopRequireDefault(require("./env"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sequelize = _db["default"].sequelize;
var app = (0, _express["default"])();
var sequelizeOpts = {
  development: {
    force: false
  },
  test: {
    force: true
  },
  production: {
    force: false
  }
};
var port = _env["default"].port[process.env.NODE_ENV] || 5230;
(0, _config["default"])(app, _express["default"]);
sequelize.sync(sequelizeOpts[process.env.NODE_ENV]).then(function () {
  app.listen(port, function () {
    if (process.env.NODE_ENV === 'production') {
      (0, _helpers.ping)();
    }

    console.log("Server listening on port ".concat(port));
  });
});