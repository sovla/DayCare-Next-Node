/* eslint-disable react/jsx-props-no-spreading */

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import wrapper from '@src/Store/store';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(MyApp);
