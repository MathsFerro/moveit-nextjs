import { ChallengesProvider } from '../contexts/ChallengesContext'
import '../styles/global.css'


// Tudo que vai repetir em todas paginas colocar aqui no _app
// Colocamos coisas(componentes) que ficarão fixas na aplicação
// Exibido em todas as telas
function MyApp({ Component, pageProps }) {
  return (   
    <Component {...pageProps} />
  )
}

export default MyApp
