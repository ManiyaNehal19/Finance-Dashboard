import React, { useEffect, useState } from 'react'
import filter from '../assets/filter.png'
import delete_btn from '../assets/dustbin.png'
import edit from '../assets/pen.png'
import { AppContext } from '../Context/AppContext.jsx'; 
import { useContext } from 'react';

function RecurrBill() {
  //use switch case for tabs + sort and handling as well 
   
  const tabs = ["ALL", "UNPAID", "UPCOMING"]
  const [showSortOptions, setShowSortOptions] = useState(false)
  const [currTab, setcurrTab] = useState("ALL")
  const [showDialog, setshowDialog] = useState(false);
  const [billName, setbillName] = useState('');
  const [billTotal, setbillTotal] = useState('');
  const [searchedTerm, setterm] = useState("");
  const [billDate, setbillDate] = useState();
  const [editBillName, setEditBillName] = useState('');
  const [editBillTotal, setEditBillTotal] = useState('');
  const [editBillDate, setEditBillDate] = useState('')
  const [updateshowDialog, setupdateshowDialog] = useState(false);
  const { BillArr, setBillArr } = useContext(AppContext);
  useEffect(() => {
    const dataToSave = BillArr.map(({ name, amount, due, status }) => ({ name, amount, due, status }));
    localStorage.setItem("billArr", JSON.stringify(dataToSave));
  }, [BillArr]);
  const [filteredArr, setFilteredArr] = useState(BillArr)

  useEffect(()=>{
    console.log(BillArr);

  },[BillArr])
  useEffect(() => {
    const currentMonth = new Date().getMonth(); // 0–11
    const lastMonth = parseInt(localStorage.getItem("lastUpdatedMonth"));
  
    if (lastMonth !== currentMonth) {
      const resetBills = BillArr.map(bill => ({
        ...bill,
        status: false
      }));
      setBillArr(resetBills);
      localStorage.setItem("lastUpdatedMonth", currentMonth.toString());
    }
  }, []);
  useEffect(()=>{
    switch (currTab) {
      case "ALL":
        setFilteredArr(BillArr);
        break;
      case "UNPAID":
        const unpaid = BillArr.filter(item=>(item.status===false));
        setFilteredArr(unpaid);
        break
        case "UPCOMING":
          const today = new Date();
          const upcoming = BillArr.filter(item => {
            const dueDate = new Date(item.due);
            return dueDate > today && item.status === false;
          });
          console.log("upcoming", upcoming);
          setFilteredArr(upcoming);
          break;
    }
  },[currTab,BillArr])
  function handle_sort(value){
    console.log(value);
    switch (value) {
      case "amount-rec":
        const sort_rec = BillArr.filter((data)=> data.type==="received")
        setFilteredArr(sort_rec);
        break;
      case "amount-sent":
        const sort_sent = BillArr.filter((data)=> data.type==="sent")
        setFilteredArr(sort_sent);
        break;
      case "name-asc":
        const name_Asc = [...BillArr].sort((a,b)=> a.name.localeCompare(b.name));
        setFilteredArr(name_Asc);
        break;
      case "name-desc":
        const name_desc = [...BillArr].sort((a,b)=> b.name.localeCompare(a.name));
        setFilteredArr(name_desc);
        break;
      case "amount-asc":
        const amount_asc = [...BillArr].sort((a,b)=>a.amount-b.amount);
        setFilteredArr(amount_asc);
        break;
      case "amount-desc":
        const amount_desc = [...BillArr].sort((a,b)=>b.amount-a.amount);
        setFilteredArr(amount_desc);
        break;
      case "date-newest":
        const date_newest = [...BillArr].sort((a,b)=>new Date(b.date)-new Date(a.date));
        setFilteredArr(date_newest);
        break;
      case "date-oldest":
        const date_oldest = [...BillArr].sort((a,b)=>new Date(a.date)-new Date(b.date));
        setFilteredArr(date_oldest);
        break;

    }
  }
  function handle_search(name){
    if(name){
    const searched = BillArr.filter((data)=> data.name.toLowerCase()===name.toLowerCase());
    setFilteredArr(searched);
    
    }
    
  }
  const add_bill = (name, amount, billDate) => {
    const today = new Date(); 
    const Year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(billDate).padStart(2, '0'); 

    const due = `${Year}-${month}-${day.split("-")[2]}`
  
    setBillArr(prev => [...prev, {
      name: name,
      amount: amount,
      status: false,
      due: due
    }]);
  };
  const update_Bill = (name, total,date) => {
    setBugetArr((prev) =>
      prev.map(items =>
        items.name === editBillName
          ? { ...items, name: name, amount: total, due:date, status:false }
          : items
      )
    );
    setEditBillName('');
    setEditBillTotal('');
    setEditBillDate('');
  };
  const delete_Bill = (name) => {
    setBugetArr((prev) => prev.filter(item => item.name !== name));
  };
 
  
  
  

    return (
    <div className='col-span-4'>
      {updateshowDialog && (
        <dialog open className='fixed top-1/2 left-1/2 z-50  transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-1/3 max-w-md flex flex-col'>
          <div className='flex items-center justify-between p-2'>
            <h1 className='font-bold text-xl'>Update Bill</h1>
            <button className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-gray-100" onClick={() => setupdateshowDialog(false)}>X</button>
          </div>

          <form className='flex flex-col p-2' onSubmit={(e) => {
            e.preventDefault();
            update_Bill(editBillName, parseInt(editBillTotal));
            setupdateshowDialog(false);
          }}>
            <div className='mb-3'>
              <label className='mr-2' htmlFor="name">Name:</label>
              <input className='p-1' type="text" placeholder='Enter Bill Name' required value={editBillName} onChange={(e) => setEditBillName(e.target.value)} />
            </div>

            <div className='mb-3'>
              <label className='mr-2' htmlFor="total">Allocated Bill:</label>
              <input className='p-1' type="number" min={1} placeholder='Enter Allocated Bill' required value={editBillTotal} onChange={(e) => setEditBillTotal(e.target.value)} />
            </div>

            <div className='mb-3'>
              <label className='mr-2' htmlFor="total">Due Date:</label>
              <input className='p-1' type='date'  required onChange={(e) => setEditBillDate(e.target.value)} />
            </div>

            <button className='w-full bg-blue-600 text-white font-semibold hover:cursor-pointer p-1 rounded-lg' type="submit">Update</button>
          </form>
        </dialog>
      )}



    {showDialog && (
        <dialog open className='fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-1/3 max-w-md flex flex-col'>
          <div className='flex items-center justify-between p-2'>
            <h1 className='font-bold text-xl'>Add bill</h1>
            <button className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-gray-100" onClick={() => setshowDialog(false)}>X</button>
          </div>

          <form className='flex flex-col p-2' onSubmit={(e) => {
            e.preventDefault();
            add_bill(billName, parseInt(billTotal), billDate);
            setshowDialog(false);
          }}>
            <div className='mb-3'>
              <label className='mr-2' htmlFor="name">Name:</label>
              <input className='p-1' type="text" placeholder='Enter bill Name' required value={billName} onChange={(e) => setbillName(e.target.value)} />
            </div>

            <div className='mb-3'>
              <label className='mr-2' htmlFor="total">Allocated bill:</label>
              <input className='p-1' type="number" min={1} placeholder='Enter Allocated bill' required value={billTotal} onChange={(e) => setbillTotal(e.target.value)} />
            </div>

            <div className='mb-3'>
              <label  className='mr-2' htmlFor="date">Due Date</label>
              <input type="date" name="" id="" required onChange={(e)=>setbillDate(e.target.value)} />
            </div>

            <button className='w-full bg-blue-600 text-white font-semibold hover:cursor-pointer p-1 rounded-lg' type="submit">Submit</button>
          </form>
        </dialog>
      )}
     <div className="flex m-3 items-center justify-between">
        <h1 className="text-4xl font-bold">Recurring Bills</h1>
        <div className="flex items-center">
        <img src={filter} className=" h-6 w-auto mr-2 cursor-pointer" onClick={() => setShowSortOptions((prev) => !prev)} />
          {showSortOptions && (
          <select
          className="cursor-pointer"
          onChange={(e) => handle_sort(e.target.value)}
        >
          <option value="amount-asc">Amount (Low to High)</option>
          <option value="amount-desc">Amount (High to Low)</option>
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
          <option value="date-newest">Date (Newest First)</option>
          <option value="date-oldest">Date (Oldest First)</option>
          <option value="amount-rec">Type (Received)</option>
          <option value="amount-sent">Type (Sent)</option>
        </select>
        
          )}
          <form
           onSubmit={(e)=>{
            e.preventDefault()
            handle_search(searchedTerm);
            }}>
          <input
            type="text"
            placeholder="Search by Name"
            value={searchedTerm}
            onChange={(e)=> setterm(e.target.value)}
            className="p-1  focus:outline-none focus:ring-2 focus:ring-black bg-gray-100 text-gray-900 rounded-lg"
          />
        </form>
        <button className="bg-green-700 text-white p-2 ml-2 rounded-lg cursor-pointer hover:bg-green-800"
          onClick={()=>{
          
          setterm("")}}
        >Clear</button>
        <button className="bg-blue-700 text-white p-2 ml-2 rounded-lg cursor-pointer hover:bg-blue-800 px-6"
        onClick={()=>setshowDialog(true)}
        >Add Bill</button>
        </div>
      </div>
      <div className='flex items-center justify-around'>
        {tabs.map(item=>(
          <span 
          onClick={()=>setcurrTab(item)}
          className={` rounded-2xl  text-center hover:cursor-pointer ${currTab===item?"bg-black text-white":"bg-gray-200"} w-1/6 p-1`}>{item}</span>
        ))}
        
        
      </div>
      <div className='overflow-scroll m-3'>
          {filteredArr.map(item=>
          (
          <div className={`flex items-center justify-between ${item.status?"bg-gray-200":""} p-2 rounded-lg mb-1.5`}>
          <div className='flex items-center'>
            <input className='mr-2' type="checkbox" checked={item.status}
          
          onChange={() => {
            const updatedBills = BillArr.map(bill =>
              bill.name === item.name ? { ...bill, status: !bill.status } : bill
            );
            setBillArr(updatedBills);
          }}/>
            <p className='text-lg mr-2 '>{item.name}</p>
            <p className='text-sm'>{item.due}</p>
          </div>
          <div className='flex items-center'>
            <p className=' mr-2'>{item.amount}</p>
            
            <img src={delete_btn} alt="delete button"
            onClick={() => delete_Bill(item.name)}
            className='mr-2 h-5 w-auto hover:cursor-pointer'  />
            <img src={edit} alt="edit button"
            onClick={()=> {setupdateshowDialog(true)
            setEditBillName(item.name);
            setEditBillTotal(item.amount);
            
            }}
            className='mr-2 h-5 w-auto hover:cursor-pointer' />
          </div>
          </div>
          


          ))}
          
          </div>
    </div>
  )
}

export default RecurrBill