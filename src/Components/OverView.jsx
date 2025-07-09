import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext.jsx';
import transactions from '../Data/transaction.js';
import money_bag from '../assets/money-bag.png'
function OverView() {
  const {
    BillArr,
    setBillArr,
    PotsArr,
    setPotsArr,
    budget_array,
    setBugetArr, // Keep this if it's named this way in context
  } = useContext(AppContext);
  const pots_total = PotsArr.reduce((total,item) => item.saved+total, 0)
  const firstFourPots = PotsArr.slice(0, 4);
  const firstFourBudget = budget_array.slice(0,4);
  const firstFourBill = BillArr.slice(0,4);
  const transaction5 = transactions.slice(0,5);
  return (
    <div className=" grid grid-cols-12 gap-2 bg-stone-300 grid-rows-6 col-span-4 p-2 ">

      <div className="col-span-7 row-span-2 bg-white rounded-lg p-2 flex ">
        <div className='w-1/2'>
          <h1 className='font-bold text-xl'>Pots</h1>
          <div className='bg-stone-200 text-center p-2 flex items-center rounded-lg'>
            <img className='h-25 w-auto' src={money_bag} alt="" />
            <div className='w-1/2'>
            <p className='text-gray-600'>Total Saved</p>
            <p className="text-2xl">{pots_total} </p>
            </div>
            
            </div>
          </div>
        <div>
        {firstFourPots.map(item=>(
          <div>
            {item.name}
          </div>
        ))}
      </div>
      </div>
      

      <div className="col-span-5 row-span-3 bg-purple-400"></div>
     
      <div className="col-span-7 row-span-4 bg-orange-500 "></div>
      <div className="col-span-5 row-span-3 bg-pink-300 "></div>
    </div>
  );
}

export default OverView;
