/* eslint-disable react/jsx-props-no-spreading */

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import wrapper, { useAppDispatch } from '@src/Store/store';
import { useSelector } from 'react-redux';
import { changeUser } from '@src/Store/userState';
import { useCallback, useEffect } from 'react';
import API from '@src/API';
import { AxiosResponse } from 'axios';
import { sessionLoginType } from '@src/Type/API/session';
import useError from '@src/CustomHook/useError';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { changeToken } from '@src/Store/tokenState';
import type { RootState } from '@src/Store/store';
import {
  addFcmAlarm,
  deleteFcmAlarm,
  fcmAlarm,
  fetchAlarmByUserId,
} from '@src/Store/alarmState';
import FcmAlarm from '@src/Components/Template/Modal/FcmAlarm';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { user } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const { ErrorModal } = useError();

  const onMessageHandler = useCallback(
    (messaging: any) => {
      onMessage(messaging, (payload) => {
        if (payload && payload.data?.id) {
          const fcmAlarmPayload = payload as fcmAlarm;
          dispatch(addFcmAlarm(fcmAlarmPayload));
          // FCM Alarm에 추가
          dispatch(fetchAlarmByUserId(user.auth?.id as number));
          // Alarm 리스트 새로 불러오기

          setTimeout(() => {
            dispatch(deleteFcmAlarm(fcmAlarmPayload));
          }, 5000);
          // 5초뒤 FCM Alarm 제거
        }
      });
    },
    [dispatch, user.auth?.id]
  );

  const getTokenString = useCallback(async () => {
    const result = await Notification.requestPermission();
    let tokenString = null;
    if (result === 'granted') {
      const messaging = getMessaging(app);

      tokenString = await getToken(messaging, {
        vapidKey: process.env.FIREBASE_VAPIDKEY,
      });
      onMessageHandler(messaging);
      if (tokenString) {
        dispatch(changeToken(tokenString));
      }

      return tokenString;
    }
    alert('알림 허용을 해주시면 다양한 기능을 이용하실 수 있습니다.');
    return null;
  }, [dispatch, onMessageHandler]);

  const silentLogin = useCallback(
    async (tokenString: null | string) => {
      if (!user.auth) {
        await API.post('/session', {
          token: tokenString,
        })
          .then((response: AxiosResponse<sessionLoginType['response']>) => {
            if (response.data.statusCode === 200) {
              dispatch(changeUser(response.data.user));
            }
          })
          .catch((err) => err);
      }
    },
    [dispatch, user.auth]
  );

  useEffect(() => {
    (async () => {
      await silentLogin(await getTokenString());
    })();
  }, []);

  useEffect(() => {
    if (user.auth) {
      dispatch(fetchAlarmByUserId(user.auth.id)).unwrap();
    }
  }, [user.auth]);

  return (
    <>
      <Component {...pageProps} />
      <ErrorModal />
      <FcmAlarm />
    </>
  );
};

export default wrapper.withRedux(MyApp);
