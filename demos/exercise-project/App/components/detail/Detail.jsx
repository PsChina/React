import React from 'react'
import './Detail.scss'

class Detail extends React.Component {
    constructor(){
        super()
        this.state={
            item:{}
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            item:nextProps.item
        })
    }
    changeItem(event,attr){
        const {item} = this.state
        item[attr] = event.target.value
        this.setState({
            item
        })
    }
    save(){
        this.props.save(this.state.item,this.props.item.name)
        this.props.toggleDetail()
    }
    cancel(){
        this.props.toggleDetail()
    }
    render(){
        return(
            <div className="detail" style={{display:this.props.show?'flex':'none'}}>
                <h3>点击'完成'保存修改,点击'关闭'放弃未保存修改并退出.</h3>
                <div>姓名 <input type="text" value={this.state.item.name||''} onChange={(event)=>{this.changeItem(event,'name')}}/></div>
                <div>年龄 <input type="text" value={this.state.item.age||''} onChange={(event)=>{this.changeItem(event,'age')}}/></div>
                <div>性别 <select value={this.state.item.sex} onChange={(event)=>{this.changeItem(event,'sex')}}>
                            <option value="男">男</option>
                            <option value="女">女</option>
                          </select>
                </div>
                <div>身份 <select value={this.state.item.id} onChange={(event)=>{this.changeItem(event,'id')}}>
                            <option value="主任">主任</option>
                            <option value="实习">实习</option>
                            <option value="老师">老师</option>
                            <option value="学生">学生</option>
                            <option>无</option>
                          </select>
                </div>
                <div>个人描述 <input type="text" value={this.state.item.descrip||''} onChange={(event)=>{this.changeItem(event,'descrip')}}/></div>
                <div className="detail-footer">
                    <div className="footer-item" onClick={this.save.bind(this)}>完成</div>
                    <div className="footer-item" onClick={this.cancel.bind(this)}>关闭</div>
                </div>
            </div>
        )        
    }
}
function noop(){
    return false
}
Detail.defaultProps={
    show: false,
    item: {id:''},
    save: noop,
    toggleDetail: noop
}
export default Detail