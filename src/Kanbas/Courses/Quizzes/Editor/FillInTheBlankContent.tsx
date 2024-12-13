import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

import { FillInTheBlankQuestionContent } from "./QuizQuestionsEditor";
export default function FillInTheBlankContent({
  content,
  setContent,
}: {
  content: FillInTheBlankQuestionContent;
  setContent: (content: FillInTheBlankQuestionContent) => void;
}) {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent({ ...content, text: e.target.value });
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...content.answer];
    newAnswers[index] = value;
    setContent({ ...content, answer: newAnswers });
  };

  const addBlank = () => {
    setContent({ ...content, answer: [...content.answer, ""] });
  };

  const deleteBlank = (index: number) => {
    if (window.confirm("Are you sure you want to delete this blank?")) {
      const newAnswers = content.answer.filter((_, i) => i !== index);
      setContent({ ...content, answer: newAnswers });
    }
  };

  return (
    <div>
      <div>
        <label>Question Text:</label>
        <input
          type="text"
          value={content.text}
          onChange={handleTextChange}
          className="form-control"
        />
      </div>
      <div>
        <label>Blanks and Answers:</label>
        {content.answer.map((answer: string, index: number) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="form-control d-inline-block w-75"
            />
            <button
              onClick={() => deleteBlank(index)}
              className="btn btn-danger ml-2"
            >
              Delete
            </button>
          </div>
        ))}
        <button onClick={addBlank} className="btn btn-primary mt-2">
          Add Blank
        </button>
      </div>
    </div>
  );
}


