var m = require("mithril");
var App = require("application");
var routes = require("routes");

m.route.mode = "hash";

document.addEventListener("DOMContentLoaded", () => {
  var location = document.getElementById("app");
  m.route(location, "/", routes(App));
});
