import React from 'react'
import ReactDOM from 'react-dom'

class Input  extends React.Component{
    constructor(){
        super()
        this.state = {
            value: 'hello'
        }
    }
    handerChange(event){
        this.setState({
            value: event.target.value
        })
    }
    render(){
        const { value } = this.state
        return (
            <div>
                <input type="text" value={ value } onChange={this.handerChange.bind(this)} />
                <div>{value}</div>
            </div>
        )
    }
}

ReactDOM.render(<Input />,document.getElementById('root'))