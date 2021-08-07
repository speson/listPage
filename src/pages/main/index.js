/** @jsxImportSource @emotion/react */
import { useState } from "react";
// import { useHistory, useParams } from "react-router";
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import Table from "../../components/Table";
import SelectBox from "../../components/SelectBox";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import Dialog from "../../components/Dialog";
import { fetchList, genderList, raceList, ethnicityList } from "../../api";

// 테이블 정보
import { MAIN_TABLE } from "./tableInfo";

export default function Main() {
  // 검색필터 Dialog Open/Close
  const [open, setOpen] = useState(false);

  // 검색필터 input값
  const [searchInputs, setSearchInputs] = useState({
    gender: null,
    race: null,
    ethnicity: null,
    death: null,
    min: null,
    max: null,
  });

  // 검색필터 List 값
  const [inputs, setInputs] = useState({
    gender: null,
    race: null,
    ethnicity: null,
    death: null,
    min: null,
    max: null,
  });

  // 페이지 번호
  const [page, setPage] = useState(1);

  // 페이지당 Row 개수
  const [pageRow, setPageRow] = useState(10);

  // 데이터 정렬관련 컬럼명
  const [align, setAlign] = useState(null);

  // 오름차순 내림차순
  const [orderBy, setOrderBy] = useState(null);

  // 상세페이지 no
  const [detailNo, setDetailNo] = useState(null);

  // 정렬 handler
  const handleAlign = (col) => {
    if (col !== "age") {
      if (align === col) {
        if (orderBy === null) {
          setOrderBy(true);
        } else if (orderBy) {
          setOrderBy(false);
        } else {
          setOrderBy(null);
          setAlign(null);
        }
      } else {
        setAlign(col);
        setOrderBy(true);
      }
    }
  };

  // 상세선택 handler
  const handleDetail = (no) => {
    setDetailNo(no);
  };

  // 검색필터 적용 handler
  const handleSearchFilter = () => {
    setInputs({
      gender: searchInputs.gender,
      race: searchInputs.race,
      ethnicity: searchInputs.ethnicity,
      death: searchInputs.death,
      min: searchInputs.min,
      max: searchInputs.max,
    });
    setOpen(false);
  };

  // 환자 리스트
  const listQuery = useQuery(
    [
      "patient-list",
      {
        page: page,
        length: pageRow,
        order_column: align,
        order_desc: orderBy,
        gender: inputs.gender,
        race: inputs.race,
        ethnicity: inputs.ethnicity,
        age_min: inputs.min,
        age_max: inputs.max,
        death: inputs.death,
      },
    ],
    () =>
      fetchList(
        page,
        pageRow,
        align === "personID"
          ? "person_id"
          : align === "birthDatetime"
          ? "birth"
          : align === "isDeath"
          ? "death"
          : align,
        orderBy,
        inputs.gender,
        inputs.race,
        inputs.ethnicity,
        inputs.age_min,
        inputs.age_max,
        inputs.death
      ),
    { keepPreviousData: true }
  );

  const data = listQuery.isLoading
    ? []
    : listQuery.data.patient.list.map((item) => ({
        ...item,
        idx: item.personID,
        birthDatetime: dayjs(item.birthDatetime).format("YYYY-MM-DD"),
        isDeath: item.isDeath ? "Y" : "N",
      }));

  // 성별 리스트
  const genderQuery = useQuery(["gender-list"], () => genderList());
  const genderOpt = genderQuery.isLoading
    ? []
    : genderQuery.data.genderList.map((d) => ({
        value: d,
        label: d === "M" ? "Male" : "Female",
      }));

  // 인종 리스트
  const raceQuery = useQuery(["race-list"], () => raceList());
  const raceOpt = raceQuery.isLoading ? [] : raceQuery.data.raceList;

  // 민족 리스트
  const ethnicityQuery = useQuery(["ethniciry-list"], () => ethnicityList());
  const ethnicityOpt = ethnicityQuery.isLoading
    ? []
    : ethnicityQuery.data.ethnicityList;

  // 사망여부 옵션
  const isDeathOpt = [
    {
      value: true,
      label: "Y",
    },
    {
      value: false,
      label: "N",
    },
  ];

  if (
    listQuery.isLoading ||
    genderQuery.isLoading ||
    raceQuery.isLoading ||
    ethnicityQuery.isLoading
  ) {
    return <Loading type="load" />;
  }

  return (
    <div css={container}>
      <div css={contents}>
        {/* 페이지당 Row 개수*/}
        <div css={row_select}>
          <Button
            label="검색필터"
            width="135px"
            height="42px"
            border="solid 1px #dddddd"
            borderRadius="5px "
            handleClick={() => setOpen(!open)}
          />
          <SelectBox
            value={pageRow}
            setValue={setPageRow}
            opt={[
              { label: "5개씩", value: 5 },
              { label: "10개씩", value: 10 },
              { label: "15개씩", value: 15 },
              { label: "20개씩", value: 20 },
              { label: "25개씩", value: 25 },
              { label: "30개씩", value: 30 },
            ]}
          />
        </div>

        {/* 테이블 */}
        <Table
          data={data}
          detailNo={detailNo}
          header={MAIN_TABLE}
          page={page}
          setPage={setPage}
          align={align}
          orderBy={orderBy}
          totalCount={
            listQuery.isLoading ? 1 : listQuery.data.patient.totalLength
          }
          handleAlign={handleAlign}
          handleDetail={handleDetail}
        />
      </div>

      <Dialog
        open={open}
        setOpen={setOpen}
        gender={genderOpt}
        race={raceOpt}
        ethnicity={ethnicityOpt}
        death={isDeathOpt}
        inputs={searchInputs}
        setInputs={setSearchInputs}
        handleClick={handleSearchFilter}
      />
    </div>
  );
}

const container = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const contents = css`
  width: 1200px;
  margin-top: 50px;
  height: auto;
`;

const row_select = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
