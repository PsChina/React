import React from 'react'
import StaffTableHeader from './StaffTableHeader/StaffTableHeader.jsx'
import StaffList from './StaffList/StaffList.jsx'

const StaffTable = props=>{
    const { updata,toggleDetail,updataCurrentStaff } = props
    return (
        <table>
            <StaffTableHeader titles={props.titles}/>
            <StaffList 
                staffList={props.staffList}
                updata={updata}
                toggleDetail={toggleDetail}
                updataCurrentStaff={updataCurrentStaff}
            />
        </table>
    )
}

function noop (){
    return false
}

StaffTable.defaultProps = {
    titles:[],
    staffList:[],
    updata: noop,
    toggleDetail: noop,
    updataCurrentStaff: noop
}

export default StaffTable