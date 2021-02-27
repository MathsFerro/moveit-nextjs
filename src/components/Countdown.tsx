import styles from '../styles/components/Countdown.module.css'
import { useState, useEffect } from 'react'

// useEffect -> Efeitos colaterais, quando algo acontecer executa algo ( dispara algum efeito colateral )

export function Countdown() {
  const [time, setTime] = useState(25 * 60)
  const [active, setActive] = useState(false)

  const minutes = Math.floor(time / 60) // Arredondar para baixo
  const seconds = time % 60

  // 25 -> '25' -> split('') -> ['2', '5']
  // 5 -> '5' -> padStart vai verificar se a string n tiver 2 caracteres, vai preencher o restante da esquerda com 0 -> '05' split-> ['0', '5']
 
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown() {
    setActive(true)


  }

  // 1° Paramêtro -> O que eu quero executar (sempre uma function)
  // 2° Paramêtro -> Quando quero executar
  useEffect(() => {
    if(active && time > 0){
      setTimeout(() => {
        setTime(time-1)
      }, 1000) // A cada 1 segundo diminui 1 no Time
    }
  }, [active, time]) // Vai executar quando o active e o time mudar, nesse caso, como o time está mudando, vai executar a função repetidamente

  return(
    <div>
      <div className={styles.countdownContainer}> 
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      <button type="button" className={styles.countdownButton} onClick={startCountdown}>
        Iniciar um ciclo
      </button>
    </div>
  )
}