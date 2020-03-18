import React, {Component} from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    console.log('test render');
    // 当父组件的render函数被运行时,它的子组件的render都将被重新运行.
    return(
      <div>{this.props.content}</div>
    )
  }
}

export default Test;
