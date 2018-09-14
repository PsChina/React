import React from 'react'
import ReactDOM from 'react-dom'

class MyComponent  extends React.Component{
    constructor(){
        super()
    }
    handerClick(){
        this.refs.myInput.focus()
    }
    render(){
        return (
            <div>
                <div>
                    <input ref="myInput" type="text"/>
                </div> 
                <button onClick={this.handerClick.bind(this)}>Click here to focus the input</button>
            </div>
        )
    }
}

ReactDOM.render(<MyComponent />,document.getElementById('root'))