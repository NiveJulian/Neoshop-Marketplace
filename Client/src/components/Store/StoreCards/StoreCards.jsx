import { Link } from "react-router-dom";

export default function StoreCards({
  id,
  name,
  address_cp,
  address_country,
  address_city,
  logo,
}) {
  return (
    <Link
      to={`/store/${id}`}
      className="relative max-w-64 h-full overflow-hidden rounded-lg shadow-lg hover:shadow-2xl m-4"
    >
      <img src={logo} alt="Store" className="w-64 h-64 object-cover" />

      <div className="absolute top-0 right-0 text-white">
        {/* Aquí puedes agregar puntuaciones u otro contenido */}
        <div className="flex items-center p-1 mt-2 mb-2 h-4">
          <svg
            className="w-4 h-4 fill-current text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            className="w-4 h-4 fill-current text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            className="w-4 h-4 fill-current text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            className="w-4 h-4 fill-current text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            className="w-4 h-4 fill-current text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-4 text-gray-400 text-sm bg-opacity-50">
        <h2 className="text-lg font-bold">{name}</h2>
        <h4 className="text-sm">{address_city}</h4>
      </div>
    </Link>
  );
}
