import React from "react";

export const CartDetailItem = ({ cartItems }) => {
    return (
      <div className="overflow-y-auto max-h-96">
        {cartItems.map((item, index) => (
          <div key={index}>
            <div className="line h-px w-full my-2 bg-gray-300"></div>
            <table className="order-table relative w-full">
              <tbody>
                <tr>
                  <td className="w-1/6">
                    <img
                      src={item.img_product}
                      className="w-full"
                      alt="Product"
                    />
                  </td>
                  <td className="pl-6">
                    <span className="font-light">{item.brand.name}</span>
                    <br />
                    {item.name}
                    <br />
                    <span className="font-light text-sm">{item.description}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="price absolute bottom-0 right-1 text-blue-500">
                      {item.price}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  };