import { AT_SET_AUTHED_USER } from '../actions/authedUser';

export default function authedUser (state = null, action) {
    switch(action.type){
        case AT_SET_AUTHED_USER : 
            return action.id
        default :
            return state;
    }
}