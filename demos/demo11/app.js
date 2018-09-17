import React from 'react'
import ReactDOM from 'react-dom'

class AjaxDemo extends React.Component {
    constructor(){
        super()
        this.state = {
            fruits: []
        }
    }
    componentDidMount(){

    }
    render(){
        return (
            <div>
                <div>水果清单</div>
                <ul>
                    { this.fruits.map(item=><li>{item}</li>) }
                </ul>
            </div>
        )
    }
}


ReactDOM.render(<AjaxDemo url="" />, document.getElementById('root'))