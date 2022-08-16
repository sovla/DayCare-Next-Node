import { useAppSelector } from '@src/Store/store';
import React from 'react';
import styled from 'styled-components';
import Alarm from './Alarm';

const StyledFcmAlarm = styled.div`
  position: fixed;
  right: 30px;
  top: 80px;
  z-index: 4005;
`;

const FcmAlarm = () => {
  const { fcmAlarmList } = useAppSelector((state) => state.alarm);
  return (
    <StyledFcmAlarm>
      {fcmAlarmList.map((v) => (
        <Alarm alarm={v} key={v.messageId} />
      ))}
    </StyledFcmAlarm>
  );
};

export default FcmAlarm;
