import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

import transactions from "../Data/transaction.js";
import Transaction_info from "../Utils/transaction_info.jsx";
import filter from '../assets/filter.png'
function Transaction() {
  const [index, setindex] = useState(0);
  const [transavail, setransavail] = useState(true);
  const [showSortOptions, setShowSortOptions] = useState(false)
  const [sortedData, setsortedData] = useState(transactions)
  const [searchedTerm, setterm] = useState("");

  function handle_sort(value){
    console.log(value);
    switch (value) {
      case "amount-rec":
        const sort_rec = transactions.filter((data)=> data.type==="received")
        setsortedData(sort_rec);
        break;
      case "amount-sent":
        const sort_sent = transactions.filter((data)=> data.type==="sent")
        setsortedData(sort_sent);
        break;
      case "name-asc":
        const name_Asc = [...transactions].sort((a,b)=> a.name.localeCompare(b.name));
        setsortedData(name_Asc);
        break;
      case "name-desc":
        const name_desc = [...transactions].sort((a,b)=> b.name.localeCompare(a.name));
        setsortedData(name_desc);
        break;
      case "amount-asc":
        const amount_asc = [...transactions].sort((a,b)=>a.amount-b.amount);
        setsortedData(amount_asc);
        break;
      case "amount-desc":
        const amount_desc = [...transactions].sort((a,b)=>b.amount-a.amount);
        setsortedData(amount_desc);
        break;
      case "date-newest":
        const date_newest = [...transactions].sort((a,b)=>new Date(b.date)-new Date(a.date));
        setsortedData(date_newest);
        break;
      case "date-oldest":
        const date_oldest = [...transactions].sort((a,b)=>new Date(a.date)-new Date(b.date));
        setsortedData(date_oldest);
        break;

    }
  }
  function handle_search(name){
    if(name){
    const searched = transactions.filter((data)=> data.name.toLowerCase()===name.toLowerCase());
    setsortedData(searched);
    setindex(0);
    }
    
  }
  
  let data = sortedData.slice(index, index+10);

  return (
    <div className=" col-span-4 ">
      <div className=" flex m-3 items-center justify-between">
        <h1 className="text-4xl font-bold">Transactions</h1>
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
          setsortedData(transactions)
          setterm("")}}
          >Clear</button>
        </div>
        
      </div>

      <div className=" flex m-3 items-center justify-between">
        <p className={`p-2  hover:cursor-pointer hover:font-semibold ${
            index-10 < 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
          }`}
          onClick={() => {
            if (index-10  >= 0) {
              setindex((prev) => prev - 10);
            }
          }}>
          Back
        </p>
        <p
          className={`p-2  hover:cursor-pointer hover:font-semibold ${
            index + 10 >= sortedData.length
              ? "text-gray-400 cursor-not-allowed"
              : ""
          }`}
          onClick={() => {
            if (index + 10 < sortedData.length) {
              setindex((prev) => prev + 10);
            }
          }}
        >
          Next
        </p>
      </div>
      <div className="m-3">
        {transavail &&
          data.map((transaction) => (
            <Transaction_info
              name={transaction.name}
              date={transaction.date}
              receieved={transaction.type}
              amount={transaction.amount}
            />
          ))}
      </div>
    </div>
  );
}

export default Transaction;
