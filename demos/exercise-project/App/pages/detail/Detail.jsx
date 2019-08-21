import React from 'react'
import './Detail.scss'
import Select from '../../components/Select/Select.jsx'
import ForFormColumns from '../../components/ForFormColumns/ForFormColumns.jsx'

class Detail extends React.Component {
    constructor(){
        super()
        this.state={
            item:{},
            sexs:[
                '男',
                '女'
            ],
            staffTypes:[
                '主任',
                '老师',
                '学生',
                '实习',
            ],
            data: [
                {
                    label : '姓名',
                    className: 'form-column',
                    render:()=>{
                        return (
                            <input type="text" value={this.state.item.name||''} onChange={ event=>this.changeItem(event,'name')}/>
                        )
                    }
                },
                {
                    label : '年龄',
                    className: 'form-column',
                    render:()=>{
                        return (
                            <input type="text" value={this.state.item.age||''} onChange={ event=>this.changeItem(event,'age')}/>
                        )
                    } 
                },
                {
                    label : '性别',
                    className: 'form-column',
                    render:()=>{
                        return (
                            <Select 
                                value={this.state.item.sex}
                                options={this.state.sexs}
                                onChange={event=>this.changeItem(event,'sex')} 
                            />
                        )
                    } 
                },
                {
                    label : '身份',
                    className: 'form-column',
                    render:()=>{
                        return (
                            <Select 
                                value={this.state.item.id}
                                options={this.state.staffTypes}
                                onChange={event=>this.changeItem(event,'id')} 
                            />
                        )
                    } 
                },
                {
                    label : '个人描述',
                    className: 'form-column',
                    render:()=>{
                        return (
                            <input type="text" value={this.state.item.descrip||''} onChange={ event=>this.changeItem(event,'descrip')}/>
                        )
                    } 
                }
            ]
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            item:nextProps.item
        })
    }
    changeItem(event,attr){
        const item = Object.assign({},this.state.item) 
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
                <ForFormColumns data={this.state.data}/>
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