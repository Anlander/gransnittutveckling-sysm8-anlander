import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Confetti from 'react-confetti-boom';
import Lottie from "lottie-react";
import drone from "./drone.json";

const Confirmation = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = localStorage.getItem("orders");
    if (!storedOrder) {
      navigate("/");
    } else {
      setOrder(JSON.parse(storedOrder));
    }
  }, [navigate]);

  if (!order) return null;

  setTimeout(() => {
    setLoading(true)
  }, 3000)

  return loading ?
    <div className="pb-10 pt-10 !my-10 lg:my-14 bg-[#D6D1C4] container px-5 lg:px-10 md:max-w-[60%] lg:max-w-[40%] rounded-lg">
      <h2 className="text-[1.8rem] font-bold text-center uppercase">Confirmation</h2>
      <h1 className="text-[#7c9885] text-[1.5rem] md:text-[3rem] mb-4 font-bold uppercase text-center">PAYMENT SUCCESS</h1>

      <div className="flex flex-col gap-1 customer-info border-0 rounded-lg p-4 border-black my-4">
        <span className="capitalize">Customer: {order.customer.name}</span>
        <span>Email: {order.customer.email}</span>
        <span>Address: {order.customer.address}</span>
        <span>City: {order.customer.city}</span>
        {order.paymentMethod === "swish" && <span>Phone: {order.customer.phone}</span>}
      </div>
      <div>
        <div className="border-0 p-4 bg-[#f4f3e7] mx-4 border-black rounded-lg">
          {order.cart.map((item) => {
            return (
              <div key={item.id} className="lg:pb-1 border-[#121212] font-bold grid items-start 
                border-b-2 pb-2 pt-2 lg:pt-0 uppercase lg:border-0 lg:items-center  lg:grid-cols-2 text-lg md:text-[1.2rem]">
                <h2 className="">{item.title}</h2>
                <div className="flex justify-between">
                  <span className="text-right">{item.price * item.quantity} SEK</span>
                  <span>x{item.quantity}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex flex-col gap-0  mt-4 font-bold items-center justify-center uppercase font-mono lg:gap-0">
          <span>Payment method: {order.paymentMethod}</span>
          <span className="xl:text-[2rem]">
            Total paid: {order.total} SEK
          </span>
        </div>
      </div>
      <Confetti mode="boom" particleCount={100} colors={['#ff577f', '#ff884b']} />
    </div>
    :
    <div className="w-full px-5 lg:px-0 flex justify-center flex-col items-center my-14 gap-4">
      <h2 className="text-[2rem] uppercase font-bold mt-14 text-center">Just a moment while <br /> we finalize your payment.</h2>
      <div className="max-w-[300px] flex justify-center">
        <Lottie animationData={drone} loop={true} />
      </div>
    </div>
}

export default Confirmation
