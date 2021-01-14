export const AT_RECEIVE_USERS = "AT_RECEIVE_USERS";
export const AT_ADD_QUESTION_TO_USER = "AT_ADD_QUESTION_TO_USER";
export const AT_ADD_ANSWER_TO_USER = "AT_ADD_ANSWER_TO_USER";

export function addAnswerToUser({authedUser, qid, answer}){
    return {
        type: AT_ADD_ANSWER_TO_USER,
        authedUser,
        qid,
        answer
    }
}

export function addQuestionToUser(authedUser, questionId){
    return {
        type: AT_ADD_QUESTION_TO_USER,
        authedUser,
        questionId
    }
}

export function receiveUsers(users) {
    return {
        type: AT_RECEIVE_USERS,
        users
    }
}