import React from 'react'
import ReactDOM from 'react-dom'

class Input extends React.Component {
    constructor(){
        super()
    }
    handerChange(event){ // onchange 事件会触发 handerChange 回调。
        this.props.updateMessage(event.target.value) // 回调函数内部调用父组件传递过来的函数更新 message 。
    }
    render(){
        return (
            <input value={this.props.message} onChange={this.handerChange.bind(this)}/>
        )
    }
}

class View extends React.Component {
    constructor(){
        super()
    }
    render(){
        return (
            <div>Input value:{this.props.message}</div>
        )
    }
}

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            message: 'Hello' // 共享状态 message
        }
    }
    changeMessage(message){ // 定义修改 message 的方法
        this.setState({
            message
        })
    }
    render(){
        // 将 message 分别传递给 input 和 view 两个子组件，将修改 message 的函数传递给 input 。 
        return (
            <div>
                <Input message={this.state.message} updateMessage={this.changeMessage.bind(this)}/> 
                <View message={this.state.message}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))