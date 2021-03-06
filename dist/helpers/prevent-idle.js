"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ping = void 0;

var _http = _interopRequireDefault(require("http"));

var ping = function ping() {
  setInterval(function () {
    var opts = {
      host: 'https://mws-gads-phase2.herokuapp.com',
      path: '/api/v1'
    };

    _http["default"].get(opts, function (res) {
      res.on('data', function (chunk) {
        try {
          console.log(chunk);
        } catch (error) {
          console.log(error);
        }
      });
    }).on('error', function (error) {
      console.log(error.message);
    });
  }, 10 * 60 * 1000);
};

exports.ping = ping;