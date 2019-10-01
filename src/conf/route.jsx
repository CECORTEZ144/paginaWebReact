import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const login = lazy(() => import('../componentes/loginComponente.jsx'));
const registrar = lazy(() => import('../componentes/Registro/registroPadreComponente.jsx'));
const usuario = lazy(() => import('../componentes/usuarioComponente.jsx'));

export const AppRoute = () => (
  <Router>
    <Suspense fallback={<div>Cargando...</div>}>
      <Switch>
        <Route exact path="/" component={login}/>
        <Route path="/registro" component={registrar}/>
        <Route path="/usuario" component= {usuario}></Route>
      </Switch>
    </Suspense>
  </Router>
);