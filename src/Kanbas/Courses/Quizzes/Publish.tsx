import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GoCircleSlash } from "react-icons/go";
import { useState } from "react";

// This component goes on the right side of each quiz row, it allows toggling publish as well as handling the vertical elipse
export default function LessonControlButton({ quiz, togglePublish, } : 
  { quiz: any;
    togglePublish: (quiz: any) => void; 
  }) {
        return (
          <div className="d-inline" onClick={() => togglePublish(quiz)}>
            {quiz.published ? 
                <GreenCheckmark  /> :
                <GoCircleSlash className="text-danger" />}
          </div>
        );}