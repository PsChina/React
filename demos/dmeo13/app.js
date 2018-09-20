import React from 'react'
import ReactDOM from 'react-dom'

const Title = props => <h1>{props.text}</h1>

const Body = props => <div>{ React.Children.map(props.children,item=>item)}</div>

class App extends React.Component{
    constructor(){
        super()
        this.state={
            title:"纯函数组件",
            defaultText:'随便写点什么吧'
        }
    }
    render(){
        return (
            <div>
                <Title text={this.state.title}/>
                <Body>
                    <div>{this.state.defaultText}</div>
                </Body>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))