import React from 'react' // 用于支持以react语法编写应用
import ReactDOM from 'react-dom' // 用于将react组件插入浏览器dom树或者转换成任意平台的ui
class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>Hello World!</div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root')) // 每个react项目都需要存在至少一个根元素用来将react组件插入dom树