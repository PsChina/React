
import React from 'react'
import PropTypes from 'prop-types'
import './FormColumn.scss'
const FormColumn = props => (
    <div className={props.className}>
       <label><span className={props.labelClass}>{props.label}</span> { React.Children.map(props.children,item=>item) } </label> 
    </div>
)

FormColumn.defaultProps = {
    className: '',
    labelClass: '',
}

FormColumn.propTypes = {
    label: PropTypes.string.isRequired
}

export default FormColumn