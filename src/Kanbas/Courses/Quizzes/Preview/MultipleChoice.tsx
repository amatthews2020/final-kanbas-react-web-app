

export default function MultipleChoiceQuestion({ 
  question, 
  onAnswer,
  taking,
  userAnswer, } : 
  { question: any, 
    onAnswer?: (questionId: string, answer: string, points: number) => void,
    taking?: boolean; // Optional flag to check if the user is taking the quiz
    userAnswer?: string; }) {

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onAnswer) {
        onAnswer(question._id, e.target.value, question.points);
      }
    };

    const isCorrect = Array.isArray(question.answer)
    ? question.answer.includes(userAnswer)
    : userAnswer === question.answer;
    return (
        <div
          className="d-flex justify-content-center align-items-center "        >
          <div
            className="card rounded-3 shadow-sm"
            style={{ width: "500px" }}
          >
            {/* Header with title and points */}
            <div
              className="card-header d-flex justify-content-between"
              style={{ backgroundColor: "#e9ecef", borderBottom: "2px solid #dee2e6" }}
            >
              <h5 className="card-title mb-0">{question.title}</h5>
              <span className="">{question.points} pts</span>
              {!taking && (
                        <span className={`text-${isCorrect ? "success" : "danger"}`}>
                            {isCorrect ? "Correct" : "Incorrect"}
                        </span>
                    )}
            </div>
    
            <div className="card-body">
              {/* Question Text */}
              <div className="text-center mt-2 mb-5">
                <p className="h5">{question.question}</p>
              </div>
    
              {/* Radio Button for True */}
              <div className="form-check mb-3">
              {question.choices.map((choice: any) => 
                <div>
                    <hr />
                    
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${question._id}`}
                      id={`${choice}-${question._id}`}
                      value={choice}
                      onChange={handleAnswerChange}
                      checked={userAnswer === choice} // Mark the selected answer
                      disabled={!taking} // Disable the radio buttons if not taking
                    />
                    <label className="form-check-label" htmlFor={`${choice}-${question._id}`}>
                        {choice}
                    </label>
                    </div>
                
                )}
                </div>
            </div>
          </div>
        </div>
      );
}