import Document, { DocumentProps, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document<DocumentProps> {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap" rel="stylesheet" />  
          <meta name="Description" content="Faça um desejo, ele pode se realizar! Nesse site você coloca um desejo seu para público, fazendo assim com que alguma alma bondosa possa realiza-lo."></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script data-ad-client="ca-pub-2661401025618183" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;