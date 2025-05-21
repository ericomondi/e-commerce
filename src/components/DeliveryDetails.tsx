// src/components/DeliveryDetails.tsx
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';

interface Address {
  id: number;
  phone_number: string;
  street: string;
  city: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  user_id: number;
  created_at: string;
}

const DeliveryDetails: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchAddresses();
    }
  }, [isAuthenticated, token]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/addresses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Sort addresses to put default first, then take top 2
      const sortedAddresses = response.data.sort((a: Address, b: Address) =>
        a.is_default === b.is_default ? 0 : a.is_default ? -1 : 1
      ).slice(0, 2);
      setAddresses(sortedAddresses);
      setError(null);
    } catch (err) {
      setError('Failed to fetch addresses');
      console.error('Error fetching addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format address for display
  const formatAddress = (address: Address) => {
    return `${address.street}, ${address.city}, ${address.postal_code}, ${address.country} | Phone: ${address.phone_number}`;
  };

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="pay-on-delivery"
              aria-describedby="pay-on-delivery-text"
              type="radio"
              name="payment-method"
              value=""
              className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              checked={addresses[0]?.is_default}
            />
          </div>

          <div className="ms-4 text-sm">
            <label
              htmlFor="pay-on-delivery"
              className="font-medium leading-none text-green-600 dark:text-green-400"
            >
              Default Address
            </label>
            <p
              id="pay-on-delivery-text"
              className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
            >
              {loading ? 'Loading...' : addresses[0] ? formatAddress(addresses[0]) : 'No default address set'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Delete
          </button>
          <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>
          <button
            type="button"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="credit-card"
              aria-describedby="credit-card-text"
              type="radio"
              name="payment-method"
              value=""
              className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              checked={!addresses[0]?.is_default && addresses[1]}
            />
          </div>

          <div className="ms-4 text-sm">
            <label
              htmlFor="credit-card"
              className="font-medium leading-none text-white dark:text-white"
            >
              Address 2
            </label>
            <p
              id="credit-card-text"
              className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
            >
              {loading ? 'Loading...' : addresses[1] ? formatAddress(addresses[1]) : 'No second address available'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Delete
          </button>
          <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>
          <button
            type="button"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default DeliveryDetails;