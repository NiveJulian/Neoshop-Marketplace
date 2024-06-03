import style from "./Paginate.module.css";

export default function Paginate({ productsPerPage, totalProducts, page, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={style.pagination}>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? style["current-page"] : ""}>
            
            <a 
              onClick={(e) => {
                e.preventDefault();
                page(number);
              }} 
              href={`#${number}`} 
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}