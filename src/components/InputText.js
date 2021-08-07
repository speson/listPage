/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

export const InputText = ({
  type,
  value,
  name,
  placeHolder,
  disabled = false,
  handleChange,
  keyPress,
  ...props
}) => {
  return (
    <div css={{ position: "relative" }}>
      <input
        css={[inputs, { ...props }]}
        type={type}
        value={value || ""}
        name={name}
        placeholder={placeHolder}
        onChange={handleChange}
        disabled={disabled}
        onKeyPress={keyPress}
      />
    </div>
  );
};

const inputs = css`
  width: 100px;
  height: 30px;
  padding: 0;
  box-sizing: border-box;
  border: none;
  font-size: 18px;
  ::placeholder {
    color: #e9e9e9;
  }
  :disabled {
    border: none;
    background-color: #ffffff;
  }
  :focus {
    outline: none;
  }
`;

export default InputText;
