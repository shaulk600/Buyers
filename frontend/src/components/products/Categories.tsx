import { useState } from "react";

type CategoriesProps = {
  onSelectCategory: (cat: string) => void;
  categories: string[];
};

export default function Categories({ onSelectCategory, categories }: CategoriesProps) {
  const [selected, setSelected] = useState("All");

  const handleSelect = (category: string) => {
    setSelected(category);
    onSelectCategory(category);
  };

  return (
    <div className="btns-category">
      {categories.map((cat) => (
        <button className="btn-green" key={cat} onClick={() => handleSelect(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}

