import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;


export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const getQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const createQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.post(QUIZZES_API, quiz);
  return data;
};

//Question
export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials
    .get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};


export const createQuestionForQuiz = async (quizId: string, question: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const updateQuestionForQuiz = async (quizId: string, question: any) => {
  console.log("Question being updated", question);
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/questions/${question._id}`, question);
  return response.data;
}