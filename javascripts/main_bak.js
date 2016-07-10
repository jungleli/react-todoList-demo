var TodoList = React.createClass({
  getInitialState: function(){
    return ({
      todoList : []
    })
  },
  handleChange : function (rows){
    this.setState ({ todoList : rows});
  },
  render : function (){
    return (
        <div>
          <ListHeader  addList ={this.handleChange} todo = {this.state.todoList} />
          <ListTodo delItem = {this.handleChange}  todo = {this.state.todoList} />
          <ListFooter />
        </div>
    )

  }

});

var ListHeader = React.createClass({
  handleAdd : function(e){
    e.preventDefault();
    var newTodo = this.refs.inputNew.value.trim();
    var rows = this.props.todo;
    if ( newTodo != '' ){
      rows.push ({title:newTodo, complete:true});
      this.props.addList (rows) ;
    }
    this.refs.inputNew.value = '';

  },

  render : function (){
    return (
    <header className="list-header">
      /**/<h2>ToDo List</h2>
        <form onSubmit = {this.handleAdd}>
          <input ref = "inputNew" type = "text"  placeholder="type a todo list" id="inputNew"  />
        </form>
    </header>
    )
  }
});

var ListTodo = React.createClass({

  getInitialState: function () {
    return {
      complete: (!!this.props.complete) || false
    };
  },

  handleDel : function (delIndex){
    return (function () {
      this.props.todo.splice (delIndex,1);
      this.props.delItem (this.props.todo);
    }).bind(this);
  },

  onCheck: function(i){
    return (function (e) {
      debugger;
      this.props.todo.complete = e.target.checked;
      console.log(i);
      debugger;
          /*this.setState({
           complete: e.target.checked
           });
           */
        }).bind(this);
    },

  render : function (){

    return (
        <ul id="list-content">
          {
            this.props.todo.map(function(item,i){
              var labelStyle={
                'text-decoration': this.state.checked?'line-through':''
              };
              return (
                  <li>
                    <input
                        type="checkbox"
                        checked={item.complete}
                        onClick={this.onCheck({i})}
                    />
                    <label style={labelStyle}>{item.title}</label>
                    <button className="list-delete" onClick = {this.handleDel({i})} >
                      <i className="fa fa-times fa-lg"></i>
                    </button>
                  </li>
              )
            }.bind(this))
          }
        </ul>
    )
  }
});

function ListFooter() {
  return (
      <footer className="list-footer">
        <label>completed</label>
      </footer>
  );
}
ReactDOM.render (<TodoList />, document.getElementById("todoList"));
// ReactDOM.render (<todoList />, $("#todoList"));