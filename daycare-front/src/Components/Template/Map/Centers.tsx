/* eslint-disable function-paren-newline */
/* eslint-disable no-return-assign */
import SimpleCenter from '@src/Components/Atom/Center/SimpleCenter';
import { CentersProps } from '@src/Type/Template/Map';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const CenterListDiv = styled.div`
  padding: 20px 20px 0px;
  max-height: calc(100vh - 85px);
  overflow-y: scroll;
  overflow-x: hidden;
  & > div {
    margin-bottom: 20px;
  }
`;

const Centers: React.FC<CentersProps> = (props) => {
  const { centerList, onClickCenter, selectCenter } = props;

  const ref = useRef<any>();
  const refs = useRef<HTMLDivElement[]>(new Array(centerList.length));

  useEffect(() => {
    if (ref.current && selectCenter) {
      const findDiv = refs.current.find((v) =>
        v.innerHTML.includes(selectCenter.name)
      );

      if (findDiv) {
        ref.current.scrollTo({
          top: findDiv.offsetTop - 15 - findDiv.offsetHeight / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [selectCenter]);

  return (
    <CenterListDiv ref={ref}>
      {centerList.map((v, i) => (
        <div
          key={v.name + v.address + v.type}
          onClick={() => onClickCenter(v.id)}
          ref={(el) => {
            if (el) {
              refs.current[i] = el;
            }
          }}
        >
          <SimpleCenter {...v} />
        </div>
      ))}
    </CenterListDiv>
  );
};

export default Centers;
