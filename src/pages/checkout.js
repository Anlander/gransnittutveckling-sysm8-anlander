import React, { useState } from "react";
import { Form } from "../components/ui/form";

const Checkout = ({ cart, setCart }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    cardNumber: "",
    clearingNumber: "",
    phone: "+46 "
  });

  const [cardType, setCard] = useState("swish")

  const handleCardChoice = (type) => {
    setCard(type);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);


  return (
    <div className="min-h-[40vh] bg-[#d6d1c4] lg:rounded-lg px-5 lg:px-14 container flex flex-col-reverse lg:grid lg:grid-cols-2 gap-5 pt-4 lg:my-14 lg:pt-14 pb-14 lg:pb-24">
      <div className="flex gap-2 flex-col rounded-lg lg:pb-10 lg:px-5">
        <div className="flex gap-2">
          <button
            onClick={() => handleCardChoice("swish")}
            className={`text-[1.5rem]  uppercase 
                      font-bold ${cardType === "swish" ? "border-4 bg-[#2b2d42] text-[#dfe3da]" : "bg-transparent "
              }`}
          >
            <span>Swish</span>
          </button>
          <button
            onClick={() => handleCardChoice("card")}
            className={`text-[1.5rem] uppercase 
                      font-bold ${cardType === "card" ? "border-4 bg-[#2b2d42] text-[#dfe3da]" : "bg-transparent "
              }`}
          >
            <span>Card</span>
          </button>
        </div>
        <Form
          cardType={cardType}
          form={form}
          cart={cart}
          setCart={setCart}
          setForm={setForm}
          total={total}
        />
      </div>

      <div>
        <h2 className="text-[1.5rem] lg:text-[2rem] uppercase font-bold mb-2 lg:mb-5">Your order</h2>
        <div className="border-0 rounded-md border-black bg-[#dfe3da] py-4 px-4">
          {cart.map((item) => (
            <div key={item.id}
              className="lg:pb-1  border-[#121212]  font-bold grid 
              items-start border-b-2 pb-2 pt-2 lg:pt-0 lg:border-0 lg:items-center 
              lg:grid-cols-[40%_60%] text-lg md:text-[1.5rem]">
              <h2 className="">{item.title}</h2>
              <div className="flex items-center justify-between">
                <p>x{item.quantity}</p>
                <p className="font-mono text-right">{item.price * item.quantity} SEK</p>
              </div>
            </div>
          ))}
        </div>
        <span className="font-bold mt-4 text-[1.5rem] lg:text-[2rem] text-[#2b2d42] uppercase font-mono lg:p-0 w-full text-center lg:text-right rounded-sm">
          Total: {total} SEK
        </span>
      </div>
    </div>
  );
};

export default Checkout;
