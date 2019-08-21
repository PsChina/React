import React from 'react'
import StaffTableHeader from './StaffTableHeader/StaffTableHeader.jsx'
import StaffList from './StaffList/StaffList.jsx'

const StaffTable = props=>(
    <table>
        <StaffTableHeader titles={props.titles}/>
        <StaffList 
            staffList={props.staffList}
            originList={props.originList}
            update={props.update}
            toggleDetail={props.toggleDetail}
            updateCurrentStaff={props.updateCurrentStaff}
        />
    </table>
)

function noop (){
    return false
}

StaffTable.defaultProps = {
    titles:[],
    originList:[],
    staffList:[],
    update: noop,
    toggleDetail: noop,
    updateCurrentStaff: noop
}

export default StaffTable