var TodoDemo = React.createClass({
  getInitialState() {
    return JSON.parse(localStorage.getItem('todos') || '{"todos": []}');
  },

  addTodo(todo) {
    var {todos} = this.state;

    todos.push({title: todo});
    localStorage.setItem('todos', JSON.stringify({todos: todos}));

    this.setState({todos: todos});
  },

  handleDel(todo) {
    var {todos} = this.state;
    var filteredTodos = todos.filter(function (item) {
      return todo != item;
    });

    localStorage.setItem('todos', JSON.stringify({todos: filteredTodos}));
    debugger;
    this.setState({todos: filteredTodos});
  },

  completed: function () {
    var {todos} = this.state;
    var doneTodos = todos.filter(function (item) {
      return true == item.done;
    });
    return doneTodos;
  },

  remaining: function () {
    var {todos} = this.state;
    var remainedTodos = todos.filter(function (item) {
      return true != item.done;
    });

    debugger;
    return remainedTodos;
  },

  clearCompletedItems: function () {
    var {todos} = this.state;
    debugger;
    var filteredTodos = todos.filter(function (item) {
      return true != item.done;
    });

    localStorage.setItem('todos', JSON.stringify({todos: filteredTodos}));
    debugger;
    this.setState({todos: filteredTodos});
  },

  filterAll: function () {
    var {todos} = JSON.parse(localStorage.getItem('todos') || this.state);
    this.setState({todos: todos});
  },

  filterActive: function () {
    // var {todos} = this.state;
    debugger;
    var {todos} = JSON.parse(localStorage.getItem('todos') || this.state);
    var remainedTodos = todos.filter(function (item) {
      return true != item.done;
    });
    this.setState({todos: remainedTodos});
  },

  filterComplete: function () {
    var {todos} = JSON.parse(localStorage.getItem('todos') || this.state);
    var doneTodos = todos.filter(function (item) {
      return true == item.done;
    });
    this.setState({todos: doneTodos});
  },

  render: function () {
    return (
      <div>
        <TodoForm addItems={this.addTodo} items={this.state.todos}/>
        <TodoList deleteItem={this.handleDel} items={this.state.todos}/>
        <TodoFooter allItemsCount={this.state.todos.length}
                    clearCompletedItems={this.clearCompletedItems}
                    itemsDoneCount={this.completed().length}
                    itemsRemainingCount={this.remaining().length}
                    showAllItems={this.filterAll}
                    showRemainedItems={this.filterActive}
                    showCompletedItems={this.filterComplete}
        />
      </div>
    )
  }
});


var TodoForm = React.createClass({
  getInitialState() {
    return {todo: ''};
  },

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.todo != '') {
      this.props.addItems(this.state.todo);
      this.setState({todo: ''});
    }
  },
  changeHandler(e) {
    this.setState({todo: e.target.value});
  },

  render: function () {
    return (
      <header className="list-header">
        <h2>Todo List</h2>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.changeHandler} value={this.state.todo} placeholder="Enter Todo..."/>
        </form>
      </header>
    )
  }
})

var TodoList = React.createClass({

  deleteTodo(todo) {
    debugger;
    this.props.deleteItem(todo);
  },

  render: function () {

    var todoList;
    if (this.props.items.length == 0) {
      todoList = <EmptyMessage />
    } else {
      todoList = (
        <ul>
          {this.props.items.map((todo, i) => {
            return (
              <TodoItem key={i}
                        todo={todo}
                        onDeleteTodo={this.deleteTodo.bind(this, todo)}
              />
            )
          }, this)
          }
        </ul>

      );
    }

    return (
      <div id="list-content">
        {todoList}
      </div>
    )
  }
});


var TodoItem = React.createClass({

  deleteHandler(e) {
    this.props.onDeleteTodo(e);
  },

  toggleDone: function (event) {
    let todo = this.props.todo;
    todo.done = event.target.checked;
    this.setState({todo});
  },

  render() {
    return (

      <li className={this.props.todo.done ? 'done' : ''}>
        <input type="checkbox"
               checked={this.props.todo.done}
               onChange={this.toggleDone}/>
        <label className="todo-title">{this.props.todo.title}</label>
        <button className="delete-item" onClick={this.deleteHandler}>
          <i className="fa fa-times fa-lg"></i>
        </button>
      </li>
    );
  }

});

var TodoFooter = React.createClass({

  render: function () {

    var clearCompletedButton;

    if (this.props.itemsDoneCount > 0) {
      clearCompletedButton = (
        <a id="clear-completed" onClick={this.props.clearCompletedItems}>
          Clear {this.props.itemsDoneCount} completed
          {1 === this.props.itemsDoneCount ? " item" : " items"}
        </a>
      );
    }

    return (
      <footer className="list-footer">
        <span className="todo-remain-count">
          <b>{this.props.itemsRemainingCount}</b>
          {1 === this.props.itemsRemainingCount ? " item" : " items"} left
        </span>

        <ul className="todo-filters">
          <li><a onClick={this.props.showAllItems}>All</a></li>
          <li><a onClick={this.props.showRemainedItems}>Active</a></li>
          <li><a onClick={this.props.showCompletedItems}>Completed</a></li>
        </ul>
        {clearCompletedButton}
      </footer>
    );
  }

});


const EmptyMessage = () => {
  return (
    <div className="empty-message">You have nothing to do?</div>
  );
}

ReactDOM.render(<TodoDemo />, document.getElementById("todoList"));