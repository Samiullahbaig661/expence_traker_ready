// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, query, where, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase.js";
// import { getCurrentUser } from "../auth";
// import ExpenseCards from "./crdddd";
// import FinanceSummary from "./summarycard";

// function Totaltran() {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = getCurrentUser();
//     if (!user) {
//       setError("Please log in to view transactions.");
//       setLoading(false);
//       navigate("/signin");
//       return;
//     }

//     const q = query(collection(db, "transactions"), where("userId", "==", user.uid));
//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const transactionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setTransactions(transactionsData);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Error fetching transactions:", err);
//         setError("Failed to load transactions.");
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, [navigate]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <FinanceSummary transactions={transactions} />
//       <ExpenseCards transactions={transactions} />
//     </div>
//   );
// }

// export default Totaltran;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import { getCurrentUser } from '../auth';
import ExpenseCards from './crdddd';
import FinanceSummary from './summarycard';

function Totaltran() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      setError('Please log in to view transactions.');
      setLoading(false);
      navigate('/signin');
      return;
    }

    console.log('Fetching transactions for user:', user.uid); // Debug log
    const q = query(collection(db, 'transactions'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const transactionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched transactions:', transactionsData); // Debug log
        setTransactions(transactionsData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching transactions:', err);
        setError('Failed to load transactions: ' + err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <FinanceSummary transactions={transactions} />
      <ExpenseCards transactions={transactions} />
    </div>
  );
}

export default Totaltran;