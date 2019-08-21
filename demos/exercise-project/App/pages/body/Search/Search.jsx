import React from 'react'
import './Search.scss'
import Select from '../../../components/Select/Select.jsx'
import FormColumn from '../../../components/FormColumn/FormColumn.jsx'

class Search extends React.Component{
    constructor(){
        super()
        this.state = {
            placeholder: 'Search...',
            searchVal: '',
            currentType: '',
            currentSortWay: '',
            staffTypes:[
                '全部',
                '主任',
                '老师',
                '学生',
                '实习',
            ],
            sortsOrders:[
                '身份',
                '年龄升',
                '年龄降',
            ]
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            placeholder: nextProps.placeholder,
            searchVal: nextProps.searchVal,
            currentType: nextProps.currentType,
            currentSortWay: nextProps.currentSortWay
        })
    }
    render(){
        return(
            <div className="search-bar">
                <input type="text" value={this.state.searchVal} placeholder={this.state.placeholder} onChange={this.props.onSearch}/>
                <FormColumn label="人员筛选：">
                    <Select 
                        options={this.state.staffTypes} 
                        value={this.state.currentType} 
                        onChange={this.props.changeSortType}
                    /> 
                </FormColumn>
                <FormColumn label="排列方式：">
                    <Select 
                        options={this.state.sortsOrders} 
                        value={this.state.currentSortWay} 
                        onChange={this.props.changeSortWay}
                    />
                </FormColumn>
            </div>
        )
    }
}

function noop(){
    return false
}

Search.defaultProps={
    placeholder: 'Search...',
    searchVal: '',
    currentType: '全部',
    currentSortWay: '身份',
    changeSortType: noop,
    changeSortWay: noop,
    onSearch: noop,
}

export default Search