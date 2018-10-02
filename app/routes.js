var m = require("mithril");

module.exports = app => {
  return {
    "/": {
      render: vnode => {
        return m(app, vnode.attrs);
      }
    },
    "/:status": {
      render: vnode => {
        return m(app, vnode.attrs);
      }
    }
  };
};
