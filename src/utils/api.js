import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
} from './_DATA.js';


export function fetchData() {
    return Promise.all([
        _getQuestions(),
        _getUsers()
    ]).then(([questions,users]) => ({
        questions,
        users
    }));
}

export const saveQuestion = (_saveQuestion)
export const saveAnswer = (_saveQuestionAnswer)

