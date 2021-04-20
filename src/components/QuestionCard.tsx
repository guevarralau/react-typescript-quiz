import React from 'react';

interface QuestionCardProps {
    question: string;
    answers: string[];
    callback: any;
    userAnswer:any;
    questionNumber:number;
    totalQuestions:number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    questionNumber,
    answers,
    userAnswer,
    totalQuestions,
    callback,
    }) =>  <div >
            <p className="number">
                Question : {questionNumber} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html: question}} /> 
            <div>
                { answers !== undefined ?
                    answers.map
                        ( 
                            answer => 
                            (
                                <div key={answer}>
                                    <button 
                                    value={answer}
                                    disabled={userAnswer}
                                    onClick={callback}
                                    >
                                        <span dangerouslySetInnerHTML={{__html: answer}}/>
                                    </button>
                                </div>
                            )
                        )
                    : null
                }
            </div>
    
        </div>
    
    
export default QuestionCard;