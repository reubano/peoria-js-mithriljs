var prop = require("mithril/stream");
var Model = require("model");

module.exports = class Controller {
  constructor(attrs) {
    this.update = this.update.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.isVisible = this.isVisible.bind(this);
    this.save = this.save.bind(this);
    this.clearTitle = this.clearTitle.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.completed = this.completed.bind(this);
    this.remaining = this.remaining.bind(this);
    this.allCompleted = this.allCompleted.bind(this);
    this.completeAll = this.completeAll.bind(this);
    this.status = prop(attrs.status);
    this.title = prop("");
    this.filterValue = prop("");
    this.todos = new Model.Todos(["pizza", "sausage"]);
  }

  update(attrs) {
    this.status(attrs.status);
  }

  isEmpty() {
    return !this.title();
  }

  add() {
    if (!this.isEmpty()) {
      var todo = new Model.Todo(this.title());
      this.todos.list.push(todo);
      this.clearTitle();
      this.clearFilter();
    }
  }

  remove(todo, pred) {
    if (!pred) {
      pred = function(_todo) {
        return _todo.id !== todo.id;
      };
    }

    this.todos.list = this.todos.list.filter(pred);
  }

  edit(todo) {
    todo.previousTitle = todo.title();
    todo.editing(true);
  }

  isVisible(todo) {
    var visible = function() {
      switch (this.status()) {
        case "active":
          return !todo.completed();
        case "completed":
          return todo.completed();
        default:
          return true;
      }
    }.call(this);
    if (visible && this.filterValue()) {
      return todo.title().includes(this.filterValue());
    } else {
      return visible;
    }
  }

  toggle(todo) {
    todo.completed(!todo.completed());
  }

  save(todo) {
    if (todo.editing()) {
      todo.editing(false);
      if (todo.isEmpty()) {
        this.remove(todo);
      }
    }
  }

  reset(todo) {
    todo.title(todo.previousTitle);
    todo.editing(false);
  }

  clearTitle() {
    this.title("");
  }

  clearFilter() {
    this.filterValue("");
  }

  clearCompleted() {
    this.remove(null, todo => {
      return !todo.completed();
    });
  }

  completed() {
    var filtered = this.todos.list.filter(todo => {
      return todo.completed();
    });
    return filtered.length;
  }

  remaining() {
    var filtered = this.todos.list.filter(todo => {
      return !todo.completed();
    });
    return filtered.length;
  }

  allCompleted() {
    return this.todos.list.every(todo => {
      return todo.completed();
    });
  }

  completeAll() {
    var completed = !this.allCompleted();
    this.todos.list.forEach(todo => {
      if (todo.completed() !== completed) {
        this.toggle(todo);
      }
    });
  }

  focus(vnode, todo) {
    if (todo.editing() && vnode.dom !== document.activeElement) {
      vnode.dom.focus();
    }
  }
};
