import React from 'react'

import FormColumn from '../FormColumn/FormColumn.jsx'

const ForFormColums = props=>(
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

ForFormColums.defaultProps = {
    data:[]
}

export default ForFormColums