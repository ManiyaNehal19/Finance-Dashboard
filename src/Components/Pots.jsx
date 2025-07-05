import React, { useEffect, useState } from 'react';
import ProgressBar from '../Utils/ProgressBar.jsx';
import ErrorPopup from '../Utils/ErrorPopUp.jsx';
import delete_btn from '../assets/dustbin.png';
import edit from '../assets/pen.png';

function Pots() {
  function calculateProgress(spent, total) {
    return total ? (spent / total) * 100 : 0;
  }

  const [PotsArr, setPotsArr] = useState(() => {
    const saved = localStorage.getItem("PotsArr");
    const parsed = saved ? JSON.parse(saved) : [];
    return parsed.map(item => ({ ...item }));
  });

  useEffect(() => {
    const dataToSave = PotsArr.map(({ name, total, saved }) => ({ name, total, saved }));
    localStorage.setItem("PotsArr", JSON.stringify(dataToSave));
  }, [PotsArr]);

  const [showDialog, setshowDialog] = useState(false);
  const [updateshowDialog, setupdateshowDialog] = useState(false);
  const [potName, setpotName] = useState('');
  const [potTotal, setpotTotal] = useState('');
  const [editPotName, setEditPotName] = useState('');
  const [editPotTotal, setEditPotTotal] = useState('');
  const [editdeposit, seteditdeposit] = useState(0);
  const [editwithdraw, seteditwithdraw] = useState(0);
  const [showDeposit, setDeposit] = useState(false);
  const [showWithdraw, setWithdraw] = useState(false);
  const [selectedPot, setSelectedPot] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [ValueHolder, setValueHolder] = useState([]);

  const totalSaved = () => {
    return PotsArr.reduce((saved, item) => item.saved + saved, 0);
  };

  const is_pot_present = (name) => {
    return PotsArr.some(b => b.name.toLowerCase() === name.toLowerCase());
  };

  const add_pot = (name, total) => {
    if (!is_pot_present(name.toLowerCase())) {
      setPotsArr((prev) => [...prev, { name: name, total: total, saved: 0 }]);
    }
  };

  const delete_Pot = (name) => {
    setPotsArr((prev) => prev.filter(item => item.name !== name));
  };

  const update_pot = (name, total) => {
    setPotsArr((prev) =>
      prev.map(items =>
        items.name === ValueHolder[0]
          ? { ...items, name: name, total: total }
          : items
      )
    );
    setValueHolder([]);
    setEditPotName('');
    setEditPotTotal('');
  };

  const saved_update = (name, money, withdraw) => {
    setPotsArr((prev) =>
      prev.map(pot => {
        if (pot.name === name) {
          if (withdraw) {
            if (money <= pot.saved) {
              return { ...pot, saved: pot.saved - money };
            } else {
              setErrorMsg("You don't have sufficient funds.");
              return pot;
            }
          } else {
            if((money+pot.saved)<=pot.total)
            return { ...pot, saved: pot.saved + money };
            else{
              setErrorMsg("You are over the total.");
              return pot;
            }
          }
        }
        return pot;
      })
    );

    setWithdraw(false);
    setDeposit(false);
    seteditwithdraw(0);
    seteditdeposit(0);
    setSelectedPot('');
  };

  return (
    <div className='col-span-4'>
      <ErrorPopup message={errorMsg} onClose={() => setErrorMsg('')} />

      {showDeposit && (
        <dialog open className='fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-1/3 max-w-md'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold'>Deposit to {selectedPot}</h2>
            <button onClick={() => setDeposit(false)} className="text-gray-500 font-bold text-xl">×</button>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            saved_update(selectedPot, parseInt(editdeposit), false);
          }}>
            <input
              type="number"
              min={1}
              value={editdeposit}
              onChange={(e) => seteditdeposit(Number(e.target.value))}
              className='w-full border p-2 rounded mb-4'
              placeholder="Enter amount"
              required
            />
            <button type="submit" className='bg-green-600 text-white w-full py-2 rounded hover:bg-green-700'>Deposit</button>
          </form>
        </dialog>
      )}

      {showWithdraw && (
        <dialog open className='fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-1/3 max-w-md'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold'>Withdraw from {selectedPot}</h2>
            <button onClick={() => setWithdraw(false)} className="text-gray-500 font-bold text-xl">×</button>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            saved_update(selectedPot, parseInt(editwithdraw), true);
          }}>
            <input
              type="number"
              min={1}
              value={editwithdraw}
              onChange={(e) => seteditwithdraw(Number(e.target.value))}
              className='w-full border p-2 rounded mb-4'
              placeholder="Enter amount"
              required
            />
            <button type="submit" className='bg-red-600 text-white w-full py-2 rounded hover:bg-red-700'>Withdraw</button>
          </form>
        </dialog>
      )}

      {updateshowDialog && (
        <dialog open className='fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-1/3 max-w-md flex flex-col'>
          <div className='flex items-center justify-between p-2'>
            <h1 className='font-bold text-xl'>Update Pot</h1>
            <button className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-gray-100" onClick={() => setupdateshowDialog(false)}>X</button>
          </div>
          <form className='flex flex-col p-2' onSubmit={(e) => {
            e.preventDefault();
            update_pot(editPotName, parseInt(editPotTotal));
            setupdateshowDialog(false);
          }}>
            <div className='mb-3'>
              <label className='mr-2' htmlFor="name">Name:</label>
              <input className='p-1' type="text" placeholder='Enter Pot Name' required value={editPotName} onChange={(e) => setEditPotName(e.target.value)} />
            </div>
            <div className='mb-3'>
              <label className='mr-2' htmlFor="total">Allocated pot:</label>
              <input className='p-1' type="number" min={1} placeholder='Enter Saved Amount' required value={editPotTotal} onChange={(e) => setEditPotTotal(e.target.value)} />
            </div>
            <button className='w-full bg-blue-600 text-white font-semibold hover:cursor-pointer p-1 rounded-lg' type="submit">Update</button>
          </form>
        </dialog>
      )}

      {showDialog && (
        <dialog open className='fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-1/3 max-w-md flex flex-col'>
          <div className='flex items-center justify-between p-2'>
            <h1 className='font-bold text-xl'>Add Pot</h1>
            <button className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-gray-100" onClick={() => setshowDialog(false)}>X</button>
          </div>
          <form className='flex flex-col p-2' onSubmit={(e) => {
            e.preventDefault();
            add_pot(potName, parseInt(potTotal));
            setshowDialog(false);
          }}>
            <div className='mb-3'>
              <label className='mr-2' htmlFor="name">Name:</label>
              <input className='p-1' type="text" placeholder='Enter Pot Name' required value={potName} onChange={(e) => setpotName(e.target.value)} />
            </div>
            <div className='mb-3'>
              <label className='mr-2' htmlFor="total">Saving Amount:</label>
              <input className='p-1' type="number" min={1} placeholder='Enter Saving Amount' required value={potTotal} onChange={(e) => setpotTotal(e.target.value)} />
            </div>
            <button className='w-full bg-blue-600 text-white font-semibold hover:cursor-pointer p-1 rounded-lg' type="submit">Submit</button>
          </form>
        </dialog>
      )}

   
      <div className="flex m-3 items-center justify-between">
        <h1 className="text-4xl font-bold">Pots</h1>
        <button
          onClick={() => setshowDialog(true)}
          className='bg-blue-700 text-white p-2 ml-2 rounded-lg cursor-pointer hover:bg-blue-800'>Add Pot</button>
      </div>

      <div className='m-3'>
        <h1 className="text-xl font-semibold">Total Saved: {totalSaved()}</h1>
      </div>

      <div className='p-2 overflow-scroll'>
        {PotsArr.map((items) => (
          <div className='mb-3' key={items.name}>
            <div className="flex justify-between mb-1">
              <div className='flex items-center'>
                <span className="font-semibold text-lg text-black-700 mr-4">{items.name}</span>
                <img src={edit}
                  onClick={() => {
                    setupdateshowDialog(true);
                    setValueHolder([items.name, items.total]);
                    setEditPotName(items.name);
                    setEditPotTotal(items.total);
                  }}
                  alt="edit button"
                  className='mr-2 h-5 w-auto hover:cursor-pointer' />
                <img
                  onClick={() => delete_Pot(items.name)}
                  src={delete_btn}
                  alt="delete button"
                  className='h-5 w-auto hover:cursor-pointer' />
              </div>
              <div className='flex items-center'>
                <span
                  className='text-red-700 hover:text-red-950 underline mr-2 hover:cursor-pointer'
                  onClick={() => {
                    setSelectedPot(items.name);
                    setWithdraw(true);
                  }}
                >
                  Withdraw Money
                </span>
                <span
                  className='text-green-700 hover:text-green-950 underline mr-2 hover:cursor-pointer'
                  onClick={() => {
                    setSelectedPot(items.name);
                    setDeposit(true);
                  }}
                >
                  Deposit Money
                </span>
                <span className="text-lg font-medium text-black-700">{items.saved}/{items.total}</span>
              </div>
            </div>
            <ProgressBar width={calculateProgress(items.saved, items.total)} value={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pots;
