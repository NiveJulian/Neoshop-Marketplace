import React, { useState } from 'react';
import style from "./Paginado.module.css"


export default function Paginate({ productsPerPage, totalProducts, paginate, currentPage }) {
  console.log("Número de página actual:", paginate);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={style.pagination}>
      <nav className={style.actualPage}>PAGE: {currentPage}/{Math.ceil(totalProducts / productsPerPage)}</nav>
      <ul >
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? style["current-page"] : ""}>
            <a onClick={() => paginate(number)} href={`#${number}`} >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
