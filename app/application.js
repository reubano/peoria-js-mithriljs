var m = require("mithril");
var Controller = require("controller");
var view = require("view");

module.exports = {
  oninit: vnode => {
    vnode.state.ctrl = new Controller(vnode.attrs);
  },
  onbeforeupdate: vnode => {
    vnode.state.ctrl.update(vnode.attrs);
  },
  view: vnode => {
    var ctrl = vnode.state.ctrl;
    var display = ctrl.todos.list.length ? "" : "none";
    return [
      view.headerView(vnode),
      m("section.main", { style: { display } }, [
        m("input#toggle-all.toggle-all[type=checkbox]", {
          onclick: ctrl.completeAll,
          checked: ctrl.allCompleted()
        }),
        m("label", { for: "toggle-all" }, "Mark all as complete"),
        view.todosView(vnode)
      ]),
      ctrl.todos.list.length ? view.footerView(vnode) : void 0
    ];
  }
};
