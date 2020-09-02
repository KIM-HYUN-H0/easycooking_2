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
import Crawling from './component/Crawling';
import Container from '@material-ui/core/Container';
import Login from './component/User/Login';
import Register from './component/User/Register';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Content />
        <Container style={{marginBottom : '100px'}}>
        <Route exact path="/board/:idx" component={Board} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/write" component={Write} />
        <Route exact path="/board/detail/:idx" component={Detail} />
        <Route exact path="/crawling" component={Crawling} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
        </Container>
        </Router>
    </>
  );
}

export default App;
