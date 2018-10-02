var m = require("mithril");

function watchInput(onenter, onescape) {
  return function(e) {
    switch (e.key) {
      case "Enter":
        if (typeof onenter === "function") {
          onenter();
        }
        return (e.redraw = true);
      case "Escape":
        if (typeof onescape === "function") {
          onescape();
        }
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
        var _class;

        if (todo.completed()) {
          _class = "completed ";
        } else {
          _class = "";
        }

        if (todo.editing()) {
          _class += "editing";
        }

        function save() {
          ctrl.save(todo);
        }
        function reset() {
          ctrl.reset(todo);
        }
        function edit() {
          ctrl.edit(todo);
        }
        function toggle() {
          ctrl.toggle(todo);
        }
        function remove() {
          ctrl.remove(todo);
        }
        function focus(vnode) {
          ctrl.focus(vnode, todo);
        }

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
            onupdate: focus
          })
        ]);
      })
    ]);
  },
  footerView: vnode => {
    var ctrl = vnode.state.ctrl;
    var es = ctrl.remaining() === 1 ? "" : "s";
    function clear() {
      ctrl.clearCompleted();
    }

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
