import { saveAnswer } from "../utils/api";
import { addAnswerToUser } from "./users";
import { showLoading, hideLoading } from "react-redux-loading";

export const AT_ADD_ANSWER = "AT_ADD_ANSWER";

function addAnswer(answer) {
  return {
    type: AT_ADD_ANSWER,
    answer,
  };
}

export function asyncAddAnswer(qid, answer) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    const info = {
      authedUser,
      qid,
      answer,
    };
    return saveAnswer(info).then(() => {
      dispatch(addAnswer(info));
      dispatch(addAnswerToUser(info));
      dispatch(hideLoading());
    }); // async on API
  };
}
