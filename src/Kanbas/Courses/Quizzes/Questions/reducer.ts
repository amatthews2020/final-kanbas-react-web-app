import { createSlice } from "@reduxjs/toolkit";
import { group } from "console";
const initialState = {
  questions: [],
};
const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, { payload: question }) => {
      const newQuestion: any = {
        _id: new Date().getTime().toString(),
        title: question.title,
        quiz: question.quiz,
        type: question.type,
        points: question.points,
        question: question.question,
        choices: question.choices,
        answer: question.answer,

      };
      state.questions = [...state.questions, newQuestion] as any;
    },
    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (a: any) => a._id !== questionId);

    },
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === question._id ? question : q
      ) as any;
    },
  },
},
);
export const { addQuestion, deleteQuestion, updateQuestion, setQuestions } =
  questionsSlice.actions;
export default questionsSlice.reducer;