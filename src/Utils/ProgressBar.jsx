import React from 'react'



function ProgressBar({width}) {
  const getColorClass = () => {
    if (width >= 0 && width <= 70) {
      return "bg-green-600"
    } else if (width <= 90) {
      return "bg-yellow-300"
    } else if(width<=100) {
      return "bg-red-600"
    }else{
      return "bg-red-800"
    }
    
  }

  return (
    <><div className="w-full h-5 bg-gray-200 rounded-full">
    <div className={`${getColorClass()} h-5 text-sm font-semibold text-white text-center rounded-full`} style={{ width: `${Math.min(width, 100)}%` }}
>{width>100?"You are Over the Budget":""}</div>
  </div></>
      
    
  )
}

export default ProgressBar
