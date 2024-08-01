import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@latest/dist/lenis.min.css"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@latest/dist/lenis.min.js"
          async
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}