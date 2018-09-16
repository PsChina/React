import React from 'react'
import ReactDOM from 'react-dom'

class HelloMessage extends React.Component {
    static defaultProps = {
        name: 'world'
    }
    constructor(){
        super()
    }
    render(){
        return (
            <div>Hello {this.props.name}!</div>
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
                <HelloMessage />
                <HelloMessage name="Pan shan shan"/>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))