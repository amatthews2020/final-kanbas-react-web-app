import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useParams, useNavigate } from "react-router";
import * as quizClient from "../client";
import { setQuestions } from "../Questions/reducer";
import MultipleChoiceQuestion from "../Questions/MultipleChoice";
import FillInBlankQuestion from "../Questions/FillInBlank";
import { FaPencil } from "react-icons/fa6";


export default function QuizPreview() {
    const { cid, qid } = useParams();
    console.log("Quiz ID", qid);
    const [quiz, setQuiz] = useState<any>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const { questions } = useSelector((state: any) => state.questionsReducer)
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchQuestions = async () => {
        if (qid) {
            const questions = await quizClient.findQuestionsForQuiz(qid)
            dispatch(setQuestions(questions))
        }
    };

    // Render the appropriate question component based on type
    const renderQuestionComponent = (question: any) => {
        if (question.type === "Fill in the Blank") {
            return <FillInBlankQuestion question={question} />;
        } else {
            return <MultipleChoiceQuestion question={question} />;
        } 
    };

    useEffect(() => {
        if (quizzes.length > 0) {
            const quiz = quizzes.find((quiz: any) => quiz._id === qid);
            setQuiz(quiz);

            fetchQuestions()
        }
    }, [quizzes]);

    //Switch to the next question on the quiz
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    //Switch to the previous question on the quiz
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    }
    // Switch to selected question
    const handleQuestionTitleClick = (index: number) => {
        setCurrentQuestionIndex(index);
    };



    return(
        <div className="container">
            <h1>Quizzes Preview</h1>
            {questions.length > 0 && 
                renderQuestionComponent(questions[currentQuestionIndex])}
            <div className="mt-4">
                <button 
                    className="btn btn-secondary mx-3 float-start"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex <= 0} // Disable if it's the first question
                >
                    Previous
                </button>
                <button 
                    className="btn btn-danger mx-3 float-end"
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex >= questions.length - 1} // Disable if it's the last question
                >
                    Next
                </button>
            </div>
            <br />
            <div className="border border-dark m-5 row" >
                <div className="col-12">
                    <button
                        className="btn btn-secondary mx-2 my-3 float-end "
                        onClick={() => console.log("Submit Quiz")}
                    >
                        Submit
                    </button>
                </div>
            </div>
            
            <div className="mt-4">
                <button 
                    className="btn btn-secondary w-100"
                    onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)}
                >
                    <FaPencil className="mx-1"/>
                    Keep Editing This Quiz
                </button>
            </div>
            <br /><br />
            <div>
                <h3>Questions</h3>
                <ul className="list-group mx-5">
                    {questions.map((question: any, index: number) => (
                        <li
                            key={question._id}
                            className={` d-flex justify-content-between align-items-center ${currentQuestionIndex === index ? "text-primary" : "text-danger"}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleQuestionTitleClick(index)}
                        >
                            {question.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );


}