import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, NavLink as Link } from 'react-router-dom'

import AsyncComponent from './AsymcComponent'

const Page1 = AsyncComponent( ()=>import('./pages/Page1.jsx') ) // 按需加载 page1
const Page2 = AsyncComponent( ()=>import('./pages/Page2.jsx') ) // 按需加载 page2

// import Page1 from './pages/Page1.jsx' 不使用按需加载
// import Page2 from './pages/Page2.jsx' 不使用按需加载

class App extends Component{
    constructor(){
        super()
    }
    render(){
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li><Link activeClassName="active" to="/page1">page1</Link></li>
                        <li><Link activeClassName="active" to="/page2">page2</Link></li>
                    </ul>
                    <Switch>
                        <Route path="/page1" component={Page1}></Route>
                        <Route path="/page2" component={Page2}></Route>
                    </Switch>                    
                </div>
            </HashRouter>       
        )
    }
}
ReactDOM.render(<App/>,document.getElementById('root'))