import { fetchData } from '../utils/api';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { showLoading, hideLoading  } from "react-redux-loading";

export function fetchInitialData(){
    return (dispatch) => {
        dispatch(showLoading());
        return fetchData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(hideLoading());
            })
    }
}
