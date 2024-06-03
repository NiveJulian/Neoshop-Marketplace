export default function Paginate({ productsPerPage, totalProducts, page, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul className="flex justify-center list-none p-0 text-gray-500 rounded-md max-w-fit mx-auto mt-auto">
        {pageNumbers.map((number) => (
          <li 
            key={number} 
            className={`${currentPage === number ? "font-bold text-orange-600 bg-black bg-opacity-20 rounded-md px-1" : ""} mr-5 last:mr-0`}
          >
            <a 
              onClick={(e) => {
                e.preventDefault();
                page(number);
              }} 
              href={`#${number}`} 
              className="text-xl font-normal text-orange-600 no-underline cursor-pointer relative hover:text-blue-40"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}