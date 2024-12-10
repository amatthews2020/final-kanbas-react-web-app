import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";

export default function Details() {
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
            <div className="row mx-3 mt-3">
                <input type="text" className="form-control" placeholder="Quiz Title" value={quiz.title}
                    onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} style={{ width: '100%' }} />
            </div>
            <div className="row mx-3 mt-3">
                <p>Quiz Instructions:</p>
                <input type="text" className="form-control" placeholder="Quiz Description" value={quiz.desc}
                    onChange={(e) => setQuiz({ ...quiz, desc: e.target.value })} style={{ width: '100%' }} />
            </div>
            <div className="row mx-3 mt-3">
                <div className="col-4 text-end mt-2">
                    <p >Quiz Type:</p>
                </div>
                <div className="col-4">
                    <select className="form-control" value={quiz.type}
                        onChange={(e) => setQuiz({ ...quiz, type: e.target.value })}>
                        <option value="graded-quiz">Graded Quiz</option>
                        <option value="practice-quiz">Practice Quiz</option>
                        <option value="graded-survey">Graded Survey</option>
                        <option value="ungraded-survey">Ungraded Survey</option>
                    </select>
                </div>
            </div>
            <div className="row mx-3 mt-3">
                <div className="col-4 text-end mt-2">
                    <p>Assignment Group:</p>
                </div>
                <div className="col-4">
                    <select className="form-control" value={quiz.group}
                        onChange={(e) => setQuiz({ ...quiz, group: e.target.value })}>
                        <option value="assignments">Assignments</option>
                        <option value="quizzes">Quizzes</option>
                        <option value="exams">Exams</option>
                        <option value="project">Project</option>
                    </select>
                </div>
            </div>
            <div className="row mx-3 mt-3">
                <div className="col-4 text-end mt-2">
                    <p><b>Options</b></p>
                </div>
            </div>
            <div className="row mx-1 mt-3">
                <div className="col-5 text-end mt-2">
                    <input className="mx-1" type="checkbox" checked={quiz.shuffle}
                        onChange={(e) => setQuiz({ ...quiz, shuffle: !quiz.shuffle })}></input>
                    <label>Shuffle Answers </label>
                </div>
            </div>
            <div className="row mx-3 mt-3">
                <div className="col-5 text-end mt-2">
                    <input className="mx-1" type="checkbox" checked={quiz.time_limit}
                        onChange={(e) => setQuiz({ ...quiz, time_limit: !quiz.time_limit })}></input>
                    <label>Time Limit </label>
                    {quiz.time_limit &&
                        <>
                            <input type="number" className="form-control" value={quiz.time_limit} ></input>
                            <label>Minutes </label>
                        </>
                    }
                </div>
            </div>




        </div>
    )
}