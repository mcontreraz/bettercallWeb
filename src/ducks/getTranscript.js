import api from "../api/api";

// Tipos de acción

const FETCH_TRANSCRIPT_REQUEST = "FETCH_TRANSCRIPT_REQUEST";
const FETCH_TRANSCRIPT_SUCCESS = "FETCH_TRANSCRIPT_SUCCESS";
const FETCH_TRANSCRIPT_FAILURE = "FETCH_TRANSCRIPT_FAILURE";

// Acciones

export const fetchDataRequest = () => ({
    type: FETCH_TRANSCRIPT_REQUEST,
});
export const fetchDataSuccess = (data) => ({
    type: FETCH_TRANSCRIPT_SUCCESS,
    payload: data,
})
export const fetchDataFailure = (error) => ({
    type: FETCH_TRANSCRIPT_FAILURE,
    payload: error,
})

// intial state
const initialState = {
    loading: false,
    data: null,
    error: null,
}

// Reducers

export default function fetchJobsDataReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TRANSCRIPT_REQUEST:
            return { ...state, loading: true, error: null, data: null };
        case FETCH_TRANSCRIPT_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_TRANSCRIPT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

// Thunks

export const fetchTranscriptData = (file) => async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
        const response = await api.post("/get_transcription", {
            job_name: file.replace(".mp3", ""),
        });
        const data = response.data?.data;
        console.log("🚀 ~ file: getTranscript.js:54 ~ fetchTranscriptData ~ data:", data)
        dispatch(fetchDataSuccess(data));
    } catch (error) {
        dispatch(fetchDataFailure(error.toString()));
    } 
}
