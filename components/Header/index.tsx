const Header = ({
  setQuery,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <header className="flex flex-col md:flex-row w-full gap-5 lg:gap-10 items-center justify-between">
      {/* logo */}
      <p className="text-2xl font-bold text-gray-800 uppercase w-full">
        Book Search App
      </p>

      {/* search input  */}
      <input
        id="search-input"
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-gray-400 focus:shadow-sm"
        placeholder="Search for books"
        onChange={(e) => setQuery(e.target.value)}
      />
    </header>
  );
};

export default Header;
