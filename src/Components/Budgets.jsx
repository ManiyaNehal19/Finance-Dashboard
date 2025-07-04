import React, { useState, useEffect } from 'react'
import transactions from "../Data/transaction.js";
import ProgressBar from '../Utils/ProgressBar.jsx';
import delete_btn from '../assets/dustbin.png'
import edit from '../assets/pen.png'

function Budgets() {
  const add_spent = (name) => {
    let total = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].reason.toLowerCase() === name.toLowerCase()) {
        if (transactions[i].type === "sent") {
          total += transactions[i].amount
        } else {
          total -= transactions[i].amount
        }
      }
    }
    return total
  }

  const [budget_array, setBugetArr] = useState(() => {
    const saved = localStorage.getItem("budgetArr");
    const parsed = saved ? JSON.parse(saved) : [];
    return parsed.map(item => ({
      ...item,
      spent: add_spent(item.name)
    }));
  });
  
  useEffect(() => {
    const dataToSave = budget_array.map(({ name, total }) => ({ name, total }));
    localStorage.setItem("budgetArr", JSON.stringify(dataToSave));
  }, [budget_array]);
  



  const [showDialog, setshowDialog] = useState(false);
  const [updateshowDialog, setupdateshowDialog] = useState(false);
  const [ValueHolder, setValueHolder] = useState([]);
  const [budgetName, setBudgetName] = useState('');
  const [budgetTotal, setBudgetTotal] = useState('');
  const [editBudgetName, setEditBudgetName] = useState('');
  const [editBudgetTotal, setEditBudgetTotal] = useState('');

  const is_budget_present = (name) => {
    return budget_array.some(b => b.name.toLowerCase() === name.toLowerCase());
  };

  const update_budget = (name, total) => {
    setBugetArr((prev) =>
      prev.map(items =>
        items.name === ValueHolder[0]
          ? { ...items, name: name, total: total, spent: add_spent(name) }
          : items
      )
    );
    setValueHolder([]);
    setEditBudgetName('');
    setEditBudgetTotal('');
  };

  const add_budget = (name, total) => {
    if (!is_budget_present(name.toLowerCase())) {
      setBugetArr((prev) => [
        ...prev,
        { name: name, total: total, spent: add_spent(name) || 0 }
      ]);
    }
    setBudgetName('');
    setBudgetTotal('');
  };

  const delete_budget = (name) => {
    setBugetArr((prev) => prev.filter(item => item.name !== name));
  };

  function calculateProgress(spent, total) {
    return total ? (spent / total) * 100 : 0;
  }

  return (
    <div className='col-span-4'>
      {updateshowDialog && (
        <dialog open className='fixed top-1/2 left-1/2 z-50  transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-1/3 max-w-md flex flex-col'>
          <div className='flex items-center justify-between p-2'>
            <h1 className='font-bold text-xl'>Update Budget</h1>
            <button className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-gray-100" onClick={() => setupdateshowDialog(false)}>X</button>
          </div>

          <form className='flex flex-col p-2' onSubmit={(e) => {
            e.preventDefault();
            update_budget(editBudgetName, parseInt(editBudgetTotal));
            setupdateshowDialog(false);
          }}>
            <div className='mb-3'>
              <label className='mr-2' htmlFor="name">Name:</label>
              <input className='p-1' type="text" placeholder='Enter Budget Name' required value={editBudgetName} onChange={(e) => setEditBudgetName(e.target.value)} />
            </div>

            <div className='mb-3'>
              <label className='mr-2' htmlFor="total">Allocated Budget:</label>
              <input className='p-1' type="number" min={1} placeholder='Enter Allocated Budget' required value={editBudgetTotal} onChange={(e) => setEditBudgetTotal(e.target.value)} />
            </div>

            <button className='w-full bg-blue-600 text-white font-semibold hover:cursor-pointer p-1 rounded-lg' type="submit">Update</button>
          </form>
        </dialog>
      )}

      {showDialog && (
        <dialog open className='fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-1/3 max-w-md flex flex-col'>
          <div className='flex items-center justify-between p-2'>
            <h1 className='font-bold text-xl'>Add Budget</h1>
            <button className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-gray-100" onClick={() => setshowDialog(false)}>X</button>
          </div>

          <form className='flex flex-col p-2' onSubmit={(e) => {
            e.preventDefault();
            add_budget(budgetName, parseInt(budgetTotal));
            setshowDialog(false);
          }}>
            <div className='mb-3'>
              <label className='mr-2' htmlFor="name">Name:</label>
              <input className='p-1' type="text" placeholder='Enter Budget Name' required value={budgetName} onChange={(e) => setBudgetName(e.target.value)} />
            </div>

            <div className='mb-3'>
              <label className='mr-2' htmlFor="total">Allocated Budget:</label>
              <input className='p-1' type="number" min={1} placeholder='Enter Allocated Budget' required value={budgetTotal} onChange={(e) => setBudgetTotal(e.target.value)} />
            </div>

            <button className='w-full bg-blue-600 text-white font-semibold hover:cursor-pointer p-1 rounded-lg' type="submit">Submit</button>
          </form>
        </dialog>
      )}

      <div className="flex m-3 items-center justify-between">
        <h1 className="text-4xl font-bold">Budget</h1>
        <button
          onClick={() => setshowDialog(true)}
          className='bg-blue-700 text-white p-2 ml-2 rounded-lg cursor-pointer hover:bg-blue-800'>Add Budget</button>
      </div>

      <div className='p-2 overflow-scroll'>
        {
          budget_array.map((items) => (
            <div className='mb-3' key={items.name}>
              <div className="flex justify-between mb-1">
                <div className='flex items-center'>
                  <span className="font-semibold text-lg text-black-700 mr-4">{items.name}</span>
                  <img src={edit}
                    onClick={() => {
                      setupdateshowDialog(true);
                      setValueHolder([items.name, items.total]);
                      setEditBudgetName(items.name);
                      setEditBudgetTotal(items.total);
                    }}
                    alt="edit button"
                    className='mr-2 h-5 w-auto hover:cursor-pointer' />
                  <img
                    onClick={() => delete_budget(items.name)}
                    src={delete_btn}
                    alt="delete button"
                    className='h-5 w-auto hover:cursor-pointer' />
                </div>
                <span className="text-sm font-medium text-black-700">{items.spent} / {items.total}</span>
              </div>
              <ProgressBar width={calculateProgress(items.spent, items.total)} />
            </div>
          ))
        }
      </div>
    </div>
  )
}


export default Budgets;
