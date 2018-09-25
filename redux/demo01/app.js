import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import ComponentA from './components/ComponentA.jsx'
import ComponentB from './components/ComponentB.jsx'

class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <Provider store={store}>
                <div>
                    <ComponentA/>
                    <ComponentB/>
                </div>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))