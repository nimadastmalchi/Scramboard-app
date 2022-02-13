import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import Scramboard from './MainPage/Scramboard/Scramboard';

const App = () => {
  return (
    <Router>
      <div>
        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Scramboard></Scramboard>}/>
          <Route path="/heatmap" element={<div>heatmap</div>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);