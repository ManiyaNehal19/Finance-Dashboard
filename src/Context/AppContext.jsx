import React, { createContext, useState, useEffect } from 'react';
import transactions from "../Data/transaction.js";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [BillArr, setBillArr] = useState(() => {
    const saved = localStorage.getItem("billArr");
    return saved ? JSON.parse(saved) : [{
      name: "Wifi",
      amount: 1000,
      due: "2025-07-09",
      status: false
    }];
  });

  useEffect(() => {
    const dataToSave = BillArr.map(({ name, amount, due, status }) => ({ name, amount, due, status }));
    localStorage.setItem("billArr", JSON.stringify(dataToSave));
  }, [BillArr]);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const lastMonth = parseInt(localStorage.getItem("lastUpdatedMonth"));
    if (lastMonth !== currentMonth) {
      const resetBills = BillArr.map(bill => ({ ...bill, status: false }));
      setBillArr(resetBills);
      localStorage.setItem("lastUpdatedMonth", currentMonth.toString());
    }
  }, []);

  const [PotsArr, setPotsArr] = useState(() => {
    const saved = localStorage.getItem("PotsArr");
    const parsed = saved ? JSON.parse(saved) : [];
    return parsed;
  });

  useEffect(() => {
    const dataToSave = PotsArr.map(({ name, total, saved }) => ({ name, total, saved }));
    localStorage.setItem("PotsArr", JSON.stringify(dataToSave));
  }, [PotsArr]);

  const add_spent = (name) => {
    let total = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].reason.toLowerCase() === name.toLowerCase()) {
        if (transactions[i].type === "sent") total += transactions[i].amount;
        else total -= transactions[i].amount;
      }
    }
    return total;
  };

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

  return (
    <AppContext.Provider
      value={{
        BillArr, setBillArr,
        PotsArr, setPotsArr,
        budget_array, setBugetArr,
        add_spent
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
