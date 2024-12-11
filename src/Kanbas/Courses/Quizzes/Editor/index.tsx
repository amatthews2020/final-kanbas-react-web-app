import { Navigate, Route, Routes } from "react-router";
import QuizEditor from "./QuizEditor";
import Questions from "./QuizQuestionsEditor";
import Details from "./Details";


export default function EditorIndex() {
    return (
        <div>
            <div>
                <QuizEditor />
            </div>
            <Routes>
                <Route path="/" element={<Navigate to="Details" />} />
                <Route path="/Details" element={<Details />} />
                <Route path="/Questions" element={<Questions />} />
            </Routes>
        </div>

    )
}