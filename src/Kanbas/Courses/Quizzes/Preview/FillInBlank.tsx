export default function FillInBlankQuestion({ 
    question, 
    onAnswer,
    taking,
    userAnswer,
    questionIndex, } : 
    { question: any, 
      onAnswer?: (questionId: string, answer: string, points: number) => void,
      taking?: boolean; // Optional flag to check if the user is taking the quiz
      userAnswer?: string;
    questionIndex?: any  }) {

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onAnswer) {
            onAnswer(question._id, e.target.value, question.points);
        }
    };

    const isCorrect = Array.isArray(question.answer)
    ? question.answer.includes(userAnswer)
    : userAnswer === question.answer;

    return (
        <div className="d-flex justify-content-center align-items-center">
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
                    <span>{question.points} pts</span>
                    {!taking && (
                        <span className={`text-${isCorrect ? "success" : "danger"}`}>
                            {isCorrect ? "Correct" : "Incorrect"}
                        </span>
                    )}
                </div>

                <div className="card-body">
                    <div className="text-center mt-2 mb-5">
                        <p className="h5">{question.question}</p>
                    </div>
                    
                    <div className="text-center mt-2 mb-5">
                    <input
                            type="text"
                            className="form-control d-inline w-auto"
                            style={{ width: "120px", display: "inline" }}
                            defaultValue={taking ? "" : userAnswer || ""} // If not taking, show the user's answer
                            onChange={handleAnswerChange}
                            disabled={!taking} // Disable input if not taking
                        />
                            
                    </div>
                </div>
            </div>
        </div>
    );
}