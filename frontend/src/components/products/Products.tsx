import { useState } from "react";
import type { ProductType } from "../../logic/ProductType";
import Product from "../product/Product";

interface Props {
  products: ProductType[];
}

export default function Products({ products }: Props) {
  const [filterProducts, setFilterProducts] = useState<ProductType[]>(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  function search() {
    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterProducts(filtered);
    setMessage(filtered.length === 0 ? `${searchTerm} not found` : "");
  }

  // אם אין חיפוש, מציגים את כל המוצרים מההורה
  const displayProducts = searchTerm ? filterProducts : products;

  return (
    <div className="comp-products">
      <div>
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => {
            setMessage("");
            setSearchTerm(e.target.value);
          }}
        />
        <button type="button" onClick={search}>
          Search
        </button>
        {message && <p>{message}</p>}
      </div>

      {displayProducts.map((product) => (
        <div key={product._id}>
          <Product id_product={product._id} />
        </div>
      ))}
    </div>
  );
}
