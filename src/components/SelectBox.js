/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

export default function SelectBox({ value, setValue, opt, ...props }) {
  return (
    <select
      css={[container, { ...props }]}
      value={value}
      onChange={(v) => setValue(v.target.value)}
    >
      {opt.map((d) => (
        <option key={d.value} value={d.value}>
          {d.label}
        </option>
      ))}
    </select>
  );
}

const container = css`
  width: 135px;
  height: 42px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 0 16px;
  font-size: 15px;
  color: #595959;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  ::ms-expand {
    display: none;
  }
  background: url("/images/select_down.svg") no-repeat calc(100% - 10px) 50%;
`;
