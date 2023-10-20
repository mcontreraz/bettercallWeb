import thunk  from 'redux-thunk';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// Importa tus reductores (ducks) aquí
import uploadFileReducer from '../ducks/uploadFiles';
import transcribeAudioReducer from '../ducks/transcribeAudio';
import fetchJobsDataReducer from '../ducks/getJobs';

// Combina todos tus reductores
const rootReducer = combineReducers({
  uploadFile: uploadFileReducer,
  transcribeAudio: transcribeAudioReducer,
  getJobsData: fetchJobsDataReducer
  // ... otros reductores
});

// Configura los middlewares si tienes alguno (por ejemplo, para manejar acciones asíncronas)
const middlewares = [thunk];

// Configura las herramientas de desarrollo de Redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Crea el store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
