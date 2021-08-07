/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Loader from "react-spinners/RingLoader";

export default function Loading({ type }) {
  return (
    <>
      {type === "load" && (
        <div css={load}>
          {/* <PacmanLoader color="#2b6126" loading={true} size={25} margin={2} /> */}
          <Loader color="#36d7b7" loading={true} size={60} />
        </div>
      )}
      {type === "detail" && (
        <div css={detailLoad}>
          {/* <PacmanLoader color="#2b6126" loading={true} size={25} margin={2} /> */}
          <Loader color="#36d7b7" loading={true} size={60} />
        </div>
      )}
      {type === "upload" && (
        <div css={uploadUi}>
          <div css={upload}>
            {/* <PacmanLoader color="#2b6126" loading={true} size={25} margin={2} /> */}
            <Loader color="#36d7b7" loading={true} size={60} />
          </div>
        </div>
      )}
    </>
  );
}

const load = css`
  display: flex;
  width: 100vw;
  height: 100vh;
  border-color: #2b6126;
  align-items: center;
  justify-content: center;
`;
const detailLoad = css`
  display: flex;
  width: 1200px;
  height: 200px;
  border-color: #2b6126;
  align-items: center;
  justify-content: center;
`;

const uploadUi = css`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const upload = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
