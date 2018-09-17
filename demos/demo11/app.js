import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class AjaxDemo extends React.Component {
    constructor(){
        super()
        this.state = { //默认state
            ssh_url: '',
            author: 'PsChina',
            repositorie: 'React'
        }
    }
    setAuthor(event){
        this.setState({
            author:event.target.value
        })
    }
    setRepositorieName(event){
        this.setState({
            repositorie:event.target.value
        })
    }
    getAddressData() {
        axios({
            url: `${this.props.url}/${this.state.author}/${this.state.repositorie}`,
            method: 'GET'
        }).then(res=>{
            const {ssh_url} = res.data
            this.setState({
                ssh_url
            })
        })
    }
    componentDidMount() {
        this.getAddressData()
    }
    render(){
        return (
            <div>
                <div>输入作者和仓库名查询仓库ssh地址:</div>
                <input type="text" placeholder="作者" value={this.state.author} onChange={this.setAuthor.bind(this)}/>
                <input type="text" placeholder="仓库名" value={this.state.repositorie} onChange={this.setRepositorieName.bind(this)}/>
                <button onClick={this.getAddressData.bind(this)}>查询</button>
                <div>结果:{this.state.ssh_url}</div>
            </div>
        )
    }
}

ReactDOM.render(<AjaxDemo url="https://api.github.com/repos" />, document.getElementById('root'))