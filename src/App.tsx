import React from 'react';
import './App.css';
import Header from './component/Header'
import Content from './component/Content';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Board from './component/Board';
import { db } from './config';
import Test from './component/Test';
import Main from './component/Main';
import Write from './component/Write';
import Detail from './component/Detail';
import Crawling from './component/Crawling';
import Container from '@material-ui/core/Container';
import Login from './component/User/Login';
import Register from './component/User/Register';
import Search from './component/Search';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  fix : {

  }

}));

const App = () => {
  const classes = useStyles();

  return (
    <>
      <BrowserRouter>
        <Router>
            <Route path="/" component={Header} />
            <Route path="/" component={Content} />
          {/* <Header />
          <Content /> */}
          <Switch>
            <Container style={{ marginBottom: '100px' }}>
              <Route exact path="/" component={Main} />
              <Route exact path="/board/:idx" component={Board} />
              <Route exact path="/test" component={Test} />
              <Route exact path="/write" component={Write} />
              <Route exact path="/board/detail/:idx" component={Detail} />
              <Route exact path="/crawling" component={Crawling} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Register} />
              <Route exact path="/Search" component={Search} />
            </Container>
          </Switch>
        </Router>
      </BrowserRouter>
    </>
  );
}

export default App;
