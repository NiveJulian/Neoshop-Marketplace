import "./navbar.css";

export default function Navbar() {
  return (
    <div className="search-box">
        <input placeholder="Search" type="search" />
        <button className="search-button" type="submit">
          🔎
        </button>
    </div>
  );
}



