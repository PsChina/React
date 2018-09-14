import React from 'react'
import ReactDOM from 'react-dom'

class ChildComponent extends React.Component{
    constructor() {
        super()
    }
    render(){
        return (
            <div>{this.props.text}</div>
        )
    }
}


class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <ChildComponent />
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))