import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import * as quizClient from "../client";
import { updateQuiz } from "../reducer";

export default function Details() {
    const { cid, qid } = useParams();
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("Quiz ID", qid);
    const [quiz, setQuiz] = useState<any>({});
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);

    const dateObjectToHtmlDateString = (date: Date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ""}${date.getMonth() + 1
            }-${date.getDate() + 1 < 10 ? 0 : ""}${date.getDate() + 1}`;
    };

    const updateGlobalQuiz = async () => {
        const status = await quizClient.updateQuiz(quiz);
        console.log("Updated Quiz", status);
        dispatch(updateQuiz(quiz));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    };


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
            <div className="row mx-3 mt-2">
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
            <div className="row mx-3 mt-2">
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
            <div className="row mx-3 mt-2">
                <div className="col-5 text-end mt-2">
                    <p><b>Options</b></p>
                </div>
            </div>
            <div className="row mx-1 mt-2">
                <div className="col-4 text-end mt-2">
                    <p>Shuffle Answers:</p>
                </div>
                <div className="col-1 text-start mt-2">
                    <input className="mx-1" type="checkbox" checked={quiz.shuffle}
                        onChange={(e) => setQuiz({ ...quiz, shuffle: !quiz.shuffle })}></input>
                </div>
            </div>
            <div className="row mx-3 mt-2">
                <div className="col-4 text-end mt-2">
                    <p>Time Limit: </p>
                </div>
                <div className="col-1 text-start mt-2">
                    <input className="mx-1" type="checkbox" checked={quiz.time_limit !== "0"}
                        onChange={(e) => setQuiz({ ...quiz, time_limit: quiz.time_limit !== "0" ? "0" : "60" })}></input>
                </div>
            </div>
            <div className="row mx-3 mt-2">
                <div className="col-4 text-end mt-2">
                    <p>Set Time Limit: </p>
                </div>
                {quiz.time_limit !== "0" &&
                    <div className="col-6 d-flex align-items-center">
                        <input type="number" className="form-control" value={quiz.time_limit}
                            onChange={(e) => setQuiz({ ...quiz, time_limit: e.target.value })} style={{ width: 'auto' }}></input>
                        <label className="ms-2">Minutes </label>
                    </div>
                }
            </div>
            <div className="row mx-3 mt-2">
                <div className="col-4 text-end mt-2">
                    <p>Points: </p>
                </div>

                <div className="col-6 d-flex align-items-center">
                    <input type="number" className="form-control" value={quiz.points}
                        onChange={(e) => setQuiz({ ...quiz, points: e.target.value })} style={{ width: 'auto' }}></input>
                </div>
            </div>
            <div className="row mx-3 mt-2">
                <div className="col-4 text-end mt-2">
                    <p>Show Correct Answers: </p>
                </div>
                <div className="col-1 text-start mt-2">
                    <input className="mx-1" type="checkbox" checked={quiz.show_correct_answers}
                        onChange={(e) => setQuiz({ ...quiz, show_correct_answers: !quiz.show_correct_answers })}></input>
                </div>
            </div>
            <div className="row mx-3 mt-2">
                <div className="col-4 text-end mt-2">
                    <p>Access Code: </p>
                </div>
                <div className="col-1 text-start mt-2">
                    <input className="mx-1" type="checkbox" checked={quiz.access_code}
                        onChange={(e) => setQuiz({ ...quiz, access_code: !quiz.access_code })}></input>
                </div>
            </div>
            <div className="row mx-3 mt-2">
                <div className="col-4 text-end mt-2">
                    <p>Set Access Code: </p>
                </div>
                {quiz.access_code &&
                    <div className="col-6 d-flex align-items-center">
                        <input type="text" className="form-control" value={"blank"}
                            onChange={(e) => e.target.value} style={{ width: 'auto' }}></input>
                    </div>
                }
            </div>
            <div className="row mx-3 mt-2">
                <div className="col-4 text-end mt-2">
                    <p>One Question At A Time: </p>
                </div>
                <div className="col-1 text-start mt-2">
                    <input className="mx-1" type="checkbox" checked={quiz.one_question_at_a_time}
                        onChange={(e) => setQuiz({ ...quiz, one_question_at_a_time: !quiz.one_question_at_a_time })}></input>
                </div>
            </div>
            <div className="row mx-3 mt-2">
                <div className="col-4 text-end mt-2">
                    <p>Webcam: </p>
                </div>
                <div className="col-1 text-start mt-2">
                    <input className="mx-1" type="checkbox" checked={quiz.webcam}
                        onChange={(e) => setQuiz({ ...quiz, webcam: !quiz.webcam })}></input>
                </div>
            </div>
            <div className="row mx-3 mt-2">
                <div className="col-4 text-end mt-2">
                    <p>Lock Questions After Answering: </p>
                </div>
                <div className="col-1 text-start mt-2">
                    <input className="mx-1" type="checkbox" checked={quiz.lock_questions_after_answering}
                        onChange={(e) => setQuiz({ ...quiz, lock_questions_after_answering: !quiz.lock_questions_after_answering })}></input>
                </div>
            </div>

            <div className="row mx-3 mt-3">
                <div className="col-7 text-end px-3">
                    <div className="border border-secondary rounded px-5 float-end">
                        <input className="mx-1" type="checkbox" checked={quiz.multiple_attempts}
                            onChange={(e) => setQuiz({ ...quiz, multiple_attempts: !quiz.multiple_attempts })}></input>
                        <label>Allow Multiple Attempts</label>
                    </div>
                </div>
            </div>
            <div className="row mx-3 mt-3">
                <div className="col-4 text-end mt-2">
                    <p>Assign:</p>
                </div>
                <div className="border border-secondary rounded col-sm-6">
                    <div className="row py-2 px-2">
                        <label className="col-form-label" htmlFor="assign-to">
                            Assign To
                        </label>
                        <select className="form-control">
                            <option value="everybody">Everybody</option>
                            <option value="nobody">Nobody</option>
                        </select>
                    </div>

                    <div className="row px-2">
                        <label className="row col-form-lable px-4" htmlFor="due-date">
                            Due
                        </label>
                        <input type="date" className="form-control"
                            id="due-date"
                            defaultValue={quiz.due}
                            onChange={(e) => setQuiz({ ...quiz, due: dateObjectToHtmlDateString(new Date(e.target.value)) })} />
                    </div>

                    <div className="row py-2">
                        <div className="col-sm-6">
                            <label className="row col-form-lable px-4" htmlFor="available-from">
                                Available From
                            </label>
                            <input type="date" className="form-control"
                                id="available-from" defaultValue={quiz.available}
                                onChange={(e) => setQuiz({ ...quiz, available: dateObjectToHtmlDateString(new Date(e.target.value)) })} />
                        </div>
                        <div className="col-sm-6">
                            <label className="row col-form-lable px-4" htmlFor="available-to">
                                To
                            </label>
                            <input type="date" className="form-control"
                                id="available-to" defaultValue={quiz.due} />
                        </div>
                        <div className="col-sm-6"></div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="float-end mx-2">
                <button className="btn btn-sm btn-secondary mx-2"
                    onClick={() => { navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`) }}>Cancel</button>
                <button className="btn btn-sm btn-primary"
                    onClick={() => { updateGlobalQuiz(); }}>Save</button>
            </div>
        </div>
    )
}