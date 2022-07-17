import { Html, Head, Main, NextScript } from 'next/document';

const MainDocument = () => (
  //   static async getInitialProps(ctx) {
  //     const initialProps = await Document.getInitialProps(ctx);
  //     return { ...initialProps };
  //   }

  <Html>
    <Head />
    <body>
      <Main />
      <NextScript />
      <div
        id="modal-root"
        style={{
          position: 'fixed',
          left: '0px',
          top: '0px',
        }}
      />
    </body>
  </Html>
);
export default MainDocument;
