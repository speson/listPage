/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import { patientDetail } from "../../api";
import Loading from "../../components/Loading";

export default function Detail({ idx }) {
  const detailQuery = useQuery(["detail", idx], () => patientDetail(idx), {
    keepPreviousData: false,
  });

  if (detailQuery.isLoading) {
    return <Loading type="detail" />;
  }

  return (
    <div css={container}>
      <div css={wrap}>
        <div css={title}>Condition List</div>
        {detailQuery.data.conditionList.map((d) => (
          <div key={d} css={sub}>
            {d}
          </div>
        ))}
      </div>
      <div css={wrap}>
        <div css={title}>Visit Count : {detailQuery.data.visitCount}</div>
      </div>
    </div>
  );
}

const container = css`
  height: auto;
  padding: 10px 50px;
  display: flex;
`;

const wrap = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 500px;
`;

const title = css`
  display: flex;
  font-weight: bold;
  margin-bottom: 10px;
`;

const sub = css`
  color: #333333;
  display: flex;

  & + & {
    margin-top: 5px;
  }
`;
