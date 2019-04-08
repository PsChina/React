import React, { Component } from 'react';
import './App.css';
import Modal from './Modal/Modal.jsx'
class App extends Component {
  constructor(){
    super()
    this.state = {
      title: 'React Modal',
      content: '欢迎使用！',
      visible: false
    }
  }
  openModal(){
    this.setState({
      visible: true
    })
  }
  onOk(){
    this.setState({
      visible:false
    })
  }
  onCancel(){
    this.setState({
      visible:false
    })
  }
  render() {
    return (
      <div className="App">
        <div onClick={this.openModal.bind(this)}>开启弹窗</div>
        <Modal 
        width={'600px'}
        height={'600px'}
        visible={this.state.visible}
        title={this.state.title} 
        content={this.state.content} 
        onOk={this.onOk.bind(this)} 
        opacit={0.66}
        onCancel={this.onCancel.bind(this)}/>
      </div>
    );
  }
}

export default App;
