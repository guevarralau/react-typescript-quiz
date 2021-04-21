import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import {fetchQuizQuestions , Difficulty , Question} from '../API'

export const TOTAL_QUESTIONS = 10;

interface UserAnswer {
  question: string;
  answer:string;
  correct:boolean;
  correctAnswer: string;
}

interface GameState  { 
    loading: boolean;
    questions: Question[];
    number:number;
    userAnswers:UserAnswer[];
    score:number;
    gameOver:boolean;
    finished:boolean;
    previousScore:number;
}

const initialState : GameState = {
    loading: false,
    questions: [],
    number:0,
    userAnswers: [],
    score:0,
    gameOver:true,
    finished:false,
    previousScore:0,
}

export const startTrivia = createAsyncThunk('game/startTrivia', async () => {
        console.log('fetching data');
        const newQuestions = await fetchQuizQuestions(
          TOTAL_QUESTIONS,
          Difficulty.EASY
        )
        return newQuestions;
    }
  );

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    checkAnswer: (state,action) => {
        if( state.gameOver || state.number + 1 === TOTAL_QUESTIONS) {
          // setDefaultGameState
          state.previousScore = state.score;
          state.score = 0;
          state.finished = true;
          state.gameOver = true;
          // setFinishedGameState
          state.userAnswers = [];
          state.number = 0;
          state.loading = false;
        }
        const answer = action.payload;
        const correct =  state.questions[state.number].correct_answer === answer
        if (correct) state.score += 1
        const answerObject = {
          question: state.questions[state.number].question,
          answer,
          correct,
          correctAnswer: state.questions[state.number].correct_answer,
        }
        state.userAnswers =[...state.userAnswers , answerObject]
      },
    nextQuestion: (state) => {
      const nextQuestion = state.number + 1;
      if (nextQuestion === TOTAL_QUESTIONS) {
        state.gameOver = true;
        return;
      }
      state.number = nextQuestion;
    }
    },
    extraReducers: (builder) => {
      builder.addCase(startTrivia.pending,(state, action) => {
        console.log('pending');
        state.finished = false; 
        state.loading = true;

      })
      builder.addCase(startTrivia.fulfilled, (state, action) => {
        console.log('fulfilled');
        // setDefaultGameState
        state.score = 0;
        state.userAnswers = [];
        state.number = 0;
        state.loading = false;
        state.gameOver = false;
        // set question
        state.questions = action.payload;
        // loading = false;
      })
    }
  });

// Action creators are generated for each case reducer function
export const { checkAnswer , nextQuestion } = gameSlice.actions

export default gameSlice.reducer
