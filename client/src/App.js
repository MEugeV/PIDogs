import './App.css';
import Landing from './components/landingpage';
import {Route, Switch, Redirect} from "react-router-dom"
import Home from "./containers/home"
import Detail from './components/detail';
import Form from './components/form';
import Default from './components/default';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing}/>
      <Route exact path="/home" component={Home} />
      <Route exact path="/detail/:id" component={Detail}/>
      <Route exact path="/form" component={Form}/>
      <Route path="/" component={Default}/> 
      {/* <Redirect from="*" to="/" /> */}
    </Switch>
  );
}

export default App;
