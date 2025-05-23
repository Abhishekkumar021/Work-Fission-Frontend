export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder="Search products..."
      className="w-full lg:w-lg max-w-full xs:h-12 h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md p-2 border dark:border-gray-300 border-gray-600 dark:text-white text-black items-center justify-center"
    />
  );
}
