import './App.css';
import Landing from './presentacionales/landingpage';
import {Route, Switch} from "react-router-dom"
import Home from "./containers/home"
import Detail from './presentacionales/detail';
import Form from './presentacionales/form';
import Default from './presentacionales/default';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing}/>
      <Route exact path="/home" component={Home} />
      <Route exact path="/detail/:id" component={Detail}/>
      <Route exact path="/form" component={Form}/>
      {/* history push? */}
      <Route path="/" component={Default}/> 
    </Switch>
  );
}

export default App;
