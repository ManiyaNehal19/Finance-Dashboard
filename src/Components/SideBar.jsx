import React from 'react';
import { NavLink } from 'react-router-dom';

function SideBar() {
  const navItems = [
    { id: 'overview', label: 'Overview', path: '' },
    { id: 'transaction', label: 'Transaction', path: '/Transactions' },
    { id: 'budget', label: 'Budgets', path: '/Budgets' },
    { id: 'pots', label: 'Pots', path: '/Pots' },
    { id: 'bill', label: 'Recurring Bills', path: '/RecurringBills' }
  ];

  return (
    <div className="bg-black text-white col-span-1  h-screen">
      <h1 className="text-4xl font-extrabold m-3">finance</h1>

      <div>
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end
            className={({ isActive }) =>
              `block rounded-r-lg p-3 mr-2.5 hover:cursor-pointer ${
                isActive ? 'bg-white text-black' : 'text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
