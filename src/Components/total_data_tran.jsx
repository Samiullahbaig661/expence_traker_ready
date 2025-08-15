import React, { useState, useEffect } from "react";
import ExpenseCards from "./crdddd";
import FinanceSummary from "./summarycard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";
import "../Component_css/total_data_tran.css"
function Totaltran() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase se data load hone ka wait
    const unsubscribe = onSnapshot(collection(db, "transactions"), () => {
      setLoading(false); // Data aa gaya
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-containercenter"> 

      <div className = "loaderContainer">
        <div className = "loader"></div>
        <p>Loading data...</p>
      </div>
      </div>
    );
  }

  return (
    <div>
      <FinanceSummary />
      <ExpenseCards />
    </div>
  );
}


export default Totaltran;
