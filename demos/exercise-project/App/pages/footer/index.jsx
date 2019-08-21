import React from 'react'
import './index.scss'
import Select from '../../components/Select/Select.jsx'
import ForFormColumns from '../../components/ForFormCloumns/ForFormColumns.jsx'

class Footer extends React.Component{
    constructor(){
        super()
        this.state={
            item:{
                sex: '请选择',
                id: '请选择'
            },
            sexs:[
                '男',
                '女',
                '请选择'
            ],
            staffTypes:[
                '主任',
                '老师',
                '学生',
                '实习',
                '请选择',
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
    changeItem(event,attr){
        const item = Object.assign({},this.state.item) 
        item[attr] = event.target.value
        this.setState({
            item
        })
    }
    addStaff(){
        const originList = this.props.originList.concat()
        const staffList = this.props.staffList.concat()
        const item = Object.assign({},this.state.item)
        originList.push(item)
        staffList.push(item)
        this.props.update({
            originList,
            staffList
        })
    }
    render(){
        return(
            <div className="app-footer">
                <h3>人员新增</h3>
                <ForFormColumns data={this.state.data}/>
                <div>
                    <button onClick={this.addStaff.bind(this)}>新增</button>
                </div>
            </div>
        )
    }
}

Footer.defaultProps = {
    update:()=>undefined,
    originList:[],
    staffList:[]
}

export default Footer