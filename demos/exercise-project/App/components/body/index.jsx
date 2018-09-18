import React from 'react'
import './index.scss'
import Search from './Search/Search.jsx'
import StaffTable from './StaffTable/StaffTable.jsx'

const Body = props => (
    <div className="app-body">
        <Search />
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
    updata: noop,
    toggleDetail: noop,
    updataStaffList: noop
}

export default Body