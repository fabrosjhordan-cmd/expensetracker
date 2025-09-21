import { useState } from "react"
import AddExpenseForm from "./components/AddExpenseForm"
import ExpenseList from "./components/ExpenseList"
import FillerTab from "./components/FillerTab"
import Headers from "./components/Headers"
import SummaryCard from "./components/SummaryCard"
import Toast from "./components/Toast"

function App() {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
    type: 'income'
  })
  const [editingId, setIsEditingId] = useState(null);
  const [expense, setExpense] = useState([]);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState([]);

  const showToast = (message, type="success") =>{
    const id = Date.now();
    const toast = {id, message, type}
    setToast((prev)=> [...prev, toast])

    setTimeout(() => {
      setToast((prev)=> prev.filter((t)=> t.id !== id))
    }, 4000);
  }

  const removeToast = (id) =>{
    setToast((prev)=> prev.filter((t)=> t.id !== id))
  }

  const totalIncome = expense.filter((exp)=> exp.type === 'income').reduce((acc, exp) => acc+exp.amount, 0);

  const totalExpenses = expense.filter((exp)=> exp.type === 'expense').reduce((acc, exp) => acc+exp.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-800 to-slate-900 p-4">
      <Toast Toast={toast} removeToast={removeToast}/>
      <div className="max-w-7xl mx-auto">
        <Headers />

        <SummaryCard totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance}/>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-2">
            <AddExpenseForm formData={formData} setFormData={setFormData} editingId={editingId} setIsEditingId={setIsEditingId} expense={expense} setExpense={setExpense} showToast={showToast} />
          </div>

          <div className="xl:col-span-3">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            <FillerTab />

            <ExpenseList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
