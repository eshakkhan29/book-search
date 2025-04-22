import Image from "next/image";

const BookCard = ({ book }: { book: any }) => {
  const combinedAuthors = book?.author_key?.map(
    (key: string, index: number) => ({
      key,
      name: book?.author_name?.[index],
    })
  );
  return (
    <div className="border border-gray-200 rounded-md shadow-sm">
      {/* book image */}
      <div className="w-full h-[300px] rounded-md p-2">
        <Image
          className="w-full h-full rounded-md object-contain"
          src={`https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`}
          alt="Book Cover"
          width={1000}
          height={1000}
          priority
        />
      </div>
      <div className="p-3 space-y-1">
        {/* book title */}
        <p className="text-lg font-semibold text-gray-700">{book?.title}</p>
        {/* book author */}
        <p className="text-sm text-gray-500">
          Published: {book?.first_publish_year}
        </p>

        {/* author list */}
        <p className="text-base font-semibold text-gray-700 ">Author list</p>
        {combinedAuthors?.map(
          (author: { key: string; name: string }, index: number) => (
            <div key={index} className="flex items-center gap-1.5">
              <Image
                className="w-[28px] h-[28px] rounded-full object-cover overflow-hidden shrink-0"
                src={
                  author?.key
                    ? `https://covers.openlibrary.org/a/olid/${author?.key}-M.jpg`
                    : "/user-avatar.png"
                }
                alt="author avatar"
                width={100}
                height={100}
                priority
              />
              <p className="text-sm text-gray-500 w-full">{author?.name}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BookCard;
