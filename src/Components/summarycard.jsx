import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import '../Component_css/FinanceSummary.css';

const SummaryCard = ({ title, amount, type, icon, count }) => {
  const getCardClasses = () => {
    switch (type) {
      case 'expense':
        return {
          topGradient: 'top-gradient-expense',
          iconContainer: 'icon-container-expense',
          amount: 'amount-expense',
          badge: 'badge-expense',
        };
      case 'income':
        return {
          topGradient: 'top-gradient-income',
          iconContainer: 'icon-container-income',
          amount: 'amount-income',
          badge: 'badge-income',
        };
      case 'balance':
        return {
          topGradient: amount >= 0 ? 'top-gradient-balance-positive' : 'top-gradient-balance-negative',
          iconContainer: amount >= 0 ? 'icon-container-balance-positive' : 'icon-container-balance-negative',
          amount: amount >= 0 ? 'amount-balance-positive' : 'amount-balance-negative',
          badge: amount >= 0 ? 'badge-balance-positive' : 'badge-balance-negative',
        };
      default:
        return {
          topGradient: 'top-gradient-default',
          iconContainer: 'icon-container-default',
          amount: 'amount-default',
          badge: 'badge-default',
        };
    }
  };

  const classes = getCardClasses();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="summary-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={classes.topGradient}></div>
      <div className={classes.iconContainer}>{icon}</div>
      <div className="title">{title}</div>
      <div className={classes.amount}>
        {type === 'balance' && amount >= 0 ? '+' : ''}{Math.abs(amount).toLocaleString()}/-
      </div>
      {count !== undefined && <div className="count">{count} transactions</div>}
      <div className={classes.badge}>
        {type === 'expense' ? 'Outflow' : type === 'income' ? 'Inflow' : amount >= 0 ? 'Profit' : 'Loss'}
      </div>
    </div>
  );
};

const FinanceSummary = () => {
  const [financialData, setFinancialData] = useState({
    totalExpense: 0,
    totalIncome: 0,
    expenseCount: 0,
    incomeCount: 0,
  });

  // Fetch transactions from Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'transactions'), (snapshot) => {
      const transactions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Calculate totals
      let totalExpense = 0;
      let totalIncome = 0;
      let expenseCount = 0;
      let incomeCount = 0;

      transactions.forEach((item) => {
        if (item.type === 'expense') {
          totalExpense += item.amount;
          expenseCount++;
        } else if (item.type === 'income') {
          totalIncome += item.amount;
          incomeCount++;
        }
      });

      setFinancialData({
        totalExpense,
        totalIncome,
        expenseCount,
        incomeCount,
      });
    }, (error) => {
      console.error('Error fetching transactions: ', error);
    });

    return () => unsubscribe();
  }, []);

  const totalBalance = financialData.totalIncome - financialData.totalExpense;

  const expenseIcon = '💸';
  const incomeIcon = '💰';
  const balanceIcon = totalBalance >= 0 ? '📈' : '📉';

  return (
    <div className="container">
      <div className="header">
        <h1 className="main-title">Financial Overview</h1>
        <p className="subtitle">Data calculated from Firebase transactions</p>
      </div>
      <div className="cards-container">
        <SummaryCard
          title="Total Expenses"
          amount={financialData.totalExpense}
          type="expense"
          icon={expenseIcon}
          count={financialData.expenseCount}
        />
        <SummaryCard
          title="Total Income"
          amount={financialData.totalIncome}
          type="income"
          icon={incomeIcon}
          count={financialData.incomeCount}
        />
        <SummaryCard
          title="Net Balance"
          amount={totalBalance}
          type="balance"
          icon={balanceIcon}
          count={financialData.expenseCount + financialData.incomeCount}
        />
      </div>
    </div>
  );
};

export default FinanceSummary;