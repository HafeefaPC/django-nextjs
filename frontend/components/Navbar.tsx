'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Bars3Icon, GlobeAltIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/solid';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function Navbar() {
  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);

  const handleSelect = (ranges: RangeKeyDict) => {
    setStartDate(ranges.selection.startDate ?? new Date());
    setEndDate(ranges.selection.endDate ?? new Date());
  };
 
  const handleClick = () => {
    console.log('Searching...', {
      searchInput,
      startDate,
      endDate,
      noOfGuests,
    });
    // fetch() or router.push can be used here
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  return (
    <div>
      <header className="sticky top-0 z-50 px-5 py-2 bg-white shadow-md flex justify-between items-center">
        <a href="/">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </a>
        <div>
          <input
            className="w-96 placeholder:italic placeholder-text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything"
            type="text"
            name="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4 justify-end">
          <a
            href="/properties/createProperty"
            className="font-semibold hover:cursor-pointer p-2.5 rounded-full"
          >
            Host your home
          </a>
          <GlobeAltIcon className="h-6" />
          <a
            href="/login"
            className="flex space-x-2 border-2 p-2 rounded-full hover:cursor-pointer hover:shadow-md"
          >
            <Bars3Icon className="h-6" />
            <UserCircleIcon className="h-6" />
          </a>
        </div>
      </header>

      <div className="flex justify-center mt-4">
        <DateRangePicker
          ranges={[selectionRange]}
          minDate={new Date()}
          rangeColors={['#FD5B61']}
          onChange={handleSelect}
        />
      </div>

      <div className="flex items-center justify-center space-x-2 mt-4">
        <UserIcon className="h-6" />
        <h1 className="text-center">Guests</h1>
        <input
          type="number"
          className="w-12 border-2 rounded-md text-center"
          min={1}
          value={noOfGuests}
          onChange={(e) => setNoOfGuests(Number(e.target.value))}
        />
        <button className="text-red-600 pl-8" onClick={handleClick}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Navbar;
