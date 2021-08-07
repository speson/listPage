/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { darken, lighten } from "polished";

export default function Pagination({
  currentPage,
  setCurrentPage,
  pageSize,
  totalCount,
}) {
  // 페이지 버튼 리스트 출력 개수
  const PAGE_DEPTH = 10;

  // 현재 페이지
  const NOW_PAGE_BLOCK = Math.ceil(currentPage / pageSize);

  // 총 페이지 수
  const PAGINATION = Math.ceil(totalCount / pageSize);

  // 페이지 시작 index
  // const startPageIndex = (NOW_PAGE_BLOCK - 1) * pageSize + 1;
  const startPageIndex = (NOW_PAGE_BLOCK - 1) * pageSize + 1;

  // 페이지 마지막 index
  const lastPageIndex =
    NOW_PAGE_BLOCK * PAGE_DEPTH <= PAGINATION
      ? NOW_PAGE_BLOCK * PAGE_DEPTH
      : PAGINATION;

  const numberList = [];
  for (let i = startPageIndex; i <= lastPageIndex; i++) {
    numberList.push(i);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleLastPage = () => {
    setCurrentPage(PAGINATION);
  };

  return (
    <>
      {totalCount > pageSize && (
        <div css={container}>
          <ul css={pageWrap}>
            {totalCount > pageSize && (
              <>
                <li
                  onClick={currentPage !== 1 ? handleFirstPage : null}
                  css={arrowWrap}
                >
                  <img
                    src={
                      currentPage === 1
                        ? "/images/first-arrow-off.svg"
                        : "/images/first-arrow-on.svg"
                    }
                    css={currentPage !== 1 && arrow}
                    alt=""
                  />
                </li>
                <li
                  onClick={currentPage !== 1 ? handlePrevPage : null}
                  css={arrowWrap}
                >
                  <img
                    src={
                      currentPage === 1
                        ? "/images/prev-arrow-off.svg"
                        : "/images/prev-arrow-on.svg"
                    }
                    css={currentPage !== 1 && arrow}
                    alt=""
                  />
                </li>
              </>
            )}
            {numberList.map((d, i) => (
              <li
                key={d + "_" + i}
                onClick={() => handlePageChange(d)}
                css={buttonWrap}
              >
                <div css={[buttons, d === currentPage && buttonsActive]}>
                  {d}
                </div>
              </li>
            ))}
            {totalCount > pageSize && (
              <>
                <li
                  onClick={currentPage !== PAGINATION ? handleNextPage : null}
                  css={arrowWrap}
                >
                  <img
                    src={
                      currentPage === PAGINATION
                        ? "/images/next-arrow-off.svg"
                        : "/images/next-arrow-on.svg"
                    }
                    css={currentPage !== PAGINATION && arrow}
                    alt=""
                  />
                </li>
                <li
                  onClick={currentPage !== PAGINATION ? handleLastPage : null}
                  css={arrowWrap}
                >
                  <img
                    src={
                      currentPage === PAGINATION
                        ? "/images/last-arrow-off.svg"
                        : "/images/last-arrow-on.svg"
                    }
                    css={currentPage !== PAGINATION && arrow}
                    alt=""
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

const container = css`
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

const pageWrap = css`
  list-style: none;
  display: flex;
  padding: 0;
`;

const arrowWrap = css`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const arrow = css`
  cursor: pointer;
`;

const buttons = css`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${darken(0.1, "#ffffff")};
  }
`;

const buttonWrap = css`
  width: 40px;
  height: 30px;
  display: flex;
  justify-content: center;
`;

const buttonsActive = css`
  background-color: #000000;
  color: #ffffff;
  &:hover {
    background-color: ${lighten(0.1, "#000000")};
  }
`;
