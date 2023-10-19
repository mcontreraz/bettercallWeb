// Tipos de acción
const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';

// Acciones
export const uploadFileRequest = (file) => ({
  type: UPLOAD_FILE_REQUEST,
  payload: file
});

export const uploadFileSuccess = (data) => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: data
});

export const uploadFileFailure = (error) => ({
  type: UPLOAD_FILE_FAILURE,
  payload: error
});

// Estado inicial
const initialState = {
  loading: false,
  data: null,
  error: null
};

// Reductor
const uploadFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return { ...state, loading: true, error: null };
    case UPLOAD_FILE_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case UPLOAD_FILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default uploadFileReducer;
