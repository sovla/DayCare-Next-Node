import { SelectProps } from '@src/Type/Atom/Input';
import React from 'react';
import Form from 'react-bootstrap/Form';

const Select: React.FC<SelectProps> = (props) => {
  const { menuList, width, ...FormSelectProps } = props;
  return (
    <Form.Select
      {...FormSelectProps}
      style={{
        width,
        ...FormSelectProps.style,
      }}
    >
      {menuList.map((v) => (
        <option key={v}>{v}</option>
      ))}
    </Form.Select>
  );
};

export default Select;
