import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
    constructor(){
        super()
        this.state = {
            opacity: 1
        }
    }
    componentDidMount(){
        let {opacity} = this.state
        this.timer = setInterval(()=>{
            opacity -= .5
            if(opacity<0.1){
                opacity = 1
            }
            this.setState({
                opacity,
            })
        },100)
    }
    render(){
        return (
            <div style={ {opacity:this.state.opacity} }>Hello {this.props.name}</div>
        )
    }
}


ReactDOM.render(<Hello name="World"/>,document.getElementById('root'))