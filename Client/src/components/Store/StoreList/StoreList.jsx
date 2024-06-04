import StoreCards from "../StoreCards/StoreCards";

export default function StoreList({allSellers}) {
  return (
    <div className="flex flex-wrap justify-center items-center flex-row">
      {allSellers?.map((store) => (
        <StoreCards
          key={store.id_store}
          id={store.id_store}
          name={store.name}
          address_cp={store.address_cp}
          address_country={store.address_country}
          address_city={store.address_city}
          logo={store.logo}
        />
      ))}
    </div>
  );
}
