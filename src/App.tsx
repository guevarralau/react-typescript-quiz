import React from 'react';
import QuestionCard from './components/QuestionCard'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import {startTrivia ,checkAnswer, nextQuestion, TOTAL_QUESTIONS } from './redux/game'

interface AppProps {
  appName:string;
} 

const App : React.FC<AppProps> = ({appName = 'React'}) => {

  const {gameOver, userAnswers,finished,loading,previousScore,score,questions,number} = useAppSelector(state => state.game)
  const dispatch = useAppDispatch()
  const checking = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(checkAnswer(e.currentTarget.value))
  }
  
  return (
    <div className="App">
     <h1>{appName}</h1>
     <h1>Loading : {loading ? 'true' : 'false'}</h1>
     <h1>Game Over : {gameOver ? 'true' :'false'}</h1>
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS 
        ? <button className="start" onClick={() => {dispatch(startTrivia())}}>
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
          callback={checking}
      />
      : null
      } 
      {  !gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1
        ?<button className="next" onClick={() => {dispatch(nextQuestion())}}>Next Question</button>
        : null
      }
     
    </div>
  );
}

export default App;
