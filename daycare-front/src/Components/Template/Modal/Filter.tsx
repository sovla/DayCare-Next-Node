/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { city } from '@src/assets/global/Dummy';
import Theme from '@src/assets/global/Theme';
import BlueButton from '@src/Components/Atom/Button/BlueButton';
import CheckBox from '@src/Components/Atom/Input/CheckBox';
import InputText from '@src/Components/Atom/Input/InputText';
import Select from '@src/Components/Atom/Input/Select';
import { ModalProps } from '@src/CustomHook/useAuth';
import { FilterProps } from '@src/Type/Template/Modal';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';

const StyledModalOverlay = styled.div<ModalProps>`
  display: ${(p) => (p.isShow ? 'flex' : 'none')};
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 2000;
  width: 100vw;
  height: 100vh;

  justify-content: center;
  align-items: center;
  background-color: #0003;
  .modal-content {
    position: relative;
    width: 1200px;
    background-color: #fff;
    border-radius: 16px;
    padding: 20px 0px 0px 20px;
    & .filter-row {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      & > p {
        font-size: 20px;
        width: 80px;
      }
    }
    & .last-button {
      display: flex;
      justify-content: flex-end;
      padding-right: 50px;
      margin-bottom: 30px;
      & > button {
        width: 80px;
        height: 50px;
        margin-left: 20px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
  .close-button {
    width: 50px;
    height: 50px;
    background-color: #fff;
    position: absolute;
    right: -70px;
    top: 10px;
    z-index: 2010;
    font-size: 30px;
    font-weight: bold;
    border-radius: 16px;
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      background-color: ${Theme.color.blue_00};
    }
  }
`;

const Filter: React.FC<FilterProps> = (props) => {
  const { isShow, setIsShow, returnFilter, filter } = props;

  const [type, setType] = useState<string[]>(filter?.type);
  const [selectCity, setSelectCity] = useState<string>(filter?.city ?? '선택');
  const [selectCityDetail, setSelectCityDetail] = useState<string>(
    filter?.cityDetail ?? '선택'
  );
  const [personnel, setPersonnel] = useState<number | null>(
    filter?.personnel === null ? null : filter?.personnel ? 1 : 2
  );
  const [characteristic, setCharacteristic] = useState<string[]>(
    filter.characteristic
  );
  const [classType, setClassType] = useState<string[]>(filter?.classType);
  const [employeeCount, setEmployeeCount] = useState<number | null>(
    filter?.employeeCount
  );
  const [employee, setEmployee] = useState<string[]>(filter?.employee);

  const menuList = useMemo(
    () => ({
      type: [
        '협동',
        '직장',
        '사회복지법인',
        '법인·단체등',
        '민간',
        '국공립',
        '가정',
      ],
      city,
      characteristic: [
        '일반',
        '영아전담',
        '장애아전담',
        '장애아통합',
        '방과후전담',
        '방과후통합',
        '시간연장',
        '휴일보육',
        '24시간',
      ],
      classType: ['0세', '1세', '2세', '3세', '4세', '5세'],
      employee: [
        '보육교사',
        '특수교사',
        '치료교사',
        '영양사',
        '조리원',
        '간호사',
        '간호조무사',
      ],
    }),
    []
  );

  const cityDetailList = Object.entries(menuList.city).find(
    ([key, values]) => key === selectCity
  )?.[1];

  const onChangeCheckBox = useCallback(
    (
        setFunction: React.Dispatch<React.SetStateAction<string[]>>,
        value: string
      ) =>
      (check: boolean) => {
        // checkBox 선택 해주는 고차함수 값이 있을경우 제거 없을경우 추가
        setFunction((prev) => {
          if (check) {
            return prev.filter((fv) => fv !== value);
          }
          return [...prev, value];
        });
      },
    []
  );

  const returnFilterHandle = () => {
    const personnelBoolean =
      personnel === 1 ? true : personnel === 2 ? false : null;
    //  정원 가득참 : true  자리남음 : false  선택안함 : null

    returnFilter({
      type,
      characteristic,
      city: selectCity === '선택' ? null : selectCity,
      cityDetail: selectCityDetail === '선택' ? null : selectCityDetail,
      classType,
      employee,
      employeeCount,
      personnel: personnelBoolean,
    });
  };

  const onClickReset = useCallback(() => {
    setType([]);
    setSelectCity('선택');
    setSelectCityDetail('선택');
    setPersonnel(null);
    setCharacteristic([]);
    setClassType([]);
    setEmployeeCount(null);
    setEmployee([]);
  }, []);

  useEffect(() => {
    // console.log(type, 'type');
  }, [type]);
  return (
    <StyledModalOverlay isShow={isShow}>
      <div className="modal-content">
        <div className="filter-row">
          <p>유형</p>
          {menuList.type.map((v, i) => (
            <CheckBox
              key={v}
              content={v}
              isCheck={type.includes(v)}
              setIsCheck={onChangeCheckBox(setType, v)}
            />
          ))}
        </div>
        <div className="filter-row">
          <p>지역</p>
          <Select
            menuList={['선택', ...Object.keys(menuList.city)]}
            width="200px"
            onChange={(e) => setSelectCity(e.target.value)}
            value={selectCity}
            style={{
              marginRight: '20px',
            }}
          />
          <Select
            menuList={
              Array.isArray(cityDetailList)
                ? ['선택', ...cityDetailList]
                : ['선택']
            }
            width="200px"
            onChange={(e) => setSelectCityDetail(e.target.value)}
            value={selectCityDetail}
          />
        </div>

        {/* <div className="filter-row">
          <p>정원</p>
          {menuList.personnel.map((v, i) => (
            <CheckBox
              key={v}
              content={v}
              isCheck={personnel === i + 1}
              setIsCheck={(check) => {
                setPersonnel(check ? null : i + 1);
              }}
            />
          ))}
        </div> */}

        <div className="filter-row">
          <p>특성</p>
          {menuList.characteristic.map((v, i) => (
            <CheckBox
              key={v}
              content={v}
              isCheck={characteristic.includes(v)}
              setIsCheck={onChangeCheckBox(setCharacteristic, v)}
            />
          ))}
        </div>
        <div className="filter-row">
          <p>반</p>
          {menuList.classType.map((v, i) => (
            <CheckBox
              key={v}
              content={v}
              isCheck={classType.includes(v)}
              setIsCheck={onChangeCheckBox(setClassType, v)}
            />
          ))}
        </div>
        <div className="filter-row">
          <p>교직원 수</p>
          <InputText
            type="number"
            value={employeeCount ?? undefined}
            onChange={(e) => setEmployeeCount(+e.target.value)}
            placeholder="교직원 수를 입력해주세요   ."
          />
        </div>
        <div className="filter-row">
          <p>교직원</p>
          {menuList.employee.map((v, i) => (
            <CheckBox
              key={v}
              content={v}
              isCheck={employee.includes(v)}
              setIsCheck={onChangeCheckBox(setEmployee, v)}
            />
          ))}
        </div>
        <div className="last-button">
          <BlueButton
            content="적용"
            buttonProps={{
              onClick: returnFilterHandle,
            }}
          />
          <BlueButton
            content="리셋"
            buttonProps={{
              onClick: onClickReset,
              style: {
                backgroundColor: 'red',
              },
            }}
          />
        </div>
        <button
          onClick={() => setIsShow(false)}
          type="button"
          className="close-button"
        >
          X
        </button>
      </div>
    </StyledModalOverlay>
  );
};

export default Filter;
