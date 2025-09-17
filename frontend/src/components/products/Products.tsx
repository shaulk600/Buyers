import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import type { ProductType } from "../../logic/ProductType"
import Product from "../product/Product";
import { Link } from "react-router";

interface Props {
  category: string;
  products: ProductType[]
  setProducts: Dispatch<SetStateAction<ProductType[]>>
}

export default function Products({ category, products }: Props) {
  const [filterProducts, setFilterProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  // סינון לפי קטגוריה
  useEffect(() => {
    if (category.toLowerCase() === "all") {
      setFilterProducts(products);
    } else {
      const productsCategory = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setFilterProducts(productsCategory);
    }
  }, [category, products]);

  // חיפוש
  function search() {
    const filtered = products.filter((f) =>
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category.toLowerCase() === "all" ||
        f.category.toLowerCase() === category.toLowerCase())
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

      {filterProducts.map((product) => (
        <div key={product._id}>
          <Link to={`/product/${product._id}`}>Product details</Link>
          <Product id_product={product._id} />
        </div>
      ))}
    </div>
  );
}
