import React, { useEffect, useState } from 'react';
import { useFetchProducts } from './useFetchProducts'; // Import the corrected hook

// Define the Product type (same as in useFetchProducts)
type Product = {
  id: number;
  name: string;
  cost: number;
  price: number;
  img_url: string | null;
  stock_quantity: number;
  description: string | null;
  created_at: string;
  barcode: number;
  user_id: number;
  category_id: number | null;
  brand: string | null;
  category: { id: number; name: string; description: string | null } | null;
};

const ProductList: React.FC = () => {
  const { isLoading, products, totalPages, totalItems, error, fetchProducts } =
    useFetchProducts();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const limit = 10; // Matches the limit used in fetchProducts

  // Fetch products on mount and when page or search changes
  useEffect(() => {
    fetchProducts(currentPage, limit, searchQuery);
  }, [currentPage, searchQuery, fetchProducts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Calculate the range for "Showing X-Y of Z"
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  // Generate pagination items (show limited pages with ellipsis)
  const getPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5; // Show up to 5 page numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if endPage is at the max
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      items.push(
        <li key="1">
          <button
            onClick={() => handlePageChange(1)}
            className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        items.push(
          <li key="start-ellipsis">
            <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
              ...
            </span>
          </li>
        );
      }
    }

    // Add page numbers
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <li key={page}>
          <button
            onClick={() => handlePageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`flex items-center justify-center text-sm py-2 px-3 leading-tight border border-gray-300 ${
              page === currentPage
                ? 'z-10 text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            }`}
          >
            {page}
          </button>
        </li>
      );
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <li key="end-ellipsis">
            <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
              ...
            </span>
          </li>
        );
      }
      items.push(
        <li key={totalPages}>
          <button
            onClick={() => handlePageChange(totalPages)}
            className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return items;
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full max-w-xs p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <>
          {products.length === 0 ? (
            <p className="text-gray-600">No products found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Image</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Price</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Stock</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Description</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Category</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">
                        {product.img_url ? (
                          <img
                            src={product.img_url}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-800">{product.name}</td>
                      <td className="py-3 px-4 border-b text-gray-800">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4 border-b text-gray-800">{product.stock_quantity}</td>
                      <td className="py-3 px-4 border-b text-gray-800">
                        {product.description || 'No description available.'}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-800">
                        {product.category ? product.category.name : 'N/A'}
                      </td>
                      <td className="py-3 px-4 border-b">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">
                {` ${startItem}-${endItem} `}
              </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white">
                {` ${totalItems}`}
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
              {getPaginationItems()}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default ProductList;