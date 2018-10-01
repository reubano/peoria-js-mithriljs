import React from 'react';

function Todos(props) {
  return (
    <div>
      {props.todos.map(todo => (
        <Todo
          val={todo}
          deleteTodo={props.deleteTodo}
          key={todo}
        />
      ))}
    </div>
  );
}

function Todo(props) {
  return (
    <li className="">
      <div className="view">
        <button
          className="destroy"
          onClick={() => props.deleteTodo(props.val)}>
        </button>
        <label>{props.val}</label>
      </div>
    </li>
  );
}

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ["pizza", "sausage"],
      value: "",
      filterValue: ""
    };
  }

  _addTodo(e) {
    if (e.key === 'Enter') {
      this.addTodo()
    }
  }

  addTodo() {
    const todos = [...this.state.todos];
    todos.push(this.state.value);
    this.setState({
      todos,
      value: "",
      filterValue: ""
    });
  }

  changeInputVal(e) {
    this.setState({ value: e.target.value });
  }

  deleteTodo(todo) {
    const todos = [...this.state.todos].filter(arrayTodo => todo !== arrayTodo);
    this.setState({ todos });
  }

  changeFilterValue(e) {
    this.setState({ filterValue: e.target.value });
  }

  render() {
    const todos = this.state.todos.filter(
      todo => todo.indexOf(this.state.filterValue) > -1
    );

    return (
      <div>
        <header className="header">
          <input
            className="new-todo"
            placeholder="What task do you want to find?"
            value={this.state.filterValue}
            onChange={this.changeFilterValue.bind(this)}
          />
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.value}
            onChange={this.changeInputVal.bind(this)}
            onKeyPress={this._addTodo.bind(this)}
          />
        </header>
        <section className="main">
          <ul className="todo-list">
            <Todos todos={todos} deleteTodo={this.deleteTodo.bind(this)} />
          </ul>
        </section>
      </div>
    );
  }
}
