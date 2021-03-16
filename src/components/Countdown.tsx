import styles from '../styles/components/Countdown.module.css'
import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'

/*

  // if then
  { isActive && ( ) }

  // if else
  { isActive ? ( ) : ( ) }

  // Fragment, mesma coisa que div porém não aparece lá no html, seve para resolver o problema do (linha 20) 
  <> </>

  // if else{ if else }
  { hasFinished ? (  ) : ( <> { isActive ?  ( ) : (  )} </> )}

*/

export function Countdown() {

  const { 
    minutes, 
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown 
  } = useContext(CountdownContext)

  // 25 -> '25' -> split('') -> ['2', '5']
  // 5 -> '5' -> padStart vai verificar se a string n tiver 2 caracteres, vai preencher o restante da esquerda com 0 -> '05' split-> ['0', '5']
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  
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

      
      { hasFinished ? (
        <button className={styles.countdownButton} disabled>
          Ciclo encerrado
        </button>
      ) : (
        <>
          { isActive ? (
            <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>
              Abandonar ciclo
            </button>
            ) : (
            <button type="button" className={styles.countdownButton} onClick={startCountdown}>
              Iniciar um ciclo
            </button>
          )}
        </>
      )}

 
    </div>
  )
}