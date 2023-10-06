import React from "react";
import { useSelector } from "react-redux";

const Received = () => {
  const recData = useSelector((state) => state.received.recData);
  return (
    <div>
      <div className="pb-2 font-bold border-t-[30px]">
        <h1 className="mt-4 mx-4">Previous Orders:</h1>
        {recData.length < 1 && <p className="mx-4 font-extralight">No items</p>}
      </div>
      {/* per order loop */}
      {recData.map((items) => (
        <div key={items.id} className="p-4 shadow-md">
          <div className="">
            {/* per item loop */}
            {items.cartItems.map((item) => (
              <div key={item.name}>
                <h1 className="inline-block ml-2">{item.name}</h1>
                <p className="inline-block ml-2">₹{item.price}</p>
                <p className="inline-block ml-2">x{item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center px-4">
            <p className="font-bold">Paid: ₹{items.cartTotal}</p>
          </div>
        </div>
      ))}
    </div>
    
  );
};

export default Received;
