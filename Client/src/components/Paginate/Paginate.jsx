export default function Paginate({ productsPerPage, totalProducts, page, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-12">
      <ul className="flex justify-center list-none p-0 text-gray-500 rounded-md max-w-fit mx-auto">
        {pageNumbers.map((number) => (
          <li key={number} className={`mr-5 last:mr-0 ${currentPage === number ? 'font-bold text-orange-600' : ''}`}>
            <a 
              onClick={(e) => {
                e.preventDefault();
                page(number);
              }} 
              href={`#${number}`}   
              className="text-xl font-normal font-fantasy text-aliceblue no-underline hover:text-blue-400"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
