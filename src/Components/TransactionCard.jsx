import React from 'react';

const CardTransaction = ({ transactions }) => {
  const styles = {
    transactionsContainer: {
      marginTop: '30px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      padding: '25px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      // Removed isVisible dependency; static styles for simplicity
      transform: 'translateY(0)',
      opacity: 1,
      transition: 'all 1s ease-out 0.8s',
    },
    transactionItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '15px',
      marginBottom: '10px',
    },
    transactionLeft: {
      color: 'white',
    },
    transactionRight: {
      textAlign: 'right',
    },
    amount: (type) => ({
      fontWeight: 'bold',
      color: type === 'income' ? '#2ecc71' : '#e74c3c',
    }),
  };

  return (
    <>
      {transactions.length > 0 && (
        <div style={styles.transactionsContainer}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '20px' }}>
            Recent Transactions
          </h3>
          <div>
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} style={styles.transactionItem}>
                <div style={styles.transactionLeft}>
                  <p style={{ fontWeight: '500', marginBottom: '5px' }}>{transaction.category}</p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                    {transaction.description || 'No description'}
                  </p>
                </div>
                <div style={styles.transactionRight}>
                  <p style={styles.amount(transaction.type)}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CardTransaction;