import Theme from '@src/assets/global/Theme';
import useApi from '@src/CustomHook/useApi';
import { fcmAlarm, fetchAlarmByUserId } from '@src/Store/alarmState';
import { useAppDispatch, useAppSelector } from '@src/Store/store';
import { selectUser } from '@src/Store/userState';
import { readAlarmType } from '@src/Type/API/alarm';
import { objectToQueryString } from '@src/Util';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

const closeSlide = keyframes`
0%{
    width:100%;
}
100%{
    width:0%;
}
`;

const upSideDown = keyframes`
0%{
    transform:rotateX(180deg);
}
100%{
    transform:rotateX(0deg);
}
`;

const StyledAlarm = styled.div`
  min-width: 300px;
  width: max-content;
  height: 60px;
  background-color: ${Theme.color.yellow_FFE};
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 10px;

  animation: ${upSideDown} 0.5s forwards;
  box-shadow: 3px 3px 3px 3px #0003;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  & * {
    user-select: none;
  }
  & > p {
    padding: 20px;
  }
  & > button {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  & > .close-line {
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 4px;
    background-color: #fff;
    animation: ${closeSlide} 5s;
  }
`;

const Alarm: React.FC<{
  alarm: fcmAlarm;
}> = (props) => {
  const { alarm } = props;
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { api: readAlarmApi } = useApi<readAlarmType>({
    data: {
      alarm_id: 0,
      id: user.auth?.id as number,
    },
    method: 'patch',
    url: '/alarm',
  });

  const onClickAlarm = useCallback(() => {
    readAlarmApi({
      alarm_id: +alarm.data.id,
    }).then(() => {
      dispatch(fetchAlarmByUserId(user.auth?.id as number));
    });
    // 알람 읽은 처리후 알람 리스트 새로 받아오기

    if (alarm.data?.center_id) {
      // 센터아이디가 있는경우

      router.push(
        `/map?${objectToQueryString({
          center: alarm.data.center_id,
          lat: alarm.data.center_lat,
          lon: alarm.data.center_lon,
          isReview: true,
        })}`
      );

      return;
    }

    if (alarm.data.review_id) {
      // 게시판으로 이동하는경우
      router.push(`/board/${alarm.data.review_id}`);
    }
  }, [alarm]);

  return (
    <StyledAlarm onClick={onClickAlarm}>
      <p>{alarm.notification.body}</p>
      <div className="close-line" />
    </StyledAlarm>
  );
};

export default Alarm;
