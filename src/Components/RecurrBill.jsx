import React, { useEffect, useState } from 'react'
import filter from '../assets/filter.png'

function RecurrBill() {
  //use switch case for tabs + sort and handling as well 
   
  const tabs = ["ALL", "UNPAID", "UPCOMING"]
  const [showSortOptions, setShowSortOptions] = useState(false)
  const [currTab, setcurrTab] = useState("ALL")
  const [showDialog, setshowDialog] = useState(false);
  const [billName, setbillName] = useState('');
  const [billTotal, setbillTotal] = useState('');
  const [billDate, setbillDate] = useState();
  const [BillArr, setBillArr] = useState([{
    name:"Wifi",
    amount: 1000,
    due: "2025-07-09",
    status: false
  }])
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
        const today= new Date();
        const upcoming = BillArr.filter(item=>( item.due>today &&item.status===false));
        setFilteredArr(upcoming);
        break
    }
  },[currTab,BillArr])
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
 


    return (
    <div className='col-span-4'>
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
          <form>
          <input
            type="text"
            placeholder="Search by Name"
            
            className="p-1  focus:outline-none focus:ring-2 focus:ring-black bg-gray-100 text-gray-900 rounded-lg"
          />
        </form>
        <button className="bg-green-700 text-white p-2 ml-2 rounded-lg cursor-pointer hover:bg-green-800">Clear</button>
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
            <p className='text-lg'>{item.name}</p>
          </div>
          <div className='flex items-center'>
            <p className='mr-2 text-sm'>{item.due}</p>
            <p className='text-sm'>{item.amount}</p>
          </div>
          </div>
          


          ))}
          
          </div>
    </div>
  )
}

export default RecurrBill