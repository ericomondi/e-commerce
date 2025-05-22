import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

const DeliveryAndPaymentOptions: React.FC = () => {
  const {
    deliveryMethod,
    setDeliveryMethod,
    paymentMethod,
    setPaymentMethod,
    payOnDeliveryMethod,
    setPayOnDeliveryMethod,
    mpesaPhone,
    setMpesaPhone,
  } = useShoppingCart();

  // Handle delivery method change
  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const method = e.target.value as "pickup" | "delivery";
    setDeliveryMethod(method);
  };

  // Handle payment method change
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const method = e.target.value as "mpesa-now" | "pay-on-delivery";
    setPaymentMethod(method);
    if (method !== "mpesa-now" && payOnDeliveryMethod !== "mpesa") {
      setMpesaPhone(null); // Clear phone number if M-Pesa is not selected
    }
  };

  // Handle pay on delivery method change
  const handlePayOnDeliveryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const method = e.target.value as "cash" | "mpesa";
    setPayOnDeliveryMethod(method);
    if (method !== "mpesa") {
      setMpesaPhone(null); // Clear phone number if M-Pesa is not selected
    }
  };

  // Handle M-Pesa phone number change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMpesaPhone(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Delivery Options Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Delivery Options
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="pickup"
                  type="radio"
                  name="delivery-method"
                  value="pickup"
                  checked={deliveryMethod === "pickup"}
                  onChange={handleDeliveryChange}
                  className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                />
              </div>
              <div className="ms-4 text-sm">
                <label
                  htmlFor="pickup"
                  className="font-medium leading-none text-gray-900 dark:text-white"
                >
                  Pickup from Store
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
                  id="delivery"
                  type="radio"
                  name="delivery-method"
                  value="delivery"
                  checked={deliveryMethod === "delivery"}
                  onChange={handleDeliveryChange}
                  className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                />
              </div>
              <div className="ms-4 text-sm">
                <label
                  htmlFor="delivery"
                  className="font-medium leading-none text-gray-900 dark:text-white"
                >
                  Delivery
                </label>
                <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                  Have your order delivered to your address (+KSh 150 fee)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Options Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Payment Options
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="mpesa-now"
                  type="radio"
                  name="payment-method"
                  value="mpesa-now"
                  checked={paymentMethod === "mpesa-now"}
                  onChange={handlePaymentChange}
                  className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                />
              </div>
              <div className="ms-4 text-sm">
                <label
                  htmlFor="mpesa-now"
                  className="font-medium leading-none text-gray-900 dark:text-white"
                >
                  Pay Now with M-Pesa
                </label>
                <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                  Pay instantly via M-Pesa mobile money
                </p>
              </div>
            </div>
            {paymentMethod === "mpesa-now" && (
              <div className="mt-4">
                <label
                  htmlFor="mpesa-phone-now"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  M-Pesa Phone Number*
                </label>
                <input
                  type="text"
                  id="mpesa-phone-now"
                  value={mpesaPhone || ""}
                  onChange={handlePhoneChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="e.g., 0712345678"
                  required
                />
              </div>
            )}
          </div>
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
                  Pay when you receive your order
                </p>
              </div>
            </div>
            {paymentMethod === "pay-on-delivery" && (
              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="pay-on-delivery-method"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Payment Method*
                  </label>
                  <select
                    id="pay-on-delivery-method"
                    value={payOnDeliveryMethod || ""}
                    onChange={handlePayOnDeliveryChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    required
                  >
                    <option value="">Select method</option>
                    <option value="cash">Cash</option>
                    <option value="mpesa">M-Pesa</option>
                  </select>
                </div>
                {payOnDeliveryMethod === "mpesa" && (
                  <div>
                    <label
                      htmlFor="mpesa-phone-delivery"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      M-Pesa Phone Number*
                    </label>
                    <input
                      type="text"
                      id="mpesa-phone-delivery"
                      value={mpesaPhone || ""}
                      onChange={handlePhoneChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="e.g., 0712345678"
                      required
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Voucher Section */}
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

export default DeliveryAndPaymentOptions;