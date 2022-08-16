import Theme from '@src/assets/global/Theme';
import useApi from '@src/CustomHook/useApi';
import { fetchAlarmByUserId } from '@src/Store/alarmState';
import { useAppDispatch, useAppSelector } from '@src/Store/store';
import { deleteAlarmType, readAlarmType } from '@src/Type/API/alarm';
import { objectToQueryString } from '@src/Util';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const slide = keyframes`
0%{
  z-index:-100 ;
  transform: translateY(-100%) ;
}

100%{
  z-index:0 ;
  transform: translateY(0%) ;
}
`;

const StyledAlertModal = styled.div`
  position: fixed;
  right: 30px;
  top: 80px;
  height: fit-content;
  max-height: 580px;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 4000;
  width: 350px;
  padding: 10px 5px;
  border-radius: 16px;
  animation: ${slide} 0.5s forwards;
`;

const StyledAlert = styled.div<{ isRead: boolean }>`
  padding: 10px 10px;
  margin-bottom: 10px;
  box-shadow: 3px 3px 3px 3px #0003;
  border-radius: 10px;
  background-color: ${(p) => (p.isRead ? Theme.color.gray_D9 : '#fff')};
  transition: 0.3s;
  width: 100%;
  p,
  span {
    user-select: none;
  }
  .alarm-subject {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    align-items: center;
  }
  .alarm-title {
    padding: 5px 10px;
    background-color: ${Theme.color.blue_007};
    border-radius: 10px;
    width: fit-content;
    color: #ffffff;
  }
  & > p {
    & > span {
      color: ${Theme.color.gray_C1};
    }
  }

  &:hover {
    opacity: 0.9;
    cursor: pointer;
    background-color: ${Theme.color.blue_25};
  }
  &:active {
    cursor: move;
  }
`;

interface alarm {
  center: { id: number | undefined; lat: number; lon: number };
  content: string;
  id: number;
  join_date: string;
  read_status: number;
  review: {
    id: number | undefined;
  };
  title: string;
  user: { id: number };
}

const Alarm = () => {
  const user = useAppSelector((state) => state.user);
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

  const { api: deleteAlarmApi } = useApi<deleteAlarmType>({
    data: {
      id: user.auth?.id as number,
      alarm_id: 0,
    },
    method: 'delete',
    url: '/alarm',
  });
  const alarmList = useAppSelector((state) => state.alarm.apiAlarmList);

  const ref = useRef<HTMLDivElement[]>(new Array(alarmList.length).fill(null));

  const onClickReview = (v: alarm) => {
    // 알람 이동 종류 4가지
    // 리뷰로 이동 review_id
    // 센터로 이동 center_id

    readAlarmApi({
      alarm_id: v.id,
    }).then(() => {
      dispatch(fetchAlarmByUserId(user.auth?.id as number));
    });
    // 알람 읽은 처리후 알람 리스트 새로 받아오기

    if (v.center?.id) {
      // 센터아이디가 있는경우
      router.push(
        `/map?${objectToQueryString({
          center: v.center.id,
          lat: v.center.lat,
          lon: v.center.lon,
          isReview: true,
        })}`
      );
      return;
    }

    if (v.review?.id) {
      // 게시판으로 이동하는경우
      router.push(`/board/${v.review.id}`);
    }
  };

  const onDragEndAlarm = useCallback(
    (v: any, i: number) => (e: any) => {
      if (e.nativeEvent.pageX - 1540 < -140) {
        ref.current[i].style.opacity = '0';
        deleteAlarmApi({
          alarm_id: v.id,
        }).then((res) => {
          if (res.data.alarm) {
            dispatch(fetchAlarmByUserId(user.auth?.id as number));
          }
        });
        return;
      }
      ref.current[i].style.transform = '';
    },
    [ref]
  );

  return (
    <StyledAlertModal>
      {alarmList.map((v, i) => (
        <StyledAlert
          key={v.id}
          ref={(el) => {
            if (el) {
              ref.current[i] = el;
            }
          }}
          isRead={v.read_status === 1}
          onClick={() => onClickReview(v)}
          onDrag={(e) => {
            ref.current[i].style.transform = `translateX(${
              e.nativeEvent.pageX - 1540
            }px)`;
          }}
          onDragEnd={onDragEndAlarm(v, i)}
          draggable
        >
          <div className="alarm-subject">
            <p className="alarm-title">{v.title}</p>
            <span>{new Date(v.join_date).toISOString().substring(0, 10)}</span>
          </div>

          <p>{v.content}</p>
        </StyledAlert>
      ))}
    </StyledAlertModal>
  );
};

export default Alarm;
