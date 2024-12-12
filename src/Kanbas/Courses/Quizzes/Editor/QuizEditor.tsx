import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import EditorHeader from "./EditorHeader";
import { Link } from "react-router-dom";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const pathname = useLocation().pathname;
    console.log("Quiz ID", qid);
    const [quiz, setQuiz] = useState<any>({});
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);


    useEffect(() => {
        if (quizzes.length > 0) {
            const quiz = quizzes.find((quiz: any) => quiz._id === qid);
            setQuiz(quiz);
        }
    }, [quizzes]);

    return (
        <div className="container">
            <EditorHeader points={quiz.points} published={quiz.published} />
            <br />
            <hr />
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor/Details`}
                        className={`nav-link ${pathname.includes("Details") ? "active" : ""}`}>Details</Link>
                </li>
                <li className="nav-item">
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor/Questions`}
                        className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}>Questions</Link>
                </li>
            </ul>
        </div>


    );
}