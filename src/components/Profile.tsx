import styles from "../styles/components/Profile.module.css"
// O NextJS consegue identificar onde está o icons se estiver em public -> icons 

export function Profile() {
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/mathsferro.png" alt="Matheus"/>
    
      <div>
        <strong>Matheus Ferro</strong>
        <p>
          <img src="icons/level.svg" alt="Leve"/>  
          Level 1
        </p>
      </div>
    </div>
    
  ) 
}
