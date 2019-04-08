import React from 'react'
import './Modal.css'

const Modal = props => props.visible ? (<div className="modal-box">
<div className="modal-content">
    <div className={props.titleClass}>{props.title}</div>
    <div className={props.contentClass}>{props.content}</div>
    <div className={props.footerClass}>
        <div onClick={props.onOk} className={props.okClass}>{props.conFirmText}</div>
        <div onClick={props.onCancel} className={props.cancelClass}>{props.cancelText}</div>
    </div>
</div>
</div>) : null

const noop = _=> undefined

Modal.defaultProps = {
    onOk: noop,
    onCancel: noop,
    conFirmText: '确定',
    cancelText: '取消',
    titleClass: 'modal-title',
    contentClass: 'modal-text',
    footerClass: 'modal-footer',
    okClass: 'modal-confirm',
    cancelClass: 'modal-cancel'
}

export default Modal

/** usage example
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
            visible={this.state.visible}
            title={this.state.title} 
            content={this.state.content} 
            onOk={this.onOk.bind(this)} 
            onCancel={this.onCancel.bind(this)}/>
        </div>
        );
    }
    }

    export default App;
 * 
*/