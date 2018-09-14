import React from 'react'
import ReactDOM from 'react-dom'
import './iconfont/iconfont.css'

class LikeButton extends React.Component {
    constructor(){
        super()
        this.state = { // 初始化state
            like: false
        }
    }
    handleClick(){
        this.setState({
            like:!this.state.like
        })
    }
    render(){
        return (
            <div onClick={this.handleClick.bind(this)}>
              <span style={ { color: this.state.like ? 'red' : 'black' } } className="iconfont icon-zan"></span>
              <span>{ this.state.like ? '取消':'赞' }</span>
            </div>
        )
    }
}

class App  extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <LikeButton/>
            </div>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('root'))