import { createSlice } from "@reduxjs/toolkit";
import { group } from "console";
const initialState = {
  quizzes: [],
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        // Need to add some fields
        _id: new Date().getTime().toString(),
        title: quiz.title,
        course: quiz.course,
        desc: quiz.desc,
        points: quiz.points,
        due: quiz.due,
        available: quiz.available,
        published: quiz.published,
        type: quiz.type,
        group: quiz.group,
        shuffle: quiz.shuffle,
        time_limit: quiz.time_limit,
        multiple_attempts: quiz.multiple_attempts,
        attempts: quiz.attempts,
        view_reponses: quiz.view_reponses,
        show_correct_answers: quiz.show_correct_answers,
        one_question_at_a_time: quiz.one_question_at_a_time,
        lockdown_browser: quiz.lockdown_browser,
        required_to_view: quiz.required_to_view,
        webcam: quiz.webcam,
        lock_questions_after_answering: quiz.lock_questions_after_answering,
        questions: quiz.questions,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (a: any) => a._id !== quizId);

    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
  },
},
);
export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;