import { AlertCircle, Plus, TrendingDown, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { categories } from '../utils/categories';

function AddExpenseForm({formData, setFormData, editingId, setIsEditingId, expense, setExpense, showToast, fetchData}) {
    const [errors, setErrors] = useState({});

    const validate = () =>{
        const newErrors = {};

        if(!formData.description.trim()){
            newErrors.description = "Description is required.";
        }
        if(!formData.amount || parseFloat(formData.amount <= 0)){
            newErrors.amount = "Amount must be greater than 0.";
        }
        if(!formData.category){
            newErrors.category = "Category is required.";
        }
        if(!formData.date){
            newErrors.date = "Date is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    
    const handleSubmit = () =>{
        if(!validate()){
            showToast('Please fix the errors on the form', 'error');
            return;
        }
        const expenseData = {...formData, amount: parseFloat(formData.amount), id: editingId || Date.now()}
        if(expense.length > 0){
        if(editingId){
            setExpense((prev)=> prev.map((exp) => exp.id === editingId ? expenseData : exp));
            fetch(`http://localhost:8081/expense/${editingId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
            })
            .then(res=>res.json())
            .then(result=>{
            setIsEditingId(null)
            setFormData({description: '', amount: '', category: '', date: '', type: 'income'})
            fetchData()
            })
            .catch(err=> console.log(err));
            setIsEditingId(null)
            showToast("Entry updated successfully", 'success')
        }else{
            setExpense([...expense, expenseData])
            fetch('http://localhost:8081/expense',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
            })
            .then(res=>res.json())
            .then(result=>{
            setFormData({description: '', amount: '', category: '', date: '', type: 'income'})
            fetchData()
            })
            showToast(`${formData.type === 'income' ? 'Income' : 'Expense'} added successfully`, 'success')
        }
    }
        setFormData({ description: '', amount: '', category:'', date:'', type:'expense'});
        setErrors({});
    }

    const cancelEdit = () =>{
        setIsEditingId(null);
        setFormData({description: '', amount: '', category:'', date:'', type:'expense'})
        setErrors({})
        showToast("Edit cancelled", 'info')
    }

  return (
    <div className='bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white shadow-2xl'>
      <h2>
        <div className='text-2xl font-bold text-white mb-8 flex items-center'>
            <div className='p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-3'>
            <Plus className='w-6 h-6 text-white'/>
            </div>
                {editingId ? 'Edit Entry' : 'Add New Entry'}
        </div>
      </h2>
      <div className='space-y-6'>
        <div>
            <label className='block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide'>
                Entry Type
            </label>
            <div className='flex space-x-4'>
                <label className={`flex flex-1 items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.type === 'expense' ? 'border-red-500 bg-red-500/20 text-red-300' : 'border-gray-600 bg-gray-800/50 text-gray-400 hover:border-gray-400'}`}>
                    <input type='radio' name='type' className='sr-only' checked={formData.type === 'expense'} onChange={(e)=>{setFormData({...formData, type: e.target.value, category: ''}); setErrors({}) }} value='expense'/>
                    <TrendingDown className='w-5 h-5 mr-2'/>
                    <span className='font-medium'>Expense</span>
                </label>

                 <label className={`flex flex-1 items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.type === 'income' ? 'border-green-500 bg-green-500/20 text-green-300' : 'border-gray-600 bg-gray-800/50 text-gray-400 hover:border-gray-400'}`}>
                    <input type='radio' name='type' className='sr-only' checked={formData.type === 'income'} onChange={(e)=>{setFormData({...formData, type: e.target.value, category: ''}); setErrors({}) }} value='income'/>
                    <TrendingUp className='w-5 h-5 mr-2'/>
                    <span className='font-medium'>Income</span>
                </label>
            </div>
            <div className='flex space-x-4'></div>
        </div>

        {/* Description */}
        <div>
            <label className='block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide'>
                Description
            </label>
            <input type='text' value={formData.description} onChange={(e)=>{setFormData({...formData, description: e.target.value}); if(errors.description) setErrors({...errors, description: ''})}} placeholder="What's this for?" className={`w-full pl-12 pr-6 py-4 bg-gray-800/50 border-2 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${errors.amount ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'}`} />
            {errors.description &&(
            <p className='text-red-400 text-sm mt-2 flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1'/>
                {errors.description}
            </p>)
            }
        </div>

        <div>
            <label className='block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide'>
                Amount
            </label>
           <div className='relative'>
            <span className='absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg'>₱</span>
            <input type='number' value={formData.amount} onChange={(e)=>{setFormData({...formData, amount: e.target.value}); if(errors.amount) setErrors({...errors, amount: ''})}} step='0.01' className={`w-full pl-12 pr-6 py-4 bg-gray-800/50 border-2 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${errors.amount ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'}`} placeholder='0.00'/>
           </div>
           {errors.amount &&(
            <p className='text-red-400 text-sm mt-2 flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1'/>
                {errors.amount}
            </p>)
            }
        </div>
        <div>
            <label className='block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide'>
                Category
            </label>
            <select value={formData.category} onChange={(e)=>{setFormData({...formData, category: e.target.value}); if(errors.category) setErrors({...errors, category:''})}} className={`w-full px-6 py-4 bg-gray-800/50 border-2 rounded-2xl text-white ring-2 focus:ring-purple-500 focus:border-purple 500 transition-all ${errors.category ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'}`}>
                <option className=''>Choose Category</option>
                {categories[formData.type].map((cat=>(
                    <option key={cat} value={cat} className='bg-gray-900'>{cat}</option>
                ))) }
            </select>
            {errors.category &&(
            <p className='text-red-400 text-sm mt-2 flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1'/>
                {errors.category}
            </p>)
            }
        </div>
        <div>
             <label className='block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide'>
                Date
            </label>
            <input value={formData.date} onChange={(e)=>{setFormData({...formData, date: e.target.value}); if(errors.date) setErrors({...errors, date: ''})}} type='date' className={`w-full px-6 py-4 bg-gray-800/50 border-2 rounded-2xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${errors.date ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'}`} />
            {errors.date &&(
            <p className='text-red-400 text-sm mt-2 flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1'/>
                {errors.date}
            </p>)
            }
        </div>
        <button type='button' onClick={handleSubmit} className='flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mr-2'>
            {editingId ? 'Update Entry' : 'Add Entry'}
        </button>
        {editingId && (<button type='button' onClick={cancelEdit} className='py-4 px-6 border-2 border-gray-600 text-gray-300 rounded-2xl hover:bg-gray-800/50 hover:border-gray-500 transition-all duration-200 ml-2'>
            Cancel
        </button>)}
      </div>
      
    </div>
  )
}

export default AddExpenseForm
