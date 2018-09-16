import React from 'react'
import ReactDOM from 'react-dom'

class Header extends React.Component{
    constructor() {
        super()
    }
    render(){
        return (
            <h1>Header</h1>
        )
    }
}

class Body extends React.Component{
    constructor() {
        super()
    }
    render(){
        return (
            <div>React学习笔记</div>
        )
    }
}

class Footer extends React.Component{
    constructor() {
        super()
    }
    render(){
        return (
            <div>Footer</div>
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
                <Header />
                <Body />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))