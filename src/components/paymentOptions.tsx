// paymentOptions.tsx
import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

const PaymentOptions: React.FC = () => {
  const { paymentMethod, setPaymentMethod, mpesaPhone, setMpesaPhone } = useShoppingCart();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Payment Options</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Pay Now with M-Pesa */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="pay-now-mpesa"
                type="radio"
                name="payment-method"
                value="pay-now-mpesa"
                checked={paymentMethod === "pay-now-mpesa"}
                onChange={(e) => setPaymentMethod(e.target.value as "pay-now-mpesa" | "pay-on-delivery-mpesa")}
                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
            </div>
            <div className="ms-4 text-sm">
              <label htmlFor="pay-now-mpesa" className="font-medium leading-none text-gray-900 dark:text-white">
                Pay Now with M-Pesa
              </label>
              <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                Pay instantly via M-Pesa mobile money.
              </p>
            </div>
          </div>
        </div>
        {/* Pay on Delivery with M-Pesa */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="pay-on-delivery-mpesa"
                type="radio"
                name="payment-method"
                value="pay-on-delivery-mpesa"
                checked={paymentMethod === "pay-on-delivery-mpesa"}
                onChange={(e) => setPaymentMethod(e.target.value as "pay-now-mpesa" | "pay-on-delivery-mpesa")}
                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
            </div>
            <div className="ms-4 text-sm">
              <label htmlFor="pay-on-delivery-mpesa" className="font-medium leading-none text-gray-900 dark:text-white">
                Pay on Delivery with M-Pesa
              </label>
              <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                Pay via M-Pesa when you receive your order.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* M-Pesa Phone Number Input */}
      {paymentMethod && (
        <div className="mt-4">
          <label htmlFor="mpesa-phone" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            M-Pesa Phone Number*
          </label>
          <input
            type="text"
            id="mpesa-phone"
            value={mpesaPhone || ""}
            onChange={(e) => setMpesaPhone(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="e.g., 0712345678"
            required
          />
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;