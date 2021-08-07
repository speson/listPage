/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Button from "./Button";
import { GrClose as CloseIcon } from "react-icons/gr";
import Input from "./InputText";

export default function Dialog({
  open = false,
  setOpen,
  gender,
  race,
  ethnicity,
  death,
  inputs,
  setInputs,
  handleClick,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <>
      <ModalOverlay open={open} />
      <ModalWrapper
        open={open}
        tabIndex="-1"
        onClick={open ? onMaskClick : null}
      >
        <ModalInner tabIndex="0">
          <div css={closeBtn} onClick={() => setOpen(false)}>
            <CloseIcon />
          </div>
          <div css={content}>
            <div css={title}>검색 필터</div>
            <div css={divider} />

            <div css={{ display: "flex" }}>
              <div css={selectWrap}>
                <div css={subTitle}>성별</div>
                <div>
                  {gender.map((d) => (
                    <div
                      css={[subItems, inputs.gender === d.value && active]}
                      key={d.value}
                      onClick={() =>
                        setInputs({
                          ...inputs,
                          gender: inputs.gender === d.value ? null : d.value,
                        })
                      }
                    >
                      <img
                        src={
                          inputs.gender === d.value
                            ? "/images/check_on.svg"
                            : "/images/check_off.svg"
                        }
                        alt=""
                      />
                      {d.label}
                    </div>
                  ))}
                </div>
              </div>

              <div css={selectWrap}>
                <div css={subTitle}>나이</div>
                <div css={ageInput}>
                  최소
                  <Input
                    value={inputs.min}
                    type="number"
                    placeHolder="최소값"
                    width="80px"
                    height="30px"
                    border="solid 1px #dddddd"
                    borderRadius="5px"
                    padding="0 5px"
                    fontSize="16px"
                    marginLeft="5px"
                    handleChange={(e) =>
                      setInputs({ ...inputs, min: e.target.value })
                    }
                  />
                </div>
                <div css={ageInput}>
                  최대
                  <Input
                    value={inputs.max}
                    type="number"
                    placeHolder="최대값"
                    width="80px"
                    height="30px"
                    border="solid 1px #dddddd"
                    borderRadius="5px"
                    padding="0 5px"
                    fontSize="16px"
                    marginLeft="5px"
                    handleChange={(e) =>
                      setInputs({ ...inputs, max: e.target.value })
                    }
                  />
                </div>
              </div>

              <div css={selectWrap}>
                <div css={subTitle}>인종</div>
                <div>
                  {race.map((d) => (
                    <div
                      css={subItems}
                      key={d}
                      onClick={() =>
                        setInputs({
                          ...inputs,
                          race: inputs.race === d ? null : d,
                        })
                      }
                    >
                      <img
                        src={
                          inputs.race === d
                            ? "/images/check_on.svg"
                            : "/images/check_off.svg"
                        }
                        alt=""
                      />
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              <div css={selectWrap}>
                <div css={subTitle}>민족</div>
                <div>
                  {ethnicity.map((d) => (
                    <div
                      css={subItems}
                      key={d}
                      onClick={() =>
                        setInputs({
                          ...inputs,
                          ethnicity: inputs.ethnicity === d ? null : d,
                        })
                      }
                    >
                      <img
                        src={
                          inputs.ethnicity === d
                            ? "/images/check_on.svg"
                            : "/images/check_off.svg"
                        }
                        alt=""
                      />
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              <div css={selectWrap}>
                <div css={subTitle}>사망여부</div>
                <div>
                  {death.map((d) => (
                    <div
                      css={subItems}
                      key={d.value}
                      onClick={() =>
                        setInputs({
                          ...inputs,
                          death: inputs.death === d.value ? null : d.value,
                        })
                      }
                    >
                      <img
                        src={
                          inputs.death === d.value
                            ? "/images/check_on.svg"
                            : "/images/check_off.svg"
                        }
                        alt=""
                      />
                      {d.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div css={btnGroup}>
            <div css={btnWrap}>
              <Button
                label="초기화"
                width="180px"
                height="50px"
                fontSize="16px"
                fontWeight="bold"
                backgroundColor="#dddddd"
                handleClick={() =>
                  setInputs({
                    gender: null,
                    race: null,
                    ethnicity: null,
                    min: null,
                    max: null,
                    death: null,
                  })
                }
              />
              <Button
                label="필터 적용"
                width="180px"
                height="50px"
                fontSize="16px"
                fontWeight="bold"
                border="solid 1px #dddddd"
                handleClick={handleClick}
              />
            </div>
          </div>
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: 800px;
  min-width: 80px;
  height: auto;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px;

  :focus {
    outline: none;
  }
`;

const btnGroup = css`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const btnWrap = css`
  display: flex;
  width: 380px;
  justify-content: space-between;
`;

const closeBtn = css`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
`;

const content = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 50px;
`;

const title = css`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
`;

const subTitle = css`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333333;
`;

const divider = css`
  width: 100%;
  height: 2px;
  background-color: #dddddd;
  margin: 10px 0 20px 0;
`;

const selectWrap = css`
  width: 150px;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const subItems = css`
  heigth: 18px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #999999;
  cursor: pointer;
  margin-bottom: 5px;

  > img {
    margin-right: 5px;
    width: 16px;
  }

  &:hover {
    color: #000000;
  }
`;

const ageInput = css`
  display: flex;
  height: 30px;
  align-items: center;
  font-size: 16px;
  color: #999999;

  & + & {
    margin-top: 10px;
  }
`;

const active = css`
  color: #000000;
`;
