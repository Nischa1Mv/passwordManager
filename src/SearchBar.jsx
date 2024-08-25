const SearchBar = () => {
  const Search = () => {};
  return (
    <div>
      <div className="relative ">
        <input
          className="border-2 border-[#1c201e] rounded-xl px-2 bg-transparent focus:outline-none "
          type="text"
          placeholder="Search"
        />
        <svg
          onClick={() => Search()}
          className="absolute top-1 right-2 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#FFFFFF"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
      </div>
    </div>
  );
};
export default SearchBar;