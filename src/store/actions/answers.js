import { saveQuestionAnswer } from "../../utils/api";
import { addAnswerToUser } from "./users";
import { showLoading, hideLoading } from "react-redux-loading";

export const ADD_ANSWER = "ADD_ANSWER";

function addAnswer(answer) {
  return {
    type: ADD_ANSWER,
    answer,
  };
}

export function handleAddAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    const info = {
      authedUser,
      qid,
      answer,
    };
    return saveQuestionAnswer(info).then(() => {
      dispatch(addAnswer(info));
      dispatch(addAnswerToUser(info));
      dispatch(hideLoading());
    });
  };
}
