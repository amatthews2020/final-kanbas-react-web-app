

export default function MultipleChoiceQuestion({ question }: { question: any }) {
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