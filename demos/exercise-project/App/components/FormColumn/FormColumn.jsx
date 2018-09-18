
import React from 'react'
import PropTypes from 'prop-types'
import './FormColumn.scss'
const FormColumn = props => (
    <div className={props.className}>
       <label htmlFor={props.label}><span className={props.lableClass}>{props.label}</span> { React.Children.map(props.children,item=>item) } </label> 
    </div>
)

FormColumn.defaultProps = {
    className: '',
    labeClass: '',
}

FormColumn.propTypes = {
    label: PropTypes.string.isRequired
}

export default FormColumn