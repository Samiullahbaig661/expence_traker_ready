import React, { useState, useEffect } from 'react';
import { Plus, Search, X, DollarSign, Calendar, FileText, Tag } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { getCurrentUser } from '../auth';
import ExpenseCards from './crdddd';
import '../Component_css/addTransactionForm.css';

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
  const [toast, setToast] = useState(null);

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
    const user = getCurrentUser();
    console.log('User:', user ? user.uid : 'No user'); // Debug log
    if (!user) {
      setToast({ type: 'error', title: 'Error', message: 'Please log in to add a transaction.' });
      return;
    }

    const finalCategory = showCustomInput && customCategory ? customCategory : selectedCategory;
    if (!amount || !finalCategory) {
      setToast({ type: 'error', title: 'Error', message: 'Amount and category are required.' });
      return;
    }

    const newTransaction = {
      type: transactionType,
      amount: parseFloat(amount),
      description,
      category: finalCategory,
      date,
      userId: user.uid,
      createdAt: new Date(),
    };

    console.log('Saving transaction:', newTransaction); // Debug log
    try {
      await addDoc(collection(db, 'transactions'), newTransaction);
      setToast({ type: 'success', title: 'Success', message: 'Transaction added successfully!' });

      if (showCustomInput && customCategory && !categories.includes(customCategory)) {
        await addDoc(collection(db, 'categories'), {
          name: customCategory,
          userId: user.uid,
          createdAt: new Date(),
        });
        setCategories([...categories, customCategory]);
      }

      setAmount('');
      setDescription('');
      setSelectedCategory('');
      setCustomCategory('');
      setSearchCategory('');
      setShowCustomInput(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
      setToast({ type: 'error', title: 'Error', message: 'Failed to save transaction: ' + error.message });
    }
  };

  const addCustomCategory = async () => {
    const user = getCurrentUser();
    console.log('User for category:', user ? user.uid : 'No user'); // Debug log
    if (!user) {
      setToast({ type: 'error', title: 'Error', message: 'Please log in to add a category.' });
      return;
    }

    if (customCategory && !categories.includes(customCategory)) {
      try {
        await addDoc(collection(db, 'categories'), {
          name: customCategory,
          userId: user.uid,
          createdAt: new Date(),
        });
        setCategories([...categories, customCategory]);
        setSelectedCategory(customCategory);
        setShowCustomInput(false);
        setCustomCategory('');
        setToast({ type: 'success', title: 'Success', message: 'Custom category added!' });
      } catch (error) {
        console.error('Error adding custom category:', error);
        setToast({ type: 'error', title: 'Error', message: 'Failed to save category: ' + error.message });
      }
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className={`container ${isVisible ? '' : 'hidden'}`}>
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-content">
            <div className="toast-icon">{toast.type === 'success' ? '✓' : '⚠'}</div>
            <div className="toast-text">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-message">{toast.message}</div>
            </div>
          </div>
        </div>
      )}
      <div className="wrapper">
        <div className={`header ${isVisible ? '' : 'hidden'}`}>
          <h1 className="title">Add Transaction</h1>
          <p className="subtitle">Track your income and expenses with style</p>
        </div>

        <div className={`form-container ${isVisible ? '' : 'hidden'}`}>
          <div className={`toggle-container ${isVisible ? '' : 'hidden'}`}>
            <button
              className={`toggle-button expense ${transactionType === 'expense' ? 'active' : ''}`}
              onClick={() => setTransactionType('expense')}
            >
              Expense
            </button>
            <button
              className={`toggle-button income ${transactionType === 'income' ? 'active' : ''}`}
              onClick={() => setTransactionType('income')}
            >
              Income
            </button>
          </div>

          <div className="form-content">
            <div className={`input-group ${isVisible ? '' : 'hidden'}`}>
              <label className="label">
                <DollarSign className="icon" size={20} />
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                step="0.01"
                required
                className="input"
              />
            </div>

            <div className={`input-group ${isVisible ? '' : 'hidden'}`}>
              <label className="label">
                <Tag className="icon" size={20} />
                Category
              </label>
              {!showCustomInput ? (
                <div className="category-input-container">
                  <div style={{ position: 'relative' }}>
                    <Search className="search-icon" size={20} />
                    <input
                      type="text"
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                      placeholder="Search categories..."
                      className="input category-input"
                    />
                  </div>
                  {searchCategory && (
                    <div className="dropdown">
                      {filteredCategories.map((category, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedCategory(category);
                            setSearchCategory('');
                          }}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="selected-category">
                    <span>
                      Selected: <span className="selected-text">{selectedCategory || 'None'}</span>
                    </span>
                    <button
                      className="custom-category-button"
                      onClick={() => setShowCustomInput(true)}
                    >
                      + Add Custom
                    </button>
                  </div>
                </div>
              ) : (
                <div className="custom-category-container">
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category"
                    className="input"
                  />
                  <button className="icon-button add" onClick={addCustomCategory}>
                    <Plus size={20} />
                  </button>
                  <button className="icon-button cancel" onClick={() => setShowCustomInput(false)}>
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            <div className={`input-group ${isVisible ? '' : 'hidden'}`}>
              <label className="label">
                <FileText className="icon" size={20} />
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description (optional)"
                className="input"
              />
            </div>

            <div className={`input-group ${isVisible ? '' : 'hidden'}`}>
              <label className="label">
                <Calendar className="icon" size={20} />
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input"
              />
            </div>

            <div className={`input-group ${isVisible ? '' : 'hidden'}`}>
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!amount || (!selectedCategory && !customCategory)}
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionForm;