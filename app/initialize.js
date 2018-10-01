var m = require("mithril");
var App = require("todo");

document.addEventListener("DOMContentLoaded", () =>
  m.mount(document.getElementById("app"), App)
);
