var TodoDemo = React.createClass({
  getInitialState: () => {
    return {items:[]};
  },

  handleChange: () => {

  },

  render: function () {
    return(
        <div>
          <TodoHeader></TodoHeader>
          <TodoForm addItems={this.handleChange}></TodoForm>
          <TodoList items={this.state.items}></TodoList>
          <TodoFooter></TodoFooter>
        </div>
    )

  }
});

const TodoHeader = () => {
  return(
    <h2>Todo List</h2>
  )
};


var TodoForm = React.createClass({
  onAdd: function(e){
    e.preventDefault();
    var newItem = this.refs.inputNew.value.trim();
    var items = this.props.items;
    if ( newItem != '' ){
      items.push ({newItem});
      this.props.addItems (items) ;
    }
    this.refs.inputNew.value = '';
  },

  render: () => {
    return(
      <form onSubmit = {this.onAdd}>
        <input ref = "inputNew" type = "text"  placeholder="type a todo list" id="inputNew"  />
      </form>
  )}
})


/*

const TodoForm = (props) => {
  return(
      <form onSubmit = {props.onChange}>
        <input ref = "inputNew" type = "text"  placeholder="type a todo list" id="inputNew"  />
      </form>
  )
}
*/

const TodoList = (props) => {
  return(
      <ul>
        {props.items.map((item) => {
          return <TodoItem>{item}</TodoItem>
        })
        }
      </ul>

  );
};

const TodoItem = (props) => {
  return (
      <li>{props.title}</li>
  )
}

const TodoFooter = () => {
  return (
      <p>Completed!</p>
  )
}

ReactDOM.render (<TodoDemo />, document.getElementById("todoList"));