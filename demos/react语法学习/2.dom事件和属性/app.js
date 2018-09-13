import React from 'react'
import ReactDOM from 'react-dom'
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
                <input onFocus={()=>{console.log('on focus.')}} />
                <div onClick={this.click}>Hello World!</div>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))