import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

function Catelog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredProducts = async (filter: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${filter}`
      );
      console.log(response);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/categories`
      );
      const data = await response.json();

      setFilters(data);
    } catch (error) {
      console.error("Error fetching Categories", error);
    }
  };

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      fetchFilteredProducts(filter);
    } else {
      fetchProducts();
    }
    getCategories();
  }, []);

  const handleClick = async (e: any, id: string) => {
    e.preventDefault();
    navigate(`${id}`);
  };

  const handleAppliedFilters = (filter: string) => {
    setSearchParams({ filter });
    fetchFilteredProducts(filter);
  };

  return (
    <div className="flex">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="w-1/4 p-4 bg-gray-200">
            <h2 className="text-lg font-bold mb-4">Filters</h2>

            <div className="mb-4">
              <div>
                {filters.map((filter) => (
                  <div
                    className="cursor-pointer p-2 mb-2 border-b-2 border-black"
                    onClick={() => {
                      handleAppliedFilters(filter);
                    }}
                  >
                    {filter}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-3/4 p-4">
            <h1 className="text-xl font-bold mb-6">Products</h1>
            <div className="grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {products.map((product) => (
                <div
                  className="cursor-pointer bg-gray-300 p-4"
                  onClick={(e) => handleClick(e, product.id)}
                  key={product.id}
                >
                  <img
                    className="h-[300px] w-[200px] object-cover mb-2"
                    src={product.image}
                    alt={product.title}
                  />
                  <p className="font-bold">{product.title}</p>
                  <p className="text-gray-700">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Catelog;
