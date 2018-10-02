var stream = require("mithril/stream");
var count = 0;

function uniqueId() {
  count += 1;
  return count;
}

class Todo {
  constructor(title) {
    this.isEmpty = this.isEmpty.bind(this);
    this.title = stream(title.trim());
    this.completed = stream(false);
    this.editing = stream(false);
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
      this.list = titles.map(title => new Todo(title));
    }
  }
};
