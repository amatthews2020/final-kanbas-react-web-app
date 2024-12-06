import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GoCircleSlash } from "react-icons/go";
import { useState } from "react";
import Publish from "./Publish";

// This component goes on the right side of each quiz row, it allows toggling publish as well as handling the vertical elipse
export default function LessonControlButton({ quiz, togglePublish, deleteQuiz, editQuiz } : 
  { quiz: any;
    togglePublish: (quiz: any) => void; 
    deleteQuiz: (quiz: any) => void; 
    editQuiz: (quiz: any) => void }) {

  const { currentUser } = useSelector((state: any) => state.accountReducer);// May need to faculty only stuff
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="float-end mt-3  mx-3 fs-4">
        <Publish togglePublish={togglePublish} quiz={quiz}/>

      <IoEllipsisVertical className="fs-4 d-inline" onClick={toggleMenu} />

      {menuVisible && (
        <div className="position-absolute bg-white border rounded shadow-sm mt-2" style={{ right: 0, zIndex: 1000 }}>
          <div className="p-2" onClick={() => editQuiz(quiz._id)}>
            <FaEdit className="me-2" /> Edit Quiz
          </div>
          <div className="p-2 text-danger" onClick={() => deleteQuiz(quiz._id)}>
            <FaTrash className="me-2" /> Delete Quiz
          </div>
          <div className="p-2" onClick={() => togglePublish(quiz)}>
            <Publish togglePublish={togglePublish} quiz={quiz}/> {quiz.published ? "Unpublish" : "Publish"}
          </div>
        </div>
      )}

    </div>
);}