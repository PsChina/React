import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router as HashRouter, Route, Switch } from 'react-router-dom'
import createHashHistory from 'history/createMemoryHistory'
const history = createHashHistory()

class Page1 extends Component{
    constructor(){
        super()
    }
    componentWillMount(){
        console.log('路由将要挂载参数是:',this.props.location.state)
    }
    render(){
        return <div>页面一</div>
    }
}

const Page2 = ()=><div>页面二</div>


class App extends Component{
    constructor(){
        super()
        this.go = this.go.bind(this)
    }
    go(path){
        const state = {param1:'参数1'}
        this.props.history.push(path, state)
    }
    render(){
        return (
            <HashRouter history={history}>
                <div>
                    <div>
                        <input type="button" onClick={()=>this.go('/page1')} value="go Page1"/>
                        <input type="button" onClick={()=>this.go('/page2')} value="go Page2"/>
                    </div>
                    <Switch>
                        <Route path="/page1" component={Page1}></Route>
                        <Route path="/page2" component={Page2}></Route>
                    </Switch>                    
                </div>
            </HashRouter>       
        )
    }
}
ReactDOM.render(<App history={history}/>,document.getElementById('root'))