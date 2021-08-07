import axios, { CancelToken } from "axios";

const baseUrl = "http://49.50.167.136:9871/api";

// 환자 리스트
export const fetchList = async (
  page,
  length,
  order_column,
  order_desc,
  gender,
  race,
  ethnicity,
  age_min,
  age_max,
  death
) => {
  const source = CancelToken.source();
  const promise = await axios
    .get(baseUrl + "/patient/list", {
      params: {
        page,
        length,
        order_column,
        order_desc,
        gender,
        race,
        ethnicity,
        age_min,
        age_max,
        death,
      },
      cancelToken: source.token,
    })
    .then((res) => res.data);
  promise.cancel = () => {
    source.cancel("Query wsa cancelled by React Query");
  };
  return promise;
};

// 성별 리스트
export const genderList = async () => {
  const source = CancelToken.source();
  const promise = await axios
    .get(baseUrl + "/gender/list", {
      params: {},
      cancelToken: source.token,
    })
    .then((res) => res.data);
  promise.cancel = () => {
    source.cancel("Query wsa cancelled by React Query");
  };
  return promise;
};

// 인종 리스트
export const raceList = async () => {
  const source = CancelToken.source();
  const promise = await axios
    .get(baseUrl + "/race/list", {
      params: {},
      cancelToken: source.token,
    })
    .then((res) => res.data);
  promise.cancel = () => {
    source.cancel("Query wsa cancelled by React Query");
  };
  return promise;
};

// 민족 리스트
export const ethnicityList = async () => {
  const source = CancelToken.source();
  const promise = await axios
    .get(baseUrl + "/ethnicity/list", {
      params: {},
      cancelToken: source.token,
    })
    .then((res) => res.data);
  promise.cancel = () => {
    source.cancel("Query wsa cancelled by React Query");
  };
  return promise;
};

// 환자 상세리스트
export const patientDetail = async (person_id) => {
  const source = CancelToken.source();
  const promise = await axios
    .get(baseUrl + `/patient/brief/${person_id}`, {
      params: {},
      cancelToken: source.token,
    })
    .then((res) => res.data);
  promise.cancel = () => {
    source.cancel("Query wsa cancelled by React Query");
  };
  return promise;
};
