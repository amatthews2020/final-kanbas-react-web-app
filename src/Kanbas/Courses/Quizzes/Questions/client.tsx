import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTION_API = `${REMOTE_SERVER}/api/questions`;


export const deleteQuestion = async (questionId: string) => {
    const response = await axiosWithCredentials.delete(`${QUESTION_API}/${questionId}`);
    return response.data;
};
export const updateQuestion  = async (questionId: string, question: any) => {
    const { data } = await axiosWithCredentials.put(`${QUESTION_API}/${questionId}`, question);
    return data;
};