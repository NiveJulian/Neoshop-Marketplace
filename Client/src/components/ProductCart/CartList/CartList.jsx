import CartItem from "../CartItem/CartItem";

export default function CartList({ cartItems, calculateTotal }) {
  return (
    <div className="absolute w-max z-10 top-8 right-0 bg-white rounded-lg p-4 shadow-lg">
      {cartItems.map((product, index) => (
        <CartItem key={index} product={product} />
      ))}
      {/* Total del carrito */}
      <div className="mt-4 float-right">
        <h3 className="text-lg font-semibold">Total:</h3>
        <p className="text-gray-500">${calculateTotal()}</p>
      </div>
      <div className="mt-4 float-left">
        <button className="border p-2 hover:text-secondary hover:border-secondary hover:shadow-lg active:translate-y-[5%] rounded-md active:shadow-xl">
          Continue with the purchase
        </button>
      </div>
    </div>
  );
}
