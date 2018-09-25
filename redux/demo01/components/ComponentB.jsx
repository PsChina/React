import React from 'react'
import { connect } from 'react-redux'

const ComponentB = props=> <div style={{botder:'solid orange 1px'}}>
    <div>Double the number {props.number*2}</div>
    <button onClick={()=>{ props.changeNumber(props.number-1) }}>minus one</button>
</div>

ComponentB.defaultProps = {
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
)(ComponentB)