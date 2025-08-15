
import './App.css'
import Navbar from './Components/navbar'
import HeroSection from './Components/hero'
import AddTransactionForm from './Components/tansaction'
import { Route  , Routes} from 'react-router-dom'
import Totaltran from './Components/total_data_tran'
import ExpenseCards from './Components/crdddd'
// import TransactionCard from './Components/TransactionCard'
function App() {
 

  return (
   <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/add-transaction" element={<AddTransactionForm />} />
        <Route path="/total-transaction" element={<Totaltran/>} />
      </Routes>

    </>
  )
}

export default App
