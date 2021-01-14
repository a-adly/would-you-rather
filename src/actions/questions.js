import { saveQuestion } from "../utils/api";
import { addQuestionToUser } from "./users";

export const AT_RECEIVE_QUESTIONS = "AT_RECEIVE_QUESTIONS";
export const AT_ADD_QUESTION = "AT_ADD_QUESTION";

function addQuestion(question) {
  return {
    type: AT_ADD_QUESTION,
    question,
  };
}

export function asyncAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(addQuestionToUser(authedUser, question.id));
    });
  };
}

export function receiveQuestions(questions) {
  return {
    type: AT_RECEIVE_QUESTIONS,
    questions,
  };
}
