/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./css/app.css":
/*!*********************!*\
  !*** ./css/app.css ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./css/app.css?");

/***/ }),

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/app.css */ \"./css/app.css\");\n/* harmony import */ var _css_app_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_app_css__WEBPACK_IMPORTED_MODULE_0__);\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"phoenix_html\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _socket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socket */ \"./js/socket.js\");\n/* harmony import */ var _online__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./online */ \"./js/online.js\");\n// We need to import the CSS so that webpack will load it.\n// The MiniCssExtractPlugin is used to separate it out into\n// its own CSS file.\n // webpack automatically bundles all modules in your\n// entry points. Those entry points can be configured\n// in \"webpack.config.js\".\n//\n// Import dependencies\n//\n\n // Import local files\n//\n// Local files can be imported directly using relative paths, for example:\n\n\n\n_online__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init(_socket__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ }),

/***/ "./js/online.js":
/*!**********************!*\
  !*** ./js/online.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar online = {\n  init: function init(socket) {\n    var channel = socket.channel('online:lobby', {});\n    console.log(socket);\n    var href = window.location.href;\n    channel.join();\n\n    if (href == \"http://localhost:4000/\") {\n      this.listenForLogin(channel);\n    } else if (href.substring(0, 27) == \"http://localhost:4000/user/\") {\n      //this.queryTimeline(channel)\n      this.listenForTweet(channel);\n    }\n  },\n  listenForLogin: function listenForLogin(channel) {\n    document.getElementById('login-form').addEventListener('submit', function (e) {\n      e.preventDefault();\n      var userName = document.getElementById('userName').value;\n      console.log(userName);\n      channel.push('login', {\n        name: userName\n      }).receive(\"ok\", function (reply) {\n        window.location.href = \"http://localhost:4000/user/\" + userName;\n      } //TODO add err for already exist\n      );\n    });\n  },\n  listenForTweet: function listenForTweet(channel) {\n    document.getElementById('tweet-form').addEventListener('submit', function (e) {\n      e.preventDefault();\n      var message = document.getElementById('message').nodeValue;\n      channel.push('tweet', {\n        message: message\n      }).receive(\"ok\", function (reply) {\n        return console.log('received');\n      } //TODO add err for already exist\n      );\n      document.getElementById('message').value = '';\n    });\n  },\n  queryTimeline: function queryTimeline(channel) {\n    channel.push('queryTimeline', {\n      name: userName\n    });\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (online);\n\n//# sourceURL=webpack:///./js/online.js?");

/***/ }),

/***/ "./js/socket.js":
/*!**********************!*\
  !*** ./js/socket.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"phoenix\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n// NOTE: The contents of this file will only be executed if\n// you uncomment its entry in \"assets/js/app.js\".\n// To use Phoenix channels, the first step is to import Socket,\n// and connect at the socket path in \"lib/web/endpoint.ex\".\n//\n// Pass the token on params as below. Or remove it\n// from the params if you are not using authentication.\n\nvar socket = new !(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"phoenix\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(\"/socket\", {\n  params: {\n    token: window.userToken\n  }\n}); // When you connect, you'll often need to authenticate the client.\n// For example, imagine you have an authentication plug, `MyAuth`,\n// which authenticates the session and assigns a `:current_user`.\n// If the current user exists you can assign the user's token in\n// the connection for use in the layout.\n//\n// In your \"lib/web/router.ex\":\n//\n//     pipeline :browser do\n//       ...\n//       plug MyAuth\n//       plug :put_user_token\n//     end\n//\n//     defp put_user_token(conn, _) do\n//       if current_user = conn.assigns[:current_user] do\n//         token = Phoenix.Token.sign(conn, \"user socket\", current_user.id)\n//         assign(conn, :user_token, token)\n//       else\n//         conn\n//       end\n//     end\n//\n// Now you need to pass this token to JavaScript. You can do so\n// inside a script tag in \"lib/web/templates/layout/app.html.eex\":\n//\n//     <script>window.userToken = \"<%= assigns[:user_token] %>\";</script>\n//\n// You will need to verify the user token in the \"connect/3\" function\n// in \"lib/web/channels/user_socket.ex\":\n//\n//     def connect(%{\"token\" => token}, socket, _connect_info) do\n//       # max_age: 1209600 is equivalent to two weeks in seconds\n//       case Phoenix.Token.verify(socket, \"user socket\", token, max_age: 1209600) do\n//         {:ok, user_id} ->\n//           {:ok, assign(socket, :user, user_id)}\n//         {:error, reason} ->\n//           :error\n//       end\n//     end\n//\n// Finally, connect to the socket:\n\nsocket.connect(); // Now that you are connected, you can join channels with a topic:\n\nvar channel = socket.channel(\"online:lobby\", {});\nchannel.join().receive(\"ok\", function (resp) {\n  console.log(\"Joined successfully\", resp);\n}).receive(\"error\", function (resp) {\n  console.log(\"Unable to join\", resp);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (socket);\n\n//# sourceURL=webpack:///./js/socket.js?");

/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./js/app.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./js/app.js */\"./js/app.js\");\n\n\n//# sourceURL=webpack:///multi_./js/app.js?");

/***/ })

/******/ });