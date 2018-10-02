var prop = require("mithril/stream");
var count = 0;

function uniqueId() {
  count += 1;
  return count;
}

class Todo {
  constructor(title) {
    this.isEmpty = this.isEmpty.bind(this);
    this.title = prop(title.trim());
    this.completed = prop(false);
    this.editing = prop(false);
    this.id = uniqueId();
  }

  isEmpty() {
    return !this.title();
  }
}

module.exports = {
  Todo: Todo,
  Todos: class Todos {
    constructor(titles) {
      titles = titles || [];
      this.list = titles.map(title => {
        return new Todo(title);
      });
    }
  }
};
