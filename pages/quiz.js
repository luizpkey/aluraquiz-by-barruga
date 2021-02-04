import React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';

function LoadingWidget(){
  return (
     <Widget>
       <Widget.Header>
         Carregando...
       </Widget.Header>
       <Widget.Content>
         [Desafio do Loading]
       </Widget.Content>
     </Widget>
  );
}

function QuestionWidget( {
     question, 
     totalQuestion,
     questionIndex,
     onSubmit,
    } ){
      const questionId=`question__${questionIndex}`
  return(
    <Widget>
    <Widget.Header>
        { /* <BackLinkArrow href="/" >*/ }
        <h3>
            { `Pergunta ${questionIndex + 1 } de  ${totalQuestion}` }
        </h3>
        </Widget.Header>
        <img
        alt='Descrição'
        style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
        }}
        src={question.image}
        />
        <Widget.Content>
          <h2>
            {question.title}
          </h2>
          <p>
            {question.description}
          </p>

          <form onSubmit={(e)=>{
            e.preventDefault();
            onSubmit();
          }}>
            {question.alternatives.map((alternative, alternativeIndex )=> {
              const alternativeId = `alternative__${alternativeIndex}`
              return (
                <Widget.Topic
                  as="label"
                   htmlFor={alternativeId}
                >
                   < input
                      style={{display: 'none'}}
                      id={alternativeId}
                      name={questionId}
                      type="radio"
                   />
                   {alternative};
                </Widget.Topic>
              )
             })}
            <Button >
              Confirmar
            </Button>

          </form>
        
        </Widget.Content>
        </Widget>
  )
}
const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}
export default function QuizPage(){
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const totalQuestion = db.questions.length;
  const question = db.questions[questionIndex];
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  React.useEffect(()=>{
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);   
    }, 1*1000); 
   }, [] );

   function handleSubmit(){
     const nextQuestion = questionIndex + 1;
     if( nextQuestion< totalQuestion){
      setCurrentQuestion(nextQuestion);
     }else{
      setScreenState(screenStates.RESULT);   
     }
   }
    return (
        <QuizBackground backgroundImage={db.bg}>
          <QuizContainer>
            <QuizLogo />
            {screenState===screenStates.QUIZ && (
              <QuestionWidget 
              question={question} 
              totalQuestion={totalQuestion}
              questionIndex={questionIndex}
              onSubmit={handleSubmit}
             />
            )}
            {screenState===screenStates.LOADING && <LoadingWidget/>}
            {screenState===screenStates.RESULT && <div>Você acertou X questões, parabéns!</div>}
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/luizpkey" />
      </QuizBackground>
    );
}
