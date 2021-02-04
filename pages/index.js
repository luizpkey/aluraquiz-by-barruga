import React from 'react';
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

export default function Home() {
  const Router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz by Barruga</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Clipper/Harbour</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function(e){
              e.preventDefault();
              Router.push(`/quiz?name=${name}`);
            }}
            >
              <Input  
                 onChange={(e)=>{
                   setName(e.target.value)
                 }}
              placeholder="Diz ai seu nome!"/>
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
      </QuizContainer>
      <QuizContainer>
        <Widget>
          <Widget.Content>
            <h1>Quiz da galera</h1>
            <p>everything ends in c</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/luizpkey" />
    </QuizBackground>
  );
}
