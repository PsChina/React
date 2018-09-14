import React from 'react'
import ReactDOM from 'react-dom'

class MyTitile extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <h1>{this.props.title}</h1>
        )
    }
}
class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <MyTitile title="标题"/>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))