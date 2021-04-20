import React , {useState} from 'react';
import QuestionCard from './components/QuestionCard'
import {fetchQuizQuestions , Difficulty , Question} from './API'

interface AppProps {
  appName:string;
}

interface UserAnswer {
  question: string;
  answer:string;
  correct:boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App : React.FC<AppProps> = ({appName = 'React'}) => {

  const [loading , setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver , setGameOver] = useState(true);
  const [finished, setFinished] = useState(false);
  const [previousScore , setPreviousScore] = useState(0);


  const setDefaultGameState: () => void = () => {
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }
  const setFinishedGameState: () => void = () => {
    setPreviousScore(score);
    setScore(0)
    setFinished(true);
    setGameOver(true)
    
  }
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      )
      setQuestions(newQuestions);
      setDefaultGameState()
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if( gameOver || number + 1 === TOTAL_QUESTIONS) {
        setDefaultGameState()
        setFinishedGameState()
      }

      const answer = e.currentTarget.value;
      const correct =  questions[number].correct_answer === answer
      if (correct) setScore( prevScore => prevScore + 1)
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prevUserAnswers => [...prevUserAnswers , answerObject])
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
      return;
    }
    setNumber(nextQuestion);
  }

  return (
    <div className="App">
     <h1>{appName}</h1>
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS 
        ? <button className="start" onClick={startTrivia}>
            Start
          </button>
        : null
      }
      
      {!gameOver || finished ? <p className="score">{finished && gameOver ? 'Previous Score' : 'Score'}: {gameOver && finished ? previousScore : score }</p> : null}
      {loading && <p>Loading Questions ...</p>}
      { !loading && !gameOver ?
      <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
      />
      : null
      } 
      {  !gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1
        ?<button className="next" onClick={nextQuestion}>Next Question</button>
        : null
      }
     
    </div>
  );
}

export default App;
