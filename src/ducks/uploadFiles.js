// Tipos de acción
const UPLOAD_FILE_REQUEST = "UPLOAD_FILE_REQUEST";
const UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS";
const UPLOAD_FILE_FAILURE = "UPLOAD_FILE_FAILURE";

// Acciones
export const uploadFileRequest = (file) => ({
  type: UPLOAD_FILE_REQUEST,
  payload: file,
});

export const uploadFileSuccess = (data) => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: data,
});

export const uploadFileFailure = (errorCode, errorMessage) => ({
  type: UPLOAD_FILE_FAILURE,
  payload: {
    errorCode,
    errorMessage,
  },
});

// Estado inicial
const initialState = {
  loading: false,
  data: null,
  error: null,
  errorCode: null,
  errorMessage: null,
};

// Reductor
const uploadFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return { ...state, loading: true, error: null };
    case UPLOAD_FILE_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: false };
    case UPLOAD_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default uploadFileReducer;
