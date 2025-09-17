import { useEffect, useState } from "react";
import type { ProductType } from "../../logic/ProductType";
import { getProducts } from "../../logic/api/product.api";
import Product from "../product/Product";

export default function Products({ category }: { category: string }) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filterProducts, setFilterProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  console.log(searchTerm);
  console.log(filterProducts);

  useEffect(() => {
    const storage = localStorage.getItem("products");
    if (storage) {
      const productsStorage: ProductType[] = JSON.parse(storage);
      if (category.toLowerCase() === "all") {
        setProducts(productsStorage);
      } else {
        const productsCategory = productsStorage.filter(
          (product) => product.category === category
        );
        setProducts(productsCategory);
      }
    }

    const fetchGetProduct = async () => {
      const resProducts = await getProducts();
      console.log("res", resProducts);
      if (category.toLowerCase() === "all") {
        setProducts(resProducts);
      } else {
        const productsCategory = resProducts.filter(
          (product) => product.category === category
        );
        setProducts(productsCategory);
      }
      localStorage.setItem("products", JSON.stringify(resProducts));
    };

    fetchGetProduct();
  }, [category]);

  function search() {
    const filtered = products.filter((f) =>
      f.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterProducts(filtered);
    if (!filtered || filtered.length === 0) {
      setMessage(`${searchTerm} not found`);
    } else {
      setMessage("");
    }
  }

  return (
    <div className="comp-products">
      <div>
        <input
          type="text"
          placeholder="Search product..."
          onChange={(e) => {
            setMessage("");
            setSearchTerm(e.target.value);
          }}
        />
        <button type="button" onClick={search}>
          Search
        </button>
        {message && searchTerm && <p>{message}</p>}
      </div>
      {!searchTerm &&
        products.map((product) => (
          <Product key={product._id} id_product={product._id} />
        ))}

      {searchTerm &&
        filterProducts.map((product) => (
          <Product key={product._id} id_product={product._id} />
        ))}
    </div>
  );
}
