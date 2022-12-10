import React, { useEffect, useState, useContext } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { TransactionContext } from "./context/TransactionContext";
import Sidebar from './components/Sidebar'
import Connect from './components/Connect'
function App() {
  const { currentAccount, connectWallet } =
    useContext(TransactionContext);
  return (
    <div className="container">
      <Router>
        <Routes>
          {
            currentAccount ? <Route path="/" element={<Sidebar />} /> : <Route path="/" element={<Connect />} />
          }
        </Routes>
      </Router>
    </div>



  );
}

export default App;
