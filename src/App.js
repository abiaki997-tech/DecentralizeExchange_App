

import React  from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";



//components
import Home from './components/home';
import User from './components/user';
import LiquidityPoolProvide from './components/provide';
import Swap from './components/swap'


 function App() {

  return (

    <div className="App">

      <h1 className="Dex_Header">Decentralize Exchange</h1>
      
      <Router>
        <Switch>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/user" element={<User/>}></Route>
          <Route exact path="/provide" element={<LiquidityPoolProvide/>}></Route>
          <Route exact path="/swap" element={<Swap/>}></Route>
        </Switch>
      </Router>

     
    </div>
  );
}

export default App;
