import { AT_RECEIVE_QUESTIONS, AT_ADD_QUESTION } from "../actions/questions";
import { AT_ADD_ANSWER } from "../actions/answers";

export default function questions(state = {}, action) {
  switch (action.type) {
    case AT_RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case AT_ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      };
    case AT_ADD_ANSWER:
      const { answer } = action;
      console.log(answer);
      return {
        ...state,
        [answer.qid]: {
          ...state[answer.qid],
          [answer.answer]: {
            ...state[answer.qid][answer.answer],
            votes: state[answer.qid][answer.answer].votes.concat([
              answer.authedUser,
            ]),
          },
        },
      };
    default:
      return state;
  }
}
