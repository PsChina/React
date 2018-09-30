import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Link , Redirect} from 'react-router-dom'

const MainPage = ()=><div>主页</div>

const Page1 = ()=><div>页面一</div>

const Page2 = ()=><div>页面二</div>

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
                            <li><Link to="/page1">page1</Link></li>
                            <li><Link to="/page2">page2</Link></li>
                            <li><Link to="/other">other</Link></li>
                        </ul>  
                    </div>
                    <Switch>
                        {/* <Redirect exact from="/other" to="/"/> */}
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