import React from 'react';
import './App.css';
import Header from './component/Header'
import Content from './component/Content';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Board from './component/Board';
import {db} from './config';
import Test from './component/Test';
import Write from './component/Write';
import Detail from './component/Detail';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Content />
        <Route exact path="/board/:idx" component={Board} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/write" component={Write} />
        <Route exact path="/board/detail/:idx" component={Detail} />
      </Router>
    </>
  );
}

export default App;
