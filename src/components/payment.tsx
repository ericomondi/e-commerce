import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Payements: React.FC = () => {
  const { paymentMethod, setPaymentMethod, mpesaPhone, setMpesaPhone } = useShoppingCart();

  // Handle radio button change
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const method = e.target.value as "pay-on-delivery" | "pickup" | "mpesa";
    setPaymentMethod(method);
    if (method !== "mpesa") {
      setMpesaPhone(null); // Clear phone number if M-Pesa is not selected
    }
  };

  // Handle M-Pesa phone number change
  // Ascending
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMpesaPhone(e.target.value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Payment Options
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="pay-on-delivery"
                type="radio"
                name="payment-method"
                value="pay-on-delivery"
                checked={paymentMethod === "pay-on-delivery"}
                onChange={handlePaymentChange}
                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
            </div>
            <div className="ms-4 text-sm">
              <label
                htmlFor="pay-on-delivery"
                className="font-medium leading-none text-gray-900 dark:text-white"
              >
                Pay on Delivery
              </label>
              <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                Pay cash or via M-Pesa on delivery (+KSh 150 processing fee)
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="pickup"
                type="radio"
                name="payment-method"
                value="pickup"
                checked={paymentMethod === "pickup"}
                onChange={handlePaymentChange}
                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
            </div>
            <div className="ms-4 text-sm">
              <label
                htmlFor="pickup"
                className="font-medium leading-none text-gray-900 dark:text-white"
              >
                Free Pickup at Store
              </label>
              <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                Collect your order at our store for free
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="mpesa"
                type="radio"
                name="payment-method"
                value="mpesa"
                checked={paymentMethod === "mpesa"}
                onChange={handlePaymentChange}
                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
            </div>
            <div className="ms-4 text-sm">
              <label
                htmlFor="mpesa"
                className="font-medium leading-none text-gray-900 dark:text-white"
              >
                M-Pesa
              </label>
              <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                Pay via M-Pesa mobile money
              </p>
            </div>
          </div>
          {paymentMethod === "mpesa" && (
            <div className="mt-4">
              <label
                htmlFor="mpesa-phone"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                M-Pesa Phone Number
              </label>
              <input
                type="text"
                id="mpesa-phone"
                value={mpesaPhone || ""}
                onChange={handlePhoneChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="e.g., 0712345678"
                required
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="voucher"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter a gift card, voucher, or promotional code
        </label>
        <div className="flex max-w-md items-center gap-4">
          <input
            type="text"
            id="voucher"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder=""
          />
          <button
            type="button"
            className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payements;