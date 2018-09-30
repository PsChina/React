import React, { Component } from 'react'

export default importCompoent=>{

    class AsyncComponent extends Component{
        constructor(){
            super()
            this.state = {
                component: null
            }
        }
        componentDidMount(){
            importCompoent().then(({default:component})=>{
                this.setState({
                    component
                })
            })
        }
        render(){
            const C = this.state.component
            return C ? <C {...this.props}/> : null
        }
    }

    return AsyncComponent
}

/**
 * 如果支持 async 和 awite 语法 可以将组建改造成如下写法
    import React, { Component } from 'react'

    export default importCompoent=>{

        class AsyncComponent extends Component{
            constructor(){
                super()
                this.state = {
                    component: null
                }
            }
            async componentDidMount(){

                const {default:component} = awite importCompoent()
                
                this.setState({
                    component
                })
                
            }
            render(){
                const C = this.state.component
                return C ? <C {...this.props}/> : null
            }
        }

        return AsyncComponent
    }
 * 
*/