// Acciones
const TRANSCRIBE_REQUEST = 'transcribe/TRANSCRIBE_REQUEST';
const TRANSCRIBE_SUCCESS = 'transcribe/TRANSCRIBE_SUCCESS';
const TRANSCRIBE_FAILURE = 'transcribe/TRANSCRIBE_FAILURE';

// Creadores de acciones
export const transcribeRequest = (filename) => ({
  type: TRANSCRIBE_REQUEST,
  payload: filename,
});

export const transcribeSuccess = (data) => ({
  type: TRANSCRIBE_SUCCESS,
  payload: data,
});

export const transcribeFailure = (errorCode, errorMessage) => ({
  type: TRANSCRIBE_FAILURE,
  payload: {
    errorCode,
    errorMessage
  }
});

// Reductor
const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default function transcribeReducer(state = initialState, action) {
  switch (action.type) {
    case TRANSCRIBE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TRANSCRIBE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case TRANSCRIBE_FAILURE:
        return {
            ...state,
            loading: false,
            errorCode: action.payload.errorCode,
            errorMessage: action.payload.errorMessage
        }; 
    default:
      return state;
  }
}