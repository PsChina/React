import React from 'react'
import ReactDOM from 'react-dom'
import './app.css'
class App extends React.Component{
    constructor(){
        super()
    }
    click(){
        console.log('on click')
    }
    render(){
        return (
            <div>
                <input onFocus={()=>{console.log('on focus.')}} className="green" />
                <div onClick={this.click} style={ {color: 'orange'} }>Hello World!</div>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))