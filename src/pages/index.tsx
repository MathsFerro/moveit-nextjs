import { CompletedChallenges } from "../components/CompletedChallenges"
import { ChallengeBox } from "../components/ChallengeBox"
import { Countdown } from "../components/Countdown"
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from "../components/Profile"
import { GetServerSideProps } from 'next'

import Head from 'next/head'

import styles from "../styles/pages/Home.module.css"
import { CountdownProvider } from "../contexts/CountdownContext"
import { ChallengesProvider } from "../contexts/ChallengesContext"

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home(props: HomeProps) {
  console.log(props)

  return (
    <ChallengesProvider 
      level={ props.level }
      currentExperience={ props.currentExperience }
      challengesCompleted={ props.challengesCompleted }
    >
      <div className={styles.container}>
        <Head>
          <title>Início - move.it</title>
        </Head>
        <ExperienceBar/>

        <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  ) 
}

// Podemos utilizar isso para carregar as variáveis de uma api, ele espera carregar tudo para depois renderizar o componente acima (Explicacao 20~30min aula 5) 
// Manipular camadas do Next para o Cliente(React)
export const getServerSideProps: GetServerSideProps = async (context) => { // Lado Servidor -> NodeJs // Não roda no browser aqui, é diretamente do servidor node
  
  // Requisicao dos cookies armazenados
  const { level, currentExperience, challengesCompleted } = context.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
