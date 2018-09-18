import React from 'react'
const StaffTableHeader = props=>(
        <thead>
            <tr>
                { props.titles.map(item=><th key={item}>{item}</th>) }
            </tr>
        </thead>
)

StaffTableHeader.defaultProps={
    titles:[]
}
export default StaffTableHeader