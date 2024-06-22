export default function PayDetail({
  paying,
  user,
  store,
  timeSincePurchase,
  goBack,
}) {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-full  mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="flex items-center justify-between rounded-t-3xl p-3 w-full">
          <div className="flex justify-center items-center">
            <img src={store?.logo} className="rounded-full w-24 h-24" />
          </div>
          <p className="mt-1 text-sm font-normal text-gray-600">
            Comprador {user.name}
          </p>
          <button
            onClick={() => goBack()}
            className="linear rounded-[20px] border border-gray-500 bg-gray-500 px-4 py-2 text-gray-200 font-medium transition duration-200 hover:bg-gray-300 active:bg-gray-200"
          >
            Go back
          </button>
        </div>

        <div className="text-lg border border-gray-300 shadow-md w-full text-center rounded-lg p-1 font-bold text-navy-700 dark:text-gray-500">
          Detail
        </div>
        {paying?.paymentProducts?.map((product, i) => (
          <div
            key={i}
            className="flex border-gray-300 h-full mt-2 w-full items-start justify-between rounded-md border-[1px] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 hover:shadow-md dark:!bg-navy-800 dark:hover:!bg-navy-700"
          >
            <div className="absolute right-0 top-0 mt-2 mr-2 items-center text-sm font-normal text-gray-600 dark:text-gray-400">
              <p>
                {timeSincePurchase} {""} ago
              </p>
              <p className="ml-1"></p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center">
                <img
                  className="h-full w-full rounded-xl"
                  src={product.img_product}
                  alt={product.name}
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-base font-bold text-navy-700 dark:text-gray-400">
                  {product.name}
                </h5>
                <p className="text-gray-300 text-sm">{product.description}</p>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-gray-400">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-gray-400">
                <p> </p>
                <p className="ml-1">$</p>
                {product.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
