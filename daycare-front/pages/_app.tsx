/* eslint-disable react/jsx-props-no-spreading */

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import wrapper from '@src/Store/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser, selectUser } from '@src/Store/userState';
import { useEffect } from 'react';
import API from '@src/API';
import { AxiosResponse } from 'axios';
import { sessionLoginType } from '@src/Type/API/session';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.auth) {
      API.post('/session').then(
        (response: AxiosResponse<sessionLoginType['response']>) => {
          if (response.data.statusCode === 200) {
            dispatch(changeUser(response.data.user));
          }
        }
      );
    }
  }, []);

  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
