import CardProductByStore from "./CardProductByStore/CardProductByStore";

export default function ListCardProductByStore({productByStore}) {
  return (
    <div>
      <div className="max-w-screen flex flex-wrap gap-2 justify-center items-center">
        {productByStore?.map((product) => (
          <CardProductByStore
            key={product.id_product}
            id={product.id_product}
            name={product.name}
            img_product={product.img_product}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}
