import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { ChallengesContext } from "./ChallengesContext"

interface CountdownContextData {
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  startCountdown: () => void
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode
}

let countdownTimeout: NodeJS.Timeout

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children } : CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60) // Arredondar para baixo
  const seconds = time % 60

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout) // Limpando o timeout ( ou fila do timeout )   
    // Como o isActive vai mudar para false, vai disparar o useEffect novamente ( efeito colateral )
    setIsActive(false)
    setTime(0.1 * 60)  
    setHasFinished(false)
  }

  // useEffect -> Efeitos colaterais, quando algo acontecer executa algo ( dispara algum efeito colateral )
  // 1° Paramêtro -> O que eu quero executar (sempre uma function) 
  // 2° Paramêtro -> Quando quero executar
  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time-1)
      }, 1000) // A cada 1 segundo diminui 1 no Time
    } else if(isActive && time == 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time]) // Vai executar quando o active e o time mudar, nesse caso, como o time está mudando, vai executar a função repetidamente
 

  return(
    <CountdownContext.Provider value = {{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}