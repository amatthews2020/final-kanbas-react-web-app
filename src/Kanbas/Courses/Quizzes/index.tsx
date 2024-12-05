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
import { setQuizzes } from "./reducer";
import { MdOutlineAssignment } from "react-icons/md";

export default function Quizzes() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();

    const fetchAssignments = async () => {
        const assignments = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(assignments));
      };
      useEffect(() => {
        fetchAssignments();
      }, []);

    const availability = (quiz: any) => {
        const currentDate = new Date();
        const availableDate = new Date(quiz.available); // Quiz available start date
        const availableUntilDate = new Date(quiz.availableUntil); // Quiz available end date

        let availabilityStatus;
        if (currentDate < availableDate) {
          return (
            <>
              <b>Not Available Until</b> {availableDate.toLocaleDateString()}
            </>
          );
        } else if (currentDate >= availableDate && currentDate <= availableUntilDate) {
          return <b>Available</b>;
        } else {
          return <b>Closed</b>;
        }
    }

    return (
        <div id="wd-quizzes">
            <QuizControls />

            <ul id="wd-quizzes-list" className="list-group rounded-0 mx-5" >
                <li className="wd-quiz-header list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary"> 
                        <IoMdArrowDropdown className=""/>
                        <span className="fs-4 ">Assignment Quizzes</span>
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        {quizzes
                            .map((quiz: any) =>
                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <RxRocket className="me-2 fs-3 float-start mt-4 mx-2 text-success"/>
                                <div className="float-start">
                                    <a className="wd-assignment-link text-decoration-none text-dark fs-4 "
                                        href={`#/Kanbas/Courses/${cid}/Quizzes/${currentUser.role === "FACULTY" ? quiz._id : ""}`}>
                                        {quiz.title}
                                    </a> <br/>
                                    <span className="fs-6 ">
                                    {availability(quiz)} |
                                        <b> Due </b> {quiz.due} | {quiz.points} Points
                                    </span>
                                </div>
                            </li>
                            
                        )}
                    </ul>
                </li>
            </ul>

          {/* <ul id="wd-quiz" className="list-group rounded-0 mx-5">
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary"> 
                <BsGripVertical className="me-2 fs-3 " />
                <IoMdArrowDropdown className=""/>
                <span className="fs-4 ">Quizzes</span>
                <AssignmentControlButtons />
                <FaPlus className="me-2 float-end" />
                <span className="border border-dark rounded float-end mx-3 px-2">40% of Total</span>
                </div>
                <ul className="wd-lessons list-group rounded-0">
                {assignments
                    .map((assignment: any) => 
                    <li className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3 float-start mt-4" />
                        <MdOutlineAssignment className="text-success me-4 fs-3  float-start mt-4" />
                        <div className="float-start">
                        <a className="wd-assignment-link text-decoration-none text-dark fs-4 "
                            href={`#/Kanbas/Courses/${cid}/Assignments/${currentUser.role === "FACULTY" ? assignment._id : ""}`}>
                            {assignment.title}
                        </a> <br/>
                        <span className="fs-6 ">
                            <span className="text-danger">Multiple Modules</span> | <b>Not Available Until</b> {assignment.available} |<br/>
                            <b>Due</b> {assignment.due} | {assignment.points} Points
                        </span>
                    
                        </div>
                        <LessonControlButton assignId={assignment._id} deleteAssignment={confirmDeleteAssignment}/>
                    </li>
                    )} 
                </ul>
            </li>
            </ul> */}
        </div>
    );

}