/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Pagination from "./Pagination";
import Detail from "../pages/main/detail";

import {
  IoMdArrowDropup as ArrowUp,
  IoMdArrowDropdown as ArrowDown,
} from "react-icons/io";

export default function Table({
  data = [],
  detailNo,
  header,
  page,
  setPage,
  align,
  orderBy,
  totalCount,
  handleDetail,
  handleAlign,
}) {
  return (
    <>
      {/* 테이블 */}
      <table css={{ width: "100%" }}>
        <thead>
          <tr css={table_head_tr}>
            {header.map((d) => (
              <th
                css={d.key !== "age" && table_head_th}
                key={d.key}
                onClick={() => handleAlign(d.key)}
              >
                {d.value}
                {align === d.key &&
                  (orderBy === true ? <ArrowDown /> : <ArrowUp />)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr css={tbody_tr}>
              <td colSpan={header.length}>데이터가 없습니다.</td>
            </tr>
          ) : (
            data.map((row, i) => (
              <>
                <tr
                  key={row.idx}
                  css={[tbody_tr, detailNo === row.idx && tbody_detail]}
                  onClick={() =>
                    handleDetail(detailNo === row.idx ? null : row.idx)
                  }
                >
                  {header.map((h) => (
                    <td key={h.key} width={h.width}>
                      {row[h.key]}
                    </td>
                  ))}
                </tr>
                {detailNo === row.idx && (
                  <tr css={tbody_tr}>
                    <td colSpan={header.length}>
                      <Detail idx={row.idx} />
                    </td>
                  </tr>
                )}
              </>
            ))
          )}
        </tbody>
      </table>

      {/* 페이징 */}
      <div css={page_wrap}>
        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          pageSize={10}
          totalCount={totalCount}
        />
      </div>
    </>
  );
}

const table_head_tr = css`
  height: 50px;
  background-color: #dddddd;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  vertical-align: middle;
`;

const table_head_th = css`
  cursor: pointer;
  &:hover {
    color: #888888;
  }
`;

const tbody_tr = css`
  text-align: center;
  height: 50px;
  border-bottom: 1px solid #dddddd;
  cursor: pointer;
  font-size: 14px;
  background-color: #ffffff;
  color: #000000;
  &:hover {
    background-color: #eeeeee;
  }
`;

const tbody_detail = css`
  border-bottom: none;
`;

const page_wrap = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  position: relative;
`;
