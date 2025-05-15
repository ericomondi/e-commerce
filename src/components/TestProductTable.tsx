import React, { useEffect, useState } from 'react';
import { useFetchProducts } from './UseFetchProducts';


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

  // Fetch products on mount and when page or search changes
  useEffect(() => {
    fetchProducts(currentPage, 10, searchQuery);
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

  // Generate pagination items
  const paginationItems = [];
  for (let page = 1; page <= totalPages; page++) {
    paginationItems.push(
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`px-3 py-1 mx-1 rounded ${
          page === currentPage
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {page}
      </button>
    );
  }

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
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            {paginationItems}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;