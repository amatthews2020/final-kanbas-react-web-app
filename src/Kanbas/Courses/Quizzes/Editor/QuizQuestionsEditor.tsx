import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as coursesClient from "../../client";
import { setAttempt } from "../Attempt/attempt";
import Question from "../Questions/Question";
import { setQuizzes, updateQuiz } from "../reducer";
import FillInTheBlankContent from "./FillInTheBlankContent";
import MultipleChoiceContent from "./MultipleChoiceContent";
import TrueFalseContent from "./TrueFalseContent";
import * as quizClient from "../client";
import * as questionsClient from "../Questions/client"
import { get } from "http";

// Define types for each QuizQuestion type
export declare type TrueFalseQuestionContent = {
  text: string;
  answer: boolean;
  point: number;
};

export declare type TrueFalseQuestion = {
  _id: string;
  sequence: number;
  type: "TRUEFALSE";
  content: TrueFalseQuestionContent;
};

export declare type MultipleChoiceQuestionContent = {
  text: string;
  choices: Array<string>;
  answer: string;
  point: number;
};

export declare type MultipleChoiceQuestion = {
  _id: string;
  sequence: number;
  type: "MULTIPLECHOICE";
  content: MultipleChoiceQuestionContent;
};

export declare type FillInTheBlankQuestionContent = {
  text: string;
  answer: string[];
  point: number;
};

export declare type FillInTheBlankQuestion = {
  _id: string;
  sequence: number;
  type: "FILLINTHEBLANK";
  content: FillInTheBlankQuestionContent;
};

export declare type QuizQuestion =
  | TrueFalseQuestion
  | MultipleChoiceQuestion
  | FillInTheBlankQuestion;
export declare type QuizQuestionContent =
  | TrueFalseQuestionContent
  | MultipleChoiceQuestionContent
  | FillInTheBlankQuestionContent;

export default function Questions() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  // Use local state to manage temporary QuizQuestion changes
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [prevQuestions, setPrevQuestions] = useState<QuizQuestion[]>([]);
  const [points, setPoints] = useState(quiz?.points || 0);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const [questionPoint, setQuestionPoint] = useState(10);

  const [editingQuestionNumber, setEditingQuestionNumber] = useState<
    number | null
  >(null);

  const tfDefault = { text: "", answer: true, point: 0 };
  const mcDefault = { text: "", choices: [], answer: "", point: 0 };
  const fitbDefault = { text: "", answer: [], point: 0 };

  const [tfContent, setTfContent] = useState<TrueFalseQuestionContent>({
    ...tfDefault,
  });
  const [mcContent, setMcContent] = useState<MultipleChoiceQuestionContent>({
    ...mcDefault,
  });
  const [fitbContent, setFitbContent] = useState<FillInTheBlankQuestionContent>(
    { ...fitbDefault }
  );

  const resetQuestions = () => {
    setTfContent({ ...tfDefault });
    setMcContent({ ...mcDefault });
    setFitbContent({ ...fitbDefault });
  };

  const translateFromDB = (question: any) => {
    let newQuestion: QuizQuestion;
    let fitbq: FillInTheBlankQuestionContent;
    let tf: TrueFalseQuestionContent;
    let mc: MultipleChoiceQuestionContent;

    if (question.type === "True False") {
      tf = {
        text: question.question,
        answer: question.answer,
        point: question.points,
      };
      newQuestion = {
        _id: question._id,
        sequence: questions.length + 1,
        type: "TRUEFALSE",
        content: tf
      };
    } else if (question.type === "Multiple Choice") {

      mc = {
        text: question.question,
        choices: question.choices,
        answer: question.answer,
        point: question.points,
      };
      newQuestion = {
        _id: question._id,
        sequence: questions.length + 1,
        type: "MULTIPLECHOICE",
        content: mc,
      };
    } else {
      fitbq = {
        text: question.question,
        answer: question.answer,
        point: question.points,
      };
      newQuestion = {
        _id: question._id,
        sequence: questions.length + 1,
        type: "FILLINTHEBLANK",
        content: fitbq,
      };
    }
    return newQuestion;
  }

  const fetchQuestions = async () => {
    if (qid) {
      const questions = await quizClient.findQuestionsForQuiz(qid);
      const quiz_questions = questions.map((q: any) => translateFromDB(q));
      setQuestions(quiz_questions);
      setPrevQuestions(quiz_questions);
      console.log("Previous", questions);
    }
  };

  useEffect(() => {
    if (quiz) {
      fetchQuestions();
    }
  }, [quiz]);

  useEffect(() => {
    const totalPoints = questions.reduce((sum, q) => sum + q.content.point, 0);
    setPoints(totalPoints);
    
    if (quiz && totalPoints !== quiz.points) {
      dispatch(updateQuiz({ ...quiz, points: totalPoints }));
      quizClient.updateQuiz({...quiz, points: totalPoints})
    }
  }, [questions]);



  useEffect(() => {
    dispatch(
      setAttempt({
        start: 0,
        submitted: true,
        submittedAt: 0,
        grade: 0,
        score: 0,
        answers: quiz?.questions || [],
      })
    );
  }, []);

  const handleAddQuestion = () => {
    setEditingQuestionNumber(null);
    setQuestionPoint(10);
    setSelectedType(null);
    setTfContent({ ...tfDefault });
    setMcContent({ ...mcDefault });
    setFitbContent({ ...fitbDefault });
    setShowTypeModal(true);
  };

  const TranslateAddForDB = (question: QuizQuestion) => {
    console.log("Question being translated", question);
    if (question.type === "TRUEFALSE") {
      return {
        _id: question._id,
        title: "Question " + (questions.length + 1),
        type: "True False",
        quiz: qid,
        points: question.content.point,
        question: question.content.text,
        answer: question.content.answer,
        choices: ["true", "false"],
      };
    } else if (question.type === "MULTIPLECHOICE") {
      return {
        _id: question._id,
        title: "Question " + (questions.length + 1),
        type: "Multiple Choice",
        quiz: qid,
        points: question.content.point,
        question: question.content.text,
        answer: question.content.answer,
        choices: question.content.choices,
      };
    } else {
      return {
        _id: question._id,
        title: "Question " + (questions.length + 1),
        type: "Fill in the Blank",
        quiz: qid,
        points: question.content.point,
        question: question.content.text,
        answer: question.content.answer,
      };
    }
  }
  const handleDelete = async (question: QuizQuestion) => {
    try {
      setQuestions(questions.filter((q) => q._id !== question._id));
      if (question._id) {
        await questionsClient.deleteQuestion(question._id);
      } else {
        console.log("Question not saved to the database yet. Skipping delete.");
      }
    } catch (error) {
      console.log('Question wasnt saved yet', error);
    }

  };

  const handleEdit = (questionNumber: number) => {
    setEditingQuestionNumber(questionNumber);
    const thisQuestion = questions[questionNumber];
    setQuestionPoint(thisQuestion.content.point);
    setSelectedType(thisQuestion.type);
    switch (thisQuestion.type) {
      case "TRUEFALSE":
        setTfContent(thisQuestion.content);
        break;
      case "MULTIPLECHOICE":
        setMcContent(thisQuestion.content);
        break;
      case "FILLINTHEBLANK":
        setFitbContent(thisQuestion.content);
        break;
    }
    setShowTypeModal(true);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setShowTypeModal(false);
    setShowConfigModal(true);
  };

  const addNewQuestion = () => {
    let newQuestion: QuizQuestion;

    if (selectedType === "TRUEFALSE") {
      newQuestion = {
        _id: new Date().getTime().toString(),
        sequence: questions.length,
        type: "TRUEFALSE",
        content: {
          ...tfContent,
          point: questionPoint,
        },
      };
    } else if (selectedType === "MULTIPLECHOICE") {
      newQuestion = {
        _id: new Date().getTime().toString(),
        sequence: questions.length,
        type: "MULTIPLECHOICE",
        content: {
          ...mcContent,
          point: questionPoint,
        },
      };
    } else {
      newQuestion = {
        _id: new Date().getTime().toString(),
        sequence: questions.length,
        type: "FILLINTHEBLANK",
        content: {
          ...fitbContent,
          point: questionPoint,
        },
      };
    }

    if (editingQuestionNumber !== null) {
      const newQuestions = [...questions];
      newQuestion._id = questions[editingQuestionNumber]._id;
      newQuestions[editingQuestionNumber] = newQuestion;
      questionsClient.updateQuestion(questions[editingQuestionNumber]._id, TranslateAddForDB(newQuestion))
      setQuestions([...newQuestions]);
    } else {
      setQuestions([...questions, newQuestion]);
      quizClient.createQuestionForQuiz(qid as string, TranslateAddForDB(newQuestion))
    }
    resetQuestions();
    setShowConfigModal(false);
  };

  const sendQuestion = async (question_input: any) => {
    console.log("Question being sent:", question_input);
    console.log("Previous Questions:", prevQuestions);
    console.log("Question id:", question_input._id);

    const existingQuestion = prevQuestions.find(
      (qui) => qui._id?.toString() === question_input._id?.toString()
    );

    if (existingQuestion) {
      console.log("Updating existing question");
      await quizClient.updateQuestionForQuiz(qid as string, existingQuestion);
    } else {
      console.log("Creating new question,", question_input);
      await quizClient.createQuestionForQuiz(qid as string, question_input);
    }
  };

  const saveQuizQuestions = () => {
    questions.forEach((q) => {
      sendQuestion(TranslateAddForDB(q));
    });

    dispatch(updateQuiz({ ...quiz, points }));
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`);
  };

  const handleCancel = () => {
    // Reset questions to original Redux state if canceled
    setQuestions(quiz?.questions || []);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`);
  };

  const fetchQuiz = async () => {
    const newquiz = await coursesClient.findQuizzesForCourse(cid as string);
    console.log("New Quiz", newquiz);
    dispatch(setQuizzes(newquiz));
  };

  useEffect(() => {
    if (quizzes.length === 0) {
      fetchQuiz();
    }
  }, [qid]);

  return (

    <div className="container mt-4">
      {/* Tabs */}
      <div className="d-flex mb-4">
        <div
          className="tab"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`)}
          style={{ cursor: "pointer", padding: "10px", fontWeight: "normal" }}
        >
          Details
        </div>
        <div
          className="tab"
          style={{
            cursor: "pointer",
            padding: "10px",
            fontWeight: "bold",
            borderBottom: "2px solid black",
          }}
        >
          Questions
        </div>
      </div>

      <hr />

      <h4>Total Points: {points}</h4>

      <div>
        {questions.length === 0 ? (
          <p>No questions added yet. Click "New Question" to add one.</p>
        ) : (
          <div>
            {questions.map((q: any, n: number) => {
              return (
                <div key={n}>
                  <Question
                    question={q}
                    questionNumber={n + 1}
                    point={q.content.point}
                    isDisabled={true}
                  />
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(n)}
                    >
                      Edit Question {n + 1}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(q)}
                    >
                      Delete Question {n + 1}
                    </button>
                  </div>
                  <br />
                  <br />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center mt-3">
        <button onClick={handleAddQuestion} className="btn btn-primary">
          New Question
        </button>
      </div>

      <hr className="my-4" />

      <div className="d-flex justify-content-center mt-2">
        <button onClick={saveQuizQuestions} className="btn btn-danger">
          Save
        </button>
        <button onClick={handleCancel} className="btn btn-secondary me-3">
          Cancel
        </button>
      </div>

      <Modal show={showTypeModal} onHide={() => setShowTypeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Question Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            pts:
            <input
              type="number"
              min={0}
              value={questionPoint}
              onChange={(e) => setQuestionPoint(parseInt(e.target.value))}
            />
          </label>
          <br></br>
          <br></br>
          <p>Choose a Question type:</p>
          <select
            className="form-control"
            onChange={(e) => setSelectedType(e.target.value)}
            defaultValue={selectedType || ""}
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="MULTIPLECHOICE">Multiple Choice</option>
            <option value="TRUEFALSE">True/False</option>
            <option value="FILLINTHEBLANK">Fill in the Blank</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTypeModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleTypeSelect(selectedType!)}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfigModal} onHide={() => setShowConfigModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Configure{" "}
            {
              {
                MULTIPLECHOICE: "Multiple Choice",
                TRUEFALSE: "True/False",
                FILLINTHEBLANK: "Fill in the Blank",
              }[selectedType || ""]
            }{" "}
            Question
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedType === "MULTIPLECHOICE" && (
            <MultipleChoiceContent
              content={mcContent}
              setContent={setMcContent}
            />
          )}
          {selectedType === "TRUEFALSE" && (
            <TrueFalseContent content={tfContent} setContent={setTfContent} />
          )}
          {selectedType === "FILLINTHEBLANK" && (
            <FillInTheBlankContent
              content={fitbContent}
              setContent={setFitbContent}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfigModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addNewQuestion}>
            Save Question
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}