import React, { useEffect, useState } from 'react'

function ProgressBar({ width, value = false }) {
  const [msg, setmsg] = useState("")

  useEffect(() => {
    if (value) {
      setmsg(width === 100 ? "Congratulations!!! You Did it" : "")
    } else {
      setmsg(width > 100 ? "You are Over the Budget" : "")
    }
  }, [width, value])

  const getColorClass = () => {
    if (value) {
      if (width >= 0 && width <= 30) return "bg-orange-300"
      if (width > 30 && width <= 60) return "bg-yellow-300"
      if (width <= 90) return "bg-green-300"
      if (width <= 100) return "bg-green-600"
    } else {
      if (width >= 0 && width <= 70) return "bg-green-600"
      if (width <= 90) return "bg-yellow-300"
      if (width <= 100) return "bg-red-600"
      return "bg-red-800"
    }
  }

  return (
    <div className="w-full h-5 bg-gray-200 rounded-full">
      <div
        className={`${getColorClass()} h-5 text-sm font-semibold text-white text-center rounded-full`}
        style={{ width: `${Math.min(width, 100)}%` }}
      >
        {msg}
      </div>
    </div>
  )
}

export default ProgressBar
