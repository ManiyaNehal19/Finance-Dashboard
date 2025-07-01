import React from 'react'
import user_img from '../assets/user.png'
function Transaction_info({name, date, receieved, amount }) {
    // console.log(name, date, receieved, amount);
    const isRecived = receieved=="received"? true: false;
  return (
    <div className='flex items-center justify-between mb-1 border-b border-gray-200 p-1'>
        <div className='flex items-center'>
            <img src={user_img} alt="" className='h-7 w-auto mr-3'/> 
            <h3>{name}</h3></div>
        <div>
        <p className={`${isRecived?"text-green-700" :"text-red-700" }`}>{amount}</p>
        <p className={'text-sm text-gray-600'}>{date}</p>
        </div>
    </div>
  )
}

export default Transaction_info