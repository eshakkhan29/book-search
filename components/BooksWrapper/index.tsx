import { useEffect, useState } from "react";
import BookCard from "../BookCard";
import Loader from "../Loader";

const BooksWrapper = ({ query }: { query: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<any>({});
  const [error, setError] = useState<string>("");
  const [searchDone, setSearchDone] = useState<boolean>(false);

  // fetch books
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() === "") {
        setBooks({});
        setSearchDone(false);
        setError("");
        return;
      }

      const getBooks = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
          );
          const data = await res.json();
          setBooks(data);
          setError("");
        } catch (error: any) {
          setError(error?.response?.data?.message || "Something went wrong");
        } finally {
          setLoading(false);
          setSearchDone(true);
        }
      };

      getBooks();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <>
      {/* instruction */}
      {!loading && !error && !searchDone && (
        <div className="h-[calc(100vh-200px)] flex flex-col gap-7 items-center justify-center w-full">
          <p className="text-4xl font-semibold text-gray-700 text-center">
            What book you want to search please write book title <br /> in the
            search bar
          </p>
          <label
            className="px-4 cursor-pointer py-1.5 rounded-md text-center font-semibold text-white bg-gray-800"
            htmlFor="search-input"
          >
            Search
          </label>
        </div>
      )}

      {/* loader  */}
      {loading && (
        <div className="h-[calc(100vh-200px)] flex items-center justify-center w-full">
          <Loader size={50} thickness={3} classNames="text-green-500" />
        </div>
      )}

      {/* show error if api give an error */}
      {error && !loading && (
        <div className="h-[calc(100vh-200px)] flex items-center justify-center w-full">
          <p className="text-3xl font-semibold text-red-400">{error}</p>
        </div>
      )}

      {/* if no book found show message */}
      {books?.docs?.length === 0 &&
        query &&
        !loading &&
        searchDone &&
        !error && (
          <div className="h-[calc(100vh-200px)] flex items-center justify-center w-full">
            <p className="text-3xl font-medium text-gray-600">
              No book found for this title <b>{query}</b> Try another title
            </p>
          </div>
        )}

      {/* book list */}
      {books?.docs?.length > 0 && !loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books?.docs?.map((book: any, index: number) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      )}
    </>
  );
};

export default BooksWrapper;
