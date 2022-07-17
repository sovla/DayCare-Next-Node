import Theme from '@src/assets/global/Theme';
import { SelectProps } from '@src/Type/Atom/Input';
import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  border: 1px solid ${Theme.color.gray_99};
  border-radius: 3px;
  padding: 3px;
`;

const Select: React.FC<SelectProps> = (props) => {
  const { menuList, width, ...selectProps } = props;
  return (
    <StyledSelect
      {...selectProps}
      style={{
        width,
        ...selectProps.style,
      }}
    >
      {menuList.map((v) => (
        <option key={v}>{v}</option>
      ))}
    </StyledSelect>
  );
};

export default Select;
