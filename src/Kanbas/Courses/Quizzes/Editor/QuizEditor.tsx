import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, setQuizzes, updateQuiz } from "../reducer";
import { Link } from "react-router-dom";
import * as coursesClient from "../../client";
import * as quizzClient from "../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  console.log("Quizzes From Editor", quizzes);

  const defaultQuizData = {
    _id: "New",
    title: "",
    course: cid,
    desc: "",
    points: 0,
    available: "",
    due: "",
    until: "",
    access_code_enabled: false,
    access_code: "",
    type: "Graded Quiz",
    multiple_attempts: false,
    attempts: 3,
    published: false,
    shuffle_answers: true,
    time_limit: 20,
    group: "Quizzes",
    webcam: false,
    lock_questions_after_answering: false,
    one_question_at_a_time: true,
    show_correct_answers: false,
    view_responses: true,
    required_to_view: false,
  };

  const [localQuiz, setLocalQuiz] = useState(
    quizzes.find((q: any) => q._id === qid) || { ...defaultQuizData }
  );



  const fetchQuiz = async () => {
    const quiz = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quiz));
    setLocalQuiz(
      quiz.find((q: any) => q._id === qid) || { ...defaultQuizData }
    );
  };
  useEffect(() => {
    if (quizzes.length === 0) {
      fetchQuiz();
    }
  }, [qid]);

  const handleSave = async (publish: boolean) => {
    const toSave = { ...localQuiz, published: publish };
    if (!qid || qid === "New") {
      await coursesClient.createQuizzesForCourse(cid as string, toSave);
      dispatch(addQuiz({ ...toSave, course: cid }));
    } else {
      await quizzClient.updateQuiz(toSave);
      dispatch(updateQuiz({ ...toSave, _id: qid, course: cid }));
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setLocalQuiz({ ...localQuiz, [field]: value });
  };



  return (
    <div id="quiz-editor" className="container mt-4">
      <div className="d-flex mb-4">
        <div
          className="tab"
          onClick={() => {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid ?? "New"}/Edit`);
          }}
          style={{
            cursor: "pointer",
            padding: "10px",
            fontWeight: "bold",
            borderBottom: "2px solid black",
          }}
        >
          Details
        </div>
        <div
          className="tab"
          onClick={() => {
            if (qid === "New") {
              dispatch(addQuiz(localQuiz));
            }
            dispatch(updateQuiz(localQuiz));
            navigate(
              `/Kanbas/Courses/${cid}/Quizzes/${qid ?? "New"}/Questions`
            );
          }}
          style={{
            cursor: "pointer",
            padding: "10px",
            fontWeight: "normal",
            borderBottom: "1px solid lightgray",
          }}
        >
          Questions
        </div>
      </div>

      <hr />

      {/* Details Tab Content */}
      <div className="mb-4">
        <input
          type="text"
          id="quiz-title"
          className="form-control"
          value={localQuiz.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="quiz-description" className="form-label fw-bold">
          Quiz Instructions
        </label>
        <textarea
          id="quiz-description"
          className="form-control"
          rows={5}
          value={localQuiz.desc}
          onChange={(e) => handleChange("desc", e.target.value)}
        />
      </div>

      <table className="table table-borderless w-100">
        <tbody>
          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-points">Points</label>
                </div>
                <div className="col-md-10">
                  <input
                    type="number"
                    id="quiz-points"
                    className="form-control"
                    value={localQuiz.points}
                    onChange={(e) =>
                      handleChange("points", Number(e.target.value))
                    }
                    disabled={true}
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-type">Quiz Type</label>
                </div>
                <div className="col-md-10">
                  <select
                    id="quiz-type"
                    className="form-control"
                    value={localQuiz.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                  >
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                  </select>
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-assignment-group">
                    Assignment Group
                  </label>
                </div>
                <div className="col-md-10">
                  <select
                    id="quiz-assignment-group"
                    className="form-control"
                    value={localQuiz.group}
                    onChange={(e) =>
                      handleChange("group", e.target.value)
                    }
                  >
                    <option value="Quizzes">Quizzes</option>
                    <option value="Exams">Exams</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                  </select>
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-time-limit">Time Limit (minutes)</label>
                </div>
                <div className="col-md-10">
                  <input
                    id="quiz-time-limit"
                    min={1}
                    type="number"
                    className="form-control"
                    defaultValue={localQuiz.time_limit}
                    onChange={(e) =>
                      handleChange("time_limit", parseInt(e.target.value))
                    }
                  ></input>
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-shuffle-answers">Shuffle Answers</label>
                </div>
                <div className="col-md-10">
                  <input
                    type="checkbox"
                    id="quiz-shuffle-answers"
                    className="form-check-input ms-2"
                    checked={localQuiz.shuffle_answers}
                    onChange={(e) =>
                      handleChange("shuffle_answers", e.target.checked)
                    }
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-multiple-attempts">
                    Multiple Attempts
                  </label>
                </div>
                <div className="col-md-10">
                  <input
                    id="quiz-multiple-attempts"
                    type="checkbox"
                    className="form-check-input ms-2"
                    checked={localQuiz.multiple_attempts}
                    onChange={(e) =>
                      handleChange("multiple_attempts", e.target.checked)
                    }
                  />
                </div>
              </div>
            </td>
          </tr>

          {localQuiz.multiple_attempts && (
            <tr className="mb-3">
              <td>
                <div className="row align-items-center">
                  <div className="col-md-2 text-end">
                    <label htmlFor="quiz-allowed-attempts">
                      Attempts allowed
                    </label>
                  </div>
                  <div className="col-md-10">
                    <input
                      id="quiz-allowed-attempts"
                      type="number"
                      min={1}
                      className="form-control ms-2"
                      value={localQuiz.attempts}
                      onChange={(e) =>
                        handleChange(
                          "attempts",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </td>
            </tr>
          )}

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-show-correct-answers">
                    Show Correct Answers
                  </label>
                </div>
                <div className="col-md-10">
                  <input
                    id="quiz-show-correct-answers"
                    type="checkbox"
                    className="form-check-input ms-2"
                    checked={localQuiz.show_correct_answers}
                    onChange={(e) =>
                      handleChange("show_correct_answers", e.target.checked)
                    }
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-access-code-required">
                    Access Code Required
                  </label>
                </div>
                <div className="col-md-10">
                  <input
                    type="checkbox"
                    id="quiz-access-code-required"
                    className="form-check-input ms-2"
                    checked={localQuiz.access_code_enabled}
                    onChange={(e) =>
                      handleChange("access_code_enabled", e.target.checked)
                    }
                  />
                </div>
              </div>
            </td>
          </tr>

          {localQuiz.access_code_enabled && (
            <tr className="mb-3">
              <td>
                <div className="row align-items-center">
                  <div className="col-md-2 text-end">
                    <label htmlFor="quiz-access-code">Access Code</label>
                  </div>
                  <div className="col-md-10">
                    <input
                      type="text"
                      id="quiz-access-code"
                      className="form-control ms-2"
                      value={localQuiz.access_code}
                      onChange={(e) =>
                        handleChange("access_code", e.target.value)
                      }
                    />
                  </div>
                </div>
              </td>
            </tr>
          )}

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-one-question-per-page">
                    One Question at a Time
                  </label>
                </div>
                <div className="col-md-10">
                  <input
                    id="quiz-one-question-per-page"
                    type="checkbox"
                    className="form-check-input ms-2"
                    checked={localQuiz.one_question_at_a_time}
                    onChange={(e) =>
                      handleChange("one_question_at_a_time", e.target.checked)
                    }
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-webcam-required">Webcam Required</label>
                </div>
                <div className="col-md-10">
                  <input
                    id="quiz-webcam-required"
                    type="checkbox"
                    className="form-check-input ms-2"
                    checked={localQuiz.webcam}
                    onChange={(e) =>
                      handleChange("webcam", e.target.checked)
                    }
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-lock-questions">
                    {" "}
                    Lock Questions After Answering
                  </label>
                </div>
                <div className="col-md-10">
                  <input
                    id="quiz-lock-questions"
                    type="checkbox"
                    className="form-check-input ms-2"
                    checked={localQuiz.lock_questions_after_answering}
                    onChange={(e) =>
                      handleChange(
                        "lock_questions_after_answering",
                        e.target.checked
                      )
                    }
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-available-date">Available From</label>
                </div>
                <div className="col-md-10">
                  <input
                    type="date"
                    id="quiz-available-date"
                    className="form-control"
                    value={(localQuiz.available ?? "").split("T")[0]}
                    onChange={(e) =>
                      handleChange("available", e.target.value)
                    }
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-due-date">Due Date</label>
                </div>
                <div className="col-md-10">
                  <input
                    type="date"
                    id="quiz-due-date"
                    className="form-control"
                    value={(localQuiz.due ?? "").split("T")[0]}
                    onChange={(e) => handleChange("due", e.target.value)}
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-until-date">Until Date</label>
                </div>
                <div className="col-md-10">
                  <input
                    type="date"
                    id="quiz-until-date"
                    className="form-control"
                    value={(localQuiz.until ?? "").split("T")[0]}
                    onChange={(e) => handleChange("until", e.target.value)}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Save and Cancel buttons */}
      <div className="row g-3 mt-2">
        <hr />
        <div className="d-flex justify-content-end">
          <Link
            to={`/Kanbas/Courses/${cid}/Quizzes`}
            className="btn btn-secondary me-3"
          >
            Cancel
          </Link>
          <button
            onClick={() => handleSave(localQuiz.published ?? false)}
            className="btn btn-danger me-3"
          >
            Save
          </button>
          <button onClick={() => handleSave(true)} className="btn btn-danger">
            Save and Publish
          </button>
        </div>
      </div>
    </div>
  );
}
