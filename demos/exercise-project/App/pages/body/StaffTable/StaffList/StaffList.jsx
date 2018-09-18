import React from 'react'
const StaffList = (staffListProps)=>{
    const {originList} = staffListProps
    const Staff = (props)=>{
        function deleteStaff(_item){
            const newOriginList = originList.filter(item=>item!==_item)
            staffListProps.updata({originList:newOriginList})
        }
        function openDetail(_item){
            staffListProps.updataCurrentStaff(_item)
            staffListProps.toggleDetail()
        }
        return (
            <tr>
                <td>{props.item.name}</td>
                <td>{props.item.age}</td>
                <td>{props.item.id}</td>
                <td>{props.item.sex}</td>
                <td style={ {color:'rgb(30, 144, 255)'} }> <span onClick={ ()=>{ deleteStaff(props.item) } }>删除</span> <span onClick={()=>{openDetail(props.item)}}>详情</span> </td>
            </tr>
        )
    }
    Staff.defaultProps = {
        item:{},
    }
    return (
        <tbody>
            { staffListProps.staffList.map(item=><Staff key={item.name} item={item}/>) }
        </tbody>
    )
}
function noop (){
    return false
}
StaffList.defaultProps={
    staffList:[],
    originList:[],
    updata: noop,
    toggleDetail: noop,
    updataCurrentStaff: noop
}

export default StaffList