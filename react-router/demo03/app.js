import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, NavLink as Link } from 'react-router-dom'

const MainPage = ()=><div>主页</div>

const Page1 = ()=><div>页面一</div>

const Page2A = ()=><div>AAAA</div>

const Page2B = ()=><div>BBBB</div>

const Page2 = props=>
<div>
    页面二
    <ul>
        <li><Link activeClassName="sub-active" to={`${props.match.url}/a`}>a</Link></li>
        <li><Link activeClassName="sub-active" to={`${props.match.url}/b`}>b</Link></li>
    </ul>    
    <Switch>
        <Route exact path={`${props.match.url}/a`} component={Page2A}/>
        <Route exact path={`${props.match.url}/b`} component={Page2B}/>
    </Switch>
</div>

const Page = props=><div>{props.content}</div>

class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <HashRouter>
                <div>
                    <div>
                        <ul>
                            <li><Link activeClassName="active" to="/page1">page1</Link></li>
                            <li><Link activeClassName="active" to="/page2">page2</Link></li>
                            <li><Link activeClassName="active" to="/other">other</Link></li>
                        </ul>  
                    </div>
                    <Switch>
                        <Route exact path="/" component={MainPage}></Route>
                        <Route path="/page1" component={Page1}></Route>
                        <Route path="/page2" component={Page2}></Route>
                        <Route render={ ()=><Page content='Not Found.'/> }></Route>
                    </Switch>                    
                </div>
            </HashRouter>       
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))