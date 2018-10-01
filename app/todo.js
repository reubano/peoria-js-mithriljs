var m = require("mithril");
var stream = require("mithril/stream");

function TodosView(vnode) {
  var ctrl = vnode.state.ctrl;
  return m("ul.todo-list", [
    ctrl.todos.list.filter(ctrl.isVisible).map(todo => {
      return m("li", { class: "", key: todo.title() }, [
        m(".view", [
          m("button.destroy", {
            onclick: () => ctrl.deleteTodo(todo)
          }),
          m("label", todo.title())
        ])
      ]);
    })
  ]);
}

class Todo {
  constructor(title) {
    this.title = stream(title.trim());
  }
}

class Todos {
  constructor(titles) {
    this.list = titles.map(title => new Todo(title));
  }
}

class Controller {
  constructor(attrs) {
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.isVisible = this.isVisible.bind(this);
    this.title = stream("");
    this.filterValue = stream("");
    this.todos = new Todos(["pizza", "sausage"]);
  }

  addTodo(event) {
    if (event.key === "Enter") {
      var todo = new Todo(this.title());
      this.todos.list.push(todo);
      this.title("");
      this.filterValue("");
      m.redraw();
    }
  }

  deleteTodo(todo) {
    this.todos.list = this.todos.list.filter(
      _todo => _todo.title() !== todo.title()
    );
  }

  isVisible(todo) {
    return todo.title().includes(this.filterValue());
  }
}

module.exports = {
  oninit: vnode => (vnode.state.ctrl = new Controller()),

  view: vnode => {
    var ctrl = vnode.state.ctrl;

    return [
      m("header#header", [
        m("input.new-todo", {
          placeholder: "What task do you want to find?",
          value: ctrl.filterValue(),
          oninput: m.withAttr("value", ctrl.filterValue)
        }),
        m("input.new-todo", {
          placeholder: "What needs to be done?",
          value: ctrl.title(),
          oninput: m.withAttr("value", ctrl.title),
          onkeyup: ctrl.addTodo
        })
      ]),
      m("section#main", TodosView(vnode))
    ];
  }
};
