var m = require("mithril");

module.exports = app => {
  return {
    "/": { render: vnode => m(app, vnode.attrs) },
    "/:status": { render: vnode => m(app, vnode.attrs) }
  };
};
