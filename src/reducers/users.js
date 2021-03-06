import {
  AT_RECEIVE_USERS,
  AT_ADD_QUESTION_TO_USER,
  AT_ADD_ANSWER_TO_USER,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case AT_RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case AT_ADD_QUESTION_TO_USER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat([
            action.questionId,
          ]),
        },
      };
    case AT_ADD_ANSWER_TO_USER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      };
    default:
      return state;
  }
}
