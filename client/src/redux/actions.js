import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DETAIL = "GET_DETAIL";
export const RESET_DETAIL = "RESET_DETAIL";
export const SET_PAGE = "SET_PAGE";
export const RESET_DOGS = "RESET_DOGS";
export const SEARCH_NAME = "SEARCH_NAME";
export const FILTER_DOGS = "FILTER_DOGS";
export const ORDER_DOGS = "ORDER_DOGS";

export function getDogs() {
  return (dispatch) => {
    return axios("/dogs").then((data) =>
      dispatch({ type: GET_DOGS, payload: data.data })
    );
    //   .catch((error) => alert(error.message));
  };
}

export function getTemperaments() {
  return (dispatch) => {
    return axios("/temperaments")
      .then((data) => dispatch({ type: GET_TEMPERAMENTS, payload: data.data }))
      .catch((error) => alert(error.message));
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const data = await axios(`/dogs/${id}`);
      dispatch({ type: GET_DETAIL, payload: data.data });
    } catch (error) {
      alert("We could´t find this detail" + error.message);
    }
  };
}

export function resetDetail() {
  return { type: RESET_DETAIL };
}

export function setPage(page) {
  return { type: SET_PAGE, payload: page };
}

export function resetDogs() {
  return { type: RESET_DOGS };
}

export function searchName(name) {
  return async function (dispatch) {
    try {
      const data = await axios.get(`/dogs`, { params: { name } });
      dispatch({ type: SEARCH_NAME, payload: data.data });
    } catch (error) {
      alert(error.request.response);
      dispatch({ type: RESET_DOGS });
    }
  };
}

export function filterDogs(filter) {
  return { type: FILTER_DOGS, payload: filter };
}

export function orderDogs(order) {
  return { type: ORDER_DOGS, payload: order };
}

export async function postDog(created) {
  try {
    const response = await axios.post(`/dogs`, created);
    alert(response.request.response);
  } catch (error) {
    alert("Dog not created... " + error.request.response);
  }
}
