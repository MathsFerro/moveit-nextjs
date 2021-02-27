import Document, { Html, Head, Main, NextScript } from 'next/document'

// Document carrega somente uma única vez enquanto o usuário estiver na aplicação.
// Por isso colocamos aqui e não no _app

export default class MyDocument extends Document {
  render() { 
    return(
      <Html>
        <Head>    
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
        </Head>

        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}  