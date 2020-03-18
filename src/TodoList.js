import React, {Component, Fragment} from 'react';
import TodoItem from './TodoItem';
import Test from './Test';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Input, Button, List } from 'antd';



import 'antd/dist/antd.css';
import './index.css';
import './style.css';


const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

class TodoList extends Component {
  constructor(props) {
    super(props);
    // 当组件的state或者props发生改变的时候,render函数就会重新执行
    this.state = {
      inputValue: '',
      list: ['1','2','3'],
      show: true,
      cssShow: true,
      CSSTransitionShow: true,
      cssList: []
    }



    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleToggleBtn = this.handleToggleBtn.bind(this);
    this.handleCSSTransition = this.handleCSSTransition.bind(this);
    this.handleTransitionGroup = this.handleTransitionGroup.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8080/roleAuth')
      .then((res)=>{
        console.log(res);
        //alert('succ')
      })
      .catch(()=>{
        alert('error')
      })
  }

  handleInputChange(e) {
    //console.log(e.target);//在React里面你可以用e.target获取到事件对应的元素,它对应的Dom节点,那么你也可以用另外一种方式来获取到元素对应的Dom节点,另一种方式获取就是用ref
    console.log(this.inputLabel); 
    const value = e.target.value;
    this.setState(()=>({
        inputValue: value
      }));
  }

  handleBtnClick() {
  
    // //setState可以接收一个参数prevState, prevState指的是修改数据之前的那个数据, prevState 等价于 this.state
    // this.setState((prevState)=> ({
    //   list: [...prevState.list,prevState.inputValue],
    //   inputValue: ''
    // }));
    // //这句话写在setState方法的后面,打印出来的长度永远都少1,这是为什么呢? 答:是因为setState方法是异步的,写执行了这句话后再执行异步的setState,所以要写在放在setState（（）=>（），（）=>{}）第二个回调函数内。
    // console.log(this.ul.querySelectorAll('li').length);
    this.setState((prevState)=>({
      list: [...prevState.list,prevState.inputValue],
      inputValue: ''
    }),()=>
      console.log(this.ulLabel.querySelectorAll('li').length)
    )
  }
  handleItemDelete(index) {
    console.log(index);
    //immutable
    //state里的数据不允许我们做任何的改变,如何要对state里的数据做改变的话 要先把state里的数据拷贝一份,通过扩展运算符进行拷贝一份,在拷贝的这份里进行操作改变,

    this.setState(()=> {
      const list = [...this.state.list];
      list.splice(index,1)
      return {
        list
      }
    });

  }

  getTodoItem() {
    return this.state.list.map((item,index)=>{
      return(
    
        <TodoItem 
          key = {index}
          content = {item} 
          index = {index}
          deleteItem = {this.handleItemDelete}
        />

      )
    })
  }

  handleToggleClick() {
    this.setState({
      show: this.state.show ? false : true
    })
  }

  handleToggleBtn() {
    this.setState({
      cssShow: this.state.cssShow ? false : true
    })
  }

  handleCSSTransition() {
    this.setState({
      CSSTransitionShow: this.state.CSSTransitionShow ? false : true
    })
  }

  handleTransitionGroup() {
    this.setState((prevState)=>(
      {
        cssList: [...prevState.cssList,'item']
      }
    ))
  }

  

  render() {
    console.log('render');
    return(
      <Fragment>
        <div>
          {/*下面是input框 */}
          {
            //下面是input框
          }
          {/* label的作用是:扩大点击区域 */}
          <label htmlFor="insertArea">输入内容</label>
          <input
            id="insertArea"
            className='input'
            value={this.state.inputValue} 
            onChange={this.handleInputChange}
            ref={(input)=>this.inputLabel=input}
          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>
        <ul ref={(ul)=>this.ulLabel=ul}>
         { this.getTodoItem()}
        </ul>
        <Test content={this.state.inputValue}/>

        <br/><br/><br/><br/><br/>

        <div className={this.state.show ? 'show' : 'hide'}>hello world</div>
        <button onClick={this.handleToggleClick}>toggle</button>

        <br/><br/><br/><br/><br/>

        <div className={this.state.cssShow ? 'cssShow':'cssHide'}>您好呀!!!!!!</div>
        <button onClick={this.handleToggleBtn}>切换按钮</button>

        <br/><br/><br/><br/><br/>

        <CSSTransition 
          in={this.state.CSSTransitionShow}
          timeout={1000}
          classNames='my-css'
          unmountOnExit //unmountOnExit的作用是 可以实现当隐藏起来后 Dom同时被移除了.
          onEntered={(el)=>{el.style.color='blue'}} // 这里是通过js完成动画效果,当它的入场动画执行结束之后  CSSTransition动画 这几个字变蓝色.onEntered会接收一个元素 这个元素就是 <div>CSSTransition动画</div>
          // 想要第一次展示出来的时候也有动画效果,那应该怎么做呢?
          appear={true}
        >
          <div>CSSTransition动画</div>
        </CSSTransition>
        <button onClick={this.handleCSSTransition}>CSSTransition动画切换按钮</button>

        <br/><br/><br/><br/><br/>


        <TransitionGroup>
          {
            this.state.cssList.map((item,index)=>{
              return (
                <CSSTransition
                // in={this.state.CSSTransitionShow} //当CSSTransition跟TransitionGroup一起使用时不用写in这个了
                timeout={1000}
                classNames='my-css'
                unmountOnExit //unmountOnExit的作用是 可以实现当隐藏起来后 Dom同时被移除了.
                onEntered={(el)=>{el.style.color='red'}} // 这里是通过js完成动画效果,当它的入场动画执行结束之后  CSSTransition动画 这几个字变蓝色.onEntered会接收一个元素 这个元素就是 <div>CSSTransition动画</div>
                // 想要第一次展示出来的时候也有动画效果,那应该怎么做呢?
                appear={true}
                key={index}
                >
                  <div>{item}</div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
        <button onClick={this.handleTransitionGroup}>TransitionGroup动画</button>

        <br/><br/><br/><br/><br/>

        <div>
          <div >
            <Input placeholder="请输入内容" style={{width:'300px',marginRight:'10px'}}/>
            <Button type="primary">Primary</Button>
          </div>
          
          <List
            style={{marginTop:'10px',width:'300px'}}
            size="small"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </div>

      </Fragment>
    )
  }
}

export default TodoList;
