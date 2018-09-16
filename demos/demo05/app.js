import React from 'react'
import ReactDOM from 'react-dom'

class NodeList extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <ul>
                { React.Children.map(this.props.children,item=><li>{item}</li>) }
            </ul>
        )
    }
}
class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <NodeList>
                <span>Hello</span>
                <span>world</span>
            </NodeList>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))