
import {  Route, Switch ,BrowserRouter as Router, Redirect} from 'react-router-dom';
import Home from './components/Home';
import India from './components/India';
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <Router>
      <ScrollToTop/>
        <Switch>
          <Route exact path="/" component={India}/>
          <Route exact path="/home" component={Home}/>
          <Redirect to="/"/>
        </Switch>
     
      </Router>
    </>
  );
}

export default App;
