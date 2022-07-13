import Theme from '@src/assets/global/Theme';
import { SearchProps } from '@src/Type/Atom/Input';
import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@src/assets/image/SearchIcon.png';
import Image from 'next/image';

const SearchDiv = styled.div<Pick<SearchProps, 'height' | 'width'>>`
  width: ${(p) => p.width ?? '360px'};
  height: ${(p) => p.height ?? '55px'};
  border-radius: 4px;
  color: #000000;
  border: 1px solid ${Theme.color.blue_00};
  display: flex;
  align-items: center;
  padding: 0px 10px;
  background-color: #ffffff;
  & > input::placeholder {
    color: ${Theme.color.gray_99};
  }
  & > input {
    height: 100%;
    width: 100%;
    border: 0px;
    padding: 10px 0px;
    &:focus {
      outline: none;
    }
  }
  & > button {
    padding-left: 5px;
    border: 0px;
    background-color: #fff0;
    & :hover {
      cursor: pointer;
    }
  }
`;

const Search: React.FC<SearchProps> = ({
  inputProps,
  height,
  width,
  onClick,
}) => (
  <SearchDiv width={width} height={height}>
    <input
      placeholder="제목이나 관련정보를 입력해주세요."
      {...inputProps}
      type="text"
    />
    <button type="button" onClick={onClick}>
      <i>
        <Image src={SearchIcon} width={28} height={28} />
      </i>
    </button>
  </SearchDiv>
);

export default Search;
