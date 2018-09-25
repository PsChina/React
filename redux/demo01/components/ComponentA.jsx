import React from 'react'
import { connect } from 'react-redux'

const ComponentA = props=> <div style={{botder:'solid red 1px'}}>
    <div>{props.number}</div>
    <button onClick={()=>{ props.changeNumber(props.number+1) }}>add</button>
</div>

ComponentA.defaultProps = {
    number:0,
    changeNumber:()=>false
}

function mapStateToProps(state){
    const {number} = state
    return {
        number,
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeNumber(number){
            dispatch({
                type:'CHANGE_NUMBER',
                payload:{
                    number,
                }
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentA)