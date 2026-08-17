import React from "react";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import SearchIcon from "@mui/icons-material/Search";

function Header({ searchQuery, setSearchQuery }) {
  return (
    <header>
      <div className="header-brand">
        <StickyNote2Icon fontSize="large" />
        <h1>Sticky Notes</h1>
      </div>
      <div className="header-search">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search notes"
        />
      </div>
    </header>
  );
}

export default Header;
