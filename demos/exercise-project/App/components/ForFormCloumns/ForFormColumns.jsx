import React from 'react'

import FormColumn from '../FormColumn/FormColumn.jsx'

const ForFormColumns = props=>(
    <div>
        { props.data.map( item=>{
            return (
                <FormColumn 
                    className={item.className}
                    label={item.label}
                    key={item.label}
                >
                    { item.render() }
                </FormColumn>
            )
        }) }
    </div>
)

ForFormColumns.defaultProps = {
    data:[]
}

export default ForFormColumns