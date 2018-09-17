import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header/index.jsx'
import Body from './components/body/index.jsx'
import Footer from './components/footer/index.jsx'
import Detail from './components/detail/Detail.jsx'
import './app.scss'

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            currentStaff:{},
            showDetail:false,
            titles:[
                '姓名',
                '年龄',
                '身份',
                '性别',
                '操作',
            ],
            staffList:[
            { 
                descrip: '我是一匹来自远方的狼。', 
                sex: '男', 
                age: 20, 
                name: '张三', 
                id: '主任' 
            }, 
            { 
                descrip: '我是一匹来自远方的狼。', 
                sex: '女', 
                age: 21, 
                name: '赵静', 
                id: '学生' 
            }, { 
                descrip: '我是一匹来自远方的狼。', 
                sex: '女', 
                age: 22, 
                name: '王二麻', 
                id: '学生' 
            }, { 
                descrip: '我是一匹来自远方的狼。', 
                sex: '女', 
                age: 24, 
                name: '李晓婷', 
                id: '实习' 
            }, { 
                descrip: '我是一匹来自远方的狼。', 
                sex: '男', 
                age: 23, 
                name: '张春田', 
                id: '实习' 
            }, { 
                descrip: '我是一匹来自远方的狼。', 
                sex: '男', 
                age: 22, 
                name: '刘建国', 
                id: '学生' 
            }, { 
                descrip: '我是一匹来自远方的狼。', 
                sex: '男', 
                age: 24, 
                name: '张八', 
                id: '主任' 
            }, { 
                descrip: '我是一匹来自远方的狗。', 
                sex: '男', 
                age: 35, 
                name: '李四', 
                id: '老师' 
            }, { 
                descrip: '我是一匹来自远方的猪。', 
                sex: '男', 
                age: 42, 
                name: '王五', 
                id: '学生' 
            }, { 
                descrip: '我是一匹来自远方的牛。', 
                sex: '男', 
                age: 50, 
                name: '赵六', 
                id: '实习' 
            }, { 
                descrip: '我是一匹来自远方的马。', 
                sex: '男', 
                age: 60, 
                name: '孙七', 
                id: '实习' 
            }]
        }
    }
    updataStaffList(newStaffList){
        this.setState({
            staffList:newStaffList
        })
    }
    toggleDetail(){
        this.setState({
            showDetail:!this.state.showDetail
        })
    }
    updataCurrentStaff(currentStaff){
        this.setState({
            currentStaff
        })
    }
    save(_item,name){
        const newStaffList = this.state.staffList.map(item=>item.name===name?_item:item)
        this.setState({
            staffList:newStaffList
        })
    }
    render(){
        const updata = this.updataStaffList.bind(this)
        const toggleDetail = this.toggleDetail.bind(this)
        return (
            <div>
                <Header />
                <Body 
                    titles={this.state.titles} 
                    staffList={this.state.staffList} 
                    updata={updata}
                    toggleDetail={toggleDetail}
                    updataCurrentStaff={this.updataCurrentStaff.bind(this)}
                />
                <Footer updata={updata}/>
                <Detail 
                    show={this.state.showDetail}
                    item={this.state.currentStaff}
                    toggleDetail={toggleDetail}
                    save={this.save.bind(this)}
                />
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))