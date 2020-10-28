import React from 'react';
import './App.css';
import Navigation from './component/Navigation/Navigation';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { db } from './config';
import Test from './component/Test/Test';
import Main from './component/Main/Main';
import Crawling from './component/Test/Crawling';
import Container from '@material-ui/core/Container';
import Search from './component/Search/Search';
import { makeStyles } from '@material-ui/core/styles';
import BoardContainer from './component/Board/BoardContainer';
import DetailContainer from './component/Detail/DetailContainer';
import WriteContainer from './component/Write/WriteContainer';
import HeaderContainer from './component/Header/HeaderContainer';
import LoginContainer from './component/Login/LoginContainer';
import RegisterContainer from './component/Register/RegisterContainer';

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
            <Route path="/" component={HeaderContainer} />
            <Route path="/" component={Navigation} />
          {/* <Header />
          <Content /> */}
          <Switch>
            <Container style={{ marginBottom: '100px' }}>
              <Route exact path="/" component={Main} />
              <Route exact path="/board/:idx" component={BoardContainer} />
              <Route exact path="/test" component={Test} />
              <Route exact path="/write" component={WriteContainer} />
              <Route exact path="/board/detail/:idx" component={DetailContainer} />
              <Route exact path="/crawling" component={Crawling} />
              <Route exact path="/login" component={LoginContainer} />
              <Route exact path="/signup" component={RegisterContainer} />
              <Route exact path="/Search" component={Search} />
            </Container>
          </Switch>
        </Router>
      </BrowserRouter>
    </>
  );
}

export default App;
