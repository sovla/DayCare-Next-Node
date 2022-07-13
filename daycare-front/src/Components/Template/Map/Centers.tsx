import SimpleCenter from '@src/Components/Atom/Center/SimpleCenter';
import { CentersProps } from '@src/Type/Template/Map';
import React from 'react';
import styled from 'styled-components';

const CenterListDiv = styled.div`
  padding: 20px 20px 0px;
  & > div {
    margin-bottom: 20px;
  }
`;

const Centers: React.FC<CentersProps> = (props) => {
  const { centerList } = props;
  return (
    <CenterListDiv>
      {centerList.map((v) => (
        <SimpleCenter key={v.name} {...v} />
      ))}
    </CenterListDiv>
  );
};

export default Centers;
