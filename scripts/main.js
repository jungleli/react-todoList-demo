function HelloMessage(props) {
  return <h1>Hello {props.name}</h1>;
}
ReactDOM.render(<HelloMessage name="Body" />, document.getElementById('content'));