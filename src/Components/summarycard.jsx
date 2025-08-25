import React, { useMemo, useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
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
        {type === 'balance' && amount >= 0 ? '+' : ''}{Math.abs(amount || 0).toLocaleString()}/-
      </div>
      {count !== undefined && <div className="count">{count} transactions</div>}
      <div className={classes.badge}>
        {type === 'expense' ? 'Outflow' : type === 'income' ? 'Inflow' : amount >= 0 ? 'Profit' : 'Loss'}
      </div>
    </div>
  );
};

const FinanceSummary = ({ transactions }) => {
  const financialData = useMemo(() => {
    const data = {
      totalExpense: 0,
      totalIncome: 0,
      expenseCount: 0,
      incomeCount: 0,
    };

    if (transactions && Array.isArray(transactions) && transactions.length > 0) {
      transactions.forEach((item) => {
        if (item.type === 'expense' && typeof item.amount === 'number') {
          data.totalExpense += item.amount;
          data.expenseCount++;
        } else if (item.type === 'income' && typeof item.amount === 'number') {
          data.totalIncome += item.amount;
          data.incomeCount++;
        }
      });
    }

    return data;
  }, [transactions]);

  const totalBalance = financialData.totalIncome - financialData.totalExpense;

  const expenseIcon = <Wallet size={24} />;
  const incomeIcon = <DollarSign size={24} />;
  const balanceIcon = totalBalance >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />;

  return (
    <div className="container">
      <div className="header">
        <h1 className="main-title">Financial Overview</h1>
        <p className="subtitle">Data calculated from your transactions</p>
      </div>
      <div className="cards-container">
        {transactions && Array.isArray(transactions) && transactions.length > 0 ? (
          <>
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
          </>
        ) : (
          <p className="no-data">No transactions found. Add some transactions to see your financial overview.</p>
        )}
      </div>
    </div>
  );
};

export default FinanceSummary;