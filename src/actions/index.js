import { fetchData } from '../utils/api';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';

export function fetchInitialData(){
    return (dispatch) => {
        return fetchData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
            })
    }
}
