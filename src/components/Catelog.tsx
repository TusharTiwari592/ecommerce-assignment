import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

function Catelog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);

  const handleClick = async (e: any, id: string) => {
    e.preventDefault();
    navigate(`${id}`);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>This is the product page</h1>
          <div className="grid grid-cols-4 gap-7">
            {products.map((product) => (
              <div
                className="cursor-pointer bg-gray-300"
                onClick={(e) => {
                  handleClick(e, product.id);
                }}
                key={product.id}
              >
                <img className="h-[300px] w-[200px]" src={product.image} />
                <p>{product.title}</p>
                <p>{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Catelog;
