// import React, { useEffect, useState } from 'react';
// import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
// import { db } from '../firebase';

// const ExpenseCard = ({ data }) => {
//   const cardStyle = {
//     background: 'white',
//     borderRadius: '16px',
//     padding: '24px',
//     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//     minWidth: '280px',
//     maxWidth: '320px',
//     position: 'relative',
//     overflow: 'hidden',
//     transition: 'all 0.3s ease',
//     cursor: 'pointer'
//   };

//   const topGradientStyle = {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: '4px',
//     background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1)'
//   };

//   const headerStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '24px'
//   };

//   const amountStyle = {
//     fontSize: '28px',
//     fontWeight: 'bold',
//     color: '#2d3748'
//   };

//   const expenseBadgeStyle = {
//     background: data.type === 'income' ? '#4ecdc4' : '#ff6b6b',
//     color: 'white',
//     padding: '6px 12px',
//     borderRadius: '20px',
//     fontSize: '12px',
//     fontWeight: '600',
//     textTransform: 'uppercase'
//   };

//   const rowStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '16px'
//   };

//   const labelStyle = {
//     fontSize: '16px',
//     color: '#718096',
//     fontWeight: '400'
//   };

//   const valueStyle = {
//     fontSize: '16px',
//     color: '#2d3748',
//     fontWeight: '500'
//   };

//   const categoryBadgeStyle = {
//     background: '#4ecdc4',
//     color: 'white',
//     padding: '4px 12px',
//     borderRadius: '12px',
//     fontSize: '14px',
//     fontWeight: '500'
//   };

//   const dateStyle = {
//     ...valueStyle,
//     fontFamily: 'monospace'
//   };

//   const descriptionStyle = {
//     ...valueStyle,
//     fontStyle: 'italic'
//   };

//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       style={{
//         ...cardStyle,
//         transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
//         boxShadow: isHovered
//           ? '0 8px 30px rgba(0, 0, 0, 0.15)'
//           : '0 4px 20px rgba(0, 0, 0, 0.1)'
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div style={topGradientStyle}></div>

//       <div style={headerStyle}>
//         <div style={amountStyle}>{data.amount?.toLocaleString()}/-</div>
//         <div style={expenseBadgeStyle}>{data.type}</div>
//       </div>

//       <div style={rowStyle}>
//         <span style={labelStyle}>Category</span>
//         <span style={categoryBadgeStyle}>{data.category}</span>
//       </div>

//       <div style={rowStyle}>
//         <span style={labelStyle}>Date</span>
//         <span style={dateStyle}>{data.date}</span>
//       </div>

//       {data.description && (
//         <div style={{ ...rowStyle, marginBottom: 0 }}>
//           <span style={labelStyle}>Description</span>
//           <span style={descriptionStyle}>{data.description}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// const ExpenseCards = () => {
//   const [expenses, setExpenses] = useState([]);

//   useEffect(() => {
//     const q = query(collection(db, 'transactions'), orderBy('date', 'desc'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setExpenses(data);
//     });

//     return () => unsubscribe();
//   }, []);

//   const containerStyle = {
//     minHeight: '100vh',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     padding: '40px 20px',
//     fontFamily: 'Arial, sans-serif'
//   };

//   const cardsContainerStyle = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '20px',
//     justifyContent: 'center',
//     maxWidth: '1200px',
//     margin: '0 auto'
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={cardsContainerStyle}>
//         {expenses.length > 0 ? (
//           expenses.map((expense) => (
//             <ExpenseCard key={expense.id} data={expense} />
//           ))
//         ) : (
//           <p style={{ color: 'white' }}>No transactions found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExpenseCards;



import React, { useState } from 'react';

const ExpenseCard = ({ data }) => {
  const cardStyle = {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    minWidth: '280px',
    maxWidth: '320px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const topGradientStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1)'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  };

  const amountStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2d3748'
  };

  const expenseBadgeStyle = {
    background: data.type === 'income' ? '#4ecdc4' : '#ff6b6b',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase'
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  };

  const labelStyle = {
    fontSize: '16px',
    color: '#718096',
    fontWeight: '400'
  };

  const valueStyle = {
    fontSize: '16px',
    color: '#2d3748',
    fontWeight: '500'
  };

  const categoryBadgeStyle = {
    background: '#4ecdc4',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500'
  };

  const dateStyle = {
    ...valueStyle,
    fontFamily: 'monospace'
  };

  const descriptionStyle = {
    ...valueStyle,
    fontStyle: 'italic'
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...cardStyle,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 8px 30px rgba(0, 0, 0, 0.15)'
          : '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={topGradientStyle}></div>

      <div style={headerStyle}>
        <div style={amountStyle}>{data.amount?.toLocaleString() || 0}/-</div>
        <div style={expenseBadgeStyle}>{data.type || 'Unknown'}</div>
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Category</span>
        <span style={categoryBadgeStyle}>{data.category || 'N/A'}</span>
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Date</span>
        <span style={dateStyle}>{data.date || 'N/A'}</span>
      </div>

      {data.description && (
        <div style={{ ...rowStyle, marginBottom: 0 }}>
          <span style={labelStyle}>Description</span>
          <span style={descriptionStyle}>{data.description}</span>
        </div>
      )}
    </div>
  );
};

const ExpenseCards = ({ transactions }) => {
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif'
  };

  const cardsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  return (
    <div style={containerStyle}>
      <div style={cardsContainerStyle}>
        {transactions && transactions.length > 0 ? (
          transactions.map((expense) => (
            <ExpenseCard key={expense.id} data={expense} />
          ))
        ) : (
          <p style={{ color: 'white', textAlign: 'center' }}>No transactions found</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseCards;