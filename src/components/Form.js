import React, {Component} from 'react';

class Form extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="Form">
        <input type="text" placeholder="Title" onChange={this.props.onTitleChange}></input>
        <input type="text" placeholder="Description" onChange={this.props.onDescChange}></input>
        <button type="submit" onClick={this.props.onSubmit}>Submit</button>
      </form>
    );
  }
  
}

export default Form;
