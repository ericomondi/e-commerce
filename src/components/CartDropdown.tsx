import React from 'react';

const CartDropdown: React.FC = () => {
  return (
    <>
      <div
                id="myCartDropdown1"
                className="hidden z-10 mx-auto max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800"
              >
                <div className="grid grid-cols-2">
                  <div>
                    <a
                      href="#"
                      className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
                    >
                      Apple iPhone 15
                    </a>
                    <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                      $599
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-6">
                    <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                      Qty: 1
                    </p>

                    <button
                      data-tooltip-target="tooltipRemoveItem1a"
                      type="button"
                      className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                    >
                      <span className="sr-only"> Remove </span>
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="tooltipRemoveItem1a"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                      Remove item
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div>


                <a
                  href="/shopping-cart"
                  title=""
                  className="mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  role="button"
                >
                  {" "}
                  Open Cart{" "}
                </a>
              </div>
    </>
  );
};

export default CartDropdown;