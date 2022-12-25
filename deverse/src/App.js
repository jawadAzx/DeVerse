import React, { useEffect, useState, useContext } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { TransactionContext } from "./context/TransactionContext";
import Sidebar from './components/Sidebar'
import Connect from './components/Connect'
import Profilepage from './components/Profilepage'
function App() {
  const { currentAccount, connectWallet, letMeIn, userDetails } =
    useContext(TransactionContext);
  // console.log(currentAccount);

  return (
    <div className="container">
      <Router>
        <Routes>
          {letMeIn && userDetails[1] != "account does not exist" ? (
            <Route path="/" element={<Sidebar />} />
          ) : (

            <Route path="/" element={<Connect />} />
          )}
          <Route path="/profile" element={<Profilepage />} />
        </Routes>
      </Router>

    </div>



  );
}

export default App;
