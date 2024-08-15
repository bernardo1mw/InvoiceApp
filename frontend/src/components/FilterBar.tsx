// src/components/FilterBar.tsx
import React, { useState } from 'react';

interface FilterBarProps {
  onFilter: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFilter(query);
  };

  return (
    <form className='my-5' onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by invoice number, emitter or recipient"
      />
      <button className='bg-blue-500 px-4 py-2 text-slate-800 font-bold my-3 hover:bg-blue-700' type="submit">Filter</button>
    </form>
  );
};

export default FilterBar;
