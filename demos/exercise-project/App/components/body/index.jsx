import React from 'react'
import './index.scss'
import Search from './Search/Search.jsx'
import StaffTable from './StaffTable/StaffTable.jsx'

const Body = props => (
    <div className="app-body">
        <Search 
            searchVal={props.searchVal}
            currentType={props.currentType}
            currentSortWay={props.currentSortWay}
            changeSortType={props.changeSortType}
            changeSortWay={props.changeSortWay}
            onSearch={props.onSearch}
        />
        <StaffTable 
            titles={props.titles} 
            staffList={props.staffList} 
            updata={props.updata}
            toggleDetail={props.toggleDetail}
            updataCurrentStaff={props.updataCurrentStaff}
        />
    </div>
)

function noop (){
    return false
}

Body.defaultProps = {
    titles: [],
    staffList: [],
    placeholder: 'Search...',
    searchVal: '',
    currentType: '全部',
    currentSortWay: '身份',
    updata: noop,
    toggleDetail: noop,
    updataStaffList: noop,
    changeSortType: noop,
    changeSortWay: noop,
    onSearch: noop,
}

export default Body