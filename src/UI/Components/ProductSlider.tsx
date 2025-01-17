import React, { useState } from "react";
import ProductCards from "./ProductCards";
import { Typographie } from "../Design-System/Typographie";
import { Button } from "../Design-System/Button";

const ProductSlider = () => {
  const [chosenCat, setChosenCat] = useState("all");

  return (
    <div className="container">
      <div className="flex items-center flex-wrap gap-4 w-full justify-between mt-[47px] mb-[55px]">
        <Typographie variant="h3" className="uppercase" font="cooper">
          • Le catalogue •
        </Typographie>
        <div className="flex items-center gap-[10px]">
          <Button
            onClick={() => setChosenCat("Apple")}
            variant={chosenCat === "Apple" ? "accent" : "outline"}
          >
            Apple
          </Button>
          <Button
            onClick={() => setChosenCat("Samsung")}
            variant={chosenCat === "Samsung" ? "accent" : "outline"}
          >
            Samsung
          </Button>
          <Button
            onClick={() => setChosenCat("all")}
            variant={chosenCat === "all" ? "accent" : "outline"}
          >
            Tous
          </Button>
        </div>
      </div>
      <div className="w-full mb-[30px] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[30px]">
        <ProductCards chosenCat={chosenCat} />
      </div>
    </div>
  );
};

export default ProductSlider;
