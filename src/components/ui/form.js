import { useNavigate } from "react-router";

export const Form = ({ form, cardType, total, setForm, setCart, cart }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const newOrder = {
        customer: { ...form },
        cart: [...cart],
        paymentMethod: cardType,
        date: new Date().toISOString(),
        total: total
      };

      {/* Om man vill spara alla orders som görs. */ }
      // const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      // localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

      localStorage.setItem("orders", JSON.stringify(newOrder));

      setForm({
        name: "",
        email: "",
        address: "",
        city: "",
        expiryMonth: "",
        expiryYear: "",
        phone: "+46 ",
      });

      setCart([]);
      navigate("/confirmation")

    } catch (error) {
      console.error("Order submission failed:", error);
      alert("Something went wrong while placing your order. Please try again.");
    }
  };

  return (
    cardType === null ? null :
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-[50%_48.6%] gap-2">
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="Adress"
          />

          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            placeholder="City"
          />
        </div>

        {cardType === "card" &&
          <div className="grid  grid-cols-1 md:grid-cols-[50%_48.6%] gap-2">
            <div className="flex flex-col gap-2">
              <label>Card number</label>
              <input
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                  setForm(prev => ({
                    ...prev,
                    cardNumber: formattedValue
                  }));
                }}
                placeholder="2222 2222 2222 2222"
                maxLength={19}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Clearing number</label>
              <input
                type="text"
                name="clearingNumber"
                value={form.clearingNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setForm(prev => ({
                    ...prev,
                    clearingNumber: value
                  }));
                }}
                placeholder="8XXX"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Expiry date</label>
              <div className="flex gap-2">
                <select
                  name="expiryMonth"
                  value={form.expiryMonth || ''}
                  onChange={handleChange}
                  className="w-full"
                  required
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                      {String(i + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select
                  name="expiryYear"
                  value={form.expiryYear || ''}
                  onChange={handleChange}
                  className="w-full"
                  required
                >
                  <option value="">Year</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
              {form.expiryMonth && form.expiryYear && (
                <p className="text-sm text-gray-500">
                  Selected: {form.expiryMonth}/{form.expiryYear.toString().slice(-2)}
                </p>
              )}
            </div>
          </div>
        }

        {cardType === "swish" &&
          <>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+46 XXX XXX XX"
              required
            />
          </>
        }

        <button
          type="submit"
          className="mt-2 w-full lg:text-[1.5rem] lg:max-w-[250px] bg-[#2b2d42] text-[#dfe3da] py-2 px-4 uppercase font-bold hover:bg-opacity-90 transition"
        >
          Pay with {cardType}
        </button>
      </form>

  )
}
