export const formatQuestion = (question, author) => {
  const { id, timestamp, optionOne, optionTwo } = question;
  const { name, avatarURL } = author;
  return {
    id,
    timestamp,
    authorName: name,
    avatar: avatarURL,
    optionOne,
    optionTwo,
  };
};
export const getUserScore = (user) =>
  user.questions.length + Object.keys(user.answers).length;
