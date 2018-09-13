import React from 'react'
import ReactDOM from 'react-dom'
import './app.scss'
class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div className={'green'}>Hello World!</div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))