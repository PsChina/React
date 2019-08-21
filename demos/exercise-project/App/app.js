import React from 'react'
import ReactDOM from 'react-dom'
import Header from './pages/header/index.jsx'
import Body from './pages/body/index.jsx'
import Footer from './pages/footer/index.jsx'
import Detail from './pages/detail/Detail.jsx'
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
            currentType: '全部',
            currentSortWay: '身份',
            placeholder:'Search...',
            searchVal: '',
            attrMap:{
                '身份':'id',
                '年龄升':'+age',
                '年龄降':'-age',
            },
            originList:[
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
                }
            ],
            staffList:[]
        }
    }
    componentDidMount(){
        this.setState({
            staffList: JSON.parse(JSON.stringify(this.state.originList))
        })
    }
    update(newState){
        this.setState({
            ...newState
        })
    }
    toggleDetail(){
        this.setState({
            showDetail:!this.state.showDetail
        })
    }
    updateCurrentStaff(currentStaff){
        this.setState({
            currentStaff
        })
    }
    save(_item,name){
        const staffList = this.state.staffList.map(item=>item.name===name?_item:item)
        const originList = this.state.originList.map(item=>item.name===name?_item:item)
        this.setState({
            staffList,
            originList,
        })
    }
    changeSortType(event){
        const currentType = event.target.value
        let staffList = this.state.originList.filter(item=>item.id===currentType)
        if(currentType==='全部'){
            staffList = JSON.parse(JSON.stringify(this.state.originList))
        }
        this.setState({
            currentType,
            staffList,
        })
    }
    sortByAttr(objArr, attr, reverse){
        let newArr = JSON.parse(JSON.stringify(objArr))
        const {length} = newArr
        let temp
        for(let i = 0; i<length; i++) { 
            for(let j = i; j<length-1; j++){
                if(newArr[j][attr]>newArr[j+1][attr]){
                    temp = newArr[j+1]
                    newArr[j+1] = newArr[j]
                    newArr[j] = temp
                }
            }
        }
        if(reverse){
            newArr = newArr.reverse()
        }
        return newArr
    }
    changeSortWay(event){
        const currentSortWay = event.target.value
        let orderBy = this.state.attrMap[currentSortWay]
        let reverse = false
        if(orderBy.indexOf('age')!==-1){
            reverse = orderBy.charAt(0) === '-' ? true : false
            orderBy = orderBy.substring(1)
        }
        const staffList = this.sortByAttr(this.state.staffList, orderBy, reverse)
        this.setState({
            currentSortWay,
            staffList
        })
    }
    onSearch(event){
        const searchVal = event.target.value
        const staffList = this.state.originList.filter(item=>JSON.stringify(item).indexOf(searchVal)!==-1)
        this.setState({
            searchVal,
            staffList
        })
    }
    render(){
        const update = this.update.bind(this)
        const toggleDetail = this.toggleDetail.bind(this)
        return (
            <div>
                <Header />
                <Body 
                    titles={this.state.titles} 
                    originList={this.state.originList}
                    staffList={this.state.staffList} 
                    update={update}
                    toggleDetail={toggleDetail}
                    updateCurrentStaff={this.updateCurrentStaff.bind(this)}
                    placeholder={this.state.placeholder}
                    searchVal={this.state.searchVal}
                    currentType={this.state.currentType}
                    currentSortWay={this.state.currentSortWay}
                    changeSortType={this.changeSortType.bind(this)}
                    changeSortWay={this.changeSortWay.bind(this)}
                    onSearch={this.onSearch.bind(this)}
                />
                <Footer 
                    originList={this.state.originList} 
                    staffList={this.state.staffList}  
                    update={update}
                />
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