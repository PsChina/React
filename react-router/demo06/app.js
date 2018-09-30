import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, NavLink as Link } from 'react-router-dom'

import AsyncComponent from './AsymcComponent'

const Page1 = AsyncComponent( ()=>import('./pages/Page1.jsx') )
const Page2 = AsyncComponent( ()=>import('./pages/Page2.jsx') )

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