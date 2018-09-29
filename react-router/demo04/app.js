import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, NavLink as Link } from 'react-router-dom'

class Page1 extends Component{
    constructor(){
        super()
    }
    componentWillMount(){
        console.log('路由将要挂载参数是:',this.props.location)
    }
    render(){
        return <div>页面一</div>
    }
}

const Page2 = ()=><div>页面二</div>


class App extends Component{
    constructor(){
        super()
    }
    render(){
        return (
            <HashRouter>
                <div>
                    <div>
                        <ul>
                            <li><Link activeClassName="active" to={{pathname:'/page1',search:'?keyword=name',hash:'#react-lesson',state:{like:true}}}>page1</Link></li>
                            <li><Link activeClassName="active" to="/page2">page2</Link></li>
                        </ul>  
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

ReactDOM.render(<App/>,document.getElementById('root'))