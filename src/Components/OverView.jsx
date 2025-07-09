import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext.jsx';
import transactions from '../Data/transaction.js';
import money_bag from '../assets/money-bag.png'
import { NavLink } from 'react-router-dom';
import Transaction_info from '../Utils/transaction_info.jsx';

function OverView() {

  const {
    BillArr,
    setBillArr,
    PotsArr,
    setPotsArr,
    budget_array,
    setBugetArr, 
  } = useContext(AppContext);
  const pots_total = PotsArr.reduce((total,item) => item.saved+total, 0)
  const firstFourPots = PotsArr.slice(0, 4);
  const firstFourBudget = budget_array.slice(0,4);
  const firstFourBill = BillArr.slice(0,4);
  const transaction5 = transactions.slice(0,7);
 
  const total= BillArr.reduce((total,item )=>item.amount+total,0)
  const paidBilllist = BillArr.filter(item=>(item.status===true))  ;
  const paidBill = paidBilllist.reduce((total,item)=>item.amount+total,0)
  
  return (
    <div className=" grid grid-cols-12 gap-2 bg-stone-300 grid-rows-6 col-span-4 p-2 ">
      
      <div className="col-span-7 row-span-2 bg-stone-100 rounded-lg p-2 ">
        <div className='flex items-center justify-between mr-1 ml-1'>
          <h1 className='font-bold text-2xl mb-2'>Pots</h1>
          
          <NavLink
            key='pots'
            to='/Pots'
            end
            className='text-gray-600 hover:cursor-pointer'
          >
           See Details
          </NavLink>
         
        </div>
        <div className='flex'>
          <div className='bg-stone-200 text-center p-2 flex items-center rounded-lg  w-1/2'>
            <img className='h-25 w-auto' src={money_bag} alt="" />
            <div className='w-1/2'>
            <p className='text-gray-600'>Total Saved</p>
            <p className="text-2xl font-bold">{pots_total}{" "}pkr</p>
            </div>
            
            </div>
            <div className='p-2 w-1/2 grid grid-cols-2 gap-2'>
  {firstFourPots.map((item, index) => (
    <div
      key={index}
      className={`bg-stone-200 border-l-4 ${index%2===0?"border-blue-600":"border-green-600"}  flex items-center justify-center rounded-lg h-16 text-center p-2`}
    >
      {item.name}
    </div>
  ))}
</div>
          </div>
        
      </div>
      

      <div className="col-span-5 row-span-3 bg-purple-400  bg-stone-100 rounded-lg p-2 ">

      <div className='flex items-center justify-between mr-1 ml-1'>
          <h1 className='font-bold text-2xl mb-2'>Budget</h1>
          
          <NavLink
            key='budget'
            to='/Budgets'
            end
            className='text-gray-600 hover:cursor-pointer'
          >
           See Details
          </NavLink>
          </div>
        
        <div className='flex items-center justify-between p-1 text-center'>
            <h1 className='text-white p-2 bg-blue-600 rounded-lg '>Totak Budget: {firstFourBudget.reduce((total,item)=>item.total+total,0)}</h1>
            <h1 className='text-white p-2 bg-green-600 rounded-lg'>Spent: {firstFourBudget.reduce((total,item)=>item.spent+total,0)}</h1>
        </div>
        <div>
          {firstFourBudget.map(item=>(
           <div className='flex items-center justify-between mb-1 border-b border-gray-200 p-1'>
           <div className='flex items-center'>
               
               <h3>{item.name}</h3>
            </div>
           <div>
           <p>{item.spent}/{item.total}</p>

           </div>
       </div>
          ))}
        </div>
    
      
      </div>
     
      <div className="col-span-7 row-span-4 bg-stone-100 rounded-lg p-2 ">
      <div className='flex items-center justify-between mr-1 ml-1'>
          <h1 className='font-bold text-2xl mb-2'>Transactions</h1>
          
          <NavLink
            key='transactions'
            to='/Transactions'
            end
            className='text-gray-600 hover:cursor-pointer'
          >
           See Details
          </NavLink>
          
        </div>
        <div>
          {transaction5.map(item=>(
            <Transaction_info name={item.name} date={item.date} receieved={item.receieved} amount={item.amount} />
          ))}
        </div>
      </div>
      <div className="col-span-5 row-span-3  bg-stone-100 rounded-lg p-2  ">
      <div className='flex items-center justify-between mr-1 ml-1'>
          <h1 className='font-bold text-2xl mb-2'>Recurring Bills</h1>
          
          <NavLink
            key='bills'
            to='/RecurringBills'
            end
            className='text-gray-600 hover:cursor-pointer'
          >
           See Details
          </NavLink>
          </div>
        
        <div className='flex items-center justify-between p-1 text-center'>
            <h1 className='text-white p-2 bg-blue-600 rounded-lg '>Totak Bills: {total}</h1>
            <h1 className='text-white p-2 bg-green-600 rounded-lg'>Paid Bill: {paidBill}</h1>
        </div>
        <div>
          {firstFourBill.map(item=>(
           <div className='flex items-center justify-between mb-1 border-b border-gray-200 p-1'>
           <div className='flex items-center'>
               
               <h3>{item.name}</h3>
            </div>
           <div>
           <p className={`${item.status?"text-green-700" :"text-red-700" }`}>{item.amount}</p>
           <p className={'text-sm text-gray-600'}>{item.due}</p>
           </div>
       </div>
          ))}
        </div>
      </div>
    </div> 
  );
}

export default OverView;
