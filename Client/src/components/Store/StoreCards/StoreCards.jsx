import { Link } from "react-router-dom";

export default function StoreCards({ id,
    name,
    address_cp,
    address_country,
    address_city,
    logo, }) {
  return (
    <Link to={`/store/${id}`} className="relative max-w-64 h-full overflow-hidden rounded-lg shadow-lg hover:shadow-2xl m-4">
      <img src={logo} alt="Store" className="w-64 h-64 object-cover" />
      <div className="absolute top-0 left-0 p-4 text-white">
        {/* Aquí puedes agregar puntuaciones u otro contenido */}
      </div>
      <div className="absolute bottom-0 left-0 p-4 text-gray-400 text-sm bg-opacity-50">
          <h2 className="text-lg font-bold">{name}</h2>
          <h4 className="text-sm">{address_city}</h4>
      </div>
    </Link>
  );
}
