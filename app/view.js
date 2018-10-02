var m = require("mithril");

function watchInput(onenter, onescape) {
  return function(e) {
    switch (e.key) {
      case "Enter":
        typeof onenter === "function" ? onenter() : null;
        return (e.redraw = true);
      case "Escape":
        typeof onescape === "function" ? onescape() : null;
        return (e.redraw = true);
      default:
        return (e.redraw = false);
    }
  };
}

module.exports = {
  headerView: vnode => {
    var ctrl = vnode.state.ctrl;
    return m("header#header", [
      m("h1", "todos"),
      m("input.new-todo", {
        placeholder: "What needs to be done?",
        value: ctrl.title(),
        onkeyup: watchInput(ctrl.add, ctrl.clearTitle),
        oninput: m.withAttr("value", ctrl.title)
      })
    ]);
  },
  todosView: vnode => {
    var ctrl = vnode.state.ctrl;

    return m("ul.todo-list", [
      ctrl.todos.list.filter(ctrl.isVisible).map(todo => {
        var _class = todo.completed() ? "completed " : "";
        _class += todo.editing() ? "editing" : "";

        var save = () => ctrl.save(todo);
        var reset = () => ctrl.reset(todo);
        var toggle = () => ctrl.toggle(todo);
        var edit = () => ctrl.edit(todo);
        var remove = () => ctrl.remove(todo);

        return m("li", { class: _class, key: todo.id }, [
          m(".view", [
            m("input.toggle[type=checkbox]", {
              onclick: m.withAttr("checked", toggle),
              checked: todo.completed()
            }),
            m("label", { ondblclick: edit }, todo.title()),
            m("button.destroy", { onclick: remove })
          ]),
          m("input.edit", {
            value: todo.title(),
            onkeyup: watchInput(save, reset),
            onblur: save,
            oninput: m.withAttr("value", todo.title),
            onupdate: vnode => ctrl.focus(vnode, todo)
          })
        ]);
      })
    ]);
  },
  footerView: vnode => {
    var ctrl = vnode.state.ctrl;
    var es = ctrl.remaining() === 1 ? "" : "s";
    var clear = () => ctrl.clearCompleted();

    return m("footer.footer", [
      m("span.todo-count", [m("strong", ctrl.remaining()), ` item${es} left`]),
      m("ul.filters", [
        ["all", "active", "completed"].map(status => {
          var attrs = {
            href: `/${status}`,
            oncreate: m.route.link,
            onupdate: m.route.link,
            class: ctrl.status() === status ? "selected" : ""
          };

          return m("li", m("a", attrs, status));
        }),
        m("li", "🔍"),
        m("input", {
          placeholder: "Search",
          value: ctrl.filterValue(),
          onkeyup: watchInput(null, ctrl.clearFilter),
          oninput: m.withAttr("value", ctrl.filterValue)
        })
      ]),
      ctrl.completed()
        ? m("button.clear-completed", { onclick: clear }, "Clear completed")
        : void 0
    ]);
  }
};
