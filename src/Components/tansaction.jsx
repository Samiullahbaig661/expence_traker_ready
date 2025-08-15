import React, { useState, useEffect } from 'react';
import { Plus, Search, X, DollarSign, Calendar, FileText, Tag } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import {db } from "../firebase.js"
import CardTransaction from './TransactionCard.jsx';


const AddTransactionForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [transactionType, setTransactionType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchCategory, setSearchCategory] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // 100+ predefined categories
  const predefinedCategories = [
    'Food & Dining', 'Groceries', 'Restaurants', 'Fast Food', 'Coffee Shops', 'Bakery',
    'Transportation', 'Gas & Fuel', 'Public Transit', 'Taxi & Rideshare', 'Car Maintenance', 'Parking',
    'Shopping', 'Clothing', 'Electronics', 'Books', 'Home & Garden', 'Sports Equipment',
    'Entertainment', 'Movies', 'Music', 'Games', 'Concerts', 'Theater', 'Sports Events',
    'Health & Medical', 'Doctor Visits', 'Pharmacy', 'Dental Care', 'Eye Care', 'Fitness',
    'Travel', 'Hotels', 'Flights', 'Vacation', 'Business Travel', 'Car Rental',
    'Utilities', 'Electricity', 'Water', 'Internet', 'Phone', 'Gas Bill', 'Trash',
    'Insurance', 'Health Insurance', 'Car Insurance', 'Home Insurance', 'Life Insurance',
    'Education', 'Tuition', 'Books & Supplies', 'Online Courses', 'Workshops', 'Training',
    'Personal Care', 'Haircut', 'Spa', 'Cosmetics', 'Skincare', 'Supplements',
    'Home', 'Rent', 'Mortgage', 'Repairs', 'Furniture', 'Appliances', 'Decoration',
    'Business', 'Office Supplies', 'Software', 'Subscriptions', 'Marketing', 'Legal Fees',
    'Income - Salary', 'Income - Freelance', 'Income - Business', 'Income - Investment', 'Income - Bonus',
    'Investment', 'Stocks', 'Crypto', 'Real Estate', 'Mutual Funds', 'Bonds',
    'Gifts & Donations', 'Charity', 'Birthday Gifts', 'Wedding Gifts', 'Holiday Gifts',
    'Pets', 'Pet Food', 'Veterinary', 'Pet Supplies', 'Pet Grooming', 'Pet Insurance',
    'Hobbies', 'Art Supplies', 'Photography', 'Crafts', 'Collecting', 'DIY Projects',
    'Banking', 'ATM Fees', 'Bank Charges', 'Credit Card Fees', 'Investment Fees',
    'Miscellaneous', 'Uncategorized', 'Other Expenses', 'Emergency Fund', 'Savings'
  ];

  const [categories, setCategories] = useState(predefinedCategories);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchCategory.toLowerCase())
  );

const handleSubmit = async () => {
  const finalCategory = showCustomInput && customCategory ? customCategory : selectedCategory;

  if (!amount || !finalCategory) return;

  const newTransaction = {
    id: Date.now(),
    type: transactionType,
    amount: parseFloat(amount),
    description,
    category: finalCategory,
    date,
    createdAt: new Date(), // Optional: Add timestamp for Firestore
  };

  try {
    // Save to Firestore
    await addDoc(collection(db, 'transactions'), newTransaction);

    // Update local state
    setTransactions([newTransaction, ...transactions]);

    // Add custom category to list if it doesn't exist
    if (showCustomInput && customCategory && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);

      // Optionally save custom category to Firestore
      await addDoc(collection(db, 'categories'), {
        name: customCategory,
        createdAt: new Date(),
      });
    }

    // Reset form
    setAmount('');
    setDescription('');
    setSelectedCategory('');
    setCustomCategory('');
    setSearchCategory('');
    setShowCustomInput(false);
  } catch (error) {
    console.error('Error adding transaction to Firestore: ', error);
    // Optionally show an error message to the user
    alert('Failed to save transaction. Please try again.');
  }
};

const addCustomCategory = async () => {
  if (customCategory && !categories.includes(customCategory)) {
    try {
      // Save custom category to Firestore
      await addDoc(collection(db, 'categories'), {
        name: customCategory,
        createdAt: new Date(),
      });

      // Update local state
      setCategories([...categories, customCategory]);
      setSelectedCategory(customCategory);
      setShowCustomInput(false);
      setCustomCategory('');
    } catch (error) {
      console.error('Error adding custom category to Firestore: ', error);
      alert('Failed to save custom category. Please try again.');
    }
  }
}; 

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    wrapper: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      transform: isVisible ? 'translateY(0)' : 'translateY(-50px)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 1s ease-out'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '10px',
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1.1rem'
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      padding: '40px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 1.2s ease-out'
    },
    toggleContainer: {
      display: 'flex',
      marginBottom: '30px',
      transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.8s ease-out 0.2s'
    },
    toggleButton: (active) => ({
      flex: 1,
      padding: '15px 25px',
      border: 'none',
      fontWeight: '600',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: active ? (transactionType === 'expense' ? '#e74c3c' : '#27ae60') : 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      borderRadius: transactionType === 'expense' ? '15px 0 0 15px' : '0 15px 15px 0',
      transform: active ? 'scale(1.05)' : 'scale(1)',
      boxShadow: active ? '0 5px 15px rgba(0, 0, 0, 0.3)' : 'none'
    }),
    inputGroup: (delay) => ({
      marginBottom: '25px',
      marginRight: '55px',
      transform: isVisible ? 'translateX(0)' : delay % 2 === 0 ? 'translateX(50px)' : 'translateX(-50px)',
      opacity: isVisible ? 1 : 0,
      transition: `all 0.8s ease-out ${0.3 + delay * 0.1}s`
    }),
    label: {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      fontWeight: '500',
      marginBottom: '8px',
      fontSize: '1rem'
    },
    icon: {
      marginRight: '8px'
    },
    input: {
      width: '100%',
      padding: '15px 20px',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    inputFocus: {
      background: 'rgba(255, 255, 255, 0.25)',
      borderColor: '#4ecdc4',
      boxShadow: '0 0 10px rgba(78, 205, 196, 0.3)'
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      maxHeight: '200px',
      overflowY: 'auto',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px',
      marginTop: '5px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      zIndex: 10
    },
    dropdownItem: {
      padding: '12px 20px',
      cursor: 'pointer',
      color: '#333',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      transition: 'background 0.2s ease'
    },
    selectedCategory: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '10px',
      color: 'rgba(255, 255, 255, 0.8)'
    },
    customCategoryContainer: {
      display: 'flex',
      gap: '10px'
    },
    iconButton: (color) => ({
      padding: '15px',
      borderRadius: '15px',
      border: 'none',
      background: color,
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }),
    submitButton: {
      width: '100%',
      padding: '18px',
      borderRadius: '15px',
      border: 'none',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
    },
    submitButtonDisabled: {
      background: '#666',
      cursor: 'not-allowed',
      opacity: 0.5
    },
    transactionsContainer: {
      marginTop: '30px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      padding: '25px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 1s ease-out 0.8s'
    },
    transactionItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '15px',
      marginBottom: '10px'
    },
    transactionLeft: {
      color: 'white'
    },
    transactionRight: {
      textAlign: 'right'
    },
    amount: (type) => ({
      fontWeight: 'bold',
      color: type === 'income' ? '#2ecc71' : '#e74c3c'
    })
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Add Transaction</h1>
          <p style={styles.subtitle}>Track your income and expenses with style</p>
        </div>

        {/* Main Form */}
        <div style={styles.formContainer}>
          
          {/* Transaction Type Toggle */}
          <div style={styles.toggleContainer}>
            <button
              onClick={() => setTransactionType('expense')}
              style={styles.toggleButton(transactionType === 'expense')}
              onMouseEnter={(e) => e.target.style.background = transactionType === 'expense' ? '#c0392b' : 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.target.style.background = transactionType === 'expense' ? '#e74c3c' : 'rgba(255, 255, 255, 0.2)'}
            >
              Expense
            </button>
            <button
              onClick={() => setTransactionType('income')}
              style={styles.toggleButton(transactionType === 'income')}
              onMouseEnter={(e) => e.target.style.background = transactionType === 'income' ? '#229954' : 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.target.style.background = transactionType === 'income' ? '#27ae60' : 'rgba(255, 255, 255, 0.2)'}
            >
              Income
            </button>
          </div>

          <div>
            {/* Amount Field */}
            <div style={styles.inputGroup(1)}>
              <label style={styles.label}>
                <DollarSign style={styles.icon} size={20} />
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                step="0.01"
                required
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
              />
            </div>

            {/* Category Field */}
            <div style={styles.inputGroup(2)}>
              <label style={styles.label}>
                <Tag style={styles.icon} size={20} />
                Category
              </label>
              
              {!showCustomInput ? (
                <div style={{position: 'relative'}}>
                  <div style={{position: 'relative'}}>
                    <Search style={{position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.6)'}} size={20} />
                    <input
                      type="text"
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                      placeholder="Search categories..."
                      style={{...styles.input, paddingLeft: '45px'}}
                      onFocus={(e) => Object.assign(e.target.style, {...styles.input, paddingLeft: '50px', ...styles.inputFocus})}
                      onBlur={(e) => Object.assign(e.target.style, {...styles.input, paddingLeft: '50px'})}
                    />
                  </div>
                  
                  {searchCategory && (
                    <div style={styles.dropdown}>
                      {filteredCategories.map((category, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedCategory(category);
                            setSearchCategory('');
                          }}
                          style={styles.dropdownItem}
                          onMouseEnter={(e) => e.target.style.background = 'rgba(78, 205, 196, 0.1)'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div style={styles.selectedCategory}>
                    <span>
                      Selected: <span style={{color: '#4ecdc4', fontWeight: '500'}}>{selectedCategory || 'None'}</span>
                    </span>
                    <button
                      onClick={() => setShowCustomInput(true)}
                      style={{background: 'none', border: 'none', color: '#4ecdc4', cursor: 'pointer', fontWeight: '500'}}
                      onMouseEnter={(e) => e.target.style.color = '#45b7aa'}
                      onMouseLeave={(e) => e.target.style.color = '#4ecdc4'}
                    >
                      + Add Custom
                    </button>
                  </div>
                </div>
              ) : (
                <div style={styles.customCategoryContainer}>
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category"
                    style={{...styles.input, flex: 1}}
                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                    onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  />
                  <button
                    onClick={addCustomCategory}
                    style={styles.iconButton('#27ae60')}
                    onMouseEnter={(e) => e.target.style.background = '#229954'}
                    onMouseLeave={(e) => e.target.style.background = '#27ae60'}
                  >
                    <Plus size={20} />
                  </button>
                  <button
                    onClick={() => setShowCustomInput(false)}
                    style={styles.iconButton('#e74c3c')}
                    onMouseEnter={(e) => e.target.style.background = '#c0392b'}
                    onMouseLeave={(e) => e.target.style.background = '#e74c3c'}
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Description Field */}
            <div style={styles.inputGroup(3)}>
              <label style={styles.label}>
                <FileText style={styles.icon} size={20} />
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description (optional)"
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
              />
            </div>

            {/* Date Field */}
            <div style={styles.inputGroup(4)}>
              <label style={styles.label}>
                <Calendar style={styles.icon} size={20} />
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
              />
            </div>

            {/* Submit Button */}
            <div style={styles.inputGroup(5)}>
              <button
                onClick={handleSubmit}
                disabled={!amount || (!selectedCategory && !customCategory)}
                style={{
                  ...styles.submitButton,
                  ...((!amount || (!selectedCategory && !customCategory)) ? styles.submitButtonDisabled : {})
                }}
                onMouseEnter={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                }}
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <CardTransaction transactions = {transactions}></CardTransaction>
      </div>
    </div>
  );
};

export default AddTransactionForm;