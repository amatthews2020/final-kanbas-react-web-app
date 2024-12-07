export default function FillInBlankQuestion({ question }: { question: any }) {
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
                        />
                            
                    </div>
                </div>
            </div>
        </div>
    );
}