import api from "../api/api";

// Tipos de acción
const FETCH_DATA_REQUEST = "GET_JOBS_REQUEST";
const FETCH_DATA_SUCCESS = "GET_JOBS_SUCCESS";
const FETCH_DATA_FAILURE = "GET_JOBS_FAILURE";

// Acciones
export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataSuccess = (data) => ({ type: FETCH_DATA_SUCCESS, payload: data });
export const fetchDataFailure = (error) => ({ type: FETCH_DATA_FAILURE, payload: error });

// Estado inicial
const initialState = {
  loading: false,
  data: [],
  error: null
};

// Reductor
export default function fetchJobsDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Thunks (si estás usando redux-thunk)
export const fetchJobsData = () => async (dispatch) => {
  dispatch(fetchDataRequest());
  try {
    const response = await api.get("/getJobs");
    const data = response.data;
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.toString()));
  }
};

