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
    & > .close-button {
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

  @media (max-width: 768px) {
    overflow: scroll;
    max-width: 100vw;
    min-width: 320px;
    * {
      transition: 0.3s;
    }
    .modal-content {
      position: fixed;
      top: 10vh;
      left: 0;
      min-width: 320px;
      width: 100vw;
      max-width: 100vw;
      height: 90vh;
      overflow-y: scroll;
      background-color: #fff;
      border-radius: 16px;
      padding: 20px 20px;
      & > .close-button {
        width: 40px;
        height: 40px;
        position: fixed;
        right: 10px;
        top: 10px;
        z-index: 2010;
        font-size: 30px;
        font-weight: bold;
      }
    }
    span,
    div,
    a {
      width: max-content;
    }
    .filter-row {
      flex-wrap: wrap;
      max-width: 100%;
      padding-right: 10px;
      & > p {
        line-height: 25px;
        width: 100% !important;
        margin-bottom: 10px;
      }
    }
  }
`;

const Filter: React.FC<FilterProps> = (props) => {
  const { isShow, setIsShow, returnFilter, filter } = props;

  const [type, setType] = useState<string[]>(filter?.type);
  const [selectCity, setSelectCity] = useState<string>(filter?.city ?? '??????');
  const [selectCityDetail, setSelectCityDetail] = useState<string>(
    filter?.cityDetail ?? '??????'
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
        '??????',
        '??????',
        '??????????????????',
        '?????????????????',
        '??????',
        '?????????',
        '??????',
      ],
      city,
      characteristic: [
        '??????',
        '????????????',
        '???????????????',
        '???????????????',
        '???????????????',
        '???????????????',
        '????????????',
        '????????????',
        '24??????',
      ],
      classType: ['0???', '1???', '2???', '3???', '4???', '5???'],
      employee: [
        '????????????',
        '????????????',
        '????????????',
        '?????????',
        '?????????',
        '?????????',
        '???????????????',
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
        // checkBox ?????? ????????? ???????????? ?????? ???????????? ?????? ???????????? ??????
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
    //  ?????? ????????? : true  ???????????? : false  ???????????? : null

    returnFilter({
      type,
      characteristic,
      city: selectCity === '??????' ? null : selectCity,
      cityDetail: selectCityDetail === '??????' ? null : selectCityDetail,
      classType,
      employee,
      employeeCount,
      personnel: personnelBoolean,
    });
  };

  const onClickReset = useCallback(() => {
    setType([]);
    setSelectCity('??????');
    setSelectCityDetail('??????');
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
          <p>??????</p>
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
          <p>??????</p>
          <Select
            menuList={['??????', ...Object.keys(menuList.city)]}
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
                ? ['??????', ...cityDetailList]
                : ['??????']
            }
            width="200px"
            onChange={(e) => setSelectCityDetail(e.target.value)}
            value={selectCityDetail}
          />
        </div>

        {/* <div className="filter-row">
          <p>??????</p>
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
          <p>??????</p>
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
          <p>???</p>
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
          <p>????????? ???</p>
          <InputText
            type="number"
            value={employeeCount ?? undefined}
            onChange={(e) => setEmployeeCount(+e.target.value)}
            placeholder="????????? ?????? ??????????????????   ."
          />
        </div>
        <div className="filter-row">
          <p>?????????</p>
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
            content="??????"
            buttonProps={{
              onClick: returnFilterHandle,
            }}
          />
          <BlueButton
            content="??????"
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
