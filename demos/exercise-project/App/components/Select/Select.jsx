import React from 'react'
import PropTypes from 'prop-types'

const Select = props => (
    <select name={props.name} value={props.value} onChange={props.onChange}>
        { props.options.map(item=><option value={item} key={item}>{item}</option>) }
    </select>
)

function noop(){
    return false
}

Select.defaultProps = {
    options: [],
    value: '',
    name: '',
    onChange: noop
}


export default Select