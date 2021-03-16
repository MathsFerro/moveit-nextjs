import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie' // yarn add js-cookie // yarn add @types/js-cookie
import { LevelUpModal } from '../components/LevelUpModal'

// Aula 3 -> 39:20 Explicação Context API

// Dados que vou retornar dentro do contexto
interface ChallengesContextData {
  level: number
  currentExperience: number 
  challengesCompleted: number 
  levelUp: () => void
  startNewChallenge: () => void
  activeChallenge: Challenge
  resetChallenge: () => void
  experienceToNextLevel: number
  completeChallenge: () => void
  closeLevelUpModal: () => void
}

interface Challenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}

interface ChallengesProviderProps {
  children: ReactNode
  level: number
  currentExperience: number
  challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 0)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
   
  const [activeChallenge, setActiveChallenge] = useState(null)

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  // Calculo de RPG para nivel, o 4 indica a "dificuldade"
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  // Salvar no cookies cada vez que o level, currentExperience, challengesCompleted atualiza
  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level+1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play

    // mdn notification -> https://developer.mozilla.org/pt-BR/docs/Web/API/Notification
    if(Notification.permission==='granted') {
      new Notification('Novo desafio! =D', {
        body: `Valendo ${challenge.amount} xp!`
      })
    }
  } 

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if(!activeChallenge)
      return

    const { amount } = activeChallenge
    let finalExperience = currentExperience + amount
    if(finalExperience>=experienceToNextLevel) {
      finalExperience -= experienceToNextLevel
      levelUp()
    }

    setChallengesCompleted(challengesCompleted+1)
    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
  }
 
  return (
    <ChallengesContext.Provider 
      value={{ 
        level,
        currentExperience, 
        experienceToNextLevel,
        challengesCompleted, 
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}

      { isLevelUpModalOpen && <LevelUpModal /> }
      
    </ChallengesContext.Provider>
  ) 
}