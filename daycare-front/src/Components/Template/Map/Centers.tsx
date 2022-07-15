import SimpleCenter from '@src/Components/Atom/Center/SimpleCenter';
import { CentersProps } from '@src/Type/Template/Map';
import React from 'react';
import styled from 'styled-components';

const CenterListDiv = styled.div`
  padding: 20px 20px 0px;
  max-height: 900px;
  overflow-y: scroll;
  overflow-x: hidden;
  & > div {
    margin-bottom: 20px;
  }
`;

const Centers: React.FC<CentersProps> = (props) => {
  const { centerList, onClickCenter } = props;

  return (
    <CenterListDiv>
      {centerList.map((v) => (
        <div
          key={v.name + v.address + v.type}
          onClick={() => onClickCenter(v.id)}
        >
          <SimpleCenter {...v} />
        </div>
      ))}
    </CenterListDiv>
  );
};

export default Centers;
