import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { Provider } from 'react-redux'; // Importa el Provider
import store from './store/store'; // Importa el store que has creado

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}> {/* Envuelve tu aplicación con el Provider */}
        <ThemeEditorProvider>
          <HashRouter>
            <Switch>
              <Route path={`/auth`} component={AuthLayout} />
              <Route path={`/admin`} component={AdminLayout} />
              <Route path={`/rtl`} component={RtlLayout} />
              <Redirect from='/' to='/admin' />
            </Switch>
          </HashRouter>
        </ThemeEditorProvider>
      </Provider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
