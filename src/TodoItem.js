import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps,nextState) {
    if(nextProps.content !== this.props.content) {
      return true;
    } else {
      return false;
    }
  }

  handleClick() {
    //console.log(this.props.index);
    const { deleteItem, index } = this.props;
    deleteItem(index);
  }

  render() {
    const {content, test} = this.props;
    return(
    <li onClick={this.handleClick}>{test}-{content}</li>
    )
  }

 
}

  // 对父组件传来的数据进行校验
  TodoItem.propTypes = {
    test: PropTypes.string.isRequired,
    // content: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.number,PropTypes.string]), //意思是:content的值可以是数字类型也可以是字符串类型
    deleteItem: PropTypes.func,
    index: PropTypes.number
  };

  // 当父组件没有传 test数据过来时,但子组件的test的值又是必填的,那么在子组件里可以给test给个默认的值,如下这样写
  TodoItem.defaultProps = {
    test: 'hello world'
  };


export default TodoItem;
