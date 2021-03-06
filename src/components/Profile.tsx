import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContext"
import styles from "../styles/components/Profile.module.css"
// O NextJS consegue identificar onde está o icons se estiver em public -> icons 

export function Profile() {
  const { level } = useContext(ChallengesContext)

  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/mathsferro.png" alt="Matheus"/>
    
      <div>
        <strong>Matheus Ferro</strong>
        <p>
          <img src="icons/level.svg" alt="Leve"/>  
          Level {level}
        </p>
      </div>
    </div>
    
  ) 
}
