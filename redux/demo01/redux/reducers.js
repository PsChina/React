export default (state, action)=>{
    switch(action.type){
        case 'CHANGE_NUMBER':
            return {
                ...state,
                ...action.payload
            }
        default:
        return {
            ...state
        }
    }
}