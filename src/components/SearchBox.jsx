import React from 'react';

const SearchBox = ({ onSearch }) => {
  return (
    <div className="contactList-search-box">
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => onSearch(e.target.value)}
      />
    
      <i className="search-icon fas fa-search"></i>
    </div>
  );
};

export default SearchBox;
