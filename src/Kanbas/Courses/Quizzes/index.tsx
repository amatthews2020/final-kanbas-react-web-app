import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as coursesClient from "../client";
import QuizControls from "./QuizControls";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentControlButtons from "../Assignments/AssignmentControlButton";
import { FaPlus } from "react-icons/fa6";
import { RxRocket } from "react-icons/rx";
import { setQuizzes, updateQuiz, deleteQuiz } from "./reducer";
import { GoCircleSlash } from "react-icons/go";
import GreenCheckmark from "../Modules/GreenCheckmark";
import * as quizzesClient from "./client"
import * as attemptsClient from "./Attempt/client"
import QuizControlButton from "./QuizControlButton";
import { setAttempts } from "./Attempt/reducer";




export default function Quizzes() {
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { attempts } = useSelector((state: any) => state.attemptsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    // Students should only be able to see published quizzes
    dispatch(setQuizzes(quizzes));
  };

  const fetchAttemptsForUser = async () => {
    const rattempts = await attemptsClient.fetchAttemptForUser(currentUser._id);
    console.log("rattempts", rattempts)
    dispatch(setAttempts(rattempts))
    console.log("dispatcher", attempts)
  }

  //Delete quiz
  const removeQuiz = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  }

  const upQuiz = async (quiz_id: any) => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz_id}/Editor`);
  }

  // Get the number of correct answers for a quiz attempt
  const getCorrectAnswerCount = (quizId: string) => {

    if (attempts) {
      const attempt = attempts.find((attempt: any) => attempt.quiz === quizId && attempt.user === currentUser._id);
      console.log("Here", attempt)
      if (attempt) {
        
        const correct = attempt.answers.filter((answer: any) => answer.isCorrect).length;
        const total = attempt.answers.length;
        console.log("Here2", {correct, total})
        if (correct && total) {
          return {correct, total}
        } else if (total) {
          return {correct: 0, total}
        }
      }
    }
    return {correct: 0, total: 0};
  };

  useEffect(() => {
    fetchAttemptsForUser();
    fetchQuizzes();
  }, []);

  // Get the availability for the list group
  const availability = (quiz: any) => {
    const currentDate = new Date();
    const availableDate = new Date(quiz.available); // Quiz available start date
    const availableUntilDate = new Date(quiz.availableUntil); // Quiz available end date

    if (currentDate < availableDate) {
      return (
        <>
          <b>Not Available Until</b> {availableDate.toLocaleDateString()}
        </>
      );
    } else if (quiz.published || (currentDate >= availableDate && currentDate <= availableUntilDate)) {
      return <b>Available</b>;
    } else {
      return <b>Closed</b>;
    }
  }

  // Toggle publish status, had to do it the way below because component wasn't rerendering properly on click
  const togglePublish = async (quiz: any) => {
    const newQuiz = { ...quiz, published: !quiz.published };

    // Optimistically update the state
    dispatch(updateQuiz(newQuiz));
    try {
      // Try to update 
      const updatedQuiz = await quizzesClient.updateQuiz(newQuiz);
      dispatch(updateQuiz(updatedQuiz));
    } catch (error) {
      console.error("Failed to update quiz:", error);
      // Optionally, rollback the optimistic update in case of an error
      dispatch(updateQuiz(quiz));
    }

  }

  return (
    <div id="wd-quizzes">
      <QuizControls />

      <ul id="wd-quizzes-list" className="list-group rounded-0 mx-5" >
        <li className="wd-quiz-header list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <IoMdArrowDropdown className="" />
            <span className="fs-4 ">Assignment Quizzes</span>
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {quizzes
              .map((quiz: any) =>
                <li className="wd-lesson list-group-item p-3 ps-1">
                  <RxRocket className="me-2 fs-3 float-start mt-4 mx-2 text-success" />
                  <div className="float-start">
                    <a className="wd-assignment-link text-decoration-none text-dark fs-4 "
                      href={`#/Kanbas/Courses/${cid}/Quizzes/${currentUser.role === "FACULTY" ? quiz._id : `${quiz._id}/Attempt`}`}>
                      {quiz.title}
                    </a> <br />
                    <span className="fs-6 ">
                      {availability(quiz)} |
                      <b> Due </b> {quiz.due} | {quiz.points} Points
                    </span>
                  </div>
                  {currentUser.role === "FACULTY" &&
                    <QuizControlButton
                      quiz={quiz}
                      togglePublish={togglePublish}
                      deleteQuiz={removeQuiz}
                      editQuiz={upQuiz} />
                  }
                  {currentUser.role === "STUDENT" &&
                    <div className="float-end mt-3  mx-3 fs-4">
                      {getCorrectAnswerCount(quiz._id).total > 0 ? (
                        <span className="fs-6 text-muted">
                          {" "}
                          Score: {getCorrectAnswerCount(quiz._id).correct} / {getCorrectAnswerCount(quiz._id).total}
                        </span>
                      ) : (
                        <span className="fs-6 text-muted"> No Attempt Yet</span>
                      )}
                    </div>
                  }

                </li>


              )}
          </ul>
        </li>
      </ul>
    </div>
  );

}