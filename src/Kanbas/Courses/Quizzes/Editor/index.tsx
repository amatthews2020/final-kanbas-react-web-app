import { Navigate, Route, Routes, } from "react-router";
import QuizEditor from "./QuizEditor";
import Questions from "./QuizQuestionsEditor";


export default function EditorIndex() {
    return (
        <div>
            <div>
                <QuizEditor />
            </div>
            <Routes>
                <Route path="/" element={<Navigate to="Details" />} />
                <Route path="/Edit" element={<QuizEditor />} />
                <Route path="/Questions" element={<Questions />} />
            </Routes>
        </div>

    )
}